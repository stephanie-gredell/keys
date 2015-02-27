var BaseView = require('views/BaseView');
var template = require('templates/loginForm');
var $ = require('jquery');
require('foundation');

module.exports = BaseView.extend({
    initialize: function() {
        this.$el.append(template());
    }
});