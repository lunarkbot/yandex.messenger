import styles from './messenger.module.css';

export default function (context) {
  return `
      <div class="${styles.messenger}">
        <aside class="${styles.sidebar}">
          <div class="${styles.profileBar}">
            <a href="/profile" class="${styles.profileLink}">Профиль</a>
          </div>
          <div class="${styles.search}">
            <input type="text" id="search" placeholder="" value="" class="${styles.searchInput}">
            <label for="search" class="${styles.searchLabel}">
              <span class="${styles.searchPlaceholder}">Поиск</span>
            </label>
          </div>
          <ul class="${styles.contactList}">
            {{contactListItem}}
          </ul>
        </aside>
        <section class="${styles.main}">
          <div class="${styles.header}">
            <div class="${styles.headerAvatar}">
                <img src="/avatar_default.png" alt="avatar" class="${styles.contactAvatar}">
            </div>
            <div class="${styles.headerName}">Андрей</div>
            <div class="${styles.menuButton}">Меню</div>
          </div>
          <div class="${styles.chat}">
            <div clqss="${styles.chatDate}">Сегодня</div>
            <div class="${styles.chatMessage}"></div>
            <div class="${styles.chatImage}"></div>
            <div class="${styles.chatMessage}"></div>
          </div>
          <div class="${styles.input}">
            <div class="${styles.attach}">+</div>
            <textarea class="" placeholder="Сообщение"></textarea>
            <button>Отправить</button>
          </div>
      </section>
  `;
}
