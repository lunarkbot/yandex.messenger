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
          <ul class="${styles.contactList} light-scrollbar">
            {{contactListItem}}
          </ul>
        </aside>
        <section class="${styles.main}">
          <div class="${styles.header}">
            <div class="${styles.headerAvatar}">
                
            </div>
            <div class="${styles.headerName}">Андрей</div>
            <div>
              <div class="${styles.headerMenuButton}"></div>
            </div>
          </div>
          <div class="${styles.chat} light-scrollbar">
            <div class="${styles.chatDate}">Сегодня</div>
            <div class="${styles.chatMessage}" data-type="incoming">
              <div class="${styles.chatMessageText}">
                <p>Привет! Смотри, тут всплыл интересный кусок лунной космической 
                истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. 
                Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер 
                все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.</p>
                <p>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и 
                не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>
              </div>
              <div class="${styles.chatMessageTime}">12:00</div>
            </div>
            <div class="${styles.chatImage}">
                <img src="/cam.png" alt="avatar" class="${styles.chatImageItem}">
                <div class="${styles.chatImageTime}">12:00</div>
            </div>
            <div class="${styles.chatMessage}" data-type="outgoing">
                <div class="${styles.chatMessageText}">
                    <p>Привет! Смотри, тут всплыл интересный кусок лунной космической 
                    истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. 
                    Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер 
                    все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.</p>
                    <p>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и 
                    не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>
                </div>
                <div class="${styles.chatMessageTime}">12:00</div>
            </div>
          </div>
          <div class="${styles.messageInputWrap}">
            <div class="${styles.attach}">
              <input type="file" id="attach" class="${styles.attachInput}" value="">
              <label for="attach" class="${styles.attachButton}"></label>
            </div>
            <textarea placeholder="Сообщение" class="${styles.messageInput}"></textarea>
            <button type="submit" class="${styles.messageSubmitButton}"></button>
          </div>
      </section>
  `;
}
