import { ITemplate, IValidationRule } from 'types';
import renderProfileEditing from './profileEditing.tmpl.js';
import avatar from '../../components/avatar';
import Button from '../../components/button';
import { getProfileInputHtml } from '../../utils';
import {
  emailValidationRule,
  getTextInputValidationRule, loginValidationRule,
  phoneValidationRule,
} from '../../utils/validationRules.ts';

const button = new Button({
  type: 'submit',
  text: 'Сохранить',
});

const context:ITemplate = {
  avatar,
  displayNameHeading: 'Иван',
  email: getProfileInputHtml('email', 'pochta@yandex.ru'),
  login: getProfileInputHtml('login', 'ivanovivan'),
  firstName: getProfileInputHtml('first_name', 'Иван'),
  secondName: getProfileInputHtml('second_name', 'Иванов'),
  displayName: getProfileInputHtml('display_name', 'Иван'),
  phone: getProfileInputHtml('phone', '79099673030'),
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
