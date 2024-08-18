import { IValidationRule } from 'types';

function isPasswordValid(password: string): boolean {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,40}$/;
  return regex.test(password);
}

function isTextInputValid(text: string): boolean {
  const regex = /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]*$/;
  return regex.test(text);
}

function isChatInputValid(text: string): boolean {
    const regex = /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё0-9\s]*$/;
    return regex.test(text);
}

function isPhoneInputValid(phone: string): boolean {
  const trimmedValue = phone.trim();
  const regex = /^\+?\d{10,15}$/;
  return regex.test(trimmedValue);
}

function isEmailInputValid(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function isPasswordMatch(password: string): boolean {
  const passwordInput = document.querySelector('[data-type="forPasswordCheck"] input') as HTMLInputElement;
  if (passwordInput) {
    return password === passwordInput.value;
  }

  return false;
}

function isLoginValid(login: string): boolean {
  const regex = /^(?=.*[a-zA-Z])[\w-]{3,20}$/;
  return regex.test(login);
}

export function getTextInputValidationRule(name: string): IValidationRule {
  return {
    field: name,
    method: isTextInputValid,
    message: 'Field must start with a capital letter and contain only letters and hyphens',
  };
}

export function getChatInputValidationRule(name: string): IValidationRule {
  return {
    field: name,
    method: isChatInputValid,
    message: 'Field must start with a letter and contain only letters and numbers',
  };
}

export function getPasswordInputValidationRule(name: string): IValidationRule {
  return {
    field: name,
    method: isPasswordValid,
    message: 'Password must contain at least one uppercase letter, one number, and be 8 to 40 characters long',
  };
}

export const phoneValidationRule: IValidationRule = {
  field: 'phone',
  method: isPhoneInputValid,
  message: 'Phone number must be between 10 and 15 digits',
};

export const emailValidationRule: IValidationRule = {
  field: 'email',
  method: isEmailInputValid,
  message: 'Email must be in the format',
};

export const passwordCheckValidationRule: IValidationRule = {
  field: 'passwordCheck',
  method: isPasswordMatch,
  message: 'Passwords must match',
};

export const loginValidationRule: IValidationRule = {
  field: 'login',
  method: isLoginValid,
  message: 'Login must be between 3 and 20 characters and contain only letters, numbers, and hyphens',
};

export const chatMessageValidationRule: IValidationRule = {
  field: 'message',
  method: (message: string) => message.length > 0,
  message: 'Message must not be empty',
};
