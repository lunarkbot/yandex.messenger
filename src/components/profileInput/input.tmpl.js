import styles from './input.module.css';

const defaultContext = {
  type: 'text',
  name: '',
  placeholder: '',
  value: '',
}

export default function (props) {
  const context = { ...defaultContext, ...props };

  return `
    <input id="input_{{name}}" 
            name="{{name}}" 
            value="{{value}}" 
            class="${styles.input}" 
            placeholder="" 
            type="{{type}}"
            required />
`;
}
