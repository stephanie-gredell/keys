var BaseView = require('views/BaseView');
var template = require('templates/loginForm');
var $ = require('jquery');
var ValidationManager = require('managers/ValidationManager');
var LoginManager = require('managers/LoginManager');
require('foundation');

module.exports = BaseView.extend({
  initialize: function () {
    this.$el.append(template());
  },
  events: {
    'click .login': 'login',
    'keypress': 'login'
  },
  login: function (event) {
    if (event.keyCode !== 13) {
      return;
    }
    var options = {
      username: this.$el.find('#LoginUserName').val(),
      password: this.$el.find('#password').val()
    };

    LoginManager.login(options, _.bind(function (is_authenticated) {
      this.remove();
    }, this));
  }
});
