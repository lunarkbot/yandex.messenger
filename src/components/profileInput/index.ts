import { TProps } from 'types';
import inputRender from './input.tmpl.js';
import Block from '../../utils/block.ts';

export default class ProfileInput extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'div',
      props,
    });
  }

  render(): string {
    return inputRender(this.props);
  }
}
