import renderNavigation from './navigation.tmpl.js';
import styles from './navigation.module.css';
import Test from '../../components/test/index.ts'
import { IBlock, TProps } from 'types';
import Block from '../../utils/block.ts';

export const navigationLinkClassName: string = styles.link;


const test = new Test({
  text: 'test 1',
});

class Navigation extends Block {
  constructor(props: TProps) {
    super('div', props);
  }

  render(): string {
    return renderNavigation(this.props);
  }
}

const navigationContext = {
  testButton: test
}



const navigation:IBlock = new Navigation(navigationContext);

export default navigation;
