import { ITemplate, TProps } from 'types';
import renderProfile from './profile.tmpl.js';
import Avatar from '../../components/avatar';
import Block from '../../utils/block.ts';

const avatar = new Avatar({});

class Profile extends Block {
  constructor(props: TProps) {
    super({
        tagName: 'div',
        props,
    });
  }

  render(): string {
    return renderProfile(this.props);
  }
}

const context:ITemplate = {
  avatar: avatar.getContent().innerHTML,
  email: 'pochta@yandex.ru',
  login: 'ivanovivan',
  firstName: 'Иван',
  secondName: 'Иванов',
  nickname: 'Иван',
  phone: '+7 (909) 967 30 30',
};

const profile = new Profile(context);

export default profile;
