import { TProps } from 'types';
import renderAvatar from './avatar.tmpl.js';
import Block from '../../utils/block.ts';

export default class Avatar extends Block {
  constructor(props: TProps) {
    super('div', props);
  }

  render(): string {
    return renderAvatar(this.props);
  }
}
