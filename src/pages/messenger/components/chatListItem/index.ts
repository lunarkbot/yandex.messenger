import { TProps } from 'types';
import renderContactListItem from './chatListItem.tmpl.js';
import styles from './chatListItem.module.css';
import Block from '../../../../utils/classes/core/block.ts';
import escapeHtml from '../../../../utils/helpers/escapeHTML.ts';
import store from '../../../../utils/classes/store/store.ts';

export const listItemsClassName = styles.chatListItem;
const listItemsActiveClassName = styles.chatListItemActive;

export default class contactListItem extends Block {


  constructor(props: TProps) {
    super({
      tagName: 'li',
      props,
      className: store.getState()?.chat?.active?.id === props.id
        ? [listItemsClassName, listItemsActiveClassName]
        : listItemsClassName,
      attributes: {
        id: props.id,
        title: escapeHtml(props.title),
      }
    });
  }

  render(): string {
    return renderContactListItem(this.props);
  }
}
