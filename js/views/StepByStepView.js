var BaseView = require('views/BaseView');
var template = require('templates/stepbystep');

module.exports = BaseView.extend({
    initialize: function () {
        this.$el.html(template());
    }
});