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
          <div class="${styles.chatName}" data-chat-name="{{title}}">{{title}}</div>
          <div class="${styles.chatTime}"></div>
      </div>
      <div class="${styles.chatTextWrap}">
        <div class="${styles.chatText}">{{last_message}}</div>
        <div class="${styles.chatCounter}">{{unread_count}}</div>
      </div>
    </div>
  `;
}
