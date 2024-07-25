import renderNavigation from './navigation.tmpl.js';
import styles from './navigation.module.css';
import Test from '../../components/test/index.ts'
import { TProps } from 'types';
import Block from '../../utils/block.ts';

export const navigationLinkClassName: string = styles.link;


const test = new Test({
  text: 'test 1',
});

const test2 = new Test({
  text: 'test 2',
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

export const navigationTwo = new Navigation(navigationContext);

setTimeout(() => {
  test.setProps({
    text: 'wow',
  })

  navigationTwo.setProps({
    testButton2: test2,
  })

},2000)



const navigation:string = renderNavigation(navigationContext);

export default navigation;
