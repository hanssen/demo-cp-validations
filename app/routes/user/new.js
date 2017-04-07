import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('user');
  },

  actions: {
    save(user) {
      user.save().then(() => this.transitionTo('user.index'));
    },

    willTransition() {
      const model = this.controller.get('model');

      model.rollbackAttributes();
    }
  }
});
