var Fiber = require('fiber');
var _ = require("underscore");
var UserModel = require("models/UserModel");
var LoginView = require('views/LoginView');
var STRINGS = require('utils/strings');

require("cookie");

var LoginManager = Fiber.extend(function () {
  return {
    _model: new UserModel(),
    is_authenticated: false,
    /**
     * Check the cookie and if it is set, set boolean to true
     */
    init: function() {
      if ($.cookie('username')) {
        this.is_authenticated = true;
      }
    },
    /**
     * Check user credentials against server and log the user in upon success
     * Requires username and password in options along with a second parameter which is a callback method
     * @param {object} options contains required parameters
     * @param callback a callback method which excepts a boolean.
     */
    login: function (options, callback) {
      $.ajax({

        url: STRINGS.API.LOGIN,
        data: {
          username: options.username,
          password: options.password
        },
        context: this,
        success: function (data) {
          this.is_authenticated = true;
          this.setUserCookie(options.username);
          callback(true);
        },
        error: function (error) {
          callback(false);
        }
      });
    },
    /**
     * set the user cookie
     * @param username
     */
    setUserCookie: function (username) {
      $.cookie(STRINGS.COOKIE.LOGIN.NAME, username, {path: '/'});
    },
    /**
     * destroy user cookie
     * @param username
     */
    destroyCookie: function (username) {
      $.removeCookie(STRINGS.COOKIE.LOGIN.NAME, {path: '/'});
    },
    /**
     * show login view
     * @param element
     */
    showLoginView: function(element) {
      var loginView = new LoginView({LoginManager: this});
      loginView.render(element);
    }
  };
});

module.exports = new LoginManager();