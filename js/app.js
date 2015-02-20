require.config({
    baseUrl: 'js',
    paths: {
        'jquery': 'libs/jquery-2.1.3',
        'backbone': 'libs/backbone',
        'underscore': 'libs/underscore',
        'fiber': 'libs/fiber',
        'handlebars.runtime': 'libs/handlebars.amd',
        'templates': '../templates',
        'pianoManager': 'managers/PianoManager'
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

require(['views/NavigationView', 'views/PianoView','jquery', 'views/VideoView'], function(NavigationView, PianoView,$, VideoView) {

    new NavigationView();
    var pianoView = new PianoView();
    var videoView = new VideoView();
    videoView.render();
    pianoView.render();
    $('body').append(pianoView.el);
    $('body').append(videoView.el);
});