const template = `
  <div class="{{containerClass}}">
    <input type="text" 
            id="input_{{name}}" 
            name="{{name}}" 
            value="{{value}}" 
            class="{{inputClass}}" 
            placeholder="" 
            required />
    <label for="input_{{name}}" class="{{labelClass}}">{{placeholder}}</label>
    <span class="{{errorClass}}">{{error}}</span>
  </div>
`;
