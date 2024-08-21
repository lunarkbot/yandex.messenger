import MessengerController from '../../controllers/messengerController.ts';
import connect from '../../hoc/connect.ts';
import Avatar from '../../components/avatar';
import { DEFAULT_RESOURCE_URL } from '../../constants.ts';
import store from '../classes/store/store.ts';

type TAvatarConfig = {
  src: string | null | undefined;
  isAvatarEmpty?: boolean;
  isUploadDisabled?: boolean;
}

function changeAvatarHandler(event: Event) {
  const formData = new FormData();
  const input = event.target as HTMLInputElement;
  const chatId = store.getState()?.chat?.active?.id;

  if (input && input.files && input.files[0]) {
    formData.append('avatar', input.files[0]);
    formData.append('chatId', chatId || '');
  }

  MessengerController.changeAvatar(formData);
}

export function getChatAvatar(): Avatar {
  const AvatarWithStore = connect((state) => {
    return {
      src: state?.chat?.active?.avatar
        ? `${DEFAULT_RESOURCE_URL}/${state?.chat?.active?.avatar}`
        : '',
      isAvatarEmpty: false,
    };
  })(Avatar);

  return new AvatarWithStore({
    src: '',
    isUploadDisabled: false,
  }, changeAvatarHandler);
}

export function getChatListAvatar(config: TAvatarConfig): Avatar {
  return new Avatar({
    src: config.src || '',
    isAvatarEmpty: config.isAvatarEmpty,
    isUploadDisabled: true,
  });
}
