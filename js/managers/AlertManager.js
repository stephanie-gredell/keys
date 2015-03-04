var Fiber = require('fiber');
var _ = require("underscore");
var AlertView = require('views/AlertView');

require("cookie");

var LoginManager = Fiber.extend(function () {
  return {
    /**
     * Show an alert view
     * @param {object} element DOM element to append the element to
     * @param {object} options Object of options to pass to the view
     */
    showAlertView: function(element, options) {
      this._view = new AlertView({message: options.message});
      this._view.render(element);

      //add a listener to see when view is removed so you can delete the reference.
      this._view.on('remove', _.bind(function() {
        delete this._view;
      }, this));
    }
  };
});

module.exports = new LoginManager();