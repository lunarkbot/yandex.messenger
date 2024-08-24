import { SignInModel } from 'types/models.ts';
import HTTP from '../utils/classes/network/http';
import { BaseApi } from './baseApi.ts';

const authSignInAPIInstance = new HTTP('auth');

export default class AuthSignInAPI extends BaseApi {
  request(data: SignInModel) {
    const response = authSignInAPIInstance.post(
      '/signin',
      {
        data,
      },
    );
    return response;
  }
}
