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
  didValidate: false,
  debounceTimer: null,

  notValidating: computed.not('validation.isValidating').readOnly(),
  hasContent: computed.notEmpty('value').readOnly(),
  isValid: computed.and('hasContent', 'validation.isTruelyValid').readOnly(),
  shouldDisplayValidations: computed.or('showValidations', 'didValidate', 'hasContent').readOnly(),

  showErrorClass: computed.and('notValidating', 'showErrorMessage', 'validation').readOnly(),
  showErrorMessage: computed.and('shouldDisplayValidations', 'validation.isInvalid').readOnly(),

  init() {
    this._super(...arguments);
    let valuePath = this.get('valuePath');

    defineProperty(this, 'validation', computed.readOnly(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
  },

  keyDown() {
    this._super(...arguments);
    this.set('showValidations', true);
    this.get('model').set('debounceDelay', 800);
  }
});
