var Fiber = require('fiber');
var UserModel = require('models/UserModel');
var LoginManager = require('managers/LoginManager');
var $ = require('jquery');
var PianoManager = require('managers/PianoManager');
var STRINGS = require('utils/strings');
require('cookie');

module.exports = Fiber.extend(function() {
  return {
    _userModel: new UserModel(),
    /**
     * On init, check if the user's cookie is set
     * If it is, start the app else show loginView
     */
    init: function() {
      if (!$.cookie(STRINGS.COOKIE.LOGIN.NAME)) {
        LoginManager.showLoginView($('body'));
      } else {
        PianoManager.renderPianoView();
      }
    }
  };
});