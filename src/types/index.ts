export interface ITemplate {
  [key:string]: string;
}

export type TProps = {
  [key: string]: any;
}

export interface IValidationRule {
  field: string;
  // eslint-disable-next-line no-unused-vars
  method: (value: string) => boolean;
  message: string;
}

export interface IBlock {
    getContent: () => HTMLElement;
    dispatchComponentDidMount: () => void;
    setProps: (props: TProps) => void;
}
