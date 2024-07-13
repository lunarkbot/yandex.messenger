import styles from './navigation.module.css';

export default function (context) {
  return `
    <nav class="${styles.page}">
      <ul class="${styles.links}">
        <li>
          <a class="${styles.link}" href="/signUp">Registation</a>
        </li>
        <li>
          <a class="${styles.link}" href="/signIn">Login</a>
        </li>
        <li>
          <a class="${styles.link}" href="/profile">Profile</a>
         </li>
        <li>
          <a class="${styles.link}" href="/messenger">Messenger</a>
        </li>
        <li>
         <a class="${styles.link}" href="/notFound">Error 404</a>
        </li>
        <li>
         <a class="${styles.link}" href="/serverError">Error 500</a>
        </li>
      </ul>
    </nav>
  `;
}
