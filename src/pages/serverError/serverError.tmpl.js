import styles from './serverError.module.css';

export default function (context) {
  return `
    <div class="${styles.page}">
      <h1 class="${styles.heading}">500</h1>
      <p class="${styles.message}">Уже фиксим</p>
      <a href="/" class="${styles.link}">Назад к чатам</a>
    </div>
  `;
}
