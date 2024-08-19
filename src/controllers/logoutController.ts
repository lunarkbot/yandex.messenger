import LogoutAPI from '../api/logoutApi.ts';
import Router from '../utils/classes/routing/router.ts';

const LogoutApi = new LogoutAPI();

export default class LogoutController {
  public async init() {
    try {
      const result = await LogoutApi.request();
      if (result === null) {
        const router: Router = new Router('.content');
        router.go('/');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error getting user info');
    }
  }
}
