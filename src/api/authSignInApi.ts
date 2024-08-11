import HTTP from '../utils/classes/network/http';
import { BaseApi } from './baseApi.ts';
import { SignInModel } from 'types/models.ts';

const authSignInAPIInstance = new HTTP(`auth`);

export default class AuthSignInAPI extends BaseApi {
  request(data: SignInModel) {
    return authSignInAPIInstance.post(
      '/signin',
      {
        data: JSON.stringify(data),
      });
  }
}
