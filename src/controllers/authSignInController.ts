import { SignInModel } from 'types/models.ts';
import AuthSignInAPI from '../api/authSignInApi.ts';

const AuthSignInApi = new AuthSignInAPI();

export default class AuthSignInController {
  public async signIn(data: SignInModel) {
    try {

      const user = await AuthSignInApi.request(data);

      console.log(user);

    } catch (error) {
      console.error(error);
    }
  }
}
