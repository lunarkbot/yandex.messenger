import { TProps } from 'types';
import renderAvatar from './avatar.tmpl.js';
import Block from '../../utils/classes/core/block.ts';
import styles from './avatar.module.css';

export default class Avatar extends Block {
  constructor(props: TProps, handler?: (event: Event) => void) {
    const classes = [styles.avatar];
    if (props.isUploadDisabled) {
      classes.push(styles.uploadDisabled);
    }
    if (props.isAvatarEmpty) {
      classes.push(styles.avatarEmpty);
    }

    const events = handler ? { change: handler } : undefined;

    super({
      tagName: props.isUploadDisabled ? 'div' : 'form',
      className: classes,
      props,
      events,
    });
  }

  render(): string {
    return renderAvatar(this.props);
  }
}
