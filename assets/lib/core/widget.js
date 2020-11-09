define(["gui"], function (GUI) {
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
     *     exit:[optional]
     *                             A function called each time before component is removed from view. Implementer
     *                             can supply any cod he wants to run on exit here.
     *
     * }
     *
     */
    var Widget = function (data) {
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
        }
        //call parent constructor
        GUI.call(this, data);

    };

    Widget.prototype = new GUI();
    return Widget;
});