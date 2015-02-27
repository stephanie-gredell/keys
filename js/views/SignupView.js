var BaseView = require('views/BaseView');
var template = require('templates/signupForm');
var $ = require('jquery');
require('foundation');

module.exports = BaseView.extend({
    initialize: function() {
        this.$el.append(template());
    },
    events: {
        'click .button': 'signUpClick',
        'click .login': 'loginClick'
    },
    signUpClick: function() {
        console.log('sign me up!');
    },
    loginClick: function() {
        console.log('login click');
    }
});