export interface ITemplate {
  [key:string]: string;
}

export interface IValidationRule {
  field: string;
  // eslint-disable-next-line no-unused-vars
  method: (value: string) => boolean;
  message: string;
}
