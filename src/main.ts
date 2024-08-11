import navigation from './pages/navigation';
import signIn from './pages/signIn';
import signUp from './pages/signUp';
import profile from './pages/profile';
import messenger from './pages/messenger';
import profileEditing from './pages/profileEditing';
import profilePasswordEditing from './pages/profilePasswordEditing';
import ErrorPage from './pages/error';
import PopstateEventManager from './utils/classes/events/popstateEventManager.ts';
import Router from './utils/classes/routing/router.ts';
import store from './utils/classes/store/store.ts';
import UserSignInController from './controllers/authSignInController.ts';

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
      const href:string|null = target.getAttribute('href');
      if (!href) return;

      router.go(href);
    }
  });
}

const serverErrorPage = new ErrorPage({
        text: 'Уже фиксим',
        error: '500',
      });

const notFoundPage = new ErrorPage({
        text: 'Не туда попали',
        error: '400',
      });


document.addEventListener('DOMContentLoaded', () => {
  const rootQuery = '.content';
  const router = new Router(rootQuery);
  router
    .use('/', navigation)
    .use('/signIn', signIn)
    .use('/signUp', signUp)
    .use('/profile', profile)
    .use('/profileEditing', profileEditing)
    .use('/profilePasswordEditing', profilePasswordEditing)
    .use('/messenger', messenger)
    .use('/notFound', notFoundPage)
    .use('/error', serverErrorPage)
    .start();

  setupRouterLinkHandler(router, rootQuery);


  store.set('user',{
    name: 'Vasya',
    email: 'eee@eee.pe'
  });

  const userSignInController = new UserSignInController();

  userSignInController.signIn({
      password: 'p@ssw0rd',
      login: 'a.morgan'
    });

});
