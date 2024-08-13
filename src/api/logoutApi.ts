import HTTP from '../utils/classes/network/http';
import { BaseApi } from './baseApi.ts';

const logoutAPIInstance = new HTTP(`auth`);

export default class LogoutAPI extends BaseApi {
  async request() {
    const response = logoutAPIInstance.post('/logout');
    return this.parseJSON(response);
  }
}
