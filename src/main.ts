import navigation, { navigationLinkClassName } from './pages/navigation';
import signIn, { signInValidationRules } from './pages/signIn';
import signUp, { signUpValidationRules } from './pages/signUp';
import styles from './main.module.css';
import profile from './pages/profile';
import messenger, { searchClasses } from './pages/messenger';
import profileEditing, { profileEditingValidationRules } from './pages/profileEditing';
import profilePasswordEditing, { profilePasswordEditingValidationRules } from './pages/profilePasswordEditing';
import Validator from './utils/classes/validation/validator.ts';
import { addSearchContact, render } from './utils/helpers';
import ErrorPage from './pages/error';
import { chatMessageValidationRule } from './utils/helpers/validationRules.ts';
import PopstateEventManager from './utils/classes/events/popstateEventManager.ts';
import Router from './utils/classes/routing/router.ts';

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
//     case '/error': {
//       const serverErrorPage = new ErrorPage({
//         text: 'Уже фиксим',
//         error: '500',
//       });
//
//       render('.content', serverErrorPage);
//       break;
//     }
//     default: {
//       const notFoundPage = new ErrorPage({
//         text: 'Не туда попали',
//         error: '400',
//       });
//
//       render('.content', notFoundPage);
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




  //switchPage(window.location.pathname);


  // window.addEventListener('popstate', () => {
  //   switchPage(window.location.pathname);
  // });


});
