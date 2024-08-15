import { IValidationRule } from 'types';

interface IFormElements {
    [key: string]: {
      field: HTMLInputElement;
      errorLabel: HTMLSpanElement;
    }
}

export default class Validator {
  private form: HTMLFormElement;

  private rules: IValidationRule[] = [];

  private errors: { [key: string]: string } = {};

  private formElements: IFormElements = {};

  private eventHandlers: { [key: string]: EventListener } = {};

  private submitRequest: (data: any) => void;

  private exceptions?: string[];

  // eslint-disable-next-line no-use-before-define
  private static instances: Map<HTMLFormElement, Validator> = new Map();

  constructor(
    form: HTMLFormElement,
    rules: IValidationRule[],
    sumitRequest: (data: any) => void,
    exceptions?: string[]) {

    this.form = form;
    this.rules = rules;
    this.submitRequest = sumitRequest;
    this.exceptions = exceptions;
  }

  static setValidation(
    form: HTMLFormElement,
    rules: IValidationRule[],
    submitRequest: (data: any) => void,
    exceptions?: string[]
  ): Validator {
    if (Validator.instances.has(form)) {
      return Validator.instances.get(form)!;
    }

    const validator = new Validator(form, rules, submitRequest, exceptions);
    validator.init();
    Validator.instances.set(form, validator);
    return validator;
  }

  private init() {
    this.getFormElements();
    this.addEvents();
  }

  private getFormElements() {
    this.rules.forEach((rule: IValidationRule) => {
      const field = this.form.querySelector(`[name=${rule.field}]`) as HTMLInputElement;
      const errorLabel = this.form.querySelector(`[data-error=${rule.field}]`) as HTMLSpanElement;

      if (field) {
        this.formElements[rule.field] = { field, errorLabel };
      }
    });
  }

  private findRuleByField(field: string): IValidationRule {
    const result = this.rules.find((rule) => rule.field === field);

    if (!result) {
      throw new Error(`Rule for field ${field} not found`);
    }

    return result;
  }

  private addEvents() {
    const submitHandler = this.handleSubmit.bind(this);
    this.form.addEventListener('submit', submitHandler);
    this.eventHandlers.submit = submitHandler;

    Object.keys(this.formElements).forEach((fieldName) => {
      const handler = this.handleBlur(fieldName);
      this.formElements[fieldName].field.addEventListener('blur', handler);
      this.eventHandlers[`blur-${fieldName}`] = handler;
    });

    //addEventListener('popstate', this.removeAllEventListeners.bind(this), { once: true });
  }

  private handleBlur = (fieldName: string) => (event: Event) => {
    if (fieldName === 'passwordCheck') return;

    const field = event.target as HTMLInputElement;
    const rule = this.findRuleByField(fieldName);

    const isValid = this.validateField(field, rule);

    if (!isValid) {
      this.showValidationResult(fieldName);
    }
  };

  private handleSubmit(event: Event) {
    event.preventDefault();
    let isValid: boolean = true;

    this.rules.forEach((rule) => {
      if (!this.validateField(this.formElements[rule.field].field, rule)) {
        isValid = false;
      }
    });

    if (!isValid) {
      this.showValidationResult();
    } else {
      this.submitRequest(this.getFormData());
    }
  }

  private validateField(field: HTMLInputElement, rule: IValidationRule): boolean {
    const isValid: boolean = rule.method(field.value);

    if (!isValid) {
      this.errors[rule.field] = rule.message;
      field.setAttribute('data-valid', 'false');
    } else {
      this.errors[rule.field] = '';
      field.removeAttribute('data-valid');
    }

    return isValid;
  }

  private showValidationError(fieldName: string): void {
    if (this.formElements[fieldName].errorLabel) {
      this.formElements[fieldName].errorLabel.textContent = this.errors[fieldName];
    } else {
      this.formElements[fieldName].field.setCustomValidity(this.errors[fieldName]);
      this.formElements[fieldName].field.reportValidity();
    }

    // eslint-disable-next-line no-console
    console.log(this.errors[fieldName]);
  }

  private showValidationResult(fieldName: string | null = null): void {
    if (fieldName) {
      this.showValidationError(fieldName);
    } else {
      Object.keys(this.errors).forEach((key) => {
        if (this.errors[key]) this.showValidationError(key);
      });
    }
  }

  private getFormData(): string {
    const formValues: { [key: string]: string } = {};

    this.getFormElements();

    Object.keys(this.formElements).forEach((fieldName) => {
      if (this.exceptions && this.exceptions.includes(fieldName)) return;
      formValues[fieldName] = this.formElements[fieldName].field.value;
    });

    // eslint-disable-next-line no-console
    return JSON.stringify(formValues);
  }

  //
}
