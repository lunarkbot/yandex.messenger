import styles from './notFound.module.css';

export default function (context) {
  return `
    <div class="${styles.page}">
      <h1 class="${styles.heading}">404</h1>
      <p class="${styles.message}">Не туда попали</p>
      <a href="/" class="${styles.link}">Назад к чатам</a>
    </div>
  `;
}
