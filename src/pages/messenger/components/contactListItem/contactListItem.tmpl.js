import styles from './contactListItem.module.css';

const defaultContext = {
  src: '../../../../avatar_default.png',
}

export default function (props) {
  const context = { ...defaultContext, ...props };

  return `
    <div class="${styles.contactContent}">
      <div class="${styles.contactAvatarWrap}">
      </div>
      <div class="${styles.contactNameWrap}">
          <div class="${styles.contactName}" data-contact-name="{{name}}">{{name}}</div>
          <div class="${styles.contactTime}">{{time}}</div>
      </div>
      <div class="${styles.contactTextWrap}">
        <div class="${styles.contactText}">{{text}}</div>
        <div class="${styles.contactCounter}">{{counter}}</div>
      </div>
    </div>
  `;
}
