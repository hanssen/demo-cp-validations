import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    // show initial validation errors for edit form
    if (!this.get('model').get('isNew')) {
      this.set('validationError', this.get('validation'));
    }
  },

  /**
   * Observe validation information for attribute and models revalidate trigger
   *
   * The `validation` is set via component parameter to V-Get Helper Module message of current attribute.
   * The `model.revalidate` will be updated by `new` route, when manual save attempt failed due validation error.
   */
  observeValidationError: Ember.observer('validation', 'model.revalidate', function() {
    this.set('validationError', this.get('validation'));
  })
});
