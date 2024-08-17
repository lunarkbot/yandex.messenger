import styles from './messenger.module.css';

export default function (context) {
  return `
      <div class="${styles.messenger}">
        <aside class="${styles.sidebar}">
          <div class="${styles.profileBar}">
            <a href="/settings" data-router-link="/settings" class="${styles.profileLink}">Профиль</a>
          </div>
          <div class="${styles.search}">
            <input type="text" id="search" placeholder="" value="" class="${styles.searchInput}">
            <label for="search" class="${styles.searchLabel}">
              <span class="${styles.searchPlaceholder}">Поиск</span>
            </label>
          </div>
           {{{chatList}}}
           <span class="${styles.addChatButton}" data-modal="newChat" title="Создать чат"></span>
        </aside>
        <section class="${styles.main}">
          <div class="${styles.header}">
            <div class="${styles.headerAvatar}">
                
            </div>
            <div class="${styles.headerName}">{{name}}</div>
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
            </div>
          </div>
          {{{chat}}}
          <form class="${styles.messageInputWrap}" name="chatMessage" id="chatMessage" novalidate>
            <div class="${styles.attach}">
              <input type="file" id="attach" class="${styles.attachInput}" value="">
              <label for="attach" class="${styles.attachButton}"></label>
            </div>
            <textarea placeholder="Сообщение" name="message" class="${styles.messageInput}" required></textarea>
            <button type="submit" class="${styles.messageSubmitButton}"></button>
          </form>
      </section>
      {{{modal_newChat}}}
      {{{modal_addUser}}}
      {{{modal_deleteUser}}}
  `;
}
