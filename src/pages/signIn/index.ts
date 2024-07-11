import renderSignIn from './signIn.tmpl.js';
import styles from './signIn.module.css';
import button from '../../components/button';
import { Template } from '../../types';
import { getInputHtml } from '../../utils';

const { buttonContext, buttonRender } = button;
buttonContext.buttonText = 'Авторизоваться';
buttonContext.buttonClassName += ` ${styles.signInButton}`;
const buttonHtml = buttonRender(buttonContext);

const context:Template = {
  pageClassName: styles.page,
  headingClassName: styles.heading,
  inputGroupClassName: styles.inputGroup,
  linkClassName: styles.link,
  loginInput: getInputHtml('login', 'Логин'),
  passwordInput: getInputHtml('password', 'Пароль'),
  signInButton: buttonHtml,
}

const signIn:string = renderSignIn(context);

export default signIn
