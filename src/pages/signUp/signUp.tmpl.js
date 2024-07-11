const template = `
<div class="{{pageClassName}}">
  <h1 class="{{headingClassName}}">Регистрация</h1>
  <div class="{{inputGroupClassName}}">
    {{emailInput}}
    {{loginInput}}
    {{firstNameInput}}
    {{secondNameInput}}
    {{phoneInput}}
    {{passwordInput}}
    {{passwordCheckInput}}
  </div>
  
  {{signUpButton}}
  <a href="/signIn" class="{{linkClassName}}">Войти</a>
</div>
`;
