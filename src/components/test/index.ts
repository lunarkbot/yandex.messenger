import { TProps } from 'types';
import buttonRender from './test.tmpl.js';
import Block from '../../utils/block.ts';

export default class Test extends Block {
  constructor(props: TProps) {
    super('div', props);
  }

  render(): string {
    return buttonRender(this.props);
  }
}
