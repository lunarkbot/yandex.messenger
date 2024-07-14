import styles from './input.module.css';

export default function (context) {
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
