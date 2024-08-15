import { TProps } from 'types';
import renderAvatar from './avatar.tmpl.js';
import Block from '../../utils/classes/core/block.ts';
import styles from './avatar.module.css';

export default class Avatar extends Block {
  constructor(props: TProps, handler: (event: Event) => void) {
    super({
      tagName: 'form',
      className: styles.avatar,
      props,
      events: {
        change: handler
      }
    });
  }

  render(): string {
    return renderAvatar(this.props);
  }
}
