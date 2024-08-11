import { IBlock, TProps } from 'types';
import renderNavigation from './navigation.tmpl.js';
import styles from './navigation.module.css';
import Block from '../../utils/classes/core/block.ts';
import connect from '../../hoc/connect.ts';

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

const withUser = connect(state => ({
  name: state.user.name,
  email: state.user.email
}));

const navigationWithUser = withUser(Navigation);
const navigation: IBlock = new navigationWithUser({});

export default navigation;
