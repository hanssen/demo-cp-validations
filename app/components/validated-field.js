import Ember from 'ember';

const {
  computed,
  defineProperty
} = Ember;

export default Ember.Component.extend({
  classNameBindings: ['showErrorClass:has-error', 'isValid:has-success'],
  model: null,
  value: null,
  type: 'text',
  valuePath: '',
  placeholder: '',
  validation: null,
  showValidations: false,
  showApiErrors: false,
  didValidate: false,
  debounceTimer: null,

  apiErrors: function() {
    let
      valuePath = this.get('valuePath'),
      errors = this.get('model.apiErrors').errorsFor(valuePath);

    if (Ember.isPresent(errors)) {
      this.set('showApiErrors', true);
    }

    return errors;
  }.property('model.errors.[]'),

  hasApiErrors: computed.notEmpty('apiErrors').readOnly(),
  showApiErrorMessage: computed.and('hasApiErrors', 'showApiErrors').readOnly(),

  notValidating: computed.not('validation.isValidating').readOnly(),
  hasContent: computed.notEmpty('value').readOnly(),
  isValid: computed.and('hasContent', 'validation.isTruelyValid').readOnly(),
  shouldDisplayValidations: computed.or('showValidations', 'didValidate', 'hasContent').readOnly(),

  showValidationErrorClass: computed.and('notValidating', 'showErrorMessage', 'validation').readOnly(),
  showValidationErrorMessage: computed.and('shouldDisplayValidations', 'validation.isInvalid').readOnly(),

  showErrorClass: computed.or('showValidationErrorClass', 'showApiErrorMessage').readOnly(),
  showErrorMessage: computed.or('showValidationErrorMessage', 'showApiErrorMessage').readOnly(),

  init() {
    this._super(...arguments);
    let valuePath = this.get('valuePath');

    defineProperty(this, 'validation', computed.readOnly(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
  },

  keyDown() {
    this._super(...arguments);
    this.set('showValidations', true);
    this.set('showApiErrors', false);
    this.get('model').set('debounceDelay', 800);
  }
});
