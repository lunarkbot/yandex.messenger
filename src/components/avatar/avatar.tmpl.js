import styles from './avatar.module.css';

export default function (context) {
  return `
    <form class="${styles.avatar}">
      <img class="${styles.image}" src="{{src}}" alt="Аватар" />
      <label class="${styles.edit}">
        Поменять аватар
        <input type="file" class="${styles.input}" accept=".jpeg,.jpg,.png,.gif,.webp" />
      </label>
    </form>
  `;
}
