import { TProps } from 'types';
import renderContactList from './chatList.tmpl.js';
import styles from './chatList.module.css';
import Block from '../../../../utils/classes/core/block.ts';
import ChatListItem from '../chatListItem/index.ts';
import connect from '../../../../hoc/connect.ts';
import MessengerController,
{ ValidationType } from '../../../../controllers/messengerController.ts';
import store from '../../../../utils/classes/store/store.ts';
import { getChatListAvatar } from '../../../../utils/helpers/chatAvatar.ts';
import { findPropertyById } from '../../../../utils/helpers/index.ts';
import { DEFAULT_RESOURCE_URL } from '../../../../constants.ts';

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
            const id = target.getAttribute('data-id') as string;
            const avatar = findPropertyById(store.getState()?.chats?.items, id, 'avatar');

            const active = {
              id: id ? parseInt(id, 10) : 0,
              title: target.getAttribute('data-title'),
              avatar,
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
    avatar: getChatListAvatar({
      src: item?.avatar ? `${DEFAULT_RESOURCE_URL}/${item?.avatar}` : '',
      isAvatarEmpty: !item?.avatar,
    }),
  })) || [];

  return {
    chatList,
  };
})(ChatList);

const chatList = new ChatListWithStore({
  chatList: [],
});

export default chatList;
