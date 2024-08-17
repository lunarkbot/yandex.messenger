import styles from './chatListItem.module.css';

const defaultContext = {
  src: '../../../../avatar_default.png',
}

export default function (props) {
  const context = { ...defaultContext, ...props };

  return `
    <div class="${styles.chatContent}">
      <div class="${styles.chatAvatarWrap}">
      </div>
      <div class="${styles.chatNameWrap}">
          <div class="${styles.chatName}" data-chat-name="{{name}}">{{name}}</div>
          <div class="${styles.chatTime}">{{time}}</div>
      </div>
      <div class="${styles.chatTextWrap}">
        <div class="${styles.chatText}">{{text}}</div>
        <div class="${styles.chatCounter}">{{counter}}</div>
      </div>
    </div>
  `;
}
