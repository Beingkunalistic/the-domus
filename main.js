/* ==============================
   HELPERS
============================== */
const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];

/* ==============================
   HERO SLIDER (UNCHANGED LOGIC)
============================== */
function initHeroSlider() {
    const slides = $$(".slide");
    const dotsContainer = $("#dots");

    if (!slides.length || !dotsContainer) return;

    let currentSlide = 0;
    const slideDuration = 5000;

    slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.className = "dot" + (index === 0 ? " active" : "");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = $$(".dot", dotsContainer);

    function goToSlide(index) {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");

        currentSlide = index;

        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    setInterval(nextSlide, slideDuration);
}

/* ==============================
   LOGO SCROLL SCALE (EXACT OLD LOGIC RESTORED)
============================== */
function initLogoScroll() {
    const logo = $("#logo");
    const hero = $("#hero");
    const header = $("header");
    console.log("Logo scroll initialized");

    if (!logo || !hero || !header) return;

    const maxWidth = 420;
    const minWidth = 240;

    function updateLogoPosition() {
        const heroRect = hero.getBoundingClientRect();
        const headerHeight = header.offsetHeight;
        console.log("scrolling", hero.getBoundingClientRect().top);

        const triggerDistance = heroRect.height / 2 - headerHeight;
        let progress = Math.min(Math.max((0 - heroRect.top) / triggerDistance, 0), 1);

        progress = 1 - Math.pow(1 - progress, 2);

        const scale = (minWidth / maxWidth - 1) * progress + 1;

        const heroCenterY = heroRect.height / 2;
        const headerCenterY =
            headerHeight / 2 + header.getBoundingClientRect().top;

        const translateY = (headerCenterY - heroCenterY) * progress;

        logo.style.transform =
            `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale})`;
    }

    window.addEventListener("scroll", () => {
        requestAnimationFrame(updateLogoPosition);
    });

    window.addEventListener("resize", updateLogoPosition);

    updateLogoPosition();
}

/* ==============================
   ABOUT US CAROUSEL (INFINITE RESTORED)
============================== */
function initAboutCarousel() {
    const carousel = $("#carousel");
    const prevBtn = $(".prev-btn");
    const nextBtn = $(".next-btn");

    if (!carousel || !prevBtn || !nextBtn) return;

    let scrollAmount = 0;
    const cardWidth = 236;

    const galleryItems = Array.from(carousel.children);
    galleryItems.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });

    function scrollNext() {
        scrollAmount += cardWidth;
        if (scrollAmount >= carousel.scrollWidth / 2) {
            scrollAmount = 0;
        }
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
    }

    function scrollPrev() {
        scrollAmount -= cardWidth;
        if (scrollAmount < 0) {
            scrollAmount = (carousel.scrollWidth / 2) - cardWidth;
        }
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
    }

    nextBtn.addEventListener("click", scrollNext);
    prevBtn.addEventListener("click", scrollPrev);
}

/* ==============================
   GALLERY CAROUSEL (RESTORED)
============================== */
function initGalleryCarousel() {
    const galleryCarousel = $("#galleryCarousel");
    const galleryNext = $("#galleryNext");
    const galleryPrev = $("#galleryPrev");

    if (!galleryCarousel || !galleryNext || !galleryPrev) return;

    let galleryIndex = 0;

    function updateGallery() {
        const slideWidth =
            galleryCarousel.children[0].offsetWidth + 40;
        galleryCarousel.style.transform =
            `translateX(-${galleryIndex * slideWidth}px)`;
    }

    galleryNext.addEventListener("click", () => {
        if (galleryIndex < galleryCarousel.children.length - 3) {
            galleryIndex++;
            updateGallery();
        }
    });

    galleryPrev.addEventListener("click", () => {
        if (galleryIndex > 0) {
            galleryIndex--;
            updateGallery();
        }
    });

    window.addEventListener("resize", updateGallery);
}

/* ==============================
   POPUP FORM (RESTORED)
============================== */
function initPopupForm() {
    const openFormBtn = $(".open-form-btn");
    const popupOverlay = $("#popupOverlay");
    const closePopup = $("#closePopup");
    const form = $("#contactForm");

    if (!openFormBtn || !popupOverlay || !closePopup) return;

    openFormBtn.addEventListener("click", () => {
        popupOverlay.style.display = "flex";
    });

    closePopup.addEventListener("click", () => {
        popupOverlay.style.display = "none";
    });

    popupOverlay.addEventListener("click", e => {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = "none";
        }
    });

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        fetch(form.action, {
            method: "POST",
            body: new FormData(form)
        })
            .then(r => r.text())
            .then(() => form.reset())
            .catch(() => alert("Error sending message"));
    });
}

