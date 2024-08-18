import { TProps } from 'types';
import renderMessenger from './messenger.tmpl.js';
import { listItemsClassName } from './components/chatListItem';
import Block from '../../utils/classes/core/block.ts';
import styles from './messenger.module.css';
import MessengerController from '../../controllers/messengerController.ts';
import chatList, { chatListClassName } from './components/chatList/index.ts';
import chat from './components/chat/index.ts';
import header from './components/header/index.ts';
import Modal from './components/modal/index.ts';
import connect from '../../hoc/connect.ts';
import { MessageType } from 'pages/messenger/components/message';

export const searchClasses = {
  inputClassName: styles.searchInput,
  listClassName: chatListClassName,
  listItemsClassName,
};

const emptyChat = `<div class="${styles.mainEmpty}"></div>`;
const emptyHeader = `<div style="border-bottom: 1px solid var(--second-bg-color)"></div>`;

class Messenger extends Block {
  constructor(props: TProps) {
    const modals: Record<string, any> = {}
    Object.keys(props.modals).forEach((key) => {
      modals[`modal_${key}`] = props.modals[key];
    });

    super({
      tagName: 'div',
      props: {
        ...props,
        ...modals,
      },
      className: styles.messenger,
      type: 'page',
      controller: MessengerController,
      events: {
        click: (event: Event) => {
          const target = event.target as HTMLElement;
          const modalId = target && target.getAttribute('data-modal') || '';
          const modalIds = Object.keys(props.modals);

          if (modalIds.includes(modalId)) {
            props.modals[modalId].showModal();
          }
        }
      }
    })
  }

  render(): string {
    return renderMessenger(this.props);
  }
}

export const modalNewChat = new Modal({
  id: 'newChat',
  title: 'Новый чат',
  inputName: 'title',
  inputPlaceholder: 'Введите название чата',
  buttonText: 'Создать чат',
  error: '',
});

export const modalAddUser = new Modal({
  id: 'addUser',
  title: 'Добавить пользователя',
  inputName: 'login',
  inputPlaceholder: 'Логин',
  buttonText: 'Добавить',
  error: '',
});

export const modalDeleteUser = new Modal({
  id: 'deleteUser',
  title: 'Удалить пользователя',
  inputName: 'login',
  inputPlaceholder: 'Логин',
  buttonText: 'Удалить',
  error: '',
});

const MessengerWithChat = connect((state) => {
  const activeChat = state?.chat?.active || {};

  return {
    name: activeChat?.title || '',
    id: activeChat?.id || '',
    header: activeChat?.title
      ? header
      : emptyHeader,
    chat: activeChat?.id
      ? chat
      : emptyChat,
    formState: activeChat?.id
      ? ''
      : 'disabled',
  }
})(Messenger);

const messenger = new MessengerWithChat({
  chatList: chatList,
  name: 'Messenger',
  chat: emptyChat,
  modals: {
    newChat: modalNewChat,
    addUser: modalAddUser,
    deleteUser: modalDeleteUser,
  },
  header: emptyHeader,
  formState: 'disabled',
});


export default messenger;
