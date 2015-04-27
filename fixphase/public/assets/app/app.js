requirejs.config({
    baseUrl: '/assets/app',
    paths: {
        jquery: "../lib/jquery/jquery",
        router: "../lib/requirejs-router/router",
        text: "../lib/requirejs-text/text",
        css : "../lib/require-css/css"
    }
});


require(["router","config/routes"], function(router,routes){
    router.registerRoutes(routes);
});