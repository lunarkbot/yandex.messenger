import { render } from '../../helpers';
import Block from '../core/block.ts';

type TRouteProps = {
  rootQuery: string;
}

export default class Route {
  private _pathname: string;

  private _blockClass: any;

  private _block: any | null;

  private _props: TRouteProps;

  constructor(pathname: string, view: any, props: TRouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  private _isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return this._isEqual(pathname, this._pathname);
  }

  render(): void {
    if (!this._block) {
      if (this._blockClass instanceof Block) {
        this._block = this._blockClass;
        render(this._props.rootQuery, this._block);
      } else {
        this._block = new this._blockClass();
        render(this._props.rootQuery, this._block);
      }
      return;
    }

    this._block.show();
  }
}
