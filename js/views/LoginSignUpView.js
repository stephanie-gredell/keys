var Backbone = require('backbone');
var template = require('templates/loginsignup');
var $ = require('jquery');
require('foundation');

module.exports = Backbone.View.extend({
    initialize: function() {
        $(document).foundation();
        $(this.el).append(template());
    }
});