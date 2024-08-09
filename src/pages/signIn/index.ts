import { IValidationRule, TProps } from 'types';
import renderSignIn from './signIn.tmpl.js';
import Button from '../../components/button';
import styles from './signIn.module.css';
import { getInput } from '../../utils/helpers';
import {
  getPasswordInputValidationRule,
  loginValidationRule,
} from '../../utils/helpers/validationRules.ts';
import Block from '../../utils/classes/core/block.ts';

const button = new Button({
  text: 'Авторизоваться',
  class: styles.signInButton,
  type: 'submit',
});

const context:TProps = {
  loginInput: getInput('login', 'Логин'),
  passwordInput: getInput('password', 'Пароль', 'password'),
  signInButton: button.getContent().innerHTML,
};

export const signInValidationRules: IValidationRule[] = [
  loginValidationRule,
  getPasswordInputValidationRule('password'),
];

class SignIn extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'div',
      props,
      validationRules: signInValidationRules,
      formId: 'signInForm',
    });
  }

  render(): string {
    return renderSignIn(this.props);
  }
}

const signIn = new SignIn(context);

export default signIn;
