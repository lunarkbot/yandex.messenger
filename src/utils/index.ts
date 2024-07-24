import { Template } from 'types';

import input from '../components/input';
import profileInput from '../components/profileInput';

export function getTemplateHtml(values: Template, context: Template, render: Function): string {
  Object.keys(values).forEach((key) => {
    context[key] = values[key];
  });

  return render(context);
}

export function getInputHtml(name:string, placeholder:string, type:string = 'text'): string {
  return getTemplateHtml(
    { name, placeholder, type },
    input.inputContext,
    input.inputRender,
  );
}

export function getProfileInputHtml(name:string, value:string, type:string = 'text') {
  return getTemplateHtml(
    { name, value, type },
    profileInput.inputContext,
    profileInput.inputRender,
  );
}
