/* ==============================
   HELPERS
============================== */
const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];

/* ==============================
   HERO SLIDER
============================== */
function initHeroSlider() {
    const slides = $$(".slide");
    const dotsContainer = $("#dots");

    if (!slides.length || !dotsContainer) return;

    let current = 0;
    const duration = 5000;

    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    const dots = $$(".dot", dotsContainer);

    function goTo(i) {
        slides[current].classList.remove("active");
        dots[current].classList.remove("active");
        current = i;
        slides[current].classList.add("active");
        dots[current].classList.add("active");
    }

    setInterval(() => goTo((current + 1) % slides.length), duration);
}

/* ==============================
   LOGO SCROLL SCALE
============================== */
function initLogoScroll() {
    const logo = $("#logo");
    const hero = $("#hero");
    const header = $("header");

    if (!logo || !hero || !header) return;

    const maxWidth = 420;
    const minWidth = 240;

    function update() {
        const heroRect = hero.getBoundingClientRect();
        const headerHeight = header.offsetHeight;

        const trigger = heroRect.height / 2 - headerHeight;
        let progress = Math.min(Math.max(-heroRect.top / trigger, 0), 1);
        progress = 1 - Math.pow(1 - progress, 2);

        const scale = (minWidth / maxWidth - 1) * progress + 1;
        logo.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    window.addEventListener("scroll", () => requestAnimationFrame(update));
    window.addEventListener("resize", update);
    update();
}

/* ==============================
   ABOUT US CAROUSEL
============================== */
function initAboutCarousel() {
    const carousel = $("#carousel");
    const next = $(".next-btn");
    const prev = $(".prev-btn");

    if (!carousel || !next || !prev) return;

    let offset = 0;
    const cardWidth = 236;

    next.addEventListener("click", () => {
        offset += cardWidth;
        carousel.style.transform = `translateX(-${offset}px)`;
    });

    prev.addEventListener("click", () => {
        offset = Math.max(offset - cardWidth, 0);
        carousel.style.transform = `translateX(-${offset}px)`;
    });
}

/* ==============================
   POPUP FORM
============================== */
function initPopupForm() {
    const openBtn = $(".open-form-btn");
    const overlay = $("#popupOverlay");
    const closeBtn = $("#closePopup");
    const form = $("#contactForm");

    if (!openBtn || !overlay || !closeBtn) return;

    openBtn.onclick = () => overlay.style.display = "flex";
    closeBtn.onclick = () => overlay.style.display = "none";
    overlay.onclick = e => e.target === overlay && (overlay.style.display = "none");

    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        fetch(form.action, { method: "POST", body: new FormData(form) })
            .then(r => r.text())
            .then(() => form.reset())
            .catch(() => alert("Error submitting form"));
    });
}

/* ==============================
   MOBILE MENU
============================== */
function initMobileMenu() {
    const ham = $(".hamburger");
    const menu = $(".mobile-menu");
    const close = $(".mobile-close");

    if (!ham || !menu || !close) return;

    ham.onclick = () => {
        ham.classList.add("active");
        menu.classList.add("open");
        ham.style.display = "none";
    };

    close.onclick = () => {
        ham.classList.remove("active");
        menu.classList.remove("open");
        ham.style.display = "flex";
    };
}

/* ==============================
   PROJECT CAROUSEL (CENTER ACTIVE)
============================== */
function initProjectCarousel() {
    const track = $(".project-carousel__track");
    const slides = $$(".project-carousel__slide");
    const prev = $(".project-carousel__btn--prev");
    const next = $(".project-carousel__btn--next");
    const viewport = $(".project-carousel__viewport");

    if (!track || !slides.length || !prev || !next || !viewport) return;

    let index = 0;
    const gap = 24;

    const slideWidth = () => slides[0].offsetWidth + gap;

    function visibleSlides() {
        return Math.round(viewport.offsetWidth / slideWidth());
    }

    function maxIndex() {
        return Math.max(slides.length - visibleSlides(), 0);
    }

    function updateButtons() {
        prev.disabled = index === 0;
        next.disabled = index === maxIndex();
    }

    function updateActive() {
        slides.forEach(s => s.classList.remove("is-active"));

        const centerOffset = Math.floor(visibleSlides() / 2);
        const activeIndex = index + centerOffset;

        if (slides[activeIndex]) {
            slides[activeIndex].classList.add("is-active");
        }
    }

    function update() {
        track.style.transform = `translateX(-${index * slideWidth()}px)`;
        updateActive();
        updateButtons();
    }

    next.onclick = () => {
        if (index < maxIndex()) {
            index++;
            update();
        }
    };

    prev.onclick = () => {
        if (index > 0) {
            index--;
            update();
        }
    };

    window.addEventListener("resize", () => {
        index = Math.min(index, maxIndex());
        update();
    });

    // init
    update();
}

/* ==============================
   STATS COUNTER
============================== */
function initStatsCounter() {
    const section = $(".stats-banner");
    const counter = $("#counter");

    if (!section || !counter) return;

    let started = false;

    const animate = target => {
        let start = 0;
        const duration = 1200;
        const startTime = performance.now();

        const step = now => {
            const progress = Math.min((now - startTime) / duration, 1);
            counter.textContent = Math.floor(progress * target);
            progress < 1 ? requestAnimationFrame(step) : counter.textContent = target;
        };

        requestAnimationFrame(step);
    };

    new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !started) {
            started = true;
            section.classList.add("animate");
            animate(2000);
        }
    }, { threshold: 0.4 }).observe(section);
}

/* ==============================
   BOOTSTRAP
============================== */
document.addEventListener("DOMContentLoaded", () => {
    initHeroSlider();
    initLogoScroll();
    initAboutCarousel();
    initPopupForm();
    initMobileMenu();
    initProjectCarousel();
    initStatsCounter();
});
