var BaseView = require('views/BaseView');
var template = require('templates/navigation');
var $ = require('jquery');

module.exports = BaseView.extend({
    initialize: function() {
        this.$el.append(template({text: "hello"}));
    },
    el: 'body'
});