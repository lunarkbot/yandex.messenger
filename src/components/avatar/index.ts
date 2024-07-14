import renderAvatar from './avatar.tmpl.js';
import { Template } from '../../types';

const context:Template = {
  avatarSrc: '../../../../avatar_default.png',
};

const avatar = renderAvatar(context);

export default avatar;
