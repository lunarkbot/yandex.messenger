import styles from './avatar.module.css';

const defaultContext = {
  src: '../../../../avatar_default.png',
}

export default function (props) {
  const context = { ...defaultContext, ...props };

  return `
    <div class="${styles.container}">
      <div class="${styles.avatar}">
        <img class="${styles.image}" src="{{src}}" alt="Аватар" />
        <div class="${styles.edit}">Поменять аватар</div>
      </div>
    </div>
  `;
}
