import { TProps } from 'types';
import renderContactList from './contactList.tmpl.js';
import styles from './contactList.module.css';
import Block from '../../../../utils/classes/core/block.ts';
import ContactListItem from '../contactListItem/index.ts';
import getRandomObject from '../../../../utils/helpers/mock.ts';

export const contactListClassName = styles.contactList;

class ContactList extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'ul',
      props,
      className: [contactListClassName, 'light-scrollbar'],
    });
  }

  render(): string {
    return renderContactList(this.props);
  }
}

const contactListItems: Block[] = [];
for (let i = 0; i < 3; i += 1) {
  contactListItems.push(new ContactListItem(getRandomObject()));
}

const contactList = new ContactList({
  contactList: contactListItems,
});

// setTimeout(() => {
//   for (let i = 0; i < 3; i += 1) {
//     contactListItems.push(new ContactListItem(getRandomObject()));
//   }
//
//   contactList.setProps({
//     contactList: contactListItems,
//   });
// }, 5000)
//
// setTimeout(() => {
//   for (let i = 0; i < 3; i += 1) {
//     contactListItems.push(new ContactListItem(getRandomObject()));
//   }
//
//   contactList.setProps({
//     contactList: contactListItems,
//   });
// }, 10000)

export default contactList
