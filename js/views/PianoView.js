var Backbone = require('backbone');
var template = require('templates/piano');
var $ = require('jquery');
var PianoManager = require('managers/PianoManager');

module.exports = Backbone.View.extend({
    initialize: function () {
        $('body').append(template());
        this._PianoManager = new PianoManager();
    },
    events: {
        'click #piano': 'clickedKey'
    },
    clickedKey: function (event) {
        console.log(event);
        var note = $(event.target).data('note');
    },
    el: 'body'
});