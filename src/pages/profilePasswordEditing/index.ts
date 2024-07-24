import { ITemplate, IValidationRule } from 'types';
import renderProfileEditing from './profileEditing.tmpl.js';
import avatar from '../../components/avatar';
import button from '../../components/button';
import { getProfileInputHtml } from '../../utils';
import { getPasswordInputValidationRule, passwordCheckValidationRule } from '../../utils/validationRules.ts';

const { buttonRender, buttonContext } = button;
buttonContext.type = 'submit';
buttonContext.buttonText = 'Сохранить';
const saveButton = buttonRender(buttonContext);

const inputType:string = 'password';

const context:ITemplate = {
  avatar,
  displayNameHeading: 'Иван',
  oldPassword: getProfileInputHtml('oldPassword', 'pochta@yandex.ru', inputType),
  newPassword: getProfileInputHtml('newPassword', 'ivanovivan', inputType),
  passwordCheck: getProfileInputHtml('passwordCheck', 'ivanovivan', inputType),
  saveButton,
};

const profileEditing:string = renderProfileEditing(context);

export const profilePasswordEditingValidationRules: IValidationRule[] = [
  getPasswordInputValidationRule('oldPassword'),
  getPasswordInputValidationRule('newPassword'),
  passwordCheckValidationRule,
];

export default profileEditing;
