import { TProps } from 'types';
import renderTextMessage from './message.tmpl.js';
import styles from './message.module.css';
import Block from '../../../../utils/classes/core/block.ts';

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE'
}

type TOptions = {
  type: MessageType,
  isOutgoing: boolean,
  text: string,
  time: string,
}

class TextMessage extends Block {
  constructor(props: TProps) {
    let className = [styles.chatMessage];

    if (props.isOutgoing) {
      className.push(styles.chatMessageOutgoing);
    }

    super({
      tagName: 'div',
      props,
      className: className,
    });
  }

  render(): string {
    return renderTextMessage(this.props);
  }
}

export default function createMessageBlock(options: TOptions): Block {
  if (options.type === MessageType.TEXT) {
    return new TextMessage({
      text: options.text,
      time: options.time,
      isOutgoing: options.isOutgoing
    });
  } else {
    throw new Error('Некорректный тип блока сообщения');
  }
}
