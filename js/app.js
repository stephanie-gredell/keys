require.config({
    baseUrl: 'js',
    paths: {
        'jquery': 'libs/jquery-2.1.3',
        'backbone': 'libs/backbone',
        'underscore': 'libs/underscore',
        'fiber': 'libs/fiber',
        'handlebars.runtime': 'libs/handlebars.amd',
        'templates': '../templates',
        'pianoManager': 'managers/PianoManager',
        'JMB': 'libs/JazzMIDIBridge'
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

require(['views/NavigationView', 'views/PianoView','jquery'], function(NavigationView, PianoView,$) {

    new NavigationView();
    var pianoView = new PianoView();
    pianoView.render();
    $('body').append(pianoView.el);
});