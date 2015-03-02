var Fiber = require('fiber');
var _ = require("underscore");

var ValidationManager = Fiber.extend(function () {
  return {
    /**
     * validate a user's email to make sure it is formatted correctly
     * @param {string} email a user's email address
     * @returns {boolean}
     */
    validateEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  };
});

module.exports = new ValidationManager();