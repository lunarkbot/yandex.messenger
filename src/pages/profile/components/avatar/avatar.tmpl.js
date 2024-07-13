import styles from './avatar.module.css';

export default function (context) {
  return `
    <div class="${styles.container}">
      <div class="${styles.avatar}">
        <img class="${styles.image}" src="{{avatarSrc}}" alt="Аватар" />
        <div class="${styles.edit}">Поменять аватар</div>
      </div>
    </div>
  `;
}
