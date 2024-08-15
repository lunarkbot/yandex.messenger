import styles from './profileEditing.module.css';

export default function (context) {
  return `
    <form class="${styles.form}" name="editProfile" id="editProfile">
      <div class="${styles.page}">
        <div class="${styles.avatarWrap}">{{{avatar}}}</div>
        <h1 class="${styles.heading}">{{displayNameHeading}}</h1>
        <ul class="${styles.profileList}">
          <li class="${styles.profileListItem}">
            <span class="${styles.profileLabel}">Почта:</span>
            <span class="${styles.profileValue}">{{{email}}}</span>
          </li>
          <li class="${styles.profileListItem}">
            <span class="${styles.profileLabel}">Логин:</span>
            <span class="${styles.profileValue}">{{{login}}}</span>
          </li>
          <li class="${styles.profileListItem}">
            <span class="${styles.profileLabel}">Имя:</span>
            <span class="${styles.profileValue}">{{{firstName}}}</span>
          </li>
          <li class="${styles.profileListItem}">
            <span class="${styles.profileLabel}">Фамилия:</span>
            <span class="${styles.profileValue}">{{{secondName}}}</span>
          </li>
          <li class="${styles.profileListItem}">
            <span class="${styles.profileLabel}">Имя в чате:</span>
            <span class="${styles.profileValue}">{{{displayName}}}</span>
          </li>
          <li class="${styles.profileListItem}">
            <span class="${styles.profileLabel}">Телефон:</span>
            <span class="${styles.profileValue}">{{{phone}}}</span>
          </li>
        </ul>
        {{{saveButton}}}
        <a href="/settings" data-router-link="/settings" class="${styles.link}">Вернуться в профиль</a>
      </div>
    </form>
  `;
}
