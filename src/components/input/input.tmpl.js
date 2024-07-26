import styles from './input.module.css';

const defaultContext = {
  type: 'text',
  name: '',
  placeholder: '',
  value: '',
  error: '',
}

export default function (props) {
  const context = { ...defaultContext, ...props };

  return `
  <div class="${styles.container}">
    <input id="input_{{name}}" 
            name="{{name}}" 
            value="{{value}}" 
            class="${styles.input}" 
            placeholder="" 
            type="{{type}}"
            required />
    <label for="input_{{name}}" class="${styles.label}">{{placeholder}}</label>
    <span data-error="{{name}}" class="${styles.errorLabel}">{{error}}</span>
  </div>
`;
}
