import UserProfileController from '../../controllers/userProfileController.ts';
import connect from '../../hoc/connect.ts';
import Avatar from '../../components/avatar';
import { DEFAULT_AVATAR_URL } from '../../constants.ts';

function changeAvatarHandler(event: Event) {
  const formData = new FormData();
  const input = event.target as HTMLInputElement;

  if (input && input.files && input.files[0]) {
    formData.append('avatar', input.files[0]);
  }

  const userProfileController = new UserProfileController();
  userProfileController.changeAvatar(formData);
}

export function getProfileAvatar() {
  const avatarWithStore = connect(state => ({
    src: state.user.avatar ?
      `https://ya-praktikum.tech/api/v2/resources/${state.user.avatar}`
      : DEFAULT_AVATAR_URL,
  }))(Avatar);

  return new avatarWithStore({
    src: DEFAULT_AVATAR_URL,
  }, changeAvatarHandler);
}
