import { ITemplate, IValidationRule } from 'types';
import renderSignIn from './signIn.tmpl.js';
import Button from '../../components/button';
import styles from './signIn.module.css';
import { getInput } from '../../utils';
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
  loginInput: getInput('login', 'Логин').getContent().innerHTML,
  passwordInput: getInput('password', 'Пароль', 'password').getContent().innerHTML,
  signInButton: button.getContent().innerHTML,
};

const signIn:string = renderSignIn(context);

export const signInValidationRules: IValidationRule[] = [
  loginValidationRule,
  getPasswordInputValidationRule('password'),
];

export default signIn;