/* ==============================
   MOBILE MENU (RESTORED)
============================== */
function initMobileMenu() {
    const ham = $(".hamburger");
    const mobileMenu = $(".mobile-menu");
    const mobileClose = $(".mobile-close");
    const men = $("#logo")

    if (!ham || !mobileMenu || !mobileClose) return;

    ham.addEventListener("click", () => {
        ham.classList.toggle("active");
        mobileMenu.classList.toggle("open");
        ham.style.display = "none";
        men.style.zIndex = "300";
    });

    mobileClose.addEventListener("click", () => {
        ham.classList.remove("active");
        mobileMenu.classList.remove("open");
        ham.style.display = "flex";
        men.style.zIndex = "1500";
    });
}

/* ==============================
   SECTION ANIMATIONS (RESTORED)
============================== */
function initSectionAnimations() {
    const sections = [
        { el: $(".about-section"), threshold: 0.3 },
        { el: $(".gallery-section"), threshold: 0.3 }
    ];

    sections.forEach(({ el, threshold }) => {
        if (!el) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    el.classList.add("animate");
                    observer.unobserve(el);
                }
            });
        }, { threshold });

        observer.observe(el);
    });
}

/* ==============================
   STATS COUNTER (OLD VERSION RESTORED)
============================== */
function initStatsCounter() {
    const section = $(".stats-banner");
    const counterEl = $("#counter");

    if (!section || !counterEl) return;

    let start = 0;
    const end = 2000;
    const duration = 1200;
    const step = end / (duration / 16);

    function runCounter() {
        start += step;
        if (start < end) {
            counterEl.innerText = Math.floor(start);
            requestAnimationFrame(runCounter);
        } else {
            counterEl.innerText = end;
        }
    }

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            section.classList.add("animate");
            runCounter();
            observer.disconnect();
        }
    }, { threshold: 0.4 });

    observer.observe(section);
}

function initStatsCounter2() {
    const section2 = $(".stats-banner-mobile");
    const counterEl2 = $("#counter-mobile");

    if (!section2 || !counterEl2) return;

    let start2 = 0;
    const end2 = 2000;
    const duration2 = 1200;
    const step2 = end2 / (duration2 / 16);

    function runCounter() {
        start2 += step2;
        if (start2 < end2) {
            counterEl2.innerText = Math.floor(start2);
            requestAnimationFrame(runCounter);
        } else {
            counterEl2.innerText = end2;
        }
    }

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            section2.classList.add("animate");
            runCounter();
            observer.disconnect();
        }
    }, { threshold: 0.4 });

    observer.observe(section2);
}

/* ==============================
   PROJECT CAROUSEL (KEEP NEW WORKING VERSION) original without dynamic heading change
============================== */
// function initProjectCarousel() {
//     const track = $(".project-carousel__track");
//     const slides = $$(".project-carousel__slide");
//     const prev = $(".project-carousel__btn--prev");
//     const next = $(".project-carousel__btn--next");
//     const viewport = $(".project-carousel__viewport");

//     if (!track || !slides.length || !prev || !next || !viewport) return;

//     let pcIndex = 0;
//     const gap = 24;

//     const slideWidth = () => slides[0].offsetWidth + gap;

//     function visibleSlides() {
//         return Math.round(viewport.offsetWidth / slideWidth());
//     }

//     function maxIndex() {
//         return Math.max(slides.length - visibleSlides(), 0);
//     }

//     function updateButtons() {
//         prev.disabled = pcIndex === 0;
//         next.disabled = pcIndex === maxIndex();
//     }

//     function updateActive() {
//         slides.forEach(s => s.classList.remove("is-active"));
//         const centerOffset = Math.floor(visibleSlides() / 2);
//         const activeIndex = pcIndex + centerOffset;
//         if (slides[activeIndex]) {
//             slides[activeIndex].classList.add("is-active");
//         }
//     }

//     function update() {
//         track.style.transform =
//             `translateX(-${pcIndex * slideWidth()}px)`;
//         updateActive();
//         updateButtons();
//     }

//     next.addEventListener("click", () => {
//         if (pcIndex < maxIndex()) {
//             pcIndex++;
//             update();
//         }
//     });

//     prev.addEventListener("click", () => {
//         if (pcIndex > 0) {
//             pcIndex--;
//             update();
//         }
//     });

