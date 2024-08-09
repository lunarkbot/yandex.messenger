import { IBlock, TProps } from 'types';
import renderNavigation from './navigation.tmpl.js';
import styles from './navigation.module.css';
import Block from '../../utils/classes/core/block.ts';

export const navigationLinkClassName: string = styles.link;

class Navigation extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'nav',
      props,
      className: styles.page,
    });
  }

  render(): string {
    return renderNavigation(this.props);
  }
}

const navigation:IBlock = new Navigation({});

export default navigation;
