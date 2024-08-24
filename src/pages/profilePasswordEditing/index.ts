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

const inputType:string = 'password';

const avatar = getProfileAvatar();

class ProfilePasswordEditing extends Block {
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
  oldPassword: getProfileInput('oldPassword', '', inputType),
  newPassword: getProfileInput('newPassword', '', inputType),
  passwordCheck: getProfileInput('passwordCheck', '', inputType),
  saveButton: button.getContent().innerHTML,
};

const profilePasswordEditing = new ProfilePasswordEditing(context);

export default profilePasswordEditing;