//     window.addEventListener("resize", () => {
//         pcIndex = Math.min(pcIndex, maxIndex());
//         update();
//     });

//     update();
// }

function initProjectCarousel() {

    const track = document.querySelector(".project-carousel__track");
    const slides = document.querySelectorAll(".project-carousel__slide");
    const prevBtn = document.querySelector(".project-carousel__btn--prev");
    const nextBtn = document.querySelector(".project-carousel__btn--next");

    const titleEl = document.getElementById("projectTitle");
    const linkEl = document.getElementById("projectLink");

    if (!track || !slides.length || !prevBtn || !nextBtn) return;

    let activeIndex = 1; // start from middle slide

    // const gap = 24;
    function getGap() {
        return window.innerWidth > 768 ? 24 : 0;
    }
    function slideWidth() {
        return slides[0].offsetWidth + getGap();
    }


    // function slideWidth() {
    //     return slides[0].offsetWidth + gap;
    // }

    function centerSlide(index) {

        const viewportWidth = document.querySelector(".project-carousel__viewport").offsetWidth;
        const slideW = slideWidth();

        // calculate center position of selected slide
        const slideCenter = (slideW * index) + (slideW / 2);

        // calculate how much to shift so it sits in center of viewport
        const viewportCenter = viewportWidth / 2;

        const translateAmount = slideCenter - viewportCenter;

        track.style.transform = `translateX(-${translateAmount}px)`;
    }

    function update() {

        // CENTER ACTIVE SLIDE
        centerSlide(activeIndex);

        // ACTIVE CLASS (desktop only)
        slides.forEach((slide, i) => {
            slide.classList.toggle("is-active", i === activeIndex && window.innerWidth > 768);
        });

        // UPDATE TITLE + CTA
        const activeSlide = slides[activeIndex];
        if (activeSlide) {
            const newTitle = activeSlide.dataset.title;
            const newLink = activeSlide.dataset.link;

            if (newTitle && titleEl) titleEl.textContent = newTitle;
            if (newLink && linkEl) linkEl.setAttribute("href", newLink);
        }

        // BUTTON STATES
        prevBtn.disabled = activeIndex === 0;
        nextBtn.disabled = activeIndex === slides.length - 1;
    }

    nextBtn.addEventListener("click", () => {
        if (activeIndex < slides.length - 1) {
            activeIndex++;
            update();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (activeIndex > 0) {
            activeIndex--;
            update();
        }
    });

    window.addEventListener("resize", update);

    update();
}


function initMobileCarousel() {

    if (window.innerWidth > 768) return;

    const trackMobile = document.querySelector(".mobile-carousel__track");
    const slidesMobile = document.querySelectorAll(".mobile-carousel__item");
    const prevMobile = document.querySelector(".mobile-carousel__arrow--prev");
    const nextMobile = document.querySelector(".mobile-carousel__arrow--next");

    const titleMobile = document.getElementById("mobileProjectTitle");
    const linkMobile = document.getElementById("mobileProjectLink");

    if (!trackMobile || !slidesMobile.length) return;

    let mobileIndex = 0;

    function updateMobileCarousel() {

        trackMobile.style.transform =
            `translateX(-${mobileIndex * 100}%)`;

        const activeSlide = slidesMobile[mobileIndex];

        if (activeSlide) {
            const newTitle = activeSlide.dataset.title;
            const newLink = activeSlide.dataset.link;

            if (titleMobile) titleMobile.textContent = newTitle;
            if (linkMobile) linkMobile.setAttribute("href", newLink);
        }

        prevMobile.disabled = mobileIndex === 0;
        nextMobile.disabled = mobileIndex === slidesMobile.length - 1;
    }

    nextMobile.addEventListener("click", () => {
        if (mobileIndex < slidesMobile.length - 1) {
            mobileIndex++;
            updateMobileCarousel();
        }
    });

    prevMobile.addEventListener("click", () => {
        if (mobileIndex > 0) {
            mobileIndex--;
            updateMobileCarousel();
        }
    });

    updateMobileCarousel();
}

document.addEventListener("DOMContentLoaded", initMobileCarousel);


/* ==============================
   BOOTSTRAP
============================== */
document.addEventListener("DOMContentLoaded", () => {
    initHeroSlider();
    initLogoScroll();
    initAboutCarousel();
    initGalleryCarousel();
    initPopupForm();
    initMobileMenu();
    initSectionAnimations();
    initStatsCounter();
    initStatsCounter2();
    initProjectCarousel();
    initMobileCarousel();
});