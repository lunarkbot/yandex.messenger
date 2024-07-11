import renderNavigation from './navigation.tmpl.js';
import styles from './navigation.module.css';
import { Template } from '../../types';

const context:Template = {
  linksClassName: styles.links,
  linkClassName: styles.link,
  pageClassName: styles.page,
}

const navigation:string = renderNavigation(context);
export const navigationLinkClass:string = styles.link;

export default navigation
