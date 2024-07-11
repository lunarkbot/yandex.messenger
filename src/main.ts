// Import the CSS module
import styles from './style.module.css';
import javascriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import Main from './main.tmpl.js';
// @ts-ignore
import renderTemplate from './utils/renderTemplate.js';

const context = {
  name: 'World',
  nameClass: styles.colorRed
};
const renderedResult = renderTemplate(Main, context);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="${styles.logo}" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="${styles.logo} ${styles.vanilla}" alt="JavaScript logo" />
    </a>
    <h1 class="${styles.heading}">Hello Vite!</h1>
    <div class="${styles.card}">
      <button id="counter" type="button"></button>
    </div>
    <p class="${styles.readTheDocs}">
      Click on the Vite logo to learn more
    </p>
  </div>
  <div style="color: white; font-size: 40px;" id="test">${renderedResult}</div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
