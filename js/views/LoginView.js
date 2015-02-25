var Backbone = require('backbone');
var template = require('templates/loginForm');
var $ = require('jquery');
require('foundation');

module.exports = Backbone.View.extend({
    initialize: function() {
        $(this.el).append(template());
    }
});