import renderSignUp from './signUp.tmpl.js';
import styles from './signUp.module.css';
import button from '../../components/button';
import { Template } from '../../types';
import { getInputHtml } from '../../utils';

const { buttonContext, buttonRender } = button;
buttonContext.buttonText = 'Зарегистрироваться';
buttonContext.buttonClassName += ` ${styles.signInButton}`;
const buttonHtml = buttonRender(buttonContext);

const context:Template = {
  pageClassName: styles.page,
  headingClassName: styles.heading,
  inputGroupClassName: styles.inputGroup,
  linkClassName: styles.link,
  emailInput: getInputHtml('email', 'Почта'),
  loginInput: getInputHtml('login', 'Логин'),
  firstNameInput: getInputHtml('first_name', 'Имя'),
  secondNameInput: getInputHtml('second_name', 'Фамилия'),
  phoneInput: getInputHtml('phone', 'Телефон'),
  passwordInput: getInputHtml('password', 'Пароль'),
  passwordCheckInput: getInputHtml('passwordCheck', 'Пароль (ещё раз)'),
  signUpButton: buttonHtml,
}

const signUp:string = renderSignUp(context);

export default signUp
