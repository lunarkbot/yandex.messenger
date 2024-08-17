import { MessageModel } from 'types/models.ts';
import { IValidationRule } from 'types';
import Validator from '../utils/classes/validation/validator.ts';
import { chatMessageValidationRule } from '../utils/helpers/validationRules.ts';
import { addSearchChat } from '../utils/helpers/index.ts';
import { searchClasses } from '../pages/messenger/index.ts';
import { chatClassName } from '../pages/messenger/components/chat/index.ts';
import ChatsAPI from '../api/chatsApi.ts';
import store from '../utils/classes/store/store.ts';
const formId = 'chatMessage';
const messengerValidationRules: IValidationRule[] = [
  chatMessageValidationRule,
];

const chatsAPI = new ChatsAPI();

export default class MessengerController {
  private form: null | HTMLFormElement;
  private chat: null | HTMLDivElement;

  constructor() {
    this.form = null;
    this.chat = null;
  }

  public init() {
    this.form = document.getElementById(formId) as HTMLFormElement;
    this.chat = document.querySelector(`.${chatClassName}`) as HTMLDivElement;

    if (this.form) {
      Validator.setValidation(this.form, messengerValidationRules, this.sendMessage);
    }

    if (this.chat) {
      this.observeMutation();
    }

    addSearchChat(searchClasses.inputClassName, searchClasses.listClassName, searchClasses.listItemsClassName);

    this.getChats();
  }

  private async getChats() {
    const result = await chatsAPI.getChats();

    if (result.status === 404) {
      store.set('chats', {
        items: null,
      });
    }
  }

  private observeMutation() {
    const config = { childList: true };

    const observer = new MutationObserver(this.scrollToEnd.bind(this));

    // @ts-ignore
    observer.observe(this.chat, config);
  }

  public scrollToEnd() {
    // @ts-ignore
    this.chat.scrollTo({ top: this.chat.scrollHeight, behavior: 'smooth' });
  }

  private async sendMessage(message: MessageModel) {
    console.log(message);
  }
}
