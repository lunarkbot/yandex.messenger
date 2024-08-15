import HTTP from '../utils/classes/network/http';
import { BaseApi } from './baseApi.ts';

const userAPIInstance = new HTTP(`auth`);

export default class UserAPI extends BaseApi {
  async request() {
    return userAPIInstance.get('/user');
  }
}
