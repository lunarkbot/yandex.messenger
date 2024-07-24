import { ITemplate } from 'types';
import inputRender from './input.tmpl.js';

const inputContext: ITemplate = {
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
