import { TProps } from 'types';
import renderContactListItem from './chatListItem.tmpl.js';
import styles from './chatListItem.module.css';
import Block from '../../../../utils/classes/core/block.ts';

export const listItemsClassName = styles.chatListItem;

export default class contactListItem extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'li',
      props,
      className: listItemsClassName,
    });
  }

  render(): string {
    return renderContactListItem(this.props);
  }
}
