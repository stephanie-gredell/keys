var Backbone = require('backbone');
var template = require('templates/stepbystep');

module.exports = Backbone.View.extend({
    render: function () {
        $(this.el).html(template());
    }
});