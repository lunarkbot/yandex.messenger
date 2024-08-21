import { TProps } from 'types';
import renderChat from './chat.tmpl.js';
import styles from './chat.module.css';
import Block from '../../../../utils/classes/core/block.ts';
import createMessageBlock, { MessageType } from '../message/index.ts';
import connect from '../../../../hoc/connect.ts';
import store from '../../../../utils/classes/store/store.ts';
import { getTime } from '../../../../utils/helpers';

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

store.set('chat', {
  messages,
});

const ChatWithStore = connect((state) => {
  const userId = state?.user?.id || 0;
  const messages = state?.messages || [];

  return {
    messages: messages.map((message: Record<string, any>) => {
      const isOutgoing = message.user_id === userId;

      return createMessageBlock({
        text: message.content,
        time: getTime(message.time),
        isOutgoing,
        type: MessageType.TEXT,
      });
    }),
  };
})(Chat);

const chat = new ChatWithStore({
  messages,
});

export default chat;
