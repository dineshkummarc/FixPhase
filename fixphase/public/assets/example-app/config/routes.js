define({
    // matches an exact path
    home: { path: '/', moduleId: 'pages/home/home' },

    todoCreate: { path: '/todo/create', moduleId: 'pages/todoCreate/todoCreate' },

    todoView: { path: '/todo/:id', moduleId: 'pages/todoView/todoView' },


    // matches everything else
    notFound: { path: '*', moduleId: 'page/notFound/notFound' }
});