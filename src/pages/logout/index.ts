import { TProps } from 'types';
import renderLogoutPage from './logout.tmpl.js';
import Block from '../../utils/classes/core/block.ts';
import logoutController from '../../controllers/logoutController.ts';

export default class logoutPage extends Block {
  constructor(props: TProps) {
    super({
      tagName: 'div',
      props,
      type: 'page',
      controller: logoutController,
    });
  }

  render(): string {
    return renderLogoutPage(this.props);
  }
}
