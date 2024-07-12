import styles from './input.module.css';

const template = `
  <div class="${styles.container}">
    <input id="input_{{name}}" 
            name="{{name}}" 
            value="{{value}}" 
            class="${styles.input}" 
            placeholder="" 
            type="{{type}}"
            required />
    <label for="input_{{name}}" class="${styles.label}">{{placeholder}}</label>
    <span class="${styles.error}">{{error}}</span>
  </div>
`;
