import { TProps } from 'types';
import renderMessenger from './messenger.tmpl.js';
import ContactListItem, { listItemsClassName } from './components/contactListItem';
import Block from '../../utils/block.ts';
import styles from './messenger.module.css';
import getRandomObject from '../../utils/mock.ts';

class Messeger extends Block {
  constructor(props: TProps) {
    super('div', props, styles.messenger);
  }

  render(): string {
    return renderMessenger(this.props);
  }
}

const contactListItems = [];
for (let i = 0; i < 10; i += 1) {
  contactListItems.push(new ContactListItem(getRandomObject()).getContent().outerHTML);
}

export const searchClasses = {
  inputClassName: styles.searchInput,
  listClassName: styles.contactList,
  listItemsClassName,
};

const messenger = new Messeger({
  contactListItem: contactListItems,
});

export default messenger;
