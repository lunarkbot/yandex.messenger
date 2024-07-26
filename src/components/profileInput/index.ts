import inputRender from './input.tmpl.js';
import Block from '../../utils/block.ts';
import { TProps } from 'types';

export default class ProfileInput extends Block {
  constructor(props: TProps) {
    super('div', props);
  }

  render(): string {
    return inputRender(this.props);
  }
}
