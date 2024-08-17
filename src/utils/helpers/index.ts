import { IBlock } from 'types';

import ProfileInput from '../../components/profileInput';
import Input from '../../components/input';
import connect from '../../hoc/connect.ts';

export function foundKey(obj: Record<string, any>, targetValue: any): string | null {
  const result = Object.keys(obj).find(key => obj[key] === targetValue);
  return result || null;
}

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
  const chatListWrapper = document.querySelector(listClassName);
  if (!chatListWrapper) return;

  const chatListItems: NodeListOf<HTMLLIElement> = document.querySelectorAll(listItemsClassName);
  chatListItems.forEach((item) => {
    const chatNameWrapper = item.querySelector('[data-chat-name]');

    if (!chatNameWrapper) return;
    const chatName = chatNameWrapper.getAttribute('data-chat-name')?.toLowerCase();
    if (chatName && chatName.includes(searchValue)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

export function addSearchChat(inputClassName: string, listClassName: string, listItemsClassName: string) {
  console.log(listItemsClassName)
  const searchInput = document.querySelector(`.${inputClassName}`) as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener('input', function (this: HTMLInputElement) {
      handleSearch(this.value, `.${listClassName}`, `.${listItemsClassName}`);
    });
  }
}
