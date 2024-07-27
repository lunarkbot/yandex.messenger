import navigation, { navigationLinkClassName } from './pages/navigation';
import signIn, { signInValidationRules } from './pages/signIn';
import signUp, { signUpValidationRules } from './pages/signUp';
import styles from './main.module.css';
import profile from './pages/profile';
import messenger, { searchClasses } from './pages/messenger';
import profileEditing, { profileEditingValidationRules } from './pages/profileEditing';
import profilePasswordEditing, { profilePasswordEditingValidationRules } from './pages/profilePasswordEditing';
import Validator from './utils/validator.ts';
import { addSearchContact, render } from './utils/index.ts';
import ErrorPage from './pages/error';
import { chatMessageValidationRule } from './utils/validationRules.ts';

// function renderPage(html:string):void {
//   document.querySelector<HTMLDivElement>('.content')!.innerHTML = html;
// }

function switchPage(href:string):void {
  window.history.pushState({}, '', href);

  switch (href) {
    case '/': {
      render('.content', navigation);
      break;
    }
    case '/signIn': {
      render('.content', signIn);
      const form = document.querySelector<HTMLFormElement>('#signInForm')!;
      Validator.setValidation(form, signInValidationRules);
      break;
    }
    case '/signUp': {
      render('.content', signUp);
      const form = document.querySelector<HTMLFormElement>('#signUpForm')!;
      Validator.setValidation(form, signUpValidationRules);
      break;
    }
    case '/profile': {
      render('.content', profile);
      break;
    }
    case '/profileEditing': {
      render('.content', profileEditing);
      const form = document.querySelector<HTMLFormElement>('#editProfile')!;
      Validator.setValidation(form, profileEditingValidationRules);
      break;
    }
    case '/profilePasswordEditing': {
      render('.content', profilePasswordEditing);
      const form = document.querySelector<HTMLFormElement>('#editProfilePassword')!;
      Validator.setValidation(form, profilePasswordEditingValidationRules);
      break;
    }
    case '/messenger': {
      render('.content', messenger);
      const form = document.querySelector<HTMLFormElement>('#chatMessage')!;
      Validator.setValidation(form, [chatMessageValidationRule]);
      addSearchContact(searchClasses.inputClassName, searchClasses.listClassName, searchClasses.listItemsClassName);
      break;
    }
    case '/error': {
      const serverErrorPage = new ErrorPage({
        text: 'Уже фиксим',
        error: '500',
      });

      render('.content', serverErrorPage);
      break;
    }
    default: {
      const notFoundPage = new ErrorPage({
        text: 'Не туда попали',
        error: '400',
      });

      render('.content', notFoundPage);
    }
  }
}

function activateNavigation():void {
  const container = document.querySelector<HTMLDivElement>('.content')!;

  container.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains(navigationLinkClassName)) {
      event.preventDefault();
      const href:string|null = target.getAttribute('href');
      if (!href) return;

      switchPage(href);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
      <main class="content"></main>
      <div class="${styles.back}">Back to navigation</div>
  `;

  switchPage(window.location.pathname);

  const backLink: HTMLDivElement = document.querySelector<HTMLDivElement>(`.${styles.back}`)!;
  backLink.addEventListener('click', () => {
    switchPage('/');
  });

  window.addEventListener('popstate', () => {
    switchPage(window.location.pathname);
  });

  activateNavigation();
});
