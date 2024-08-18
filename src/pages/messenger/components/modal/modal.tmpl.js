import styles from './modal.module.css';

export default function (context) {
  return `
    <form class="${styles.modalContent}" id="{{id}}">
        <h3 class="${styles.modalTitle}">{{title}}</h3>
        <span class="${styles.close}">&times;</span>
        {{{input}}}
        <div class="${styles.error}">{{error}}</div>
        {{{button}}}
    </form>
  `;
}
