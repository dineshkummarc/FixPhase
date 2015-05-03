define(["observer", "core", "component", "store"],
function(Observer, core, Component, Store){
    /**
     * Constructor function.
     *
     * @param {Object} data - A data object that should be as follow
     * {
     *      usedStores: [only if you use any stores]
     *                             An array of used stores, this makes sure that the store is up and running
     *                             before calling the setup function, also it makes sure that the store is
     *                             cleaned when not needed.
     *
     *      usedWidget:[only if you use any widgets]
     *                             An array of widgets, that will be used by this component. The system ensures
     *                             that the supplied widgets are all setup before calling the setup function of
     *                             the componenet. It also make sure that they are exited before calling the exit
     *                             function of the componenet,
     *
     *     start : [Optional if you want to fetch and show data when the page start maybe]
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
    var GUI = function(data){
        //mixin
        Observer.call(this);

        //call parent constructor
        Component.call(this,data);

        var
            _usedStores,
            _observe
        ;

        _usedStores = [];
        _observe = function () {};
        var setStores = false;
        if(data)
        {
            if(data.usedStores && data.usedStores.constructor === Array)
            {
                setStores = true;
                for(var id in data.usedStores){
                    if(!(data.usedStores[id] instanceof Store))
                    {
                        setStores = false;
                        console.error("Used stores of a gui contains an element not of type store.");
                        break;
                    }
                }

            }

            if(data.observeURLS)
            {
                _observe = data.observeURLS;
            }
        }
        if(setStores)
        {
            _usedStores = data.usedStores;
        }

        /**
         * Recursively get all elements that needs to be loaded by component.
         * @param {Object} cont - Need to load elements are added by ids
         */
        this.supplyNeddedToLoad = function (cont) {
            //supply stores used by this gui
            for(var i in _usedStores){
                cont[_usedStores[i].getId()] = true;
            }

            //then get all widgets and call supplyNeededToLoad on them.
            this.componentSupplyNeddedToLoad(cont);

        };

        /**
         * This function is used to setup the element before it is inserted to view.
         * It takes care of setting up widgets/stores used by this view before calling its setup function.
         */
        this.setup = function(){
            //check base setup, if it passed it will setup all widgets
            if(this.componentSetup())
            {
                //setup stores
                for(var i in _usedStores){
                    _usedStores[i].setup();
                }
                return true;
            }
            return false;
        };

        /**
         * This function is used to exit the element before it is removed.
         * It takes care of exiting  widgets used by this view after calling supplied exit function.
         */
        this.exit = function () {
            if(this.componentExit())
            {
                //remove all observe events
                this.unobserveAll();

                //exit stores
                for(var i in _usedStores){
                    _usedStores[i].exit();
                }

                return true;
            }

            return false;
        };

        /**
         * Called before calling the on start method.
         */
        this.childStart = function () {
            _observe.call(this);
        }

    };

    //Setting inheritance
    GUI.prototype = new Component();


    /**
     * This function is used to change the url of the browser without triggring a
     * page reload. The url should be a relative path, when it starts with "/" then
     * it will replace every thing after the domain name, otherwise it will replace the last
     * segment of the url.
     * Example:
     * The browser is at  "www.my.com/kl/m"
     * if url = "/test/link" -> browser will be at "www.my.com/test/link".
     * if url = "test/link" -> browser will be at "www.my.com/kl/test/link"
     * @param {string} url - A relative url path
     */
    GUI.prototype.goToURL = function (url) {
        core.changeURL(url);
    };





    return GUI;
});