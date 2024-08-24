import signIn from './pages/signIn';
import signUp from './pages/signUp';
import profile from './pages/profile';
import messenger from './pages/messenger';
import profileEditing from './pages/profileEditing';
import profilePasswordEditing from './pages/profilePasswordEditing';
import errorPage from './pages/errorPage';
import logoutPage from './pages/logout';
import PopstateEventManager from './utils/classes/events/popstateEventManager.ts';
import Router from './utils/classes/routing/router.ts';
import UserController from './controllers/userController.ts';
import { ROOT_QUERY } from './constants.ts';
import store from './utils/classes/store/store.ts';
import MessengerController from './controllers/messengerController.ts';
import { parseJSON } from './utils/helpers';

PopstateEventManager.getInstance();

function setupRouterLinkHandler(router: Router, rootQuery: string):void {
  const container = document.querySelector<HTMLDivElement>(rootQuery)!;

  container.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.hasAttribute('data-router-link')) {
      event.preventDefault();
      const path:string|null = target.getAttribute('data-router-link');
      if (!path) return;

      router.go(path);
    }
  });
}

const notFoundPage = new errorPage({
  text: 'Не туда попали',
  heading: '400',
  linkPath: '/messenger',
  linkText: 'Вернуться к чатам',
});

const logout = new logoutPage({
  text: 'Вы вышли из аккаунта',
  heading: '👋',
  linkPath: '/',
  linkText: 'Вернуться на главную',
});

const userController = new UserController();
userController.checkUser();

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router(ROOT_QUERY);
  router
    .use('/404', notFoundPage)
    .use('/', signIn)
    .use('/sign-up', signUp)
    .use('/settings', profile)
    .use('/settings/edit', profileEditing)
    .use('/settings/password', profilePasswordEditing)
    .use('/messenger', messenger)
    .use('/logout', logout)
    .start();

  setupRouterLinkHandler(router, ROOT_QUERY);
});

const activeChat = sessionStorage.getItem('activeChat');
if (activeChat) {
  store.set('chat', {
    active: parseJSON(activeChat),
  });

  if (window.location.pathname === '/messenger') {
    MessengerController.getMessages();
  }
}
