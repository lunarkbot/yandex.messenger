import { TProps } from 'types';
import EventBus from './eventBus';

type TMeta<Props> = {
  tagName: string;
  props: Props;
  className?: string;
}

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

  constructor(tagName: string = 'div', props: Props = {} as Props, className?: string) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      className,
      props,
    };

    this.props = this._makePropsProxy(props);

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
    const { tagName, className } = this._meta;
    this._element = this._createDocumentElement(tagName, className);
  }

  public init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  public componentDidMount(_oldProps?: TProps): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    // eslint-disable-next-line
    console.log(response);
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

      // Проверяем, есть ли в props компоненты
      Object.entries(this.props).forEach(([key, prop]) => {
        if (prop instanceof Block) {
          const placeholder = this._element!.querySelector(`[data-component="${key}"]`);
          if (placeholder) {
            placeholder.replaceWith(prop.getContent()!);
          }
        }
      });
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

  private _createDocumentElement(tagName: string, className: string | undefined): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName);
    if (className) element.classList.add(className);

    return element;
  }

  public show(): void {
    const content = this.getContent();
    if (content) content.style.display = 'block';
  }

  public hide(): void {
    const content = this.getContent();
    if (content) content.style.display = 'none';
  }
}
