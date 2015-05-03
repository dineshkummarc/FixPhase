define(["events", "identity","jquery", "router"], function(events, Identity, $, router){
    //Variable declaration
    var
        activeSkeletonTree,
        activePage,
        nextView,


        inject,
        injectPage,
        sameTree,
        needsReload,
        reload,
        updateNextView,
        isInNextView,
        finishLoad,


        onRouteLoad,
        observeUrl,
        unobserveURL,
        changeURL
    ;

    activeSkeletonTree = [];
    activePage = null;
    //hold componenets used in next view
    nextView = {};

    /**
     * Handle injecting the page into the right loation, called when all required skeletons are in place
     * @param {Object} page
     */
    injectPage = function(page){
        if(activePage) {
            activePage.exit();
        }
        page.setup();
        if(activeSkeletonTree.length == 0) {
                $("body").empty().append(page.getContent());
        }
        else {
            activeSkeletonTree[activeSkeletonTree.length-1].inject(page);
        }
        activePage = page;
    };

    /**
     * Handle injecting & setting up the given page/skeleton into the given skeleton.
     * @param {Object} skeleton
     * @param {Object} other - A page or a skeleton
     */
    inject = function(skeleton, other){
        if(!skeleton) {
            if(other) {
                other.setup();
                $("body").empty().append(other.getContent());
            }
        }
        else {
            if(other){
                other.setup();
                skeleton.inject(other);
            }
        }
    };

    /**
     * Check if two trees are the same [just array equality]
     * @param {Array} tree
     * @param {Array} otherTree
     */
    sameTree = function (tree, otherTree) {
        if(otherTree === null || tree === null)
        {
            return false;
        }
        if(tree.length != otherTree.length)
            return false;

        for(var i = 0; i < tree.length; i++)
        {
            if(tree[i] !== otherTree[i])
                return false;
        }

        return true;
    };

    /**
     * Checks if we need a reload given new page and new tree
     * @param {Object} newPage
     * @param {Array} newTree
     */
    needsReload = function (newPage, newTree) {
        return !sameTree(activeSkeletonTree, newTree) || (newPage !== activePage);
    };


    /**
     * Handles reloading the app view.
     * @param {Array} newSkeletonTree
     * @param {Object} newPage
     */
    reload = function (newSkeletonTree, newPage) {
        //if trees are the same handle page and exit
        if(sameTree(activeSkeletonTree, newSkeletonTree))
        {
            injectPage(newPage);
        }
        else{

            //get first difference between activeTree and newtree
            var first = 0;
            if(newSkeletonTree) {
                while (activeSkeletonTree[first] === newSkeletonTree[first]) {
                    first++;
                }
            }

            // call a deep exit (which exit recursively all elements in skeleton, element is exited only of not
            // in nextView) on the first mismatch
            if( first < activeSkeletonTree.length)
            {
                activeSkeletonTree[first].exit(true);
            }


            //if we have skeletons in the skeletonTree, start injecting them
            if(newSkeletonTree){
                //lets setup the skeletons from the first mismatch, before missmatch should be left in place
                for(var i = first; i < newSkeletonTree.length; i++)
                {
                    inject(newSkeletonTree[i-1], newSkeletonTree[i]);

                }
            }

            activeSkeletonTree  = newSkeletonTree ? newSkeletonTree:[];

            injectPage(newPage);

            //start all skeletons
            for(var i = 0; i < newSkeletonTree.length; i++)
            {
                newSkeletonTree[i].start();

            }
        }
        //start page
        newPage.start();
        finishLoad();
    };

    /**
     * This function is used to mark all elements needed in nextView. This aids in keeping alive marked elements
     * needed in next view from being removed, and setting up non alive marked elements needed in next view.
     * @param {Object} page
     * @param {Array} skeletonTree
     */
    updateNextView = function (page, skeletonTree) {
        //add skeletons
        for(var i in skeletonTree)
        {
            var skeleton = skeletonTree[i]
            //add skeleton it self as needed in nextview
            nextView[skeleton.getId()] = true;
            //add elements needed in next view
            skeleton.supplyNeddedToLoad(nextView);
        }
        //add page it self as needed  in next view
        nextView[page.getId()] = true;
        //add elements needed in next view
        page.supplyNeddedToLoad(nextView);


    };

    /**
     * Clearing next view items indicating load already finished
     */
    finishLoad = function () {
        nextView = {};
    };

    /**
     * Check if the component supplied is going to be in the next view
     * @param {Object} component

     */
    isInNextView = function (component) {
        return nextView[component.getId()];
    };

    /**
     * Handle route load events. It change the document as required and fire url change events.
     * @param {Object} skeletonTree
     * @param {Object} page
     * @param {String} url - the whole url caused load
     * @param {String} urlPath - the url path only without arguments
     * @param {Object} arg - the query arguments + catched (:) arguments
     */
    onRouteLoad = function(skeletonTree, page,url,urlPath, arg) {
        //check if we need to make reload by changing current browser content
        if(needsReload(page, skeletonTree)) {
            //get componenets that will exist in next view so as not to trigger exit on them
            updateNextView(page, skeletonTree);

            reload(skeletonTree, page);

        }
        //fire url event
        events.fireEvent(url, urlPath, arg );
    };

    /**
     * Used to observe urls by registering observe events in the events object.
     * @param {Object} obj - An Identity object or one of its descendants.
     * @param {Object} regex - A regex object
     * @param {Function} callback - a function to call when event occurs
     */
    observeUrl = function(obj, regex, callback)
    {
        // Check if this is an object that can observe events
        if(obj instanceof Identity){
            //create a new callback to call the original callback with this = obj
            var built_call = function(){

                callback.apply(obj, arguments);
            };
            return events.registerEvent(obj.getId(), regex, built_call);
        }
        return false;

    };

    /**
     * Used to unobserve url changes by removing observe events from the events object.
     * @param {Object} obj - An Identity object or one of its descendants.
     * @param {Object} regex - A regex object
     */
    unobserveURL = function(obj, regex)
    {
        if(obj instanceof Identity){
            events.unregisterEvent(obj.getId(), regex);
        }
    };

    /**
     * Used to change the browser url without reloading the page
     * @param {String} url - A relative url to go to.
     */
    changeURL = function (url) {
        //first change brwoser url
        history.pushState(null,null,url);
        //then manually trigger a popstate event
        window.dispatchEvent(new Event('popstate') );
    };


    //public api
    return {
        onRouteLoad: onRouteLoad,
        observeUrl: observeUrl,
        unobserveURL: unobserveURL,
        changeURL: changeURL,
        isInNextView: isInNextView

    }
});