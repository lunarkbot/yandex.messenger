import styles from './logout.module.css';

export default function (context) {
  return `
    <div class="${styles.page}">
      <h1 class="${styles.heading}">{{heading}}</h1>
      <p class="${styles.message}">{{text}}</p>
      <a href="{{linkPath}}" data-router-link="{{linkPath}}" class="${styles.link}">{{linkText}}</a>
    </div>
  `;
}
