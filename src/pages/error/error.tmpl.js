import styles from './error.module.css';

export default function (context) {
  return `
    <div class="${styles.page}">
      <h1 class="${styles.heading}">{{error}}</h1>
      <p class="${styles.message}">{{text}}</p>
      <a href="/" class="${styles.link}">Назад к чатам</a>
    </div>
  `;
}
