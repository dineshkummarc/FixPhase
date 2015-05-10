define([], function() {
    var
        events,
        registerEvent,
        unregisterEvent,
        fireEvent,
        callbacksSize
    ;

    events = {};
    callbacksSize = "_size_of_OBjECt";

    /**
     * Used to register an object callback to an event.
     * Events are fired when the event regex match the current url.
     * @param {number} id - The id of the object that register the event
     * @param {Object} regex - A regex object that will be used to match the current url
     * @param {function} callback - A function to be called when event occurs, it takes
     * 2 arguments (url,urlpath, arg) where url contains the url the triggered the event,
     * urlpath contains the url path only & arg contains list of arguments found in the url.
     */
    registerEvent = function (id, regex, callback) {
        // if callback was not defined then skip register
        if(callback === null)
            return false;

        //check if given event already exist
        var event = events[regex];
        if(event !== undefined)
        {
            //check if this object already have callbacks in this event
            if(event.callbacks[id] === undefined) {
                //it is a new object, so we increment event callbacks size
                event[callbacksSize]++;
            }
            event.callbacks[id] = callback;

        }
        else// event doesnt exist
        {
            //create a callbacks object for the new event
            var callbacks = {};
            //add object's callback to it
            callbacks[id] = callback;
            //add the event
            var event = {reg: regex, callbacks:callbacks};
            //set callbacks of this event to 1
            event[callbacksSize] = 1;

            events[regex] = event;

        }

        return true;
    };

    /**
     * Used to unregister object callback from an event.
     * @param {number} id - The id of the object that registered the event
     * @param {Object} regex - The regex object to unregister
     */
    unregisterEvent = function (id, regex) {
        //check if event exist
        var event = events[regex];
        if(event !== undefined)
        {
            //check if the given object have a callback in this event
            if(event.callbacks[id] !== undefined)
            {
                //remove  callback
                event.callbacks[id] = undefined;
                //decrement callbacks size
                event[callbacksSize]--;

                //check if event callbacks are empty
                if(event[callbacksSize] == 0)
                {
                    //remove the whole event
                    events[regex] = undefined;
                }
            }
        }
    };

    /**
     * Used to fire an event. So it go over all regsitered events
     * Events are fired when the event regex match the current url.
     * @param {String} url - the whole url
     * @param {String} urlPath -url path only without query arguments.
     * @param {Object} arg - This object contains all catched argument and query argumen of the
     * url.
     */
    fireEvent = function(url, urlPath, arg){
        for(var event_key in events)
        {
            var event = events[event_key];
            if(event !== undefined)
            {
                //check if the event regex match the current url
                if(event.reg.exec(urlPath))
                {
                    //loop over all registered callbacks and call them
                    for(var obj_id in event.callbacks){
                        var callback = event.callbacks[obj_id];
                        if(callback !== undefined)
                        {
                            callback(url, urlPath, arg);
                        }
                    }
                }
            }
        }
    }

    return {
        registerEvent: registerEvent,
        unregisterEvent: unregisterEvent,
        fireEvent: fireEvent
    };
});