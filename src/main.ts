import navigation, { navigationLinkClass } from './pages/navigation';
import signIn from './pages/signIn';
import signUp from './pages/signUp';
import styles from './main.module.css';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
        <main class="content"></main>
        <div class="${styles.back}">Back to navigation</div>
    `;

    renderPage(signUp);
    activateNavigation();
});

function renderPage(html:string):void {
    document.querySelector<HTMLDivElement>('.content')!.innerHTML = html;
}

function switchPage(href:string):void {
    switch (href) {
        case '/':
            renderPage(navigation);
            break;
        case '/signIn':
            renderPage(signIn);
            break;
        case '/signUp':
            renderPage(signUp);
            break;
        default:
            renderPage('<h1>Not Found</h1>');
    }
}

function activateNavigation():void {
    const container = document.querySelector<HTMLDivElement>('.content')!;
    const backLink: HTMLDivElement = document.querySelector<HTMLDivElement>(`.${styles.back}`)!;

    container.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains(navigationLinkClass)) {
            event.preventDefault();
            const href:string|null = target.getAttribute('href');
            if (!href) return;

            switchPage(href);
        }
    });

    backLink.addEventListener('click', () => {
        switchPage('/');
    });
}
