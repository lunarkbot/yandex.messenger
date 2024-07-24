import { ITemplate, IValidationRule } from 'types';
import renderSignIn from './signIn.tmpl.js';
import button from '../../components/button';
import styles from './signIn.module.css';
import { getInputHtml } from '../../utils';
import {
  getPasswordInputValidationRule,
  loginValidationRule,
} from '../../utils/validationRules.ts';

const { buttonContext, buttonRender } = button;
buttonContext.buttonText = 'Авторизоваться';
buttonContext.buttonClassName += ` ${styles.signInButton}`;
const buttonHtml = buttonRender(buttonContext);

const context:ITemplate = {
  loginInput: getInputHtml('login', 'Логин'),
  passwordInput: getInputHtml('password', 'Пароль', 'password'),
  signInButton: buttonHtml,
};

const signIn:string = renderSignIn(context);

export const signInValidationRules: IValidationRule[] = [
  loginValidationRule,
  getPasswordInputValidationRule('password'),
];

export default signIn;
