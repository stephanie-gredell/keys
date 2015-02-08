require.config({
    baseUrl: 'js',
    paths: {
        'jquery': 'libs/jquery-2.1.3',
        'backbone': 'libs/backbone',
        'underscore': 'libs/underscore',
        'fiber': 'libs/fiber',
        'handlebars.runtime': 'libs/handlebars.amd',
        'templates': '../templates'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require(['views/NavigationView'], function(NavigationView) {
    new NavigationView();
});