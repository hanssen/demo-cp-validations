import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('user');
  },

  actions: {
    willTransition() {
      const model = this.controller.get('model');

      model.rollbackAttributes();
      this.controller.set('didValidate', false);
    }
  }
});
