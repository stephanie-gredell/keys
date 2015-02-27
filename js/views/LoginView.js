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
    'click .login': 'clickLogin'
  },
  clickLogin: function () {
    if (ValidationManager.validateEmail(this.$el.find('#LoginUserName').val())) {
      LoginManager.login();
    }
  }
});
