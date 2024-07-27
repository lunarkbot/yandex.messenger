import renderNavigation from './navigation.tmpl.js';
import styles from './navigation.module.css';
import { IBlock, TProps } from 'types';
import Block from '../../utils/block.ts';

export const navigationLinkClassName: string = styles.link;

class Navigation extends Block {
  constructor(props: TProps) {
    super('nav', props, styles.page);
  }

  render(): string {
    return renderNavigation(this.props);
  }
}

const navigation:IBlock = new Navigation({});

export default navigation;
