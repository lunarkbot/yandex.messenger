import { SignUpModel } from 'types/models.ts';
import AuthSignUpAPI from '../api/authSignUpApi.ts';
import {
  emailValidationRule,
  getPasswordInputValidationRule, getTextInputValidationRule,
  loginValidationRule, passwordCheckValidationRule, phoneValidationRule,
} from '../utils/helpers/validationRules.ts';
import { IValidationRule } from 'types';
import Validator from '../utils/classes/validation/validator.ts';

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
      const user = await AuthSignUpApi.request(data);

      console.log(user);
    } catch (error) {
      console.error(error);
    }
  }

  public init() {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) throw new Error('Form not found');

    Validator.setValidation(form, signUpValidationRules, this.submitRequest, ['passwordCheck']);
  }
}
