requirejs.config({
    baseUrl: '/assets/app',
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    },
    paths: {
        jquery: "../lib/jquery/jquery",
        "jquery-ui": "../lib/jquery-ui/ui",
        spin: "../lib/spin/spin",

        text: "../lib/requirejs-text/text",
        css : "../lib/require-css/css",
        "bootstrap-css":"../lib/bootstrap/css/bootstrap",
        "bootstrap":"../lib/bootstrap/js/bootstrap",
        smoothness: "../lib/jquery-ui/themes/smoothness/jquery-ui",


        //config
        routes: "config/routes",
        api: "config/api",

        //framework
        identity: "../lib/core/identity",
        core: "../lib/core/core",
        router: "../lib/core/router",
        events: "../lib/core/events",
        observer: "../lib/core/observer",
        component: "../lib/core/component",
        skeleton: "../lib/core/skeleton",
        gui: "../lib/core/gui",
        page: "../lib/core/page",
        widget: "../lib/core/widget",
        store: "../lib/core/store",
        promise: "../lib/core/promise"

    }
});


require(["core","router","routes","bootstrap","css!bootstrap-css"], function(core,router,routes){
    //Register the routes in the router library
    router.registerRoutes(routes);

    //Set the method that will handle all url change events
    router.on("routeload", core.onRouteLoad);

    //initialize the router library to fire the first event
    router.init();
});