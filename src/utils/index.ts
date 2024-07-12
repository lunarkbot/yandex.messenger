import { Template } from '../types';

import input from '../components/input';
const { inputContext, inputRender } = input;

export function getTemplateHtml(values: Template, context: Template, render: any) {
  for (const key in values) {
    context[key] = values[key];
  }

  return render(context);
}

export function getInputHtml(name:string, placeholder:string, type:string = 'text'): string {
  return getTemplateHtml(
    {name, placeholder, type},
    inputContext,
    inputRender
  )
}
