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

export function addSearchContact(inputClassName: string, listClassName: string, listItemsClassName: string) {
  const searchInput = document.querySelector(`.${inputClassName}`) as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener('input', function (this: HTMLInputElement) {
      handleSearch(this.value, `.${listClassName}`, `.${listItemsClassName}`);
    });
  }
}

function handleSearch(inputValue: string, listClassName: string, listItemsClassName: string) {
  const searchValue = inputValue.toLowerCase();
  const contactListWrapper = document.querySelector(listClassName);
  if (!contactListWrapper) return;

  const contactListItems: NodeListOf<HTMLLIElement> = document.querySelectorAll(listItemsClassName);

  contactListItems.forEach(item => {
    const contactNameWrapper = item.querySelector('[data-contact-name]');
    if (!contactNameWrapper) return;
    const contactName = contactNameWrapper.getAttribute('data-contact-name')?.toLowerCase();

    if (contactName && contactName.includes(searchValue)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}
