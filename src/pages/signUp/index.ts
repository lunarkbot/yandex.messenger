import { ITemplate, IValidationRule } from 'types';
import renderSignUp from './signUp.tmpl.js';
import styles from './signUp.module.css';
import Button from '../../components/button';
import { getInput } from '../../utils';
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
  emailInput: getInput('email', 'Почта').getContent().innerHTML,
  loginInput: getInput('login', 'Логин').getContent().innerHTML,
  firstNameInput: getInput('first_name', 'Имя').getContent().innerHTML,
  secondNameInput: getInput('second_name', 'Фамилия').getContent().innerHTML,
  phoneInput: getInput('phone', 'Телефон').getContent().innerHTML,
  passwordInput: getInput('password', 'Пароль', 'password').getContent().innerHTML,
  passwordCheckInput: getInput('passwordCheck', 'Пароль (ещё раз)', 'password').getContent().innerHTML,
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
