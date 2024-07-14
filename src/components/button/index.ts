import buttonRender from './button.tmpl.js';
import styles from './button.module.css';
import { Template } from '../../types';

const buttonContext: Template = {
  buttonClassName: styles.button,
  buttonText: '',
  type: 'button',
};

const button = {
  buttonRender,
  buttonContext,
};

export default button;
