import styles from './input.module.css';
import inputRender from './input.tmpl.js';
import { Template } from '../../types';

const inputContext: Template = {
  containerClass: styles.container,
  labelClass: styles.label,
  inputClass: styles.input,
  errorClass: styles.error,
  name: '',
  placeholder: '',
  value: '',
  error: '',
};

const input = {
  inputRender,
  inputContext,
};

export default input;
