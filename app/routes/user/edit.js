import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('user', params.id);
  },

  actions: {
    save(user) {
      user.save().then(() => this.transitionTo('user.index'));
    }
  }
});