import styles from './messenger.module.css';

const template = `
  <div class="${styles.messenger}">
    <aside class="${styles.sidebar}">
      <ul class="${styles.contactList}">
        <li class="${styles.contactListItem}">Андрей</li>
        <li class="${styles.contactListItem}">Василий</li>
        <li class="${styles.contactListItem}">Петр</li>
      </ul>
    </aside>
    <div class="${styles.main}"></div>
  </div>
`;
