var BaseView = require('views/BaseView');
var template = require('templates/video');
var $ = require('jquery');

module.exports = BaseView.extend({
  events: {
    'click button': '_playButtonPressed'
  },
  initialize: function (options) {
    $(this.el).html(template({url: options.videoUrl}));
  },
  afterRender: function () {
    this.$player = $('iframe');
    this.url = window.location.protocol + this.$player.attr('src').split('?')[0];
    this.$status = $('.status');

    window.addEventListener('message', _.bind(this._onMessageReceived, this), false);
  },
  _onMessageReceived: function (e) {
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
    this.trigger('videoReady');
    //this.$status.text('ready');
    this._post('addEventListener', 'pause');
    this._post('addEventListener', 'finish');
    this._post('addEventListener', 'playProgress');
  },
  _onProgress: function (data) {
    this.$status.text(Math.ceil(data.seconds) + 's played out of ' + Math.ceil(data.duration));
  },
  _onPause: function () {
    this.trigger('videoPause');
    this.$status.text('paused');
  },
  _onFinish: function () {
    this.trigger('videoFinish');
    this.$status.text('ready');
  },
  _playButtonPressed: function (e) {
    this.trigger('videoStart');
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