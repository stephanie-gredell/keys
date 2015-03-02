var Fiber = require('fiber');
var _ = require("underscore");
var EventBus = require("eventBus");
var PianoView = require("views/PianoView");

var PianoManager = Fiber.extend(function () {
  return {
    input: null,
    output: null,
    renderPianoView: function() {
      var pianoView = new PianoView();
      pianoView.render();
    }
  };
});

module.exports = new PianoManager();