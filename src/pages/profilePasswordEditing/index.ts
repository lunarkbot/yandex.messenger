import { ITemplate, IValidationRule } from 'types';
import renderProfileEditing from './profileEditing.tmpl.js';
import Avatar from '../../components/avatar';
import Button from '../../components/button';
import { getProfileInput } from '../../utils';
import { getPasswordInputValidationRule, passwordCheckValidationRule } from '../../utils/validationRules.ts';

const button = new Button({
  type: 'submit',
  text: 'Сохранить',
});

const inputType:string = 'password';

const avatar = new Avatar({});

const context:ITemplate = {
  avatar: avatar.getContent().innerHTML,
  displayNameHeading: 'Иван',
  oldPassword: getProfileInput('oldPassword', 'pochta@yandex.ru', inputType).getContent().innerHTML,
  newPassword: getProfileInput('newPassword', 'ivanovivan', inputType).getContent().innerHTML,
  passwordCheck: getProfileInput('passwordCheck', 'ivanovivan', inputType).getContent().innerHTML,
  saveButton: button.getContent().innerHTML,
};

const profileEditing:string = renderProfileEditing(context);

export const profilePasswordEditingValidationRules: IValidationRule[] = [
  getPasswordInputValidationRule('oldPassword'),
  getPasswordInputValidationRule('newPassword'),
  passwordCheckValidationRule,
];

export default profileEditing;
