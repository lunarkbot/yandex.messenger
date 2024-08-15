import { SignUpModel } from 'types/models.ts';
import AuthSignUpAPI from '../api/authSignUpApi.ts';
import {
  emailValidationRule,
  getPasswordInputValidationRule, getTextInputValidationRule,
  loginValidationRule, passwordCheckValidationRule, phoneValidationRule,
} from '../utils/helpers/validationRules.ts';
import { IValidationRule } from 'types';
import Validator from '../utils/classes/validation/validator.ts';
import Router from '../utils/classes/routing/router.ts';
import store from '../utils/classes/store/store.ts';
import { ROOT_QUERY } from '../constants.ts';
import UserController from './userController.ts';

const formId = 'signUpForm';
const AuthSignUpApi = new AuthSignUpAPI();
const signUpValidationRules: IValidationRule[] = [
  getTextInputValidationRule('first_name'),
  getTextInputValidationRule('second_name'),
  loginValidationRule,
  emailValidationRule,
  phoneValidationRule,
  passwordCheckValidationRule,
  getPasswordInputValidationRule('password'),
];

export default class AuthSignUpController {
  private async submitRequest(data: SignUpModel) {
    try {
      const result = await AuthSignUpApi.request(data);

      if (result.hasOwnProperty('id')) {
        store.set('user', {
          id: result.id,
        });
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
    console.log('form', form);
    if (form) {
      Validator.setValidation(form, signUpValidationRules, this.submitRequest, ['passwordCheck']);
    }
  }
}
