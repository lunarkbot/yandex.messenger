import { MessageModel } from 'types/models.ts';
import { IValidationRule } from 'types';
import Validator from '../utils/classes/validation/validator.ts';
import { chatMessageValidationRule } from '../utils/helpers/validationRules.ts';
import { addSearchContact } from '../utils/helpers/index.ts';
import { searchClasses } from '../pages/messenger/index.ts';

const formId = 'chatMessage';
const messengerValidationRules: IValidationRule[] = [
  chatMessageValidationRule,
];

export default class MessengerController {
  public init() {
    const form = document.getElementById(formId) as HTMLFormElement;

    if (form) {
      Validator.setValidation(form, messengerValidationRules, this.sendMessage);
    }
    addSearchContact(searchClasses.inputClassName, searchClasses.listClassName, searchClasses.listItemsClassName);
  }

  private async sendMessage(message: MessageModel) {
    console.log(message);
  }
}
