import { IValidationRule, TProps } from 'types';
import renderProfileEditing from './profileEditing.tmpl.js';
import Avatar from '../../components/avatar';
import Button from '../../components/button';
import { getProfileInput } from '../../utils/helpers';
import { getPasswordInputValidationRule, passwordCheckValidationRule } from '../../utils/helpers/validationRules.ts';
import Block from '../../utils/classes/core/block.ts';

const button = new Button({
  type: 'submit',
  text: 'Сохранить',
});

const inputType:string = 'password';

const avatar = new Avatar({});

class ProfilePasswordEditing extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'div',
      props,
    });
  }

  render(): string {
    return renderProfileEditing(this.props);
  }
}

const context:TProps = {
  avatar,
  displayNameHeading: 'Иван',
  oldPassword: getProfileInput('oldPassword', 'pochta@yandex.ru', inputType),
  newPassword: getProfileInput('newPassword', 'ivanovivan', inputType),
  passwordCheck: getProfileInput('passwordCheck', 'ivanovivan', inputType),
  saveButton: button.getContent().innerHTML,
};

const profilePasswordEditing = new ProfilePasswordEditing(context);

export const profilePasswordEditingValidationRules: IValidationRule[] = [
  getPasswordInputValidationRule('oldPassword'),
  getPasswordInputValidationRule('newPassword'),
  passwordCheckValidationRule,
];

export default profilePasswordEditing;
