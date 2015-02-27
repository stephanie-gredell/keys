var Fiber = require('fiber');
var _ = require("underscore");

var LoginManager = Fiber.extend(function () {
  return {
    login: function () {
      console.log('logged in');
    }
  };
});

module.exports = new LoginManager();