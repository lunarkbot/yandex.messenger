import { TProps } from 'types';
import EventBus from '../events/eventBus.ts';

type TEvents = Record<string, (event: Event) => void>

type TMeta<Props> = {
  tagName: string;
  className?: string | string[];
  props?: Props;
  events?: TEvents;
  controller?: any;
  type?: string;
  attributes?: Record<string, string>;
};

export default abstract class Block<Props extends Record<string, any> = Record<string, any>> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;

  private _meta: TMeta<Props>;

  public props: Props;

  private eventBus: () => EventBus;

  private rootPath = document.querySelector('.content');

  constructor(
    options: TMeta<Props>,
  ) {
    const eventBus = new EventBus();
    this._meta = {
      tagName: options?.tagName || 'div',
      className: options?.className,
      props: options?.props || {} as Props,
      events: options?.events || {},
      controller: options?.controller,
      type: options?.type,
      attributes: options?.attributes || {},
    };

    this.props = this._makePropsProxy(this._meta.props as Props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _createResources(): void {
    const { tagName, className, attributes } = this._meta;
    this._element = this._createDocumentElement(tagName, className, attributes);
    this._addEvents();
  }

  private _addEvents(): void {
    const { events } = this._meta;
    if (events && this._element) {
      Object.entries(events).forEach(([event, handler]) => {
        this._element!.addEventListener(event, handler);
      });
    }
  }

  public init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();

    setTimeout(() => {
      this.initController();
    }, 1000);
  }

  // Может переопределять пользователь, необязательно трогать
  public componentDidMount(_oldProps?: TProps): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps): void {
    this.componentDidUpdate(oldProps, newProps);
  }

  // Может переопределять пользователь, необязательно трогать
  public componentDidUpdate(_oldProps: TProps, _newProps: TProps): boolean {
    return true;
  }

  public setProps = (nextProps: TProps): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const block = this.render();

    if (this._element) {
      this._element.innerHTML = block;

      Object.entries(this.props).forEach(([key, prop]) => {
        if (prop instanceof Block) {
          const placeholder = this._element!.querySelector(`[data-component="${key}"]`);
          if (placeholder) {
            placeholder.replaceWith(prop.getContent()!);
          }
        } else if (Array.isArray(prop)) {
          const fragment = document.createDocumentFragment();
          prop.forEach((item) => {
            if (item instanceof Block) {
              fragment.appendChild(item.getContent()!);
            }
          });
          const placeholder = this._element!.querySelector(`[data-component="${key}"]`);
          if (placeholder) {
            placeholder.replaceWith(fragment);
          }
        }
      });
    }
  }

  public initController(): void {
    const { controller } = this._meta;
    if (controller) {
      const controllerInstance = typeof controller === 'function'
        ? new controller()
        : controller;
      controllerInstance.init();
    }
  }

  // Может переопределять пользователь, необязательно трогать
  public render(): string {
    return '';
  }

  public getContent(): HTMLElement {
    if (!this.element) {
      throw new Error('Element is not defined');
    }

    return this.element;
  }

  private _makePropsProxy(props: Props): Props {
    return new Proxy(props, {
      set: (target, prop: string, value) => {
        (target as Record<string, any>)[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        return true;
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }

  private _createDocumentElement(
    tagName: string,
    className: string | string[] | undefined,
    attributes?: Record<string, string>,
  ): HTMLElement {
    const element = document.createElement(tagName);
    if (className) {
      if (Array.isArray(className)) {
        className.forEach((name) => element.classList.add(name));
      } else {
        element.classList.add(className);
      }
    }

    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(`data-${key}`, value);
      });
    }

    return element;
  }

  public show(): void {
    const content = this.getContent();
    if (!content) return;

    if (this._meta.type === 'page' && this.rootPath) {
      this.rootPath.appendChild(content);
      this.initController();
    } else {
      content.classList.remove('hidden');
    }
  }

  public hide(): void {
    if (this._meta.type === 'page' && this.rootPath) {
      this.rootPath.innerHTML = '';
    } else {
      const content = this.getContent();
      if (content) content.classList.add('hidden');
    }
  }
}
