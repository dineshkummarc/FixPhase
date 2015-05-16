define([],function () {


    var Promise = function () {
        var _doneFunc, _failedFunc;
        var _done = false, _failed = false;
        var _doneFilter, _failedFilter;

        /**
         * Execute the given function(s) when the promise is done
         * @param [Object] func - A function or array  of functions
         */
        this.done = function (func) {
            //if promise faild then do nothing
            if(_failed)
                return this;

            //make sure we have an array of functions
            var funcArr;
            if(func.constructor === Array)
            {
                funcArr = func;
            }
            else
            {
                funcArr = [func];
            }

            // if promise is done then we dont need to save the given functions
            // we just need to execute them
            if(_done)
            {
                for(var i in funcArr)
                {
                    _doneFilter(funcArr[i]);
                }
            }
            else //we need to add to stored functions
            {
                _doneFunc = funcArr.concat(_doneFunc ? _doneFunc:[]);
            }

            return this;
        };

        /**
         * Execute the given function(s) when the promise fails
         * @param [Object] func - A function or array  of functions
         */
        this.fail = function (func) {
            //if promise is done then do nothing
            if(_done)
                return this;

            //make sure we have an array of functions
            var funcArr;
            if(func.constructor === Array)
            {
                funcArr = func;
            }
            else
            {
                funcArr = [func];
            }

            // if promise failed then we dont need to save the give functions
            // we just need to execute them
            if(_failed)
            {
                for(var i in funcArr)
                {
                    _failedFilter(funcArr[i]);
                }
            }
            else //we need to store
            {
                _failedFunc = funcArr.concat(_failedFunc?_failedFunc:[]);
            }

            return this;
        };

        /**
         * Indicates that this promise is done. When a promise is done you cant change its state.
         * @param {function} filter - A function that will be passed every function, this function should call
         * the passed functions it self, passed function are all the functions registered to this promise.
         */
        this.setDone = function(filter){
            _done = true;
            _doneFilter = filter ? filter: function(f){f();};
            //execute the done functions
            for(var i in _doneFunc)
            {
                _doneFilter(_doneFunc[i]);
            }
            //remove saved functions
            _doneFunc = null;
            _failedFunc = null;
            _failedFilter = null;
        }

        /**
         * Indicates that this promise has failed. When a promise has failed you cant change its state.
         * @param {function} filter - A function that will be passed every function, this function should call
         * the passed functions it self, passed function are all the functions registered to this promise.
         */
        this.setFailed = function(filter){
            _failed = true;
            _failedFilter = filter ? filter: function(f){f();};
            //execute the fail functions
            for(var i in _failedFunc)
            {
                _failedFilter(_failedFunc[i]);
            }
            //remove saved functions
            _doneFunc = null;
            _failedFunc = null;
            _doneFilter = null;
        };


        /**
         * Same as set failed but don't change the state of the promise nor delete its functions so it can
         * be reused later
         * @param {function} filter - A function that will be passed every function, this function should call
         * the passed functions it self, passed function are all the functions registered to this promise.
         */
        this.simulateFailed = function(filter ){
            _failedFilter = filter ? filter: function(f){f();};
            //execute the fail functions
            for(var i in _failedFunc)
            {
                _failedFilter(_failedFunc[i]);
            }
        };
    };

    return Promise;
});
