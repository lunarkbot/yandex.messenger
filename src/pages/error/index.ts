import renderServerError from './error.tmpl.js';
import Block from '../../utils/block.ts';
import { TProps } from 'types';

export default class ErrorPage extends Block {
  constructor(props: TProps) {
    super('div', props);
  }

  render(): string {
    return renderServerError(this.props);
  }
}
