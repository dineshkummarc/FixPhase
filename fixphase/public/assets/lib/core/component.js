define(["identity", "core", "jquery"], function(Identity, core, $ ){
    /**
     * Constructor function.
     *
     * @param {Object} data - A data object that should be as follow
     * {
     *      usedWidget:[only if you use any widgets]
     *                             An array of widgets, that will be used by this component. The system ensures
     *                             that the supplied widgets are all setup before calling the setup function of
     *                             the componenet. It also make sure that they are exited before calling the exit
     *                             function of the componenet,
     *
     *     start :
     *                             A function called when component is added to view.
     *
     *     makeContent:[Required]
     *                             A function used to make the DOM content if this component, it returns
     *                             a jquery div holding all elements.
     *
     *     observeURLS: [optional]
     *                            A function where all observe registering should be in.
     *
     *     exit:[optional]
     *                             A function called each time before component is removed from view. Implementer
     *                             can supply any cod he wants to run on exit here.
     *
     * }
     *
     */
    var Component = function(data) {
        //call parent constructor
        Identity.call(this);

        var
            _content,
            _startFunc,
            _exitFunc,
            _active,
            _started,
            _usedWidgets,
            _makeContent
            ;

        _active = false;
        _started = false;
        _usedWidgets = [];
        _startFunc = function () {};
        _exitFunc = function () {};
        _makeContent = function(){};


        //---- Setup Data ----//
        if(data){
            if(data.start)
            {
                _startFunc = data.start;
            }

            if(data.exit){
                _exitFunc = data.exit;
            }

            if(data.makeContent)
            {
                _makeContent = data.makeContent;
            }

            //if userwidget is an array then its element is already checked by children
            if(data.usedWidgets && data.usedWidgets.constructor === Array){
                _usedWidgets = data.usedWidgets;
            }
        }



        //---- Methods ----//
        this.getContent = function () {
            return _content;
        };
        this.isActive = function () {
            return _active;
        };
        this.isStarted = function () {
            return _started;
        }

        /**
         * Recursively get all elements that needs to be loaded by component.
         * @param {Object} cont - Need to load elements are added by ids
         */
        this.componentSupplyNeddedToLoad = function (cont) {
            for(var i in _usedWidgets){
                var widget = _usedWidgets[i];
                cont[widget.getId()] = true;
                widget.supplyNeddedToLoad(cont);
            }
        };

        /**
         * This function is used to setup the component before it is inserted to view.
         * It takes care of setting up widgets used by this view before calling its
         * start function.
         */
        this.componentSetup = function(){
            //skip if already active
            if(this.isActive())
                return false;

            //setup widgets
            for(var i in _usedWidgets) {
                _usedWidgets[i].setup();
            }

            // makeDOM
            _content = _makeContent.call(this);
            _active = true;
            if(!_content)
            {
                _content = $("<div>");
            }

            return true;
        };


        /**
         * Call the start function of the component. This is called after the component
         * is in view.
         */
        this.start = function(){

            //skip if not active
            if(!this.isActive())
                return false;

            // skip if already started
            if(this.isStarted())
                return false;

            //start widgets
            for(var i in _usedWidgets) {
                _usedWidgets[i].start();
            }

            //call childred
            this.childStart();

            _started = true;
            //call supplied onsetup
            _startFunc.call(this);

        };

        //stub
        this.childStart = function () {

        };
        /**
         * This function is used to exit the component before it is removed.
         * It takes care of exiting  widgets used by this view before calling supplied exit function.
         */
        this.componentExit = function () {
            //skip if already not active
            if(!this.isActive())
                return false;

            //if exit called but this view will be inserted in the next view then detach content and stay still
            if(core.isInNextView(this))
            {
                if(this.getContent())
                    this.getContent().detach();

                return false;
            }

            //exit widgets
            for(var i in _usedWidgets) {
                _usedWidgets[i].exit();
            }


            //set inactive when finishing user exit function
            _active = false;
            _started = false;

            //call the user specified exit function
            _exitFunc.call(this);

            //remove
            if(_content)
            {
                _content.remove();
                _content = null;
            }

            return true;
        };

    };

    Component.prototype = new Identity();


    return Component;
});