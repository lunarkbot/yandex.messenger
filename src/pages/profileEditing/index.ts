import { TProps } from 'types';
import renderProfileEditing from './profileEditing.tmpl.js';
import Button from '../../components/button';
import { getProfileInput } from '../../utils/helpers';
import Block from '../../utils/classes/core/block.ts';
import { getProfileAvatar } from '../../utils/helpers/userAvatar.ts';
import UserProfileController from '../../controllers/userProfileController.ts';

const button = new Button({
  type: 'submit',
  text: 'Сохранить',
});

const avatar = getProfileAvatar();

class ProfileEditing extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'div',
      props,
      type: 'page',
      controller: UserProfileController,
    });
  }

  render(): string {
    return renderProfileEditing(this.props);
  }
}

const context:TProps = {
  avatar,
  displayNameHeading: 'Иван',
  email: getProfileInput('email', 'pochta@yandex.ru'),
  login: getProfileInput('login', 'ivanovivan'),
  firstName: getProfileInput('first_name', 'Иван'),
  secondName: getProfileInput('second_name', 'Иванов'),
  displayName: getProfileInput('display_name', 'Иван'),
  phone: getProfileInput('phone', '79099673030'),
  saveButton: button,
};

const profileEditing = new ProfileEditing(context);

export default profileEditing;
