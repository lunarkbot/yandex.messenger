import HTTP from '../utils/classes/network/http';
import { BaseApi } from './baseApi.ts';

const chatsAPIInstance = new HTTP('chats');

export default class ChatsAPI extends BaseApi {
  async getChats() {
    return chatsAPIInstance.get('/');
  }

  async createChat(data: string) {
    return chatsAPIInstance.post('/', {
      data,
    });
  }

  async addUser(data: string) {
    return chatsAPIInstance.put('/users', {
      data,
    });
  }

  async deleteUser(data: string) {
    return chatsAPIInstance.delete('/users', {
      data,
    });
  }

  async getToken(chatId: string) {
    return this.parseJSON(chatsAPIInstance.post(`/token/${chatId}`));
  }
}
