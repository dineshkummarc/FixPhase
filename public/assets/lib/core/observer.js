define([ "core"],function( core){

    //A Mixin
    var Observer = function (){
        var
            _eventsRegistered
            ;

        _eventsRegistered = [];

        this.getRegisterdEventSize = function(){
            return _eventsRegistered.length;
        };
        this.getRegisterdEvent = function (index) {
            return _eventsRegistered[index];
        };

        /**
         * This function is used to observe url changes and match them with the
         * passed regex, if they match the url path, then it calls the callback function.
         * It also saves the successfuly registered event to unregister it later on exit.
         * @param {Object} regex - A regex object used to match with the url
         * @param {Function} callback - A function that will be called when the url match regex
         */
        this.observeURL = function(regex, callback){
            if(core.observeUrl(this, regex, callback))
            {
                _eventsRegistered.push(regex);
            }
        };

        /**
         * Unregister all observed url events
         */
        this.unobserveAll = function () {
            for(var i = 0; i < this.getRegisterdEventSize(); i++)
            {
                core.unobserveURL(this, this.getRegisterdEvent(i));
            }
            _eventsRegistered = [];
        }

    };



    return Observer;
});