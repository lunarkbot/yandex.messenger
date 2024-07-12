(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))p(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const f of t.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&p(f)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function p(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const L="_page_1b2zx_1",I="_links_1b2zx_5",w="_link_1b2zx_5",o={page:L,links:I,link:w};function C(n){return`
<div class="${o.page}">
  <ul class="${o.links}">
    <li>
      <a class="${o.link}" href="/signUp">Registation</a>
    </li>
    <li>
      <a class="${o.link}" href="/signIn">Login</a>
    </li>
    <li>
      <a class="${o.link}" href="/profile">Profile</a>
     </li>
    <li>
      <a class="${o.link}" href="/messenger">Messenger</a>
    </li>
    <li>
     <a class="${o.link}" href="/notFound">Error 404</a>
    </li>
    <li>
     <a class="${o.link}" href="/serverError">Error 500</a>
    </li>
  </ul>
</div>
`}const E=C(),N="_page_1py5w_1",B="_heading_1py5w_12",j="_inputGroup_1py5w_20",V="_link_1py5w_25",G="_signInButton_1py5w_33",u={page:N,heading:B,inputGroup:j,link:V,signInButton:G};function O(n){return`
<div class="${u.page}">
  <h1 class="${u.heading}">Вход</h1>
  <div class="${u.inputGroup}">
    ${n.loginInput}
    ${n.passwordInput}
  </div>
  
  ${n.signInButton}
  <a href="/signUp" class="${u.link}">Нет аккаунта?</a>
</div>
`}function P(n){return`
  <button class="${n.buttonClassName}">
    ${n.buttonText}
  </button>
`}const R="_button_1rb4t_1",S={button:R},T={buttonClassName:S.button,buttonText:""},y={buttonRender:P,buttonContext:T},H="_container_1j14y_1",U="_input_1j14y_5",q="_label_1j14y_21",M="_error_1j14y_37",z="_invalid_1j14y_43",d={container:H,input:U,label:q,error:M,invalid:z};function F(n){return`
  <div class="${d.container}">
    <input id="input_${n.name}" 
            name="${n.name}" 
            value="${n.value}" 
            class="${d.input}" 
            placeholder="" 
            type="${n.type}"
            required />
    <label for="input_${n.name}" class="${d.label}">${n.placeholder}</label>
    <span class="${d.error}">${n.error}</span>
  </div>
`}const x={type:"text",name:"",placeholder:"",value:"",error:""},A={inputRender:F,inputContext:x},{inputContext:D,inputRender:K}=A;function J(n,i,c){return Object.keys(n).forEach(p=>{i[p]=n[p]}),c(i)}function a(n,i,c="text"){return J({name:n,placeholder:i,type:c},D,K)}const{buttonContext:b,buttonRender:Q}=y;b.buttonText="Авторизоваться";b.buttonClassName+=` ${u.signInButton}`;const W=Q(b),X={loginInput:a("login","Логин"),passwordInput:a("password","Пароль"),signInButton:W},Y=O(X),Z="_page_ur1pj_1",nn="_heading_ur1pj_12",sn="_inputGroup_ur1pj_20",en="_link_ur1pj_25",tn="_signInButton_ur1pj_33",$={page:Z,heading:nn,inputGroup:sn,link:en,signInButton:tn};function an(n){return`
<div class="${$.page}">
  <h1 class="${$.heading}">Регистрация</h1>
  <div class="${$.inputGroup}">
    ${n.emailInput}
    ${n.loginInput}
    ${n.firstNameInput}
    ${n.secondNameInput}
    ${n.phoneInput}
    ${n.passwordInput}
    ${n.passwordCheckInput}
  </div>
  
  ${n.signUpButton}
  <a href="/signIn" class="${$.link}">Войти</a>
</div>
`}const{buttonContext:h,buttonRender:on}=y;h.buttonText="Зарегистрироваться";h.buttonClassName+=` ${$.signInButton}`;const ln=on(h),rn={emailInput:a("email","Почта"),loginInput:a("login","Логин"),firstNameInput:a("first_name","Имя"),secondNameInput:a("second_name","Фамилия"),phoneInput:a("phone","Телефон"),passwordInput:a("password","Пароль","password"),passwordCheckInput:a("passwordCheck","Пароль (ещё раз)","password"),signUpButton:ln},cn=an(rn),pn="_page_prpc5_1",un="_heading_prpc5_8",$n="_message_prpc5_15",dn="_link_prpc5_22",_={page:pn,heading:un,message:$n,link:dn};function _n(n){return`
  <div class="${_.page}">
    <h1 class="${_.heading}">404</h1>
    <p class="${_.message}">Не туда попали</p>
    <a href="/" class="${_.link}">Назад к чатам</a>
  </div>
`}const gn=_n(),mn="_back_10wmb_1",fn="_blink_10wmb_1",v={back:mn,blink:fn},kn="_page_prpc5_1",bn="_heading_prpc5_8",hn="_message_prpc5_15",vn="_link_prpc5_22",g={page:kn,heading:bn,message:hn,link:vn};function yn(n){return`
  <div class="${g.page}">
    <h1 class="${g.heading}">500</h1>
    <p class="${g.message}">Уже фиксим</p>
    <a href="/" class="${g.link}">Назад к чатам</a>
  </div>
`}const Ln=yn(),In="_page_k6y43_1",wn="_heading_k6y43_10",Cn="_profileList_k6y43_18",En="_profileListItem_k6y43_29",Nn="_profileLabel_k6y43_41",Bn="_profileValue_k6y43_47",jn="_profileEditLink_k6y43_53",Vn="_logoutLink_k6y43_59",s={page:In,heading:wn,profileList:Cn,profileListItem:En,profileLabel:Nn,profileValue:Bn,profileEditLink:jn,logoutLink:Vn};function Gn(n){return`
  <div class="${s.page}">
    ${n.avatar}
    <h1 class="${s.heading}">${n.nickname}</h1>
    <ul class="${s.profileList}">
      <li class="${s.profileListItem}">
        <span class="${s.profileLabel}">Почта:</span>
        <span class="${s.profileValue}">${n.email}</span>
      </li>
      <li class="${s.profileListItem}">
        <span class="${s.profileLabel}">Логин:</span>
        <span class="${s.profileValue}">${n.login}</span>
      </li>
      <li class="${s.profileListItem}">
        <span class="${s.profileLabel}">Имя:</span>
        <span class="${s.profileValue}">${n.firstName}</span>
      </li>
      <li class="${s.profileListItem}">
        <span class="${s.profileLabel}">Фамилия:</span>
        <span class="${s.profileValue}">${n.secondName}</span>
      </li>
      <li class="${s.profileListItem}">
        <span class="${s.profileLabel}">Имя в чате:</span>
        <span class="${s.profileValue}">${n.nickname}</span>
      </li>
      <li class="${s.profileListItem}">
        <span class="${s.profileLabel}">Телефон:</span>
        <span class="${s.profileValue}">${n.phone}</span>
      </li>
    </ul>
    <ul class="${s.profileList}">
      <li class="${s.profileListItem}">
        <a href="/profile/edit" class="${s.profileEditLink}" data-type="edit-profile">Изменить данные</a>
      </li>
      <li class="${s.profileListItem}">
        <a href="/profile/password" class="${s.profileEditLink}" data-type="edit-password">Изменить пароль</a>
      </li>
      <li class="${s.profileListItem}">
        <a href="/logout" class="${s.logoutLink}">Выйти</a>
      </li>
    </ul>
  </div>
`}const On="_container_10mku_1",Pn="_avatar_10mku_5",Rn="_image_10mku_17",Sn="_edit_10mku_24",m={container:On,avatar:Pn,image:Rn,edit:Sn};function Tn(n){return`
  <div class="${m.container}">
    <div class="${m.avatar}">
      <img class="${m.image}" src="${n.avatarSrc}" alt="Аватар" />
      <div class="${m.edit}">Поменять аватар</div>
    </div>
  </div>
`}const Hn={avatarSrc:"../../../../avatar_default.png"},Un=Tn(Hn),qn={avatar:Un,email:"pochta@yandex.ru",login:"ivanovivan",firstName:"Иван",secondName:"Иванов",nickname:"Иван",phone:"+7 (909) 967 30 30"},Mn=Gn(qn),zn="_messenger_80k3v_1",Fn="_sidebar_80k3v_8",xn="_contactList_80k3v_16",An="_contactListItem_80k3v_22",Dn="_main_80k3v_32",l={messenger:zn,sidebar:Fn,contactList:xn,contactListItem:An,main:Dn};function Kn(n){return`
  <div class="${l.messenger}">
    <aside class="${l.sidebar}">
      <ul class="${l.contactList}">
        <li class="${l.contactListItem}">Андрей</li>
        <li class="${l.contactListItem}">Василий</li>
        <li class="${l.contactListItem}">Петр</li>
      </ul>
    </aside>
    <div class="${l.main}"></div>
  </div>
`}const Jn=Kn();function r(n){document.querySelector(".content").innerHTML=n}function k(n){switch(window.history.pushState({},"",n),n){case"/":r(E);break;case"/signIn":r(Y);break;case"/signUp":r(cn);break;case"/profile":r(Mn);break;case"/messenger":r(Jn);break;case"/serverError":r(Ln);break;default:r(gn)}}document.addEventListener("DOMContentLoaded",()=>{document.querySelector("#app").innerHTML=`
        <main class="content"></main>
        <div class="${v.back}">Back to navigation</div>
    `,k(window.location.pathname),document.querySelector(`.${v.back}`).addEventListener("click",()=>{k("/")}),window.addEventListener("popstate",()=>{k(window.location.pathname)})});
