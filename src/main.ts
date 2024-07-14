import navigation, { navigationLinkClassName } from './pages/navigation';
import signIn from './pages/signIn';
import signUp from './pages/signUp';
import notFound from './pages/notFound';
import styles from './main.module.css';
import serverError from './pages/serverError';
import profile from './pages/profile';
import messenger from './pages/messenger';
import profileEditing from './pages/profileEditing';
import profilePasswordEditing from './pages/profilePasswordEditing';

function renderPage(html:string):void {
  document.querySelector<HTMLDivElement>('.content')!.innerHTML = html;
}

function switchPage(href:string):void {
  window.history.pushState({}, '', href);

  switch (href) {
    case '/':
      renderPage(navigation);
      break;
    case '/signIn':
      renderPage(signIn);
      break;
    case '/signUp':
      renderPage(signUp);
      break;
    case '/profile':
      renderPage(profile);
      break;
    case '/profileEditing':
      renderPage(profileEditing);
      break;
    case '/profilePasswordEditing':
      renderPage(profilePasswordEditing);
      break;
    case '/messenger':
      renderPage(messenger);
      break;
    case '/serverError':
      renderPage(serverError);
      break;
    default:
      renderPage(notFound);
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
