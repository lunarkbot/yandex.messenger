export default class PopstateEventManager {
  // eslint-disable-next-line no-use-before-define
  private static instance: PopstateEventManager;

  private popstateHandlers: { listener: EventListenerOrEventListenerObject, once: boolean }[] = [];

  private originalAddEventListener = window.addEventListener;

  private originalRemoveEventListener = window.removeEventListener;

  private originalPushState = history.pushState;

  private originalReplaceState = history.replaceState;

  private isTriggeringEvent = false;

  private constructor() {
    this.overrideEventListeners();
    this.overrideHistoryMethods();
  }

  public static getInstance(): PopstateEventManager {
    if (!PopstateEventManager.instance) {
      PopstateEventManager.instance = new PopstateEventManager();
    }
    return PopstateEventManager.instance;
  }

  private overrideEventListeners() {
    window.addEventListener = (type: string, listener: EventListenerOrEventListenerObject, options?: boolean
      | AddEventListenerOptions) => {
      if (type === 'popstate') {
        const once = typeof options === 'object' && options?.once === true;
        this.popstateHandlers.push({ listener, once });
      }
      this.originalAddEventListener.call(window, type, listener, options);
    };

    window.removeEventListener = (type: string, listener: EventListenerOrEventListenerObject, options?: boolean
      | EventListenerOptions) => {
      if (type === 'popstate') {
        const index = this.popstateHandlers.findIndex((handler) => handler.listener === listener);
        if (index !== -1) {
          this.popstateHandlers.splice(index, 1);
        }
      }
      this.originalRemoveEventListener.call(window, type, listener, options);
    };
  }

  private overrideHistoryMethods() {
    history.pushState = (...args) => {
      this.originalPushState.apply(history, args);
      if (!this.isTriggeringEvent) {
        this.triggerPopstateEvent();
      }
    };

    history.replaceState = (...args) => {
      this.originalReplaceState.apply(history, args);
      if (!this.isTriggeringEvent) {
        this.triggerPopstateEvent();
      }
    };
  }

  private triggerPopstateEvent() {
    this.isTriggeringEvent = true;
    const event = new PopStateEvent('popstate', { state: history.state });
    this.popstateHandlers.forEach((handler, index) => {
      if (typeof handler.listener === 'function') {
        handler.listener(event);
      } else {
        handler.listener.handleEvent(event);
      }
      if (handler.once) {
        this.popstateHandlers.splice(index, 1);
      }
    });
    this.isTriggeringEvent = false;
  }
}
