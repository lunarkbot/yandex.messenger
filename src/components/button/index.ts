import styles from './button.module.css';
import buttonRender from './button.tmpl.js';
import { Template } from '../../types';

const buttonContext: Template = {
  buttonClassName: styles.button,
  buttonText: '',
};

const button = {
  buttonRender,
  buttonContext,
};

export default button;
