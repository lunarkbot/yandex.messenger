import { IValidationRule, TProps } from 'types';
import renderSignUp from './signUp.tmpl.js';
import styles from './signUp.module.css';
import Button from '../../components/button';
import { getInput } from '../../utils';
import {
  emailValidationRule, getPasswordInputValidationRule,
  getTextInputValidationRule, loginValidationRule, passwordCheckValidationRule,
  phoneValidationRule,
} from '../../utils/validationRules.ts';
import Block from '../../utils/block.ts';

const button = new Button({
  class: styles.signUpButton,
  text: 'Зарегистрироваться',
  type: 'submit',
});

const context:TProps = {
  emailInput: getInput('email', 'Почта'),
  loginInput: getInput('login', 'Логин'),
  firstNameInput: getInput('first_name', 'Имя'),
  secondNameInput: getInput('second_name', 'Фамилия'),
  phoneInput: getInput('phone', 'Телефон'),
  passwordInput: getInput('password', 'Пароль', 'password'),
  passwordCheckInput: getInput('passwordCheck', 'Пароль (ещё раз)', 'password'),
  signUpButton: button,
};

class SignUp extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'div',
      props,
    });
  }

  render(): string {
    return renderSignUp(this.props);
  }
}

const signUp = new SignUp(context);

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
