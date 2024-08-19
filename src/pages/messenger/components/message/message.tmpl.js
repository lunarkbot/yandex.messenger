import styles from './message.module.css';

export default function (context) {
  return `
    <div class="${styles.chatMessageText}">
       <p>{{text}}</p>
    </div>
    <div class="${styles.chatMessageTime}">{{time}}</div>
  `;
}
