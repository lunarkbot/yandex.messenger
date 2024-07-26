import { ITemplate } from 'types';
import renderProfile from './profile.tmpl.js';
import Avatar from '../../components/avatar';

const avatar = new Avatar({});

const context:ITemplate = {
  avatar: avatar.getContent().innerHTML,
  email: 'pochta@yandex.ru',
  login: 'ivanovivan',
  firstName: 'Иван',
  secondName: 'Иванов',
  nickname: 'Иван',
  phone: '+7 (909) 967 30 30',
};

const profile:string = renderProfile(context);

export default profile;
