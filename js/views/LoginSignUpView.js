var BaseView = require('views/BaseView');
var template = require('templates/loginsignup');
var $ = require('jquery');
require('foundation');

module.exports = BaseView.extend({
    initialize: function() {
        $(document).foundation();
        this.$el.append(template());
    }
});