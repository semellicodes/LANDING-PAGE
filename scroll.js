

const SCROLL_THRESHOLD = 80;

export function initScroll() {
    initSmoothScroll();
    initHeaderScrollBehavior();
}


function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (event) => {
            event.preventDefault();

            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const headerHeight = getHeaderHeight();
            const targetTop    = targetElement.getBoundingClientRect().top
                               + window.scrollY
                               - headerHeight
                               - 16;

            window.scrollTo({ top: targetTop, behavior: 'smooth' });
        });
    });
}


function initHeaderScrollBehavior() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking     = false;

    function updateHeader() {
        const scrollY = window.scrollY;

        if (scrollY > SCROLL_THRESHOLD) {
            header.classList.add('header--scrolled');
            header.classList.remove('header--transparent');
        } else {
            header.classList.remove('header--scrolled');
            header.classList.add('header--transparent');
        }

        lastScrollY = scrollY;
        ticking     = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    updateHeader();
}


function getHeaderHeight() {
    const header = document.querySelector('.header');
    return header ? header.offsetHeight : 0;
}
