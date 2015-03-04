var BaseView = require('views/BaseView');
var template = require('templates/alert');

module.exports = BaseView.extend({
  className: 'alert',
  events: {
    'click .close': 'closeAlert'
  },
  initialize: function(options) {
    this.$el.append(template({message: options.message}));
  },
  closeAlert: function() {
    this.$el.fadeOut("slow", _.bind(function() {
      this.remove();
    }, this));

  },
  changeText: function(text) {
    this.$el.find('.alert_text').text(text);
  }
});