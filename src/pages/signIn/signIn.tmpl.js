import styles from './signIn.module.css';

export default function (context) {
  return `
    <form name="signin" id="signInForm" novalidate>
      <div class="${styles.page}">
        <h1 class="${styles.heading}">Вход</h1>
        <div class="${styles.inputGroup}">
          {{{loginInput}}}
          {{{passwordInput}}}
        </div>
        
        {{{signInButton}}}
        <a href="/sign-up" data-router-link="/sign-up" class="${styles.link}">Нет аккаунта?</a>
      </div>
    </form>
  `;
}
