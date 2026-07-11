

const AUTOPLAY_INTERVAL  = 5000;
const VISIBLE_SLIDES_LG  = 3;
const VISIBLE_SLIDES_MD  = 2;
const VISIBLE_SLIDES_SM  = 1;

export function initSlider() {
    const sliders = document.querySelectorAll('[data-slider]');
    sliders.forEach(createSlider);
}

function createSlider(sliderEl) {
    const track      = sliderEl.querySelector('[data-slider-track]');
    const slides     = sliderEl.querySelectorAll('[data-slider-item]');
    const dotsWrap   = sliderEl.querySelector('[data-slider-dots]');
    const btnPrev    = sliderEl.querySelector('[data-slider-prev]');
    const btnNext    = sliderEl.querySelector('[data-slider-next]');

    if (!track || slides.length === 0) return;

    let currentIndex   = 0;
    let autoplayTimer  = null;
    let isDragging     = false;
    let startX         = 0;
    let dragThreshold  = 60;

    const state = { index: 0 };

    
    function buildDots() {
        if (!dotsWrap) return;
        dotsWrap.innerHTML = '';

        const totalDots = getMaxIndex() + 1;

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className   = 'testimonials__dot';
            dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(dot);
        }
    }

    function updateDots() {
        if (!dotsWrap) return;
        dotsWrap.querySelectorAll('.testimonials__dot').forEach((dot, i) => {
            dot.classList.toggle('is-active', i === state.index);
        });
    }

    
    function getVisibleCount() {
        if (window.innerWidth <= 640)  return VISIBLE_SLIDES_SM;
        if (window.innerWidth <= 1024) return VISIBLE_SLIDES_MD;
        return VISIBLE_SLIDES_LG;
    }

    function getMaxIndex() {
        return Math.max(0, slides.length - getVisibleCount());
    }

    
    function goTo(index) {
        const maxIndex  = getMaxIndex();
        state.index     = Math.max(0, Math.min(index, maxIndex));

        const slideWidth = slides[0].offsetWidth + parseGap();
        track.style.transform = `translateX(-${state.index * slideWidth}px)`;

        updateDots();
    }

    function parseGap() {
        const gapValue = getComputedStyle(track).gap;
        return parseFloat(gapValue) || 24;
    }

    function goNext() {
        const nextIndex = state.index >= getMaxIndex() ? 0 : state.index + 1;
        goTo(nextIndex);
    }

    function goPrev() {
        const prevIndex = state.index <= 0 ? getMaxIndex() : state.index - 1;
        goTo(prevIndex);
    }

    
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(goNext, AUTOPLAY_INTERVAL);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    
    function onDragStart(event) {
        isDragging = true;
        startX     = event.clientX ?? event.touches?.[0].clientX ?? 0;
        stopAutoplay();
    }

    function onDragEnd(event) {
        if (!isDragging) return;
        isDragging = false;

        const endX = event.clientX ?? event.changedTouches?.[0].clientX ?? 0;
        const diff = startX - endX;

        if (Math.abs(diff) > dragThreshold) {
            diff > 0 ? goNext() : goPrev();
        }

        startAutoplay();
    }

    track.addEventListener('mousedown',   onDragStart);
    track.addEventListener('touchstart',  onDragStart, { passive: true });
    track.addEventListener('mouseup',     onDragEnd);
    track.addEventListener('touchend',    onDragEnd);

    
    btnPrev?.addEventListener('click', () => { goPrev(); restartAutoplay(); });
    btnNext?.addEventListener('click', () => { goNext(); restartAutoplay(); });

    function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    
    sliderEl.addEventListener('mouseenter', stopAutoplay);
    sliderEl.addEventListener('mouseleave', startAutoplay);

    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            buildDots();
            goTo(state.index);
        }, 200);
    });

    
    buildDots();
    goTo(0);
    startAutoplay();
}
