import { IValidationRule } from 'types';
import { capitalizeFirstLetter } from './index.ts';

function isPasswordValid(password: string): boolean {
  const passwordLength = password.trim().length;
  // const hasLowerCase = /[a-z]/.test(password);
  // const hasUpperCase = /[A-Z]/.test(password);
  // const hasNumber = /\d/.test(password);
  // const hasSpecialChar = /[!№$%^&*()_+-]/.test(password);

  return passwordLength >= 8 && passwordLength <= 50;// && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar;
}

function isTextInputValid(text: string): boolean {
  const textLength = text.trim().length;

  return textLength >= 3 && textLength <= 40;
}

function isPhoneInputValid(phone: string): boolean {
  const trimmedValue = phone.trim();
  const isNumber = /^\d+$/.test(trimmedValue);
  const lengthInRange = trimmedValue.length >= 11 && trimmedValue.length <= 13;
  return isNumber && lengthInRange;
}

function isEmailInputValid(email: string): boolean {
  const trimmedValue = email.trim();
  const hasAt = trimmedValue.includes('@');
  const hasDot = trimmedValue.includes('.');
  return hasAt && hasDot;
}

function isPasswordMatch(password: string): boolean {
  const passwordInput = document.querySelector('[data-type="forPasswordCheck"] input') as HTMLInputElement;
  if (passwordInput) {
    return password === passwordInput.value;
  }

  return false;
}

export function getTextInputValidationRule(name: string): IValidationRule {
  return {
    field: name,
    method: isTextInputValid,
    message: `${capitalizeFirstLetter(name).replace('_', ' ')} must be between 3 and 40 characters`,
  };
}

export function getPasswordInputValidationRule(name: string): IValidationRule {
  return {
    field: name,
    method: isPasswordValid,
    message: 'Password must be between 8 and 50 characters',
  };
}

export const phontValidationRule: IValidationRule = {
  field: 'phone',
  method: isPhoneInputValid,
  message: '11 to 13 numbers without special characters and spaces',
};

export const emailValidationRule: IValidationRule = {
  field: 'email',
  method: isEmailInputValid,
  message: 'Email must contain @ and .',
};

export const passwordCheckValidationRule: IValidationRule = {
  field: 'passwordCheck',
  method: isPasswordMatch,
  message: 'Passwords must match',
};
