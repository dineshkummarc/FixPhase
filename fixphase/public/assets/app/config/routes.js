define({
    // matches an exact path
    home: {

        //The url path, the (:..) matches any segment and pass it with the same name as
        // object property to the argument object passed to the event callback
        // listening to this url. So in this case 'name' is the property.
        path: '/',

        //Page module to be loaded on this url
        page: 'pages/home/home',

        // Skeleton tree defines the order of skeletons that should exist before this page
        // is loaded, the tree is an array where order defines ancestry, so for example object
        // at index 2 rquires that object at index 1 be loaded in DOM first, and object at
        // index 1 requires object at index 0, etc...
        // Skeleton tree can be empty if the page should be included in the body tag.
        skeletonTree: ['skeletons/basic/basic']
    },

    info: {
        path: '/project/:pid',
        page: 'pages/projectInfo/projectInfo',
        skeletonTree: ['skeletons/basic/basic', 'skeletons/nav/nav']
    },

    defects: {
        path: '/project/:pid/defects',
        page: 'pages/defects/defects' ,
        skeletonTree: ['skeletons/basic/basic', 'skeletons/nav/nav']
    },


    defectCreate: {
        path: '/project/:pid/defect/create',
        page: 'pages/defectCreate/defectCreate',
        skeletonTree: ['skeletons/basic/basic', 'skeletons/nav/nav']
    },

    defectView: {
        path: '/project/:pid/defect/:did',
        page: 'pages/defectView/defectView' ,
        skeletonTree: ['skeletons/basic/basic', 'skeletons/nav/nav']
    },

    graphs: {
        path: '/project/:pid/graphs',
        page: 'pages/graphs/graphs' ,
        skeletonTree: ['skeletons/basic/basic', 'skeletons/nav/nav']
    },

    // matches everything else
    notFound: {
        path: '*',
        page: 'pages/notFound/notFound' ,
        skeletonTree: ['skeletons/basic/basic']
    }
});