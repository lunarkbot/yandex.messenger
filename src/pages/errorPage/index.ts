import { TProps } from 'types';
import renderServerError from './errorPage.tmpl.js';
import Block from '../../utils/classes/core/block.ts';

export default class ErrorPage extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'div',
      props,
      type: 'page',
    });
  }

  render(): string {
    return renderServerError(this.props);
  }
}
