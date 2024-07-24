import styles from './profileEditing.module.css';

export default function (context) {
  return `
    <form class="${styles.form}" name="editProfilePassword" id="editProfilePassword" novalidate>
      <div class="${styles.page}">
        {{avatar}}
        <h1 class="${styles.heading}">{{displayNameHeading}}</h1>
        <ul class="${styles.profileList}">
          <li class="${styles.profileListItem}">
            <span class="${styles.profileLabel}">Старый пароль:</span>
            <span class="${styles.profileValue}">{{oldPassword}}</span>
          </li>
          <li class="${styles.profileListItem}">
            <span class="${styles.profileLabel}">Новый пароль:</span>
            <span class="${styles.profileValue}" data-type="forPasswordCheck">{{newPassword}}</span>
          </li>
          <li class="${styles.profileListItem}">
            <span class="${styles.profileLabel}">Повторите новый пароль:</span>
            <span class="${styles.profileValue}">{{passwordCheck}}</span>
          </li>
        </ul>
        {{saveButton}}
      </div>
    </form>
  `;
}
