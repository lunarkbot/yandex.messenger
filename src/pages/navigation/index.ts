import renderNavigation from './navigation.tmpl.js';
import styles from './navigation.module.css';

export const navigationLinkClassName: string = styles.link;

const navigation:string = renderNavigation({});

export default navigation;
