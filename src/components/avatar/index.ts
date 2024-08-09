import { TProps } from 'types';
import renderAvatar from './avatar.tmpl.js';
import Block from '../../utils/classes/core/block.ts';

export default class Avatar extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'div',
      props,
    });
  }

  render(): string {
    return renderAvatar(this.props);
  }
}
