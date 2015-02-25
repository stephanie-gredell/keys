var Backbone = require('backbone');
var template = require('templates/signupForm');
var $ = require('jquery');
require('foundation');

module.exports = Backbone.View.extend({
    initialize: function() {
        $(this.el).append(template());
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