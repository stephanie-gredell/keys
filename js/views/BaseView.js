var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  render: function ($element) {
    $element.append(this.el);

    if (this.afterRender) {
      this.afterRender();
    }
  }
});