import { SignUpModel } from 'types/models.ts';
import HTTP from '../utils/classes/network/http';
import { BaseApi } from './baseApi.ts';

const authSignUpAPIInstance = new HTTP('auth');

export default class AuthSignUpAPI extends BaseApi {
  request(data: SignUpModel) {
    const response = authSignUpAPIInstance.post(
      '/signup',
      {
        data,
      },
    );
    return this.parseJSON(response);
  }
}
