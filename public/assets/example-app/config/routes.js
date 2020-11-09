define({
    // matches an exact path
    home: {

        //The url path, the (:..) matches any segment and pass it with the same name as
        // object property to the argument object passed to the event callback
        // listening to this url. So in this case 'name' is the property.
        path: '/example/:name',

        //Page module to be loaded on this url
        page: 'pages/home/home',

        // Skeleton tree defines the order of skeletons that should exist before this page
        // is loaded, the tree is an array where order defines ancestry, so for example object
        // at index 2 rquires that object at index 1 be loaded in DOM first, and object at
        // index 1 requires object at index 0, etc...
        // Skeleton tree can be empty if the page should be included in the body tag.
        skeletonTree: ['skeletons/basic/basic']
    },

    todoCreate: {
        path: '/todo/create',
        page: 'pages/todoCreate/todoCreate',
        skeletonTree: ['skeletons/basic/basic']
    },

    todoView: {
        path: '/todo/:id',
        page: 'pages/todoView/todoView',
        skeletonTree: ['skeletons/basic', 'skeletons/nav/nav']
    },


    todoEdit: {
        path: '/todo/:id/edit',
        page: 'pages/todoEdit/todoEdit',
        skeletonTree: ['skeletons/basic', 'skeletons/nav/nav']
    },


    // matches everything else
    notFound: {
        path: '*',
        page: 'pages/notFound/notFound',
        skeletonTree: ['skeletons/basic/basic']
    }
});