import styles from './header.module.css';

export default function (context) {
  return `
            <div class="${styles.headerAvatar}">
                
            </div>
            <div class="${styles.headerName}">{{title}}</div>
            <div class="${styles.headerMenu}">
              <div class="${styles.headerMenuButton}"></div>
              <ul class="${styles.headerMenuList}">
                <li class="${styles.headerMenuItem}" data-modal="addUser">
                  <span class="${styles.headerMenuIconAdd}"></span>
                  <span>Добавить пользователя</span>
                </li>
                <li class="${styles.headerMenuItem}" data-modal="deleteUser">
                  <span class="${styles.headerMenuIconDelete}"></span>
                  <span>Удалить пользователя</span>
                </li>
              </ul>
            </div>`;
}
