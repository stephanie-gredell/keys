var Backbone = require('backbone');
var template = require('templates/video');

module.exports = Backbone.View.extend({
    render: function () {
        $(this.el).html(template({url: 'https://www.youtube.com/embed/Y_ebOg8oCTw'}));
    }
});