import { IBlock } from 'types';

import ProfileInput from '../../components/profileInput';
import Input from '../../components/input';
import connect from '../../hoc/connect.ts';

export function disableSpinner(): void {
  document.body.classList.remove('loading');
}

export function getInput(name:string, placeholder:string, type:string = 'text') {
  return new Input({
    name,
    placeholder,
    type,
  });
}

export function getProfileInput(name:string, value:string, type:string = 'text') {
  const profileInputWithStore = connect(state => ({
    value: state.user[name] || '',
  }))(ProfileInput);

  return new profileInputWithStore({
    name,
    value,
    type,
  });
}

export function clearNode(): void {
  const root = document.querySelector('.content');
  if (root) root.innerHTML = '';
}

export function render(query: string, block: IBlock) {
  const root = document.querySelector(query);

  if (!root) return;
  //clearNode(root);

  root.appendChild(block?.getContent());
  block.dispatchComponentDidMount();

  return root;
}

function handleSearch(inputValue: string, listClassName: string, listItemsClassName: string) {
  const searchValue = inputValue.toLowerCase();
  const contactListWrapper = document.querySelector(listClassName);
  if (!contactListWrapper) return;

  const contactListItems: NodeListOf<HTMLLIElement> = document.querySelectorAll(listItemsClassName);

  contactListItems.forEach((item) => {
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

export function addSearchContact(inputClassName: string, listClassName: string, listItemsClassName: string) {
  const searchInput = document.querySelector(`.${inputClassName}`) as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener('input', function (this: HTMLInputElement) {
      handleSearch(this.value, `.${listClassName}`, `.${listItemsClassName}`);
    });
  }
}
