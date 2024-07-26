import { IBlock, ITemplate } from 'types';

import ProfileInput from '../components/profileInput';
import Input from '../components/input';

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

export function getInput(name:string, placeholder:string, type:string = 'text') {
  return new Input({
    name,
    placeholder,
    type
  });
}

export function getProfileInput(name:string, value:string, type:string = 'text') {
  return new ProfileInput({
    name,
    value,
    type
  });
}

export function clearNode(node: Element): void {
  node.innerHTML = '';
}

export function render(query: string, block: IBlock) {
  const root = document.querySelector(query);
  if (!root) return;
  clearNode(root);

  root.appendChild(block?.getContent());
  block.dispatchComponentDidMount();

  return root;
}
