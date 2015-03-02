var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  render: function ($element) {
    if ($element) {
      $element.append(this.el);
    }


    if (this.afterRender) {
      this.afterRender();
    }
  }
});