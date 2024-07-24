import { ITemplate, IValidationRule } from 'types';
import renderSignUp from './signUp.tmpl.js';
import styles from './signUp.module.css';
import button from '../../components/button';
import { getInputHtml } from '../../utils';
import {
  emailValidationRule, getPasswordInputValidationRule,
  getTextInputValidationRule, passwordCheckValidationRule,
  phontValidationRule,
} from '../../utils/validationRules.ts';

const { buttonContext, buttonRender } = button;
buttonContext.buttonText = 'Зарегистрироваться';
buttonContext.buttonClassName += ` ${styles.signInButton}`;
const buttonHtml = buttonRender(buttonContext);

const context:ITemplate = {
  emailInput: getInputHtml('email', 'Почта'),
  loginInput: getInputHtml('login', 'Логин'),
  firstNameInput: getInputHtml('first_name', 'Имя'),
  secondNameInput: getInputHtml('second_name', 'Фамилия'),
  phoneInput: getInputHtml('phone', 'Телефон'),
  passwordInput: getInputHtml('password', 'Пароль', 'password'),
  passwordCheckInput: getInputHtml('passwordCheck', 'Пароль (ещё раз)', 'password'),
  signUpButton: buttonHtml,
};

const signUp:string = renderSignUp(context);

export const signUpValidationRules: IValidationRule[] = [
  getTextInputValidationRule('first_name'),
  getTextInputValidationRule('second_name'),
  getTextInputValidationRule('login'),
  emailValidationRule,
  phontValidationRule,
  passwordCheckValidationRule,
  getPasswordInputValidationRule('password'),
];

export default signUp;
