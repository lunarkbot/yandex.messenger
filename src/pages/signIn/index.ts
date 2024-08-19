import { TProps } from 'types';
import renderSignIn from './signIn.tmpl.js';
import Button from '../../components/button';
import styles from './signIn.module.css';
import { getInput } from '../../utils/helpers';
import Block from '../../utils/classes/core/block.ts';
import connect from '../../hoc/connect.ts';
import authSignInController from '../../controllers/authSignInController.ts';

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

class SignIn extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'div',
      props,
      controller: authSignInController,
      type: 'page',
    });
  }

  render(): string {
    return renderSignIn(this.props);
  }
}

const signInWithStore = connect()(SignIn);

const signIn = new signInWithStore(context);

export default signIn;
