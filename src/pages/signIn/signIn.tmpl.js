import styles from './signIn.module.css';

export default function (context) {
  return `
    <div class="${styles.page}">
      <form name="signin">
        <h1 class="${styles.heading}">Вход</h1>
        <div class="${styles.inputGroup}">
          {{loginInput}}
          {{passwordInput}}
        </div>
        
        {{signInButton}}
        <a href="/signUp" class="${styles.link}">Нет аккаунта?</a>
      </form>
    </div>
  `;
}
