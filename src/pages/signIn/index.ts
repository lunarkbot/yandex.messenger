import { ITemplate, IValidationRule } from 'types';
import renderSignIn from './signIn.tmpl.js';
import Button from '../../components/button';
import styles from './signIn.module.css';
import { getInputHtml } from '../../utils';
import {
  getPasswordInputValidationRule,
  loginValidationRule,
} from '../../utils/validationRules.ts';

const button = new Button({
  text: 'Авторизоваться',
  class: styles.signInButton,
  type: 'submit',
});

const context:ITemplate = {
  loginInput: getInputHtml('login', 'Логин'),
  passwordInput: getInputHtml('password', 'Пароль', 'password'),
  signInButton: button.getContent().innerHTML,
};

const signIn:string = renderSignIn(context);

export const signInValidationRules: IValidationRule[] = [
  loginValidationRule,
  getPasswordInputValidationRule('password'),
];

export default signIn;
