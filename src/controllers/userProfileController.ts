import { PasswordModel, ProfileModel } from 'types/models.ts';
import { IValidationRule } from 'types';
import UserProfileAPI from '../api/userProfileApi.ts';
import {
  emailValidationRule, getPasswordInputValidationRule,
  getTextInputValidationRule, loginValidationRule, passwordCheckValidationRule,
  phoneValidationRule,
} from '../utils/helpers/validationRules.ts';
import Validator from '../utils/classes/validation/validator.ts';
import Router from '../utils/classes/routing/router.ts';
import store from '../utils/classes/store/store.ts';
import { ROOT_QUERY } from '../constants.ts';

const userProfileAPI = new UserProfileAPI();

const profileFormId = 'editProfile';
const profilePasswordFormId = 'editProfilePassword';

export const profileEditingValidationRules: IValidationRule[] = [
  getTextInputValidationRule('first_name'),
  getTextInputValidationRule('second_name'),
  getTextInputValidationRule('display_name'),
  loginValidationRule,
  emailValidationRule,
  phoneValidationRule,
];

export const profilePasswordEditingValidationRules: IValidationRule[] = [
  getPasswordInputValidationRule('oldPassword'),
  getPasswordInputValidationRule('newPassword'),
  passwordCheckValidationRule,
];

export default class UserProfileController {
  public async changeAvatar(data: FormData) {
    try {
      const result = await userProfileAPI.putAvatar(data);

      store.set('user', { avatar: result.avatar });

      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Error changing avatar');
    }
  }

  public async init() {
    const profileForm = document.getElementById(profileFormId) as HTMLFormElement;
    const profilePasswordForm = document.getElementById(profilePasswordFormId) as HTMLFormElement;

    if (profileForm) {
      Validator.setValidation(profileForm, profileEditingValidationRules, this.saveProfile);
    }

    if (profilePasswordForm) {
      Validator.setValidation(
        profilePasswordForm,
        profilePasswordEditingValidationRules,
        this.changePassword,
        ['passwordCheck']
      );
    }
  }

  private async saveProfile(data: ProfileModel) {
    try {
      const result = await userProfileAPI.saveProfile(data);

      store.set('user', {
        first_name: result.first_name,
        second_name: result.second_name,
        display_name: result.display_name,
        login: result.login,
        email: result.email,
        phone: result.phone,
      });

      const router = new Router(ROOT_QUERY);
        router.go('/settings');

      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Error saving profile');

    }
  }

  private async changePassword(data: PasswordModel) {
    try {
      const result = await userProfileAPI.changePassword(data);
      if (result.status === 200) {
        const router = new Router(ROOT_QUERY);
        router.go('/settings');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error changing password');
    }
  }
}
