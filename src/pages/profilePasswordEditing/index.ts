import renderProfileEditing from './profileEditing.tmpl.js';
import { Template } from '../../types';
import avatar from '../../components/avatar';
import button from '../../components/button';
import { getProfileInputHtml } from '../../utils';

const { buttonRender, buttonContext } = button;
buttonContext.type = 'submit';
buttonContext.buttonText = 'Сохранить';
const saveButton = buttonRender(buttonContext);

const inputType:string = 'password';

const context:Template = {
  avatar,
  displayNameHeading: 'Иван',
  oldPassword: getProfileInputHtml('oldPassword', 'pochta@yandex.ru', inputType),
  newPassword: getProfileInputHtml('newPassword', 'ivanovivan', inputType),
  passwordCheck: getProfileInputHtml('passwordCheck', 'ivanovivan', inputType),
  saveButton,
};

const profileEditing:string = renderProfileEditing(context);

export default profileEditing;
