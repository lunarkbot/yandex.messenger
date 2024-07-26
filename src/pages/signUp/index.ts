import { ITemplate, IValidationRule } from 'types';
import renderSignUp from './signUp.tmpl.js';
import styles from './signUp.module.css';
import Button from '../../components/button';
import { getInputHtml } from '../../utils';
import {
  emailValidationRule, getPasswordInputValidationRule,
  getTextInputValidationRule, loginValidationRule, passwordCheckValidationRule,
  phoneValidationRule,
} from '../../utils/validationRules.ts';

const button = new Button({
  class: styles.signUpButton,
  text: 'Зарегистрироваться',
  type: 'submit',
});

const context:ITemplate = {
  emailInput: getInputHtml('email', 'Почта'),
  loginInput: getInputHtml('login', 'Логин'),
  firstNameInput: getInputHtml('first_name', 'Имя'),
  secondNameInput: getInputHtml('second_name', 'Фамилия'),
  phoneInput: getInputHtml('phone', 'Телефон'),
  passwordInput: getInputHtml('password', 'Пароль', 'password'),
  passwordCheckInput: getInputHtml('passwordCheck', 'Пароль (ещё раз)', 'password'),
  signUpButton: button.getContent().innerHTML,
};

const signUp:string = renderSignUp(context);

export const signUpValidationRules: IValidationRule[] = [
  getTextInputValidationRule('first_name'),
  getTextInputValidationRule('second_name'),
  loginValidationRule,
  emailValidationRule,
  phoneValidationRule,
  passwordCheckValidationRule,
  getPasswordInputValidationRule('password'),
];

export default signUp;
