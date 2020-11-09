define(['jquery', 'component',"widget", "page"], function($, Component, Widget, Page){

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
     *    injectContainer:[Required]
     *                            A function that returns a Jquery object Div element used to inject other
     *                            pages/skeleton in
     *
     *     exit:[optional]
     *                             A function called each time before component is removed from view. Implementer
     *                             can supply any cod he wants to run on exit here.
     *
     * }
     *
     */
    var Skeleton = function(data) {

        var
            _injectContainer,
            _injectedComponenet,
            _setInjectContainer
            ;

        //make sure that all supplied widgets are of the right object
        if(data){
            if(data.usedWidgets && data.usedWidgets.constructor === Array){
                for(var id in data.usedWidgets)
                {
                    if(!(data.usedWidgets[id] instanceof Widget))
                    {
                        console.error("Widgets supplied to skeleton are not of type [Object Widget]")
                        data.usedWidgets = null;
                        break;
                    }
                }
            }

            if(data.injectContainer){
                _setInjectContainer = data.injectContainer;
            }
        }

        //parent constructor
        Component.call(this, data);


        _injectedComponenet = null;

        this.getInjectContainer = function () {
            return _injectContainer;
        };
        this.getInjectComponent = function () {
            return _injectedComponenet;
        };

        this.setInjectComponent = function (component) {
            _injectedComponenet = component;
        }

        /**
         * Used when the skeleton is about to be inserted to the DOM.
         * Used widgets are implicitly setup.
         */
        this.setup = function () {
            if(this.componentSetup())
            {
                _injectContainer = _setInjectContainer.call(this);
            }
            return false;
        };
    };

    //inherit Component
    Skeleton.prototype= new Component();

    /**
     * Recursively get all elements that needs to be loaded by skeleton.
     * @param {Object} cont - Need to load elements are added by ids
     */
    Skeleton.prototype.supplyNeddedToLoad = function (cont) {
        this.componentSupplyNeddedToLoad(cont);
    };

    /**
     * Inject a component into sekelton
     * @param {Object} componenet - A page/skeleton
     */
    Skeleton.prototype.inject = function (component) {
        if((component instanceof Page) || (component instanceof Skeleton)) {
            if (this.getInjectContainer()) {
                this.setInjectComponent(component);
                this.getInjectContainer().append(component.getContent());
            }
            else {
                console.error("Attempt to inject in a skeleton with no inject container.")
            }
        }
        else{
            console.error("Attempt to inject non skeleton/page object in skeleton.")
        }
    };



    /**
     * Used when the skeleton is  removed from the DOM.
     * Used widgets are implictly exited.
     * @param {Boolean} deep - Indicate whether to continue exiting the injected component even if exit returned false
     */
    Skeleton.prototype.exit = function (deep) {
        //exit the injected componenet
        if(this.componentExit() || deep){
            if(this.getInjectComponent())
                this.getInjectComponent().exit(true);
        }
    };

    return Skeleton;
});