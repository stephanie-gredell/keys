var Fiber = require('fiber');
var UserModel = require('models/UserModel');
var LoginManager = require('managers/LoginManager');
var $ = require('jquery');
var VideoManager = require('managers/VideoManager');
var STRINGS = require('utils/strings');
require('cookie');

module.exports = Fiber.extend(function() {
  return {
    init: function() {
      VideoManager.showVideo({videoUrl: '//player.vimeo.com/video/119618295'});
    }
  };
});