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
        'foundation': 'libs/foundation.min',
        'cookie': 'libs/jquery.cookie'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'pianoManager': {
            deps: ['libs/AudioDetect','libs/LoadPlugin','libs/Player','libs/Plugin','libs/DOMLoader.XMLHttp','libs/Event','libs/Queue','libs/Base64','libs/base64binary']
        }

    }
});

/**
 * Upon app entry, start an App Controller
 */
require(['controllers/AppController'], function(AppController) {
    new AppController();
});