import { TProps } from 'types';
import renderProfile from './profile.tmpl.js';
import Block from '../../utils/classes/core/block.ts';
import connect from '../../hoc/connect.ts';
import { getProfileAvatar } from '../../utils/helpers/userAvatar.ts';

class Profile extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'div',
      props,
      type: 'page',
    });
  }

  render(): string {
    return renderProfile(this.props);
  }
}

const avatar = getProfileAvatar();

const context:TProps = {
  avatar,
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  display_name: '',
  phone: '',
};

const ProfileWithUser = connect((state) => ({
  first_name: state?.user?.first_name,
  email: state?.user?.email,
  login: state?.user?.login,
  second_name: state?.user?.second_name,
  display_name: state?.user?.display_name || state?.user?.first_name,
  phone: state?.user?.phone,
}))(Profile);

const profile = new ProfileWithUser(context);

export default profile;
