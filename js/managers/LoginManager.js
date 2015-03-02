var Fiber = require('fiber');
var _ = require("underscore");
var UserModel = require("models/UserModel");
var jCookie = require("cookie");

var LoginManager = Fiber.extend(function () {
  return {
    _model: new UserModel(),
    login: function (options, callback) {
      $.ajax({
        is_authenticated: false,
        url: 'http://localhost:3000/api/login',
        data: {
          username: options.username,
          password: options.password
        },
        context: this,
        success: function (data) {
          this.is_authenticated = true;
          this.destroyCookie(options.username);
          callback(true);
        },
        error: function (error) {
          callback(false);
        }
      });
    },
    setUserCookie: function (username) {
      $.cookie('username', username, {expires: 7, path: '/'});
    },
    destroyCookie: function (username) {
      $.removeCookie('username', {path: '/'});
    }
  };
});

module.exports = new LoginManager();