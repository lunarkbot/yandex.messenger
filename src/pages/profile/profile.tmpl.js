import styles from './profile.module.css';

export default function (context) {
  return `
    <div class="${styles.page}">
      {{avatar}}
      <h1 class="${styles.heading}">{{nickname}}</h1>
      <ul class="${styles.profileList}">
        <li class="${styles.profileListItem}">
          <span class="${styles.profileLabel}">Почта:</span>
          <span class="${styles.profileValue}">{{email}}</span>
        </li>
        <li class="${styles.profileListItem}">
          <span class="${styles.profileLabel}">Логин:</span>
          <span class="${styles.profileValue}">{{login}}</span>
        </li>
        <li class="${styles.profileListItem}">
          <span class="${styles.profileLabel}">Имя:</span>
          <span class="${styles.profileValue}">{{firstName}}</span>
        </li>
        <li class="${styles.profileListItem}">
          <span class="${styles.profileLabel}">Фамилия:</span>
          <span class="${styles.profileValue}">{{secondName}}</span>
        </li>
        <li class="${styles.profileListItem}">
          <span class="${styles.profileLabel}">Имя в чате:</span>
          <span class="${styles.profileValue}">{{nickname}}</span>
        </li>
        <li class="${styles.profileListItem}">
          <span class="${styles.profileLabel}">Телефон:</span>
          <span class="${styles.profileValue}">{{phone}}</span>
        </li>
      </ul>
      <ul class="${styles.profileList}">
        <li class="${styles.profileListItem}">
          <a href="/settings/edit" 
             data-router-link="/settings/edit" 
             class="${styles.profileEditLink}" 
             data-type="edit-profile">Изменить данные</a>
        </li>
        <li class="${styles.profileListItem}">
          <a href="/settings/password" 
             data-router-link="/settings/password"
             class="${styles.profileEditLink}" 
             data-type="edit-password">Изменить пароль</a>
        </li>
        <li class="${styles.profileListItem}">
          <a href="/logout" data-router-link="/logout" class="${styles.logoutLink}">Выйти</a>
        </li>
      </ul>
    </div>
  `;
}
