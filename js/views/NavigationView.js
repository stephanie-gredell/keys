var Backbone = require('backbone');
var template = require('templates/navigation');
var $ = require('jquery');

module.exports = Backbone.View.extend({
    initialize: function() {
        $('body').html(template({text: "hello"}));
    },
    el: 'body'
});