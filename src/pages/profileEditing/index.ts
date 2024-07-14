import renderProfileEditing from './profileEditing.tmpl.js';
import { Template } from '../../types';
import avatar from '../../components/avatar';
import button from '../../components/button';
import { getProfileInputHtml } from '../../utils';

const { buttonRender, buttonContext } = button;
buttonContext.type = 'submit';
buttonContext.buttonText = 'Сохранить';
const saveButton = buttonRender(buttonContext);

const context:Template = {
  avatar,
  displayNameHeading: 'Иван',
  email: getProfileInputHtml('email', 'pochta@yandex.ru'),
  login: getProfileInputHtml('login', 'ivanovivan'),
  firstName: getProfileInputHtml('first_name', 'Иван'),
  secondName: getProfileInputHtml('second_name', 'Иванов'),
  displayName: getProfileInputHtml('display_name', 'Иван'),
  phone: getProfileInputHtml('phone', '+7 (909) 967 30 30'),
  saveButton,
};

const profileEditing:string = renderProfileEditing(context);

export default profileEditing;
