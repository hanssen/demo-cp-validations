import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.peekAll('user'); // peek only allows express server to keep updated records in memory
  },

  actions: {
    delete(user) {
      if (confirm('Are you sure?')) {
        user.destroyRecord();
      }
    }
  }
});
