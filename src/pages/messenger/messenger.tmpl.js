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
          {{{header}}}
          {{{chat}}}
          <form class="${styles.messageInputWrap}" name="chatMessage" id="chatMessage" novalidate>
            <div class="${styles.attach}">
              <input type="file" id="attach" class="${styles.attachInput}" value="">
              <label for="attach" class="${styles.attachButton}"></label>
            </div>
            <textarea {{formState}} placeholder="Сообщение" name="message" class="${styles.messageInput}" required></textarea>
            <button {{formState}} type="submit" class="${styles.messageSubmitButton}"></button>
          </form>
      </section>
      {{{modal_newChat}}}
      {{{modal_addUser}}}
      {{{modal_deleteUser}}}
  `;
}
