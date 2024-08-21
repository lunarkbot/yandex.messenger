import { TProps } from 'types';
import renderSignUp from './signUp.tmpl.js';
import Button from '../../components/button';
import styles from './signUp.module.css';
import { getInput } from '../../utils/helpers';
import Block from '../../utils/classes/core/block.ts';
import connect from '../../hoc/connect.ts';
import authSignUpController from '../../controllers/authSignUpController.ts';

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
      controller: authSignUpController,
      type: 'page',
    });
  }

  render(): string {
    return renderSignUp(this.props);
  }
}

const SignUpWithStore = connect()(SignUp);

const signUp = new SignUpWithStore(context);

export default signUp;
