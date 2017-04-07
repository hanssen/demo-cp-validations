import { buildValidations, validator } from 'ember-cp-validations';

const
  debounceDelay = Ember.computed.alias('model.debounceDelay'),
  Validations = buildValidations({
    name: [
      validator('presence', {
        presence: true,
        ignoreBlank: true
      }),
      validator('length', {
        min: 3,
        max: 30,
        debounce: debounceDelay
      })
    ],

    eMail: [
      validator('presence', {
        presence: true,
        ignoreBlank: true
      }),
      validator('format', {
        type: 'email',
        debounce: debounceDelay
      })
    ],

    password: [
      validator('presence', {
        presence: true,
        ignoreBlank: true
      }),
      validator('length', {
        min: 8,
        max: 30,
        debounce: debounceDelay
      })
    ]
  });

export default Validations;
