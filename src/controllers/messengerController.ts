import { IValidationRule, TSocketMessage } from 'types';
import Validator from '../utils/classes/validation/validator.ts';
import { chatMessageValidationRule, getChatInputValidationRule } from '../utils/helpers/validationRules.ts';
import { addSearchChat, parseJSON } from '../utils/helpers/index.ts';
import {
  modalDeleteUser, searchClasses,
  modalNewChat,
  modalAddUser,
} from '../pages/messenger/index.ts';
import { chatClassName } from '../pages/messenger/components/chat/index.ts';
import ChatsAPI from '../api/chatsApi.ts';
import UserProfileApi from '../api/userProfileApi.ts';
import store from '../utils/classes/store/store.ts';
import Socket from '../api/socket.ts';
import updateLastMessageContent from '../utils/helpers/updateLastMessage.ts';

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

  private attemptCounter: number;

  constructor() {
    this.chat = null;
    this.attemptCounter = 10;
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
    const userJSON = parseJSON(data);
    const login = userJSON?.login as string;
    const userData = await this.getUserId(data, login);

    if (userData.userId) {
      modalAddUser.hideModal();

      const chatId = store.getState()?.chat?.active?.id;
      const requestData = {
        users: [userData.userId],
        chatId,
      };

      await chatsAPI.addUser(JSON.stringify(requestData));
    } else {
      modalAddUser.setProps({
        error: userData.error,
      });
    }

    this.setValidation(ValidationType.ADD_USER);
  }

  private async deleteUser(data: string) {
    const userJSON = parseJSON(data);
    const login = userJSON?.login as string;
    const userData = await this.getUserId(data, login);

    if (userData.userId) {
      modalDeleteUser.hideModal();

      const chatId = store.getState()?.chat?.active?.id;
      const requestData = {
        users: [userData.userId],
        chatId,
      };

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

  public async getMessages(userId?:string | null, chatId?:string | null) {
    if (!chatId || !userId) {
      this.getDataForToken();
      return;
    }

    let token = null;
    const data = await this.getToken(chatId);
    if (data?.token) {
      token = data.token;
    } else {
      throw new Error('Token not found');
    }

    Socket.connect({
      chatId, userId, token,
    });
  }

  private getToken(chatId: string) {
    return chatsAPI.getToken(chatId);
  }

  private getDataForToken() {
    const { chat, user } = store.getState();

    if (!chat || !user) {
      setTimeout(() => {
        this.getDataForToken();
      }, 200);
      this.attemptCounter -= 1;
      return;
    }

    this.attemptCounter = 10;

    if (!chat || !user) {
      throw new Error('User or chat id not found');
    } else if (user?.id && chat?.active?.id) {
      this.getMessages(user.id, chat.active?.id);
    }
  }

  private async createChat(data: string) {
    modalNewChat.hideModal();

    const json = parseJSON(data);
    const newChatData = {
      title: json?.title,
    };
    const chats = store.getState()?.chats?.items || [];

    store.set('chats', {
      items: [newChatData, ...chats],
    });

    await chatsAPI.createChat(data);
    await this.getChats();
  }

  private async getChats() {
    const result = await chatsAPI.getChats();

    if (result.status === 200) {
      store.set('chats', {
        items: result.response,
      });
    }
  }

  private observeMutation() {
    const config = { childList: true };

    const observer = new MutationObserver(this.scrollToEnd.bind(this));

    // @ts-expect-error: : `observe` может не поддерживать тип `this.chat`
    observer.observe(this.chat, config);
  }

  public scrollToEnd() {
    // @ts-expect-error: Необходимо для обхода ошибки типов
    this.chat.scrollTo({ top: this.chat.scrollHeight, behavior: 'instant' });
  }

  private async sendMessage(content: string) {
    const textArea = document.querySelector(`#${formId} [name="message"]`) as HTMLTextAreaElement;
    const contentJson = parseJSON(content);

    if (!contentJson) {
      return;
    }

    const message = contentJson?.message as string;

    updateLastMessageContent(message);

    const data: TSocketMessage = {
      content: message,
      type: 'message',
    };
    Socket.send(data);

    if (textArea) {
      textArea.value = '';
    }
  }

  public setValidation(type: ValidationType) {
    if (type === ValidationType.NEW_CHAT) {
      const newChatForm = document.getElementById(newChatFormId) as HTMLFormElement;
      if (newChatForm) {
        Validator.setValidation(
          newChatForm,
          [getChatInputValidationRule('title')],
          this.createChat.bind(this),
        );
      }
    } else if (type === ValidationType.ADD_USER) {
      const addUserForm = document.getElementById(addUserFormId) as HTMLFormElement;
      if (addUserForm) {
        Validator.setValidation(
          addUserForm,
          [getChatInputValidationRule('login')],
          this.addUser.bind(this),
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
          this.deleteUser.bind(this),
        );
      }
    }
  }
}

export default new MessengerController();
