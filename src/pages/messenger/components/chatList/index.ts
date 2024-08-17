import { TProps } from 'types';
import renderContactList from './chatList.tmpl.js';
import styles from './chatList.module.css';
import Block from '../../../../utils/classes/core/block.ts';
import ChatListItem from '../chatListItem/index.ts';
import getRandomObject from '../../../../utils/helpers/mock.ts';
import connect from '../../../../hoc/connect.ts';

export const chatListClassName = styles.chatList;

class ChatList extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'ul',
      props,
      className: [chatListClassName, 'light-scrollbar'],
    });
  }

  render(): string {
    return renderContactList(this.props);
  }
}

const chatListItems: Block[] = [];
for (let i = 0; i < 3; i += 1) {
  chatListItems.push(new ChatListItem(getRandomObject()));
}

const chatListWithStore = connect((state) => {
  return {
    chatList: state?.chats?.items || []
  }
})(ChatList);

const chatList = new chatListWithStore({
  chatList: chatListItems,
});

// setTimeout(() => {
//   for (let i = 0; i < 3; i += 1) {
//     chatListItems.push(new ChatListItem(getRandomObject()));
//   }
//
//   contactList.setProps({
//     contactList: chatListItems,
//   });
// }, 5000)
//
// setTimeout(() => {
//   for (let i = 0; i < 3; i += 1) {
//     chatListItems.push(new ChatListItem(getRandomObject()));
//   }
//
//   contactList.setProps({
//     contactList: chatListItems,
//   });
// }, 10000)

export default chatList
