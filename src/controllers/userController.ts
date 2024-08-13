import UserAPI from '../api/userApi.ts';
import isPlainObject from '../utils/helpers/isPlainObject.ts';
import Router from '../utils/classes/routing/router.ts';

const UserApi = new UserAPI();

export default class UserController {
  public async getInfo() {
    try {
      return await UserApi.request();
    } catch (error) {
      console.error(error);
      throw new Error('Error getting user info');
    }
  }

  public async checkUser() {
    const user = await this.getInfo();

    if (isPlainObject(user) && user.hasOwnProperty('id')) {
      const router: Router = new Router('.content');
        router.go('/messenger');
    }
  }
}
