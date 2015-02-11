var Backbone = require('backbone');
var template = require('templates/piano');
var $ = require('jquery');
var PianoManager = require('managers/PianoManager');
var EventBus = require("eventBus");

module.exports = Backbone.View.extend({
    initialize: function () {
        EventBus.on('key_played', this._playKey, this);
        $(document).on('keydown', this.connectKeyboard);
        $(document).on('keyup', this.connectKeyboard);

        new PianoManager();
    },
    events: {
        'mousedown #piano': 'clickPlay',
        'mouseup #piano': 'clickRelease'
    },
    render: function () {
        $(this.el).html(template());
    },
    _playKey: function (msg) {
        var eventType = msg.command == 144 ? 'input' : 'output';

        if (eventType === 'input') {
            this.$el.find('[data-note=\'' + msg.data1 + '\']').addClass('active');
        } else {
            this.$el.find('[data-note=\'' + msg.data1 + '\']').removeClass('active');
        }

    },
    connectKeyboard: function (event) {
        EventBus.trigger('keyboard_play', event);
    },
    clickPlay: function (event) {
        var note = $(event.target).data('note');
        EventBus.trigger('mouse_play', note);
    },
    clickRelease: function(event) {
        var note = $(event.target).data('note');
        EventBus.trigger('mouse_release', note);
    },
    id: "piano-wrapper"
});