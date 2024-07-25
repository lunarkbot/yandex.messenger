import { ITemplate } from 'types';

import input from '../components/input';
import profileInput from '../components/profileInput';

export function getTemplateHtml(
  values: ITemplate,
  context: ITemplate,
  // eslint-disable-next-line
  render: (context: ITemplate) => string,
): string {
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

export function render(query: string, block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();
  return root;
}
