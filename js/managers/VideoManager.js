var Fiber = require('fiber');
var _ = require('underscore');
var VideoView = require('views/VideoView');
var StepByStepView = require('views/StepByStepView');

var PianoManager = Fiber.extend(function () {
  return {
    showVideo: function(options) {
      this._view = new VideoView({videoUrl: options.videoUrl});
      this._view.render($('#video_box'));

      this._view.on('videoFinish', this.videoFinish);
    },
    videoFinish: function() {
      this._stepsView = new StepByStepView();
      this._stepsView.render($('#video_steps'));
    }
  };
});

module.exports = new PianoManager();