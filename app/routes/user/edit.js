import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('user', params.id);
  },

  actions: {
    save(user) {
      user.set('debounceDelay', 0);
      user.validate().then(({ validations }) => {
        if (validations.get('isValid')) {
          user.save().then(
            () => this.transitionTo('user.index'),
            () => console.log('server validation failed')
          );
        }
      });
    },

    willTransition() {
      const model = this.controller.get('model');
      model.rollbackAttributes();
    }
  }
});
