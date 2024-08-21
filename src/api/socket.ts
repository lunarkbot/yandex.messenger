import { TSocketMessage } from 'types';
import MessengerController, { ValidationType } from '../controllers/messengerController.ts';
import store from '../utils/classes/store/store.ts';
import isPlainObject from '../utils/helpers/isPlainObject.ts';
import { parseJSON } from '../utils/helpers/index.ts';

type TSocketConnectConfig = {
    chatId?: string;
    userId?: string;
    token?: string;
    url?: string;
}

class Socket {
  private socket: WebSocket | null;

  private readonly baseUrl: string;

  private isConnected: boolean;

  private url: string | null;

  constructor() {
    this.baseUrl = 'wss://ya-praktikum.tech/ws/chats';
    this.socket = null;
    this.isConnected = false;
    this.url = null;
  }

  public connect(config: TSocketConnectConfig) {
    if (!config.url) {
      const { chatId, userId, token } = config;
      this.url = `${this.baseUrl}/${userId}/${chatId}/${token}`;
    }

    const url = config?.url ? config.url : this.url as string;

    this.close();
    this.socket = new WebSocket(url);
    this.addListeners();
  }

  private getMessages() {
    this.send({
      content: '0',
      type: 'get old',
    });
  }

  private addListeners() {
    if (!this.socket) {
      throw new Error('Socket is not defined');
    }

    this.socket.addEventListener('open', this.onOpen.bind(this));
    this.socket.addEventListener('close', this.onClose.bind(this));
    this.socket.addEventListener('message', this.onMessage.bind(this));
    this.socket.addEventListener('error', this.onError.bind(this));
  }

  private onOpen(): void {
    console.log('Соединение установлено');

    MessengerController.setValidation(ValidationType.CHAT_MESSAGE);

    this.isConnected = true;
    this.getMessages();
  }

  private onClose(event: CloseEvent): void {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      if (this.url) {
        this.connect({ url: this.url });
      }
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);

    this.isConnected = false;
  }

  private onMessage(event: MessageEvent): void {
    const data = parseJSON(event.data);
    if (Array.isArray(data)) {
      store.set('messages', data.reverse());
    } else if (isPlainObject(data) && data.type === 'message') {
      const messages = store.getState()?.messages || [];

      store.set('messages', [...messages, data]);
    }

    MessengerController.setValidation(ValidationType.CHAT_MESSAGE);
    console.log('Получены данные', event.data);
  }

  onError(event: Event): void {
    const errorEvent = event as ErrorEvent;
    console.log('Ошибка', errorEvent.message);
  }

  public send(data: TSocketMessage) {
    if (this.isConnected && this.socket) {
      this.socket.send(JSON.stringify(data));
    } else {
      throw new Error('Socket is not connected');
    }
  }

  public close() {
    if (this.socket && this.isConnected) {
      this.socket.close(1000, 'Работа закончена');
    }
  }
}

export default new Socket();
