import styles from './button.module.css';

const defaultContext = {
  type: 'button',
  class: '',
}

export default function (props) {
  const context = { ...defaultContext, ...props };

  return `
    <button type="{{type}}" class="${styles.button} {{class}}">
      {{text}}
    </button>
  `;
}
