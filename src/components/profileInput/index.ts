import { ITemplate } from 'types';
import inputRender from './input.tmpl.js';

const inputContext: ITemplate = {
  type: 'text',
  name: '',
  placeholder: '',
  value: '',
};

const input = {
  inputRender,
  inputContext,
};

export default input;
