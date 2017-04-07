import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('user');
  },

  actions: {
    save(user) {
      user.validate().then(({ validations }) => {
        if (validations.get('isValid')) {
          user.save().then(() => this.transitionTo('user.index'));
        } else {
          user.set('revalidate', Date.now());
        }
      });
    },

    willTransition() {
      const model = this.controller.get('model');

      model.rollbackAttributes();
    }
  }
});
