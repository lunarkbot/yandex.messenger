import { TProps } from 'types';
import inputRender from './input.tmpl.js';
import Block from '../../utils/block.ts';

export default class Input extends Block {
  constructor(props: TProps) {
    super('div', props);
  }

  render(): string {
    return inputRender(this.props);
  }
}
