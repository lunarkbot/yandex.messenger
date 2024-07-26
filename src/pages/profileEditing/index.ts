import { ITemplate, IValidationRule } from 'types';
import renderProfileEditing from './profileEditing.tmpl.js';
import Avatar from '../../components/avatar';
import Button from '../../components/button';
import { getProfileInput } from '../../utils';
import {
  emailValidationRule,
  getTextInputValidationRule, loginValidationRule,
  phoneValidationRule,
} from '../../utils/validationRules.ts';

const button = new Button({
  type: 'submit',
  text: 'Сохранить',
});

const avatar = new Avatar({});

const context:ITemplate = {
  avatar: avatar.getContent().innerHTML,
  displayNameHeading: 'Иван',
  email: getProfileInput('email', 'pochta@yandex.ru').getContent().innerHTML,
  login: getProfileInput('login', 'ivanovivan').getContent().innerHTML,
  firstName: getProfileInput('first_name', 'Иван').getContent().innerHTML,
  secondName: getProfileInput('second_name', 'Иванов').getContent().innerHTML,
  displayName: getProfileInput('display_name', 'Иван').getContent().innerHTML,
  phone: getProfileInput('phone', '79099673030').getContent().innerHTML,
  saveButton: button.getContent().innerHTML,
};

const profileEditing:string = renderProfileEditing(context);

export const profileEditingValidationRules: IValidationRule[] = [
  getTextInputValidationRule('first_name'),
  getTextInputValidationRule('second_name'),
  loginValidationRule,
  emailValidationRule,
  phoneValidationRule,
];

export default profileEditing;
