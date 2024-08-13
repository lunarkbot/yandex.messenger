import Block from '../utils/classes/core/block.ts';
import store, { StoreEvents } from '../utils/classes/store/store.ts';
import { Indexed } from 'types';

type Constructor<T = {}> = new (...args: any[]) => T;

export default function connect(mapStateToProps: (state: Indexed) => Indexed = (state: Indexed) => state) {
  return function<T extends Constructor<Block>>(Component: T) {
    return class extends Component {
      constructor(...args: any[]) {
        super(...args);

        store.on(StoreEvents.Updated, () => {
          this.setProps({ ...mapStateToProps(store.getState()) });
        });
      }
    }
  }
}
