import Ember from 'ember';

export default Ember.Controller.extend({
  didValidate: false,

  actions: {
    save(user) {
      user.set('debounceDelay', 0);
      user.validate().then(({ validations }) => {
        this.set('didValidate', true);

        if (validations.get('isValid')) {
          user.save().then(
            () => this.transitionToRoute('user.index'),
            () => console.log('server validation failed')
          );
        }
      });
    }
  }
});
