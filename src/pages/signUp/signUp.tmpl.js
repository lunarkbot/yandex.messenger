import styles from './signUp.module.css';

export default function (context) {
  return `
    <div class="${styles.page}">
      <h1 class="${styles.heading}">Регистрация</h1>
      <div class="${styles.inputGroup}">
        {{emailInput}}
        {{loginInput}}
        {{firstNameInput}}
        {{secondNameInput}}
        {{phoneInput}}
        {{passwordInput}}
        {{passwordCheckInput}}
      </div>
      
      {{signUpButton}}
      <a href="/signIn" class="${styles.link}">Войти</a>
    </div>
  `;
}
