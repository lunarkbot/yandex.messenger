import { TProps } from 'types';
import renderContactList from './chatList.tmpl.js';
import styles from './chatList.module.css';
import Block from '../../../../utils/classes/core/block.ts';
import ChatListItem from '../chatListItem/index.ts';
import connect from '../../../../hoc/connect.ts';
import MessengerController,
{ ValidationType } from '../../../../controllers/messengerController.ts';
import store from '../../../../utils/classes/store/store.ts';

export const chatListClassName = styles.chatList;

class ChatList extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'ul',
      props,
      className: [chatListClassName, 'light-scrollbar'],
      events: {
        click: (event: Event) => {
          const target = event.target as HTMLElement;

          if (target?.hasAttribute('data-id')) {
            const active = {
              id: Number(target.getAttribute('data-id')),
              title: target.getAttribute('data-title'),
            };

            store.set('chat', {
              active,
            });

            store.set('messages', []);

            sessionStorage.setItem('activeChat', JSON.stringify(active));

            MessengerController.getMessages();

            setTimeout(() => {
              MessengerController.setValidation(ValidationType.CHAT_MESSAGE);
            }, 500);
          }
        },
      },
    });
  }

  render(): string {
    return renderContactList(this.props);
  }
}

const ChatListWithStore = connect((state) => {
  const chatList = state?.chats?.items.map((item: any) => new ChatListItem({
    ...item,
    unread_count: item?.unread_count || '',
    last_message: item?.last_message?.content || '...Напишите свое первое сообщение',
  })) || [];

  return {
    chatList,
  };
})(ChatList);

const chatList = new ChatListWithStore({
  chatList: [],
});

export default chatList;
