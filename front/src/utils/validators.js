export const compose = (...validators) => (value, _, errorMessage) =>
  validators.reduce((error, validator) => error || validator(value, _, errorMessage), undefined);

export const required = value => {
  return value !== undefined && value !== null && value !== '' ? null : 'Fill the field';
};

export const minLength = (size = 6) => value => {
  if (!value) {
    return null;
  }

  return value.length < size ? `Field should have a minimum ${size} characters` : null;
};

export const maxLength = (size = 256) => value => {
  if (!value) {
    return null;
  }

  return value.length < size ? `Field should have a maximum ${size} characters` : null;
};

export const numbersOnly = value => {
  if (!value) {
    return null;
  }

  return /^[0-9]*$/g.test(value) ? null : 'Only numbers are allowed';
};
