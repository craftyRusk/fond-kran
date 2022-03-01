var sticky = new Sticky('.sidebar');

$(document).ready(function () {
    $('.menu__item').click(function () {
        $('.menu__item.menu__item_active').removeClass('menu__item_active');
        $(this).addClass('menu__item_active');
    });
});

// initPageNavigation();
// initMobileMenu();
// initScrollAnimations();

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
                        item.classList.add('active');
                        // updateHistory(hash);
                        return;
                    }
                    item.classList.remove('active');
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

    button.addEventListener('click', () => menu.classList.toggle('active'));

    [].forEach.call(menuLinks, (link) => {
        link.addEventListener('click', () => {
            setTimeout(() => menu.classList.remove('active'), 300);
        });
    });
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