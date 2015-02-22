var Backbone = require('backbone');
var template = require('templates/video');
var $ = require('jquery');

module.exports = Backbone.View.extend({
    videoUrl: '//player.vimeo.com/video/119618295',
    events: {
        'click button': '_playButtonPressed'
    },
    render: function () {
        $(this.el).html(template({url: this.videoUrl}));
        $('body').append(this.el);
        this.$player = $('iframe');
        this.url = window.location.protocol + this.$player.attr('src').split('?')[0];
        this.$status = $('.status');
        this._listenMessages();
    },
    _listenMessages: function () {
        if (window.addEventListener) {
            window.addEventListener('message', _.bind(this._onMessageRecieved, this), false);
        }
    },
    _onMessageRecieved: function (e) {
        var data = JSON.parse(e.data);

        switch (data.event) {
            case 'ready':
                this._onReady();
                break;

            case 'playProgress':
                this._onProgress(data.data);
                break;

            case 'pause':
                this._onPause();
                break;

            case 'finish':
                this._onFinish();
                break;
        }
    },
    _onReady: function () {
        this.$status.text('ready');
        this._post('addEventListener', 'pause');
        this._post('addEventListener', 'finish');
        this._post('addEventListener', 'playProgress');
    },
    _onProgress: function (data) {
        this.$status.text(Math.ceil(data.seconds) + 's played out of ' + Math.ceil(data.duration));
    },
    _onPause: function () {
        this.$status.text('paused');
    },
    _onFinish: function () {
        this.$status.text('ready');
    },
    _playButtonPressed: function (e) {
        this.$status.html('play');
    },
    _post: function (action, value) {
        var data = {
            method: action
        };

        if (value) {
            data.value = value;
        }

        var message = JSON.stringify(data);
        this.$player[0].contentWindow.postMessage(message, this.url);
    }
});