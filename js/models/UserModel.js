var Backbone = require('backbone');
var STRINGS = require('utils/strings');

module.exports = Backbone.Model.extend({
  urlRoot: STRINGS.API.USERS
});