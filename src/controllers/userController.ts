import UserAPI from '../api/userApi.ts';
import isPlainObject from '../utils/helpers/isPlainObject.ts';
import Router from '../utils/classes/routing/router.ts';
import store from '../utils/classes/store/store.ts';
import { disableSpinner } from '../utils/helpers/index.ts';
const UserApi = new UserAPI();
const router: Router = new Router('.content');


export default class UserController {
  public async getInfo() {
    try {
      const result = await UserApi.request();

      if (result.status === 401) {
        router.go('/');
        disableSpinner();
        return {};
      }

      const user = result.response;
      store.set('user', user);

      disableSpinner();
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  public async checkUser() {
    const user = await this.getInfo();
    if (isPlainObject(user) && user.hasOwnProperty('id') && window.location.pathname === '/') {
        router.go('/messenger');
    } else if (!isPlainObject(user) && !user.hasOwnProperty('id')) {
      router.go('/');
    }
  }
}
