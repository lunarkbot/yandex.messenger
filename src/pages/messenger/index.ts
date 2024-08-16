import { TProps } from 'types';
import renderMessenger from './messenger.tmpl.js';
import { listItemsClassName } from './components/contactListItem';
import Block from '../../utils/classes/core/block.ts';
import styles from './messenger.module.css';
import MessengerController from '../../controllers/messengerController.ts';
import contactList, { contactListClassName } from './components/contactList/index.ts';
import chat from './components/chat/index.ts';

export const searchClasses = {
  inputClassName: styles.searchInput,
  listClassName: contactListClassName,
  listItemsClassName,
};

class Messenger extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'div',
      props,
      className: styles.messenger,
      type: 'page',
      controller: MessengerController,
    })
  }

  render(): string {
    return renderMessenger(this.props);
  }
}



const messenger = new Messenger({
  contactList: contactList,
  name: 'Messenger',
  chat
});


export default messenger;
