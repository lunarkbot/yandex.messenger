import { TProps } from 'types';
import renderHeader from './header.tmpl.js';
import styles from './header.module.css';
import Block from '../../../../utils/classes/core/block.ts';
import connect from '../../../../hoc/connect.ts';

class Header extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'div',
      props,
      className: styles.header,
      events: {
        click: (event) => {
          const target = event.target as HTMLElement;

          const headerButton = document.querySelector(`.${styles.headerMenuButton}`) as HTMLElement;

          if (target && target === headerButton) {
            headerButton.classList.toggle(styles.active);
          } else {
            headerButton?.classList?.remove(styles.active);
          }
        },
      },
    });
  }

  render(): string {
    return renderHeader(this.props);
  }
}

const HeaderWithStore = connect((state) => ({
  title: state?.chat?.active?.title || '',
}))(Header);

const header = new HeaderWithStore({
  title: '',
});

export default header;
