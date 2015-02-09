var Backbone = require('backbone');
var template = require('templates/piano');
var $ = require('jquery');
var PianoManager = require('managers/PianoManager');

module.exports = Backbone.View.extend({
    _PianoManager: new PianoManager(),
    initialize: function () {
        $('body').append(template());
    },
    events: {
        'click #piano': 'clickedKey'
    },
    clickedKey: function (event) {
        console.log(event);
        var note = $(event.target).data('note');
        this._PianoManager.playNote(note);
    },
    el: 'body'
});