var BaseView = require('views/BaseView');
var template = require('templates/loginForm');
var $ = require('jquery');
var ValidationManager = require('managers/ValidationManager');
require('foundation');

module.exports = BaseView.extend({
  /**
   * On initialization, an instance of LoginManager must be passed in.
   * @param {object} options contains required parameters
   */
  initialize: function (options) {
    this._LoginManager = options.LoginManager;
    this.$el.append(template());
  },
  events: {
    'click .login': 'login',
    'keypress': 'login'
  },
  /**
   * When a user submits the form, use the LoginManager to check credentials.
   * @param {object} event handler object
   */
  login: function (event) {
    if (event.keyCode !== 13 && event.type !== 'click') {
      return;
    }

    var options = {
      username: this.$el.find('#LoginUserName').val(),
      password: this.$el.find('#password').val()
    };

    this._LoginManager.login(options, _.bind(function (is_authenticated) {
      if (is_authenticated) {
        this.remove();
      }

    }, this));
  }
});
