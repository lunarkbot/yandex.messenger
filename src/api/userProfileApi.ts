import HTTP from '../utils/classes/network/http';
import { BaseApi } from './baseApi.ts';
import { PasswordModel, ProfileModel } from 'types/models.ts';

const userAPIInstance = new HTTP(`user`);

export default class UserProfileApi extends BaseApi {
  async putAvatar(data: FormData) {
    const response = userAPIInstance.put(
      '/profile/avatar',
      {
        data,
        type: 'auto',
      }
    );
    return this.parseJSON(response);
  }

  async saveProfile(data: ProfileModel) {
    const response = userAPIInstance.put(
      '/profile',
      {
        data,
      }
    );
    return this.parseJSON(response);
  }

  async changePassword(data: PasswordModel) {
    const response = userAPIInstance.put(
      '/password',
      {
        data,
      }
    );
    return response;
  }

  async searchUsers(data: string) {
    const response = userAPIInstance.post(
      '/search',
      {
        data,
      }
    );
    return this.parseJSON(response);
  }
}
