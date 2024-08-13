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
import store from './utils/classes/store/store.ts';
import UserController from './controllers/userController.ts';
import fillSignUpForm from './utils/helpers/mockSignUp.ts';

PopstateEventManager.getInstance();

// function switchPage(href:string):void {
//   window.history.pushState({}, '', href);
//
//   switch (href) {
//     // case '/': {
//     //   render('.content', navigation);
//     //   break;
//     // }
//     case '/signIn': {
//       render('.content', signIn);
//       const form = document.querySelector<HTMLFormElement>('#signInForm')!;
//       Validator.setValidation(form, signInValidationRules);
//       break;
//     }
//     case '/signUp': {
//       render('.content', signUp);
//       const form = document.querySelector<HTMLFormElement>('#signUpForm')!;
//       Validator.setValidation(form, signUpValidationRules);
//       break;
//     }
//     case '/profile': {
//       render('.content', profile);
//       break;
//     }
//     case '/profileEditing': {
//       render('.content', profileEditing);
//       const form = document.querySelector<HTMLFormElement>('#editProfile')!;
//       Validator.setValidation(form, profileEditingValidationRules);
//       break;
//     }
//     case '/profilePasswordEditing': {
//       render('.content', profilePasswordEditing);
//       const form = document.querySelector<HTMLFormElement>('#editProfilePassword')!;
//       Validator.setValidation(form, profilePasswordEditingValidationRules);
//       break;
//     }
//     case '/messenger': {
//       render('.content', messenger);
//       const form = document.querySelector<HTMLFormElement>('#chatMessage')!;
//       Validator.setValidation(form, [chatMessageValidationRule]);
//       addSearchContact(searchClasses.inputClassName, searchClasses.listClassName, searchClasses.listItemsClassName);
//       break;
//     }
//   }
// }

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


document.addEventListener('DOMContentLoaded', () => {
  const rootQuery = '.content';
  const router = new Router(rootQuery);
  router
    //.use('/', navigation))
    .use('/404', notFoundPage)
    .use('/', signIn)
    .use('/sign-up', signUp)
    .use('/settings', profile)
    .use('/settings/edit', profileEditing)
    .use('/settings/password', profilePasswordEditing)
    .use('/messenger', messenger)
    .use('/logout', logout)
    .start();

  setupRouterLinkHandler(router, rootQuery);


  store.set('user',{
    name: 'Vasya',
    email: 'eee@eee.pe'
  });
  //
  // const userSignInController = new UserSignInController();
  //
  // userSignInController.signIn({
  //     password: 'p@ssw0rd',
  //     login: 'a.morgan'
  //   });

  const userController = new UserController();

  userController.checkUser();

  setTimeout(() => {
    fillSignUpForm()
  }, 1000);
});
