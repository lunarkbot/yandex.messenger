import { MessageModel } from 'types/models.ts';
import { IValidationRule } from 'types';
import Validator from '../utils/classes/validation/validator.ts';
import { chatMessageValidationRule, getTextInputValidationRule } from '../utils/helpers/validationRules.ts';
import { addSearchChat } from '../utils/helpers/index.ts';
import { modalDeleteUser, searchClasses } from '../pages/messenger/index.ts';
import { chatClassName } from '../pages/messenger/components/chat/index.ts';
import ChatsAPI from '../api/chatsApi.ts';
import UserProfileApi from '../api/userProfileApi.ts';
import store from '../utils/classes/store/store.ts';
import { getChatInputValidationRule } from '../utils/helpers/validationRules.ts';
import { modalNewChat,
modalAddUser } from '../pages/messenger/index.ts';

const messengerValidationRules: IValidationRule[] = [
  chatMessageValidationRule,
];

const chatsAPI = new ChatsAPI();
const userProfileApi = new UserProfileApi();
const formId = 'chatMessage';
const newChatFormId = 'newChat';
const addUserFormId = 'addUser';
const deleteUserFormId = 'deleteUser';

export enum ValidationType {
  NEW_CHAT = 'NEW_CHAT',
  ADD_USER = 'ADD_USER',
  DELETE_USER = 'DELETE_USER',
  CHAT_MESSAGE = 'CHAT_MESSAGE',
}

type TSearchUser = Record<string, string | null>;

class MessengerController {
  private chat: null | HTMLDivElement;

  constructor() {
    this.chat = null;
  }

  public init() {
    this.chat = document.querySelector(`.${chatClassName}`) as HTMLDivElement;

    // init chat auto scroll
    if (this.chat) {
      this.observeMutation();
    }

    // init chat search
    addSearchChat(searchClasses.inputClassName, searchClasses.listClassName, searchClasses.listItemsClassName);

    // load chats
    this.getChats();

    // validate
    this.setValidation(ValidationType.CHAT_MESSAGE);
    this.setValidation(ValidationType.NEW_CHAT);
    this.setValidation(ValidationType.ADD_USER);
    this.setValidation(ValidationType.DELETE_USER);
  }

  private async addUser(data: string) {
    const login = JSON.parse(data)?.login;
    const userData = await this.getUserId(data, login);

    if (userData.userId) {
      modalAddUser.hideModal();

      const chatId = store.getState()?.chat?.active?.id;
      const requestData = {
        users: [userData.userId],
        chatId,
      }

      await chatsAPI.addUser(JSON.stringify(requestData));
    } else {
      modalAddUser.setProps({
        error: userData.error,
      });
    }

    this.setValidation(ValidationType.ADD_USER);
  }

  private async deleteUser(data: string) {
    const login = JSON.parse(data)?.login;
    const userData = await this.getUserId(data, login);

    if (userData.userId) {
      modalDeleteUser.hideModal();

      const chatId = store.getState()?.chat?.active?.id;
      const requestData = {
        users: [userData.userId],
        chatId,
      }

      await chatsAPI.deleteUser(JSON.stringify(requestData));
    } else {
      modalDeleteUser.setProps({
        error: userData.error,
      });
    }

    this.setValidation(ValidationType.DELETE_USER);
  }

  private async getUserId(data: string, login: string): Promise<TSearchUser> {
    const user: Record<string, any>[] = await this.searchUser(data);
    const result: TSearchUser = {
      userId: null,
      error: null,
    };

    if (user.length === 0) {
      result.error = 'Пользователь с таким логином не найден';
    } else if (user.length > 1) {
      if (user[0]?.login === login) {
        result.userId = user[0]?.id;
      } else {
          result.error = 'Найдено несколько пользователей с таким логином. Уточните запрос';
      }
    } else {
      result.userId = user[0]?.id;
    }

    return result;
  }

  private async searchUser(data: string) {
    return userProfileApi.searchUsers(data);
  }

  private async createChat(data: string) {
    modalNewChat.hideModal();

    const json = JSON.parse(data);
    const newChatData = {
        title: json.title,
    }
    const chats = store.getState()?.chats?.items || [];

    store.set('chats', {
        items: [newChatData, ...chats],
        });

    await chatsAPI.createChat(data);
    await this.getChats();
  }

  private async getChats() {
    const result = await chatsAPI.getChats();
    console.log(result.response)
    if (result.status === 200) {
      store.set('chats', {
        items: result.response,
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

  public setValidation(type: ValidationType) {
    if (type === ValidationType.NEW_CHAT) {
      const newChatForm = document.getElementById(newChatFormId) as HTMLFormElement;
      if (newChatForm) {
        Validator.setValidation(
          newChatForm,
          [getChatInputValidationRule('title')],
          this.createChat.bind(this)
        );
      }
    } else if (type === ValidationType.ADD_USER) {
      const addUserForm = document.getElementById(addUserFormId) as HTMLFormElement;
      if (addUserForm) {
        Validator.setValidation(
          addUserForm,
          [getChatInputValidationRule('login')],
          this.addUser.bind(this)
        );
      }
    } else if (type === ValidationType.CHAT_MESSAGE) {
      const chatForm = document.getElementById(formId) as HTMLFormElement;
      if (chatForm) {
        Validator.setValidation(chatForm, messengerValidationRules, this.sendMessage);
      }
    } else if (type === ValidationType.DELETE_USER) {
      const deleteUserForm = document.getElementById(deleteUserFormId) as HTMLFormElement;
      if (deleteUserForm) {
        Validator.setValidation(
          deleteUserForm,
          [getChatInputValidationRule('login')],
          this.deleteUser.bind(this)
        );
      }
    }
  }
}

export default new MessengerController();
