import { IValidationRule, TProps } from 'types';
import renderSignIn from './signIn.tmpl.js';
import Button from '../../components/button';
import styles from './signIn.module.css';
import { getInput } from '../../utils';
import {
  getPasswordInputValidationRule,
  loginValidationRule,
} from '../../utils/validationRules.ts';
import Block from '../../utils/block.ts';

const button = new Button({
  text: 'Авторизоваться',
  class: styles.signInButton,
  type: 'submit',
});

class SignIn extends Block {
  constructor(props: TProps) {
    super('div', props);
  }

  render(): string {
    return renderSignIn(this.props);
  }
}

const context:TProps = {
  loginInput: getInput('login', 'Логин'),
  passwordInput: getInput('password', 'Пароль', 'password'),
  signInButton: button.getContent().innerHTML,
};

const signIn = new SignIn(context);

export const signInValidationRules: IValidationRule[] = [
  loginValidationRule,
  getPasswordInputValidationRule('password'),
];

export default signIn;
