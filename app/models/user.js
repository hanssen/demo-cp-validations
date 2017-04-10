import DS from 'ember-data';
import Validations from '../validations/user-validation';

export default DS.Model.extend(
  Validations, {
    name: DS.attr('string'),
    eMail: DS.attr('string'),
    password: DS.attr('string'),
    debounceDelay: DS.attr('number', { defaultValue: 0 })
});
