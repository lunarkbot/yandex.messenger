import { TProps } from 'types';
import buttonRender from './button.tmpl.js';
import Block from '../../utils/block.ts';

export default class Button extends Block {
  constructor(props: TProps) {
    super('div', props);
  }

  render(): string {
    return buttonRender(this.props);
  }
}
