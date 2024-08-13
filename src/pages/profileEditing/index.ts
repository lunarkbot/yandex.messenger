import { IValidationRule, TProps } from 'types';
import renderProfileEditing from './profileEditing.tmpl.js';
import Avatar from '../../components/avatar';
import Button from '../../components/button';
import { getProfileInput } from '../../utils/helpers';
import {
  emailValidationRule,
  getTextInputValidationRule, loginValidationRule,
  phoneValidationRule,
} from '../../utils/helpers/validationRules.ts';
import Block from '../../utils/classes/core/block.ts';

const button = new Button({
  type: 'submit',
  text: 'Сохранить',
});

const avatar = new Avatar({});

class ProfileEditing extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'div',
      props,
      type: 'page',
    });
  }

  render(): string {
    return renderProfileEditing(this.props);
  }
}

const context:TProps = {
  avatar,
  displayNameHeading: 'Иван',
  email: getProfileInput('email', 'pochta@yandex.ru'),
  login: getProfileInput('login', 'ivanovivan'),
  firstName: getProfileInput('first_name', 'Иван'),
  secondName: getProfileInput('second_name', 'Иванов'),
  displayName: getProfileInput('display_name', 'Иван'),
  phone: getProfileInput('phone', '79099673030'),
  saveButton: button,
};

const profileEditing = new ProfileEditing(context);

export const profileEditingValidationRules: IValidationRule[] = [
  getTextInputValidationRule('first_name'),
  getTextInputValidationRule('second_name'),
  loginValidationRule,
  emailValidationRule,
  phoneValidationRule,
];

export default profileEditing;
