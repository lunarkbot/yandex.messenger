import renderMessenger from './messenger.tmpl.js';
import styles from './messenger.module.css';
import { Template } from '../../types';

const context:Template = {
  headingClassName: styles.heading,
  messageClassName: styles.message,
  linkClassName: styles.link,
  pageClassName: styles.page,
}

const messenger:string = renderMessenger(context);

export default messenger;
