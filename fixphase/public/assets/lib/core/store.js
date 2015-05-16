define(["jquery", "observer", "identity", "core", "promise","api"],
function ($, Observer, Identity, core, Promise,api) {

    var stubIdentity = {getId: function () {
        return -1;
    }};
    /**
     * Used In the begining of a new get request to check if the completed request promise should have its
     * callbacks called or not.
     * @param {object}   activeCalls     - List of active calls
     * @param {String}   id              - The function name
     * @param {Object}   caller          - Object calling the function
     * @param {Object}   requestInstance - An instance of the current request object
     * @param {int}      requestedTime   - The time of this request
     */
    var shouldCallCallbacks = function(activeCalls, id, caller, requestInstance, requestedTime)
    {
        // check if another request was made before this one finish
        if(requestInstance.time > requestedTime)
        {
            // just ignore this call and dont remove anything, entry will be used by next request
            return false;
        }

        // check if this request was cancelled, this means that the caller last in active is greater than the
        // time of request
        if(requestInstance.time < caller.getLastInActive())
        {
            //remove it and return false
            activeCalls[id][caller.getId()]= undefined;
            return false;
        }

        // otherwise remove it from active calls and return true
        activeCalls[id][caller.getId()] = undefined;
        return true;
    };


    /**
     * Setup a request
     * @param options  - cotains opptions of this request
     * @param activeCalls - list of all store active calls
     * @returns {Object} - setup data
     */
    var setupRequest = function (options, activeCalls) {
        if(!options.id || !options.caller)
        {
            console.warn("Ajax get: caller and function id should be supplied.");
            return null;
        }
        if(!this[options.id])
        {
            console.warn("Ajax get: wrong id passed");
            return null;
        }

        var promise = null;
        // get active function calls
        var activeFuncCalls = activeCalls[options.id];
        //if none found create
        if(!activeFuncCalls)
        {
            activeFuncCalls = {};
            activeCalls[options.id] = activeFuncCalls;
        }

        //get request instance
        var requestInstance = activeFuncCalls[options.caller.getId()];
        //if none found create
        if(!requestInstance)
        {
            //create new request instance and it promise object
            requestInstance = {promise: new Promise()};
            activeFuncCalls[options.caller.getId()]= requestInstance;
        }

        // update/set request time
        var requestedTime = Date.now();
        requestInstance.time = requestedTime;
        //get the promise of the request
        promise = requestInstance.promise;
        return {
            requestedTime: requestedTime,
            requestInstance: requestInstance,
            promise: promise
        };

    };

    /**
     * Create a method for this object. Used to workaround closure in forloops.
     * @param data
     * @param funcname
     * @returns {Function}
     */
    var createFunc = function (data, funcname) {
        var self = this;
        return function () {
            return  data.ajaxMethods[funcname].apply(self, [funcname].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Store constructor. Ajax methods passed in data arguments are converted to methods of this object,
     * where they take 3 arguments each: the id (method name actually), caller and data. Method names should have
     * a correspondig property of the same name in config/api that gives the url used by this ajax method.
     * @param {Object} data - Holds the object methods as follows
     * {
     *      properties: [
     *          name
     *      ],
     *      ajaxMethods: {
     *
     *          methodname: function (id, caller, data){},
     *
     *
     *      },
     *
     *      setup: callback function on setup,
     *
     *      exit: callback function on exit
     * }
     * @constructor
     */
    var Store = function (data) {
        //mixin
        Observer.call(this);
        //parent constructor
        Identity.call(this);

        var
            _setupFunc,
            _exitFunc,
            _active,
            _local,
            _ajax,
            _activeCalls,
            _lastInActive,
            _changeEventListeners,
            _listenersWatchedProperties
        ;
        _active = false;
        _setupFunc = function () {};
        _exitFunc = function () {};
        _lastInActive = 0;
        _changeEventListeners = {};
        _listenersWatchedProperties = {};
        /*
         * Saves active calls for this store
         * {
         *      funcname: {
         *                  caller_id: {
         *                              time:      millisecond,
         *                              promise:   promise
         *                             }
         *                }
         * }
         * It is as follow when a get request happens, the store object saves it here under funcname and caller id,
         * then when the ajax completes either it checks to see if this reuest was cancelled if so then
         * it dont call its promise callbacks and remove the entry from _activeCalls. Otherwise, it calls the
         * callbacks and remove the entry from _activeCalls. So callbacks are only removed by the done and fail
         * methods of the ajax request, those methods gets the request object, caller, and funcname as closures
         * so they can make the needed checks and remove the entry when done.
         */
        _activeCalls = {};


        //set methods from data object
        if(data){
            if(data.setup)
            {
                _setupFunc = data.setup;
            }
            if(data.exit)
            {
                _exitFunc = data.exit();
            }
            //add methods and call function supplying implicit id parameter
            if(data.ajaxMethods){
                for(var funcname in data.ajaxMethods){
                    if(!api[funcname])
                    {
                        console.warn("Ajax get: function [" + funcname + "] does not have a corresponding api url.");
                        continue;
                    }
                    this[funcname] = createFunc.call(this,data,funcname);
                }
            }
            //add properties
            if(data.properties instanceof Array){
                this.properties = {};
                for(var i in data.properties){
                    this.properties[data.properties[i]] = i;
                }
            }
        }

        //--- Explicit methods ---//

        /**
         * Check if this store is currently active.
         * @returns {boolean}
         */
        this.isActive = function () {
            return _active;
        };

        this.getLastInActive = function(){
            return _lastInActive;
        };

        /**
         * Called when setting up the store
         * @returns {boolean}
         */
        this.setup = function () {
            //if already active skip
            if(this.isActive())
            {
                return false;
            }
            _active = true;
            _setupFunc.call(this);
            return true;
        };

        /**
         * Called when exiting the store
         * @param {object} listener - An identifier object that used to listen to some change event on this store
         * @returns {boolean}
         */
        this.exit = function (listener) {
            //if already exit skip
            if(!this.isActive())
            {
                return false;
            }

            //check if exit called but this needed in next view
            if(core.isInNextView(this))
            {
                //check if we have a listener
                if(listener instanceof Identity)
                {
                    //remove all its listen callbacks
                    var properties = _listenersWatchedProperties[listener.getId()];
                    if(properties)
                    {
                        for(var i in properties){
                            this.unregisterEvent(listener, properties[i]);
                        }
                    }
                    _listenersWatchedProperties[listener.getId()] = undefined;

                }

                //then skip
                return false;
            }

            _active = false;
            _lastInActive = Date.now();

            //remove all observe events
            this.unobserveAll();

            //reset change event listeners
            _changeEventListeners = {};
            _listenersWatchedProperties = {};

            _exitFunc.call(this);
            return true;
        };

        /**
         * Create a resolved promise with done state, where callbacks will have caller as its context and will receive
         * success & data as arguments.
         * @param {object} caller - An object of type identifier, where the callback have this as its context
         * @param {boolean} success - indicates whether data is an error msg or actual data
         * @param {object } data
         */
        this.makeDonePromise = function (caller, success, data) {
            //make new promise object
            var promise = new Promise();
            //set the done & create callback filter to handle context and passed arguments
            promise.setDone(function (f) {
                f.call(caller,success,data);
            });
            return promise;
        };

        /**
         * Create a resolved promise with failed state, where callbacks will have caller as its context and
         * will receive success & data as arguments.
         * @param {object} caller - An object of type identifier, where the callback have this as its context
         * @param {boolean} success - indicates whether data is an error msg or actual data
         * @param {object } data
         */
        this.makeFailedPromise = function (caller, errorMsg){
            //make new promise object
            var promise = new Promise();
            //set the done & create callback filter to handle context and passed arguments
            promise.setFailed(function (f) {
                f.call(caller,errorMsg);
            });
            return promise;
        };


        /**
         * Used to issue a tracked get request, that makes sure to save attached callbacks so if a new request is
         * made while the previous hasn't finish yet then it would ignore the previous and use the new one, also
         * the saved callbacks allows to cancel them if the componenet that requested them are
         * @param {Object} options - An object containing options as follows :
         * {
         *      id:                   [required] use the id param passed implicitly to the store method
         *      caller:               [required] the caller calling the store method
         *      data:                 [optional] query to be passed to server
         *      filterDoneArguments:  [optional] filter the passed data argument to done promise callbacks
         *      filterFailedArguments:[optional] filter the passed data argument to fail promise callbacks
         * }
         * @returns {Object} - A promise
         */
        this.get = function (options) {
            var self = this;
            var setup = setupRequest.call(this,options, _activeCalls);
            if(!setup)
            {
                return new Promise();
            }

            //call ajax
            $.ajax({
                url: api[options.id],
                method: "GET",
                data: options.data,
                dataType: "json"
            })
                .done(function (data) {
                    // check if we should accept this request
                    if (!shouldCallCallbacks.call(self, _activeCalls, options.id, options.caller,
                            setup.requestInstance, setup.requestedTime)) {
                        return;
                    }

                    // we should accept it so start handling the response
                    // make returned data the data object
                    var returnedData = data.data;
                    // and assume it succeeded
                    var success = true;

                    //now check if this is an error
                    if(data.error)
                    {
                        // make returned data the error obj and make success false
                        success = false;
                        returnedData = data.error;
                    }


                    // now pass to filter if exist
                    if(options.filterDoneArguments)
                    {
                        // get filter result and make it our new returned data
                        returnedData = options.filterDoneArguments.call(self,success, returnedData);
                    }

                    // now resolve the promise object to call its callbacks passing a filter
                    // to set the correct context and arguments of callbacks
                    setup.requestInstance.promise.setDone(function (f) {
                        f.call(options.caller,success,returnedData);
                    });


                })
                .fail(function (jqXHR, statusMsg) {
                    // check if we should accept this request
                    if(!shouldCallCallbacks.call(self, _activeCalls, options.id, options.caller,
                            setup.requestInstance, setup.requestedTime)) {
                        return;
                    }
                    // otherwise we should accept it so start handle the response
                    var returnedData = statusMsg;

                    // pass to filter if exist
                    if(options.filterFailedArguments)
                    {
                        // get filter result and make it our new returned data
                        returnedData = options.filterFailedArguments.call(self,jqXHR, returnedData)
                    }

                    // now set failed promise object to call its callbacks passing a filter
                    // to set the correct context and arguments of callbacks
                    setup.requestInstance.promise.setFailed(function (f) {
                        f.call(options.caller,returnedData);
                    });

                });
            return setup.promise;
        };

        this.set = function (options) {
            var self = this;
            var setup = setupRequest.call(this, options, _activeCalls);
            if(!setup)
            {
                return new Promise();
            }
            if(!options.method)
            {
                options.method = "POST";
                console.log("Warning no method set for ajax method: " + options.id);
            }
            //call ajax
            $.ajax({
                url: api[options.id],
                method: options.method,
                data: options.data,
                dataType: "json"
            })
                .done(function (data) {
                    // check if we should accept this request
                    if (!shouldCallCallbacks.call(self, _activeCalls, options.id, options.caller,
                            setup.requestInstance, setup.requestedTime)) {
                        return;
                    }

                    // we should accept it so start handling the response
                    // make returned data the data object
                    var returnedData = data.data;
                    // and assume it succeeded
                    var success = true;

                    if(data.error)
                    {
                        // make returned data the error obj and make success false
                        success = false;
                        returnedData = data.error;
                    }

                    // now pass to filter if exist
                    if(options.filterDoneArguments)
                    {
                        // get filter result and make it our new returned data
                        returnedData = options.filterDoneArguments.call(self,success, returnedData);
                    }

                    // now resolve the promise object to call its callbacks passing a filter
                    // to set the correct context and arguments of callbacks
                    setup.requestInstance.promise.setDone(function (f) {
                        f.call(options.caller,success,returnedData);
                    });

                })
                .fail(function (jqXHR, statusMsg) {
                    // check if we should accept this request
                    if(!shouldCallCallbacks.call(self, _activeCalls, options.id, options.caller,
                            setup.requestInstance, setup.requestedTime)) {
                        return;
                    }

                    // we should accept it so start handle the response
                    var returnedData = statusMsg;

                    // pass to filter if exist
                    if(options.filterFailedArguments)
                    {
                        // get filter result and make it our new returned data
                        returnedData = options.filterFailedArguments.call(self,jqXHR, returnedData)
                    }

                    // now set failed promise object to call its callbacks passing a filter
                    // to set the correct context and arguments of callbacks
                    setup.requestInstance.promise.setFailed(function (f) {
                        f.call(options.caller,returnedData);
                    });

                });
            return setup.promise;
        };

        /**
         *
         * @param {number} property_id - id of the property being changed
         * @param {Object} listener - An identifier object that is calling this store function to observer some changes
         * @param {function} callback - function to call when event fires
         * callback has this signature function(failed, data)
         *        -- failed: indicate whether the store was able to fetch and change the property correctly
         *        -- data: holds an error object {id:id, msg:msg} if failed other wise hold the new value
         * @returns {boolean}
         */
        this.onChange = function (property_id, listener, callback) {
            // if callback was not defined or if the listener dont hav identity, then, skip register
            if(callback === null || !(listener instanceof Identity))
                return false;
            _callback = function () {
                callback.apply(listener, Array.prototype.slice.call(arguments))
            };
            //check if given event already exists
            var event = _changeEventListeners[property_id];
            if(event !== undefined)
            {
                //check if this object already have a callback in this event
                if(event.callbacks[listener.getId()] === undefined) {
                    //it is a new listener so lets increment listerners count
                    event.listenersCount++;
                }
                event.callbacks[listener.getId()] = _callback;

            }
            else// event doesnt exist
            {
                //create a callbacks object for the new event
                var callbacks = {};
                //add object's callback to it
                callbacks[listener.getId()] = _callback;
                //add the event
                var event = {listenersCount: 1, callbacks:callbacks};

                _changeEventListeners[property_id] = event;

            }
            //save for fast access on delete
            if(!_listenersWatchedProperties[listener.getId()])
            {
                _listenersWatchedProperties[listener.getId()] = [];
            }
            _listenersWatchedProperties[listener.getId()].push(property_id);

            return true;
        };

        /**
         * Used to unregister object callback from an event.
         * @param {Object} listener - An identifier object that was observing a change
         * @param {number} property_id - The regex object to unregister
         */
        this.unregisterEvent = function (listener, property_id) {
            if(!(listener instanceof Identity))
                return false;

            //check if event exist
            var event = _changeEventListeners[property_id];
            if(event !== undefined)
            {
                //check if the given object have a callback in this event
                if(event.callbacks[listener.getId()] !== undefined)
                {
                    //remove  callback
                    event.callbacks[listener.getId()] = undefined;
                    //decrement callbacks size
                    event.listenersCount--;

                    //check if event callbacks are empty
                    if(event.listenersCount == 0)
                    {
                        //remove the whole event
                        _changeEventListeners[property_id] = undefined;
                    }
                }
            }

            return true;
        };

        /**
         * Used to fire a change event
         * @param {number} property_id - The regex object to unregister
         * @param {boolean} failed - indicate whether the change was successful or not
         * @param {object} data  - Holds the new value or an error object {id:id,msg:msg}
         * @param {?object} execluded  - Dont fire for given listener
         */
        this.fireChange = function (property_id,failed, data, execluded) {
            if(!(execluded instanceof Identity)){
               execluded = stubIdentity;
            }
            var event = _changeEventListeners[property_id];
            if(!event)
                return;

            for(var listener_id in event.callbacks)
            {
                //check if this event has listeners
                var callback = event.callbacks[listener_id];
                if(callback !== undefined && listener_id != execluded.getId())
                {
                    callback(failed, data);
                }
            }
        }

    };


    Store.prototype = new Identity();

    Store.prototype.Errors = {
        UNAUTHORIZED: 1,
        INVALID_INPUT:2,
        NOT_FOUND: 3,
        USER_ID_TAMPERED: 4
    };

    Store.prototype.goToURL = function (url) {
        core.changeURL(url);
    };


    return Store;
});