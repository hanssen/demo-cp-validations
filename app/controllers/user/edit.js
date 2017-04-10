import Ember from 'ember';
import Validations from '../../validations/user-validation';
import formBufferProperty from 'ember-validated-form-buffer';

export default Ember.Controller.extend({
  data: formBufferProperty('model', Validations),

  actions: {
    save() {
      this.get('data').applyBufferedChanges();

      const user = this.get('model');

      user.set('debounceDelay', 0);
      user.validate().then(({validations}) => {
        if (validations.get('isValid')) {
          user.save().then(() => this.transitionToRoute('user.index'));
        }
      });
    },
  }
  });
