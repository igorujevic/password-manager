import { email, required } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

const rules = [
  {
    name: 'email',
    rule: {
      ...email,
      message: 'Email is not valid'
    }
  },
  {
    name: 'min',
    rule: {
      params: ['length'],
      validate: (value, { length }) => value.length >= length,
      message: '{_field_} must have at least {length} characters'
    }
  },
  {
    name: 'required',
    rule: {
      ...required,
      message: '{_field_} is required'
    }
  },
  {
    name: 'confirmation',
    rule: {
      params: ['target'],
      validate: (value, { target }) => value === target,
      message: 'Passwords must match'
    }
  },
  {
    name: 'url',
    rule: {
      validate: value => /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/.test(value),
      message: 'Invalid page url format. e.g. https://www.google.com'
    }
  }
];

export const extendRules = () => {
  rules.forEach(({ name, rule }) => extend(name, rule));
};
