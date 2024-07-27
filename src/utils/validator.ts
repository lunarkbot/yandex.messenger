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

  constructor(form: HTMLFormElement, rules: IValidationRule[]) {
    this.form = form;
    this.rules = rules;
  }

  static setValidation(form: HTMLFormElement, rules: IValidationRule[]): void {
    const validator = new Validator(form, rules);
    validator.init();
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
    this.form.addEventListener('submit', this.handleSubmit.bind(this));

    Object.keys(this.formElements).forEach((fieldName) => {
      this.formElements[fieldName].field.addEventListener('blur', this.handleBlur(fieldName));
    });
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
      this.logFormValues();
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

  private logFormValues(): void {
    const formValues: { [key: string]: string } = {};

    Object.keys(this.formElements).forEach((fieldName) => {
      formValues[fieldName] = this.formElements[fieldName].field.value;
    });

    // eslint-disable-next-line no-console
    console.log(formValues);
  }
}
