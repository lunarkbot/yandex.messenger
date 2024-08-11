import EventBus from '../events/eventBus.ts';
import set from '../../helpers/set.ts';
import { Indexed } from 'types';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus{
  private state: Indexed = {};

  public getState(): Indexed {
    return this.state;
  }

  public set(path: string, value: unknown): void {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  };
}

export default new Store();
