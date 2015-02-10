var Backbone = require('backbone');
var template = require('templates/piano');
var $ = require('jquery');
var PianoManager = require('managers/PianoManager');
var EventBus = require("eventBus");

module.exports = Backbone.View.extend({
    initialize: function () {
        EventBus.on('key_played', this._playKey, this);
        $('body').append(this.el);
        new PianoManager();
    },
    render: function() {
        this.$el.append(template());
    },
    _playKey: function(msg) {
        var eventType = msg.command == 144 ? 'input' : 'output';

        if (eventType === 'input') {
            this.$el.find('[data-note=\'' + msg.data1 + '\']').addClass('active');
        } else {
            this.$el.find('[data-note=\'' + msg.data1 + '\']').removeClass('active');
        }

    },
    id: "piano-wrapper"
});