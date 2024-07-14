import inputRender from './input.tmpl.js';
import { Template } from '../../types';

const inputContext: Template = {
  type: 'text',
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
