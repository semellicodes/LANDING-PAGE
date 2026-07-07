/* ============================================================
   MENU.JS — Mobile Navigation Toggle
   ============================================================ */

export function initMenu() {
    const toggle   = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.nav--mobile');
    const overlay  = document.querySelector('.nav-overlay');

    if (!toggle || !mobileNav) return;

    function openMenu() {
        toggle.classList.add('is-active');
        mobileNav.classList.add('is-open');
        overlay?.classList.add('is-active');
        document.body.style.overflow = 'hidden';
        toggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        toggle.classList.remove('is-active');
        mobileNav.classList.remove('is-open');
        overlay?.classList.remove('is-active');
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
        const isOpen = mobileNav.classList.contains('is-open');
        isOpen ? closeMenu() : openMenu();
    }

    toggle.addEventListener('click', toggleMenu);
    overlay?.addEventListener('click', closeMenu);

    // Fechar ao clicar em um link do menu mobile
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fechar com Esc
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    // Fechar ao redimensionar para desktop
    const mediaQuery = window.matchMedia('(min-width: 1025px)');
    mediaQuery.addEventListener('change', (event) => {
        if (event.matches) closeMenu();
    });

    // Marcar link ativo no menu mobile por scroll
    updateActiveNavLinks();
}

function updateActiveNavLinks() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const onScroll = () => {
        const scrollY = window.scrollY + 120;

        sections.forEach((section, index) => {
            const top    = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (scrollY >= top && scrollY < bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index]?.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
}
