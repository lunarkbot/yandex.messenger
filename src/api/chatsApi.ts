import HTTP from '../utils/classes/network/http';
import { BaseApi } from './baseApi.ts';

const chatsAPIInstance = new HTTP(`chats`);

export default class ChatsAPI extends BaseApi {
  async getChats() {
    return chatsAPIInstance.get('/chats');
  }
}
