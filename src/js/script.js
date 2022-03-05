document.addEventListener("DOMContentLoaded", () => {
    dialogOpen();       
    initPageNavigation();
    initMobileMenu();
    initInvertedMenu();
    initScrollAnimations();
});

let ok = false;                    
window.addEventListener('scroll', function() {
    if (ok === false) {
        ok = true;    
        setTimeout(() => {                    
            let script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Aa33167d6a5ad01d3df9149c8df9021fc2f061bd0957b4fb627403944276120e2&amp;width=825&amp;height=520&amp;lang=ru_RU&amp;scroll=false';
            document.getElementById('map').replaceWith(script);                        
        }, 500)    
    }
});

function dialogOpen() {
    const dialogs = document.querySelectorAll('[data-dialog]');
    dialogs.forEach((element) => {
        dialogPolyfill.registerDialog(element);
    })
    
    document.querySelectorAll('[data-dialog-open]').forEach((el) => {
        el.addEventListener('click', () => {       
            const dialogId = el.getAttribute('data-dialog-open');
            const dialog = document.querySelector(`[data-dialog="${dialogId}"]`);
            dialog.showModal();
        });
    })

}

function initPageNavigation() {
    if (!'IntersectionObserver' in window) {
        return;
    }

    const navItems = document.querySelectorAll('[data-navigation-link]');
    const sections = document.querySelectorAll('[data-navigation-section]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -400px',
        threshold: 0,
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    [].forEach.call(sections, (section) => observer.observe(section));

    function observerCallback(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const hash = '#' + entry.target.id;
                const activeNavItem = document.querySelector('[href="' + hash + '"]');

                [].forEach.call(navItems, (item) => {
                    if (item === activeNavItem) {
                        item.classList.add('menu__link_active');
                        // updateHistory(hash);
                        return;
                    }
                    item.classList.remove('menu__link_active');
                });
            }
        });
    }

    function updateHistory(hash) {
        if (window.location.hash === hash) {
            return;
        }
        if (location.hash !== '') {
            history.pushState({}, window.title, hash);
            return;
        }
        history.replaceState({}, window.title, hash);
    }
}

function initMobileMenu() {
    const button = document.querySelector('[data-nav-burger]');
    const menu = document.querySelector('[data-nav-menu]');
    const menuLinks = menu.querySelectorAll('a');

    button.addEventListener('click', () => menu.classList.toggle('sidebar_active'));

    [].forEach.call(menuLinks, (link) => {
        link.addEventListener('click', () => {
            setTimeout(() => menu.classList.remove('sidebar_active'), 300);
        });
    });
}

function initInvertedMenu() {
    const menu = document.querySelector('[data-nav-menu]');
    const invertedMenuPlaceholder = document.querySelector('[data-menu-clone]');
    const clone = menu.cloneNode(true);
    clone.classList.add('sidebar_invert');
    clone.classList.add('sidebar_sticky');
    invertedMenuPlaceholder.appendChild(clone);
}

function initScrollAnimations() {
    if (!'IntersectionObserver' in window) {
        return;
    }

    const observerElements = document.querySelectorAll('[data-animate]');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px',
        threshold: 0,
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    [].forEach.call(observerElements, (element) => observer.observe(element));

    function observerCallback(entries) {
        entries.forEach(entry => {
            const animateEl = entry.target;

            if (entry.intersectionRatio > 0) {
                animateEl.classList.remove('will-animate');
                observer.unobserve(entry.target);
                return;
            }
            animateEl.classList.add('will-animate');
        });
    }
}