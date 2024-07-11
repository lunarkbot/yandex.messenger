const template = `
<div class="{{pageClassName}}">
  <h1 class="{{headingClassName}}">Вход</h1>
  <div class="{{inputGroupClassName}}">
    {{loginInput}}
    {{passwordInput}}
  </div>
  
  {{signInButton}}
  <a href="/signUp" class="{{linkClassName}}">Нет аккаунта?</a>
</div>
`;
