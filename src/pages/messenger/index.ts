import { TProps } from 'types';
import renderMessenger from './messenger.tmpl.js';
import { listItemsClassName } from './components/chatListItem';
import Block from '../../utils/classes/core/block.ts';
import styles from './messenger.module.css';
import MessengerController from '../../controllers/messengerController.ts';
import chatList, { chatListClassName } from './components/chatList/index.ts';
import chat from './components/chat/index.ts';
import Modal from './components/modal/index.ts';

export const searchClasses = {
  inputClassName: styles.searchInput,
  listClassName: chatListClassName,
  listItemsClassName,
};

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

          const headerButton = document.querySelector(`.${styles.headerMenuButton}`) as HTMLElement;

          if (target && target === headerButton) {
            headerButton.classList.toggle(styles.active);
          } else {
            headerButton?.classList?.remove(styles.active);
          }
        }
      }
    })
  }

  render(): string {
    return renderMessenger(this.props);
  }
}

const modalNewChat = new Modal({
  id: 'newChat',
  title: 'Новый чат',
  inputName: 'title',
  inputPlaceholder: 'Введите название чата',
  buttonText: 'Создать чат',
});

const modalAddUser = new Modal({
  id: 'addUser',
  title: 'Добавить пользователя',
  inputName: 'login',
  inputPlaceholder: 'Логин',
  buttonText: 'Добавить',
});

const modalDeleteUser = new Modal({
  id: 'deleteUser',
  title: 'Удалить пользователя',
  inputName: 'login',
  inputPlaceholder: 'Логин',
  buttonText: 'Удалить',
});


const messenger = new Messenger({
  chatList: chatList,
  name: 'Messenger',
  chat,
  modals: {
    newChat: modalNewChat,
    addUser: modalAddUser,
    deleteUser: modalDeleteUser,
  },
});


export default messenger;
