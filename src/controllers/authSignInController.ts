import { SignInModel } from 'types/models.ts';
import AuthSignInAPI from '../api/authSignInApi.ts';
import {
  getPasswordInputValidationRule,
  loginValidationRule,
} from '../utils/helpers/validationRules.ts';
import { IValidationRule } from 'types';
import Validator from '../utils/classes/validation/validator.ts';

const formId = 'signInForm';
const AuthSignInApi = new AuthSignInAPI();
const signInValidationRules: IValidationRule[] = [
  loginValidationRule,
  getPasswordInputValidationRule('password'),
];

export default class AuthSignInController {
  private async submitRequest(data: SignInModel) {
    try {
      const user = await AuthSignInApi.request(data);

      console.log(user);
    } catch (error) {
      console.error(error);
    }
  }

  public init() {
    const form = document.getElementById(formId) as HTMLFormElement;
    console.log(form)
    if (!form) throw new Error('Form not found');

    Validator.setValidation(form, signInValidationRules, this.submitRequest);
  }
}
