import renderContactListItem from './contactListItem.tmpl.js';
import styles from './contactListItem.module.css';
import Block from '../../../../utils/block.ts';
import { TProps } from 'types';

export const listItemsClassName = styles.contactListItem;

export default class contactListItem extends Block {
  constructor(props: TProps) {
    super('li', props, listItemsClassName);
  }

  render(): string {
    return renderContactListItem(this.props);
  }
}
