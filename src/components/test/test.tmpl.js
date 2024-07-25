import styles from './test.module.css';

const defaultContext = {
  type: 'button',
}

export default function (props) {
  const context = { ...defaultContext, ...props };

  return `
    <button class="${styles.button}" type="{{type}}">
      {{text}}
    </button>
  `;
}
