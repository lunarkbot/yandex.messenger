import { ITemplate } from 'types';
import buttonRender from './button.tmpl.js';
import styles from './button.module.css';

const buttonContext: ITemplate = {
  buttonClassName: styles.button,
  buttonText: '',
  type: 'button',
};

const button = {
  buttonRender,
  buttonContext,
};

export default button;
