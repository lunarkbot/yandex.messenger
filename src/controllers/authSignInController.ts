import { SignInModel } from 'types/models.ts';
import { IValidationRule } from 'types';
import AuthSignInAPI from '../api/authSignInApi.ts';
import {
  getPasswordInputValidationRule,
  loginValidationRule,
} from '../utils/helpers/validationRules.ts';
import Validator from '../utils/classes/validation/validator.ts';
import Router from '../utils/classes/routing/router.ts';
import { ROOT_QUERY } from '../constants.ts';
import UserController from './userController.ts';

const formId = 'signInForm';
const AuthSignInApi = new AuthSignInAPI();
const signInValidationRules: IValidationRule[] = [
  loginValidationRule,
  getPasswordInputValidationRule('password'),
];

export default class AuthSignInController {
  private async submitRequest(data: SignInModel) {
    try {
      const result = await AuthSignInApi.request(data);
      if (result.status === 200) {
        const router = new Router(ROOT_QUERY);
        router.go('/messenger');

        const userController = new UserController();
        userController.getInfo();
      }
    } catch (error) {
      console.error(error);
    }
  }

  public init() {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (form) {
      Validator.setValidation(form, signInValidationRules, this.submitRequest);
    }
  }
}
