import renderProfile from './profile.tmpl.js';
import { Template } from '../../types';
import avatar from '../../components/avatar';

const context:Template = {
  avatar,
  email: 'pochta@yandex.ru',
  login: 'ivanovivan',
  firstName: 'Иван',
  secondName: 'Иванов',
  nickname: 'Иван',
  phone: '+7 (909) 967 30 30',
};

const profile:string = renderProfile(context);

export default profile;
