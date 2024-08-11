import styles from './navigation.module.css';

export default function (context) {
  return `
    <ul class="${styles.links}">
      <li>
        <a class="${styles.link}" data-router-link href="/signUp">Registation</a>
      </li>
      <li>
        <a class="${styles.link}" data-router-link href="/signIn">Login</a>
      </li>
      <li>
        <a class="${styles.link}" data-router-link href="/profile">Profile</a>
      </li>
      <li>
        <a class="${styles.link}" data-router-link href="/profileEditing">Profile editing</a>
      </li>
      <li>
        <a class="${styles.link}" data-router-link href="/profilePasswordEditing">Profile password editing</a>
      </li>
      <li>
        <a class="${styles.link}" data-router-link href="/messenger">Messenger</a>
      </li>
      <li>
       <a class="${styles.link}" data-router-link href="/notFound">Error 404</a>
      </li>
      <li>
       <a class="${styles.link}" data-router-link href="/error">Error 500</a>
      </li>
    </ul>
    {{name}}{{email}}
  `;
}
