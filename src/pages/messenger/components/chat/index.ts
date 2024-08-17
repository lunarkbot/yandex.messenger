import { TProps } from 'types';
import renderChat from './chat.tmpl.js';
import styles from './chat.module.css';
import Block from '../../../../utils/classes/core/block.ts';
import createMessageBlock, { MessageType } from '../message/index.ts';
import connect from '../../../../hoc/connect.ts';
import store from '../../../../utils/classes/store/store.ts';

export const chatClassName = styles.chat;

class Chat extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'div',
      props,
      className: [chatClassName, 'light-scrollbar'],
    });
  }

  render(): string {
    return renderChat(this.props);
  }
}

const messages: Block[] = [];

messages.push(createMessageBlock({
  text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической \n' +
    '                истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. \n' +
    '                Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер \n' +
    '                все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
    '                Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и \n' +
    '                не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
  time: '15:00',
  isOutgoing: false,
  type: MessageType.TEXT,
}));

messages.push(createMessageBlock({
  text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической \n' +
    '                истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. \n' +
    '                Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер \n' +
    '                все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
    '                Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и \n' +
    '                не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
  time: '15:00',
  isOutgoing: true,
  type: MessageType.TEXT,
}));

messages.push(createMessageBlock({
  text: 'Hello, world!',
  time: '15:00',
  isOutgoing: false,
  type: MessageType.TEXT,
}));

store.set('chat', {
  messages: messages
});

//store.set('messages', messages);

const chatWithStore = connect((state) => ({
  messages: state.chat.messages,
}))(Chat);

const chat = new chatWithStore({
  messages
});

export default chat;
