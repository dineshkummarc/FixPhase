define(["jquery", "observer", "identity", "core"], function ($, observer, Identity, core) {



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
            _ajax
            ;
        _active = false;
        _setupFunc = function () {};
        _exitFunc = function () {};

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

            if(data.ajaxMethods){
                for(var func in data.ajaxMethods){

                }
            }
        }

        //--- Explicit methods ---//

        this.isActive = function () {
            return _active;
        };

        this.setup = function () {
            //if already active skip
            if(this.isActive())
            {
                return false;
            }
            _active = true;
            _setupFunc.call(this);
            return true;
        }

        this.exit = function () {
            //if already exit skip
            if(!this.isActive())
            {
                return false;
            }

            //if exit called but this needed in next view then skip
            if(core.isInNextView(this))
            {
               return false;
            }

            _active = false;

            //remove all observe events
            this.unobserveAll();

            _exitFunc.call(this);
            return true;
        }

    };




    Store.prototype = new Identity();


});