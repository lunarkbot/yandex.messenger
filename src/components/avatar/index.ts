import { ITemplate } from 'types';
import renderAvatar from './avatar.tmpl.js';

const context:ITemplate = {
  avatarSrc: '../../../../avatar_default.png',
};

const avatar = renderAvatar(context);

export default avatar;
