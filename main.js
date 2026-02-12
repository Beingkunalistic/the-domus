/* ==============================
   HELPERS
============================== */
// const $ = (sel, scope = document) => scope.querySelector(sel);
// const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];

// /* ==============================
//    HERO SLIDER
// ============================== */
// function initHeroSlider() {
//     const slides = $$(".slide");
//     const dotsContainer = $("#dots");

//     if (!slides.length || !dotsContainer) return;

//     let current = 0;
//     const duration = 5000;

//     slides.forEach((_, i) => {
//         const dot = document.createElement("span");
//         dot.className = "dot" + (i === 0 ? " active" : "");
//         dot.addEventListener("click", () => goTo(i));
//         dotsContainer.appendChild(dot);
//     });

//     const dots = $$(".dot", dotsContainer);

//     function goTo(i) {
//         slides[current].classList.remove("active");
//         dots[current].classList.remove("active");
//         current = i;
//         slides[current].classList.add("active");
//         dots[current].classList.add("active");
//     }

//     setInterval(() => goTo((current + 1) % slides.length), duration);
// }

// /* ==============================
//    LOGO SCROLL SCALE
// ============================== */
// function initLogoScroll() {
//     const logo = $("#logo");
//     const hero = $("#hero");
//     const header = $("header");

//     if (!logo || !hero || !header) return;

//     const maxWidth = 420;
//     const minWidth = 240;

//     function update() {
//         const heroRect = hero.getBoundingClientRect();
//         const headerHeight = header.offsetHeight;

//         const trigger = heroRect.height / 2 - headerHeight;
//         let progress = Math.min(Math.max(-heroRect.top / trigger, 0), 1);
//         progress = 1 - Math.pow(1 - progress, 2);

//         const scale = (minWidth / maxWidth - 1) * progress + 1;
//         logo.style.transform = `translate(-50%, -50%) scale(${scale})`;
//     }

//     window.addEventListener("scroll", () => requestAnimationFrame(update));
//     window.addEventListener("resize", update);
//     update();
// }

// /* ==============================
//    ABOUT US CAROUSEL
// ============================== */
// function initAboutCarousel() {
//     const carousel = $("#carousel");
//     const next = $(".next-btn");
//     const prev = $(".prev-btn");

//     if (!carousel || !next || !prev) return;

//     let offset = 0;
//     const cardWidth = 236;

//     next.addEventListener("click", () => {
//         offset += cardWidth;
//         carousel.style.transform = `translateX(-${offset}px)`;
//     });

//     prev.addEventListener("click", () => {
//         offset = Math.max(offset - cardWidth, 0);
//         carousel.style.transform = `translateX(-${offset}px)`;
//     });
// }

// /* ==============================
//    POPUP FORM
// ============================== */
// function initPopupForm() {
//     const openBtn = $(".open-form-btn");
//     const overlay = $("#popupOverlay");
//     const closeBtn = $("#closePopup");
//     const form = $("#contactForm");

//     if (!openBtn || !overlay || !closeBtn) return;

//     openBtn.onclick = () => overlay.style.display = "flex";
//     closeBtn.onclick = () => overlay.style.display = "none";
//     overlay.onclick = e => e.target === overlay && (overlay.style.display = "none");

//     if (!form) return;

//     form.addEventListener("submit", e => {
//         e.preventDefault();
//         fetch(form.action, { method: "POST", body: new FormData(form) })
//             .then(r => r.text())
//             .then(() => form.reset())
//             .catch(() => alert("Error submitting form"));
//     });
// }

// /* ==============================
//    MOBILE MENU
// ============================== */
// function initMobileMenu() {
//     const ham = $(".hamburger");
//     const menu = $(".mobile-menu");
//     const close = $(".mobile-close");

//     if (!ham || !menu || !close) return;

//     ham.onclick = () => {
//         ham.classList.add("active");
//         menu.classList.add("open");
//         ham.style.display = "none";
//     };

//     close.onclick = () => {
//         ham.classList.remove("active");
//         menu.classList.remove("open");
//         ham.style.display = "flex";
//     };
// }

// /* ==============================
//    PROJECT CAROUSEL (CENTER ACTIVE)
// ============================== */
// function initProjectCarousel() {
//     const track = $(".project-carousel__track");
//     const slides = $$(".project-carousel__slide");
//     const prev = $(".project-carousel__btn--prev");
//     const next = $(".project-carousel__btn--next");
//     const viewport = $(".project-carousel__viewport");

//     if (!track || !slides.length || !prev || !next || !viewport) return;

//     let index = 0;
//     const gap = 24;

//     const slideWidth = () => slides[0].offsetWidth + gap;

//     function visibleSlides() {
//         return Math.round(viewport.offsetWidth / slideWidth());
//     }

//     function maxIndex() {
//         return Math.max(slides.length - visibleSlides(), 0);
//     }

//     function updateButtons() {
//         prev.disabled = index === 0;
//         next.disabled = index === maxIndex();
//     }

//     function updateActive() {
//         slides.forEach(s => s.classList.remove("is-active"));

//         const centerOffset = Math.floor(visibleSlides() / 2);
//         const activeIndex = index + centerOffset;

//         if (slides[activeIndex]) {
//             slides[activeIndex].classList.add("is-active");
//         }
//     }

//     function update() {
//         track.style.transform = `translateX(-${index * slideWidth()}px)`;
//         updateActive();
//         updateButtons();
//     }

//     next.onclick = () => {
//         if (index < maxIndex()) {
//             index++;
//             update();
//         }
//     };

//     prev.onclick = () => {
//         if (index > 0) {
//             index--;
//             update();
//         }
//     };

//     window.addEventListener("resize", () => {
//         index = Math.min(index, maxIndex());
//         update();
//     });

//     // init
//     update();
// }

// /* ==============================
//    STATS COUNTER
// ============================== */
// function initStatsCounter() {
//     const section = $(".stats-banner");
//     const counter = $("#counter");

//     if (!section || !counter) return;

//     let started = false;

//     const animate = target => {
//         let start = 0;
//         const duration = 1200;
//         const startTime = performance.now();

//         const step = now => {
//             const progress = Math.min((now - startTime) / duration, 1);
//             counter.textContent = Math.floor(progress * target);
//             progress < 1 ? requestAnimationFrame(step) : counter.textContent = target;
//         };

//         requestAnimationFrame(step);
//     };

//     new IntersectionObserver(entries => {
//         if (entries[0].isIntersecting && !started) {
//             started = true;
//             section.classList.add("animate");
//             animate(2000);
//         }
//     }, { threshold: 0.4 }).observe(section);
// }

// /* ==============================
//    BOOTSTRAP
// ============================== */
// document.addEventListener("DOMContentLoaded", () => {
//     initHeroSlider();
//     initLogoScroll();
//     initAboutCarousel();
//     initPopupForm();
//     initMobileMenu();
//     initProjectCarousel();
//     initStatsCounter();
// });

// OLD CODE

// document.addEventListener("DOMContentLoaded", () => {
//     /* ==============================
//        HERO SLIDER
//     ============================== */
//     const slides = document.querySelectorAll(".slide");
//     const dotsContainer = document.getElementById("dots");

//     let currentSlide = 0;
//     const totalSlides = slides.length;
//     const slideDuration = 5000; // 5 seconds
//     let slideInterval;

//     // Create navigation dots dynamically
//     slides.forEach((_, index) => {
//         const dot = document.createElement("span");
//         dot.classList.add("dot");
//         if (index === 0) dot.classList.add("active");
//         dot.addEventListener("click", () => goToSlide(index));
//         dotsContainer.appendChild(dot);
//     });
//     const dots = document.querySelectorAll(".dot");

//     function goToSlide(index) {
//         slides[currentSlide].classList.remove("active");
//         dots[currentSlide].classList.remove("active");

//         currentSlide = index;

//         slides[currentSlide].classList.add("active");
//         dots[currentSlide].classList.add("active");
//     }

//     function nextSlide() {
//         goToSlide((currentSlide + 1) % totalSlides);
//     }

//     function startSlideshow() {
//         slideInterval = setInterval(nextSlide, slideDuration);
//     }

//     // Start slideshow
//     startSlideshow();


//     /* ==============================
//        LOGO SCROLL SCALE ANIMATION
//     ============================== */
//     const logo = document.getElementById("logo");
//     const hero = document.getElementById("hero");
//     const header = document.querySelector("header");

//     const maxWidth = 420; // px (hero size)
//     const minWidth = 240; // px (header size)

//     function updateLogoPosition() {
//         const heroRect = hero.getBoundingClientRect();
//         const headerHeight = header.offsetHeight;

//         // Move only until halfway through hero
//         const triggerDistance = heroRect.height / 2 - headerHeight;
//         let progress = Math.min(Math.max((0 - heroRect.top) / triggerDistance, 0), 1);

//         // Smooth easing
//         progress = 1 - Math.pow(1 - progress, 2); // easeOutQuad

//         // Scale factor
//         const scale = (minWidth / maxWidth - 1) * progress + 1;

//         // Vertical position shift
//         const heroCenterY = heroRect.height / 2;
//         const headerCenterY =
//             headerHeight / 2 + header.getBoundingClientRect().top;
//         const translateY = (headerCenterY - heroCenterY) * progress;

//         logo.style.transform = `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale})`;
//     }

//     window.addEventListener("scroll", () => {
//         requestAnimationFrame(updateLogoPosition);
//     });
//     window.addEventListener("resize", updateLogoPosition);

//     updateLogoPosition();

//     // ==============================
//     // Abous Us Home Page Slider
//     // ==============================

//     const carousel = document.getElementById("carousel");
//     const prevBtn = document.querySelector(".prev-btn");
//     const nextBtn = document.querySelector(".next-btn");

//     let scrollAmount = 0;
//     const cardWidth = 236; // card width + gap

//     // Clone slides for infinite effect
//     const galleryItems = Array.from(carousel.children);
//     galleryItems.forEach(item => {
//         const clone = item.cloneNode(true);
//         carousel.appendChild(clone);
//     });

//     function scrollNext() {
//         scrollAmount += cardWidth;
//         if (scrollAmount >= carousel.scrollWidth / 2) {
//             scrollAmount = 0;
//         }
//         carousel.style.transform = `translateX(-${scrollAmount}px)`;
//     }

//     function scrollPrev() {
//         scrollAmount -= cardWidth;
//         if (scrollAmount < 0) {
//             scrollAmount = (carousel.scrollWidth / 2) - cardWidth;
//         }
//         carousel.style.transform = `translateX(-${scrollAmount}px)`;
//     }

//     nextBtn.addEventListener("click", scrollNext);
//     prevBtn.addEventListener("click", scrollPrev);

//     // ==============================
//     // Popup Form  
//     // ==============================

//     const openFormBtn = document.querySelector(".open-form-btn");
//     const popupOverlay = document.getElementById("popupOverlay");
//     const closePopup = document.getElementById("closePopup");

//     openFormBtn.addEventListener("click", () => {
//         popupOverlay.style.display = "flex";
//     });

//     closePopup.addEventListener("click", () => {
//         popupOverlay.style.display = "none";
//     });

//     popupOverlay.addEventListener("click", (e) => {
//         if (e.target === popupOverlay) {
//             popupOverlay.style.display = "none";
//         }
//     });

//     // Handle form submission without reloading the page.

//     document.getElementById("contactForm").addEventListener("submit", function (e) {
//         e.preventDefault();

//         const formData = new FormData(this);

//         fetch(this.action, {
//             method: "POST",
//             body: formData
//         })
//             .then(response => response.text())
//             .then(data => {
//                 if (data.trim() === "success") {
//                     alert("Message sent successfully!");
//                     this.reset();
//                 } else {
//                     alert("Error sending message.");
//                 }
//             })
//             .catch(err => alert("An error occurred: " + err));
//     });

// });
// document.addEventListener("DOMContentLoaded", () => {
//     const ham = document.querySelector(".hamburger");
//     const mobileMenu = document.querySelector(".mobile-menu");
//     const mobileClose = document.querySelector(".mobile-close");

//     ham.addEventListener("click", () => {
//         ham.classList.toggle("active");
//         mobileMenu.classList.toggle("open");
//         ham.style.display = "none";
//     });

//     mobileClose.addEventListener("click", () => {
//         ham.classList.remove("active");
//         mobileMenu.classList.remove("open");
//         ham.style.display = "flex";
//     });
// });
// const carousel = document.getElementById('galleryCarousel');
// const nextBtn = document.getElementById('galleryNext');
// const prevBtn = document.getElementById('galleryPrev');

// let index = 0;

// function updateCarousel() {
//     const slideWidth = carousel.children[0].offsetWidth + 40; // slide + gap
//     carousel.style.transform = `translateX(-${index * slideWidth}px)`;
// }

// nextBtn.addEventListener('click', () => {
//     if (index < carousel.children.length - 3) {
//         index++;
//         updateCarousel();
//     }
// });

// prevBtn.addEventListener('click', () => {
//     if (index > 0) {
//         index--;
//         updateCarousel();
//     }
// });

// window.addEventListener('resize', updateCarousel);

// const counterEl = document.getElementById('counter');
// let start = 0;
// const end = 2000;  // final number
// const duration = 1200; // ms
// const step = end / (duration / 16);

// function runCounter() {
//     start += step;
//     if (start < end) {
//         counterEl.innerText = Math.floor(start);
//         requestAnimationFrame(runCounter);
//     } else {
//         counterEl.innerText = end;
//     }
// }

// // Run when section becomes visible
// const observer = new IntersectionObserver((entries) => {
//     if (entries[0].isIntersecting) {
//         runCounter();
//         observer.disconnect();
//     }
// });

// observer.observe(document.querySelector('.stats-banner'));


// document.addEventListener("DOMContentLoaded", () => {
//     const aboutSection = document.querySelector(".about-section");

//     if (!aboutSection) return;

//     const observer = new IntersectionObserver(
//         (entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     aboutSection.classList.add("animate");
//                     observer.unobserve(aboutSection); // run only once
//                 }
//             });
//         },
//         {
//             threshold: 0.3
//         }
//     );

//     observer.observe(aboutSection);
// });


// document.addEventListener("DOMContentLoaded", () => {
//     const gallerySection = document.querySelector(".gallery-section");

//     if (!gallerySection) return;

//     const observer = new IntersectionObserver(
//         (entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     gallerySection.classList.add("animate");
//                     observer.unobserve(gallerySection); // animate only once
//                 }
//             });
//         },
//         {
//             threshold: 0.3
//         }
//     );

//     observer.observe(gallerySection);
// });


// document.addEventListener("DOMContentLoaded", () => {
//     initProjectCarousel()
//     const statsSection = document.querySelector(".stats-banner");
//     const counterEl = document.getElementById("counter");

//     if (!statsSection || !counterEl) return;

//     let hasAnimated = false;

//     const animateCounter = (target, duration = 1200) => {
//         let start = 0;
//         const startTime = performance.now();

//         const update = (currentTime) => {
//             const elapsed = currentTime - startTime;
//             const progress = Math.min(elapsed / duration, 1);
//             const value = Math.floor(progress * target);

//             counterEl.textContent = value;

//             if (progress < 1) {
//                 requestAnimationFrame(update);
//             } else {
//                 counterEl.textContent = target;
//             }
//         };

//         requestAnimationFrame(update);
//     };

//     const observer = new IntersectionObserver(
//         (entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting && !hasAnimated) {
//                     hasAnimated = true;

//                     // Section animation
//                     statsSection.classList.add("animate");

//                     // Counter animation
//                     animateCounter(2000); // 👈 change number here if needed

//                     observer.unobserve(statsSection);
//                 }
//             });
//         },
//         {
//             threshold: 0.4
//         }
//     );

//     observer.observe(statsSection);
// });

// /* ==============================
//    PROJECT CAROUSEL (CENTER ACTIVE)
// ============================== */
// function initProjectCarousel() {
//     const pcTrack = document.querySelector(".project-carousel__track");
//     const pcSlides = document.querySelectorAll(".project-carousel__slide");
//     const pcPrev = document.querySelector(".project-carousel__btn--prev");
//     const pcNext = document.querySelector(".project-carousel__btn--next");

//     if (!pcTrack || !pcSlides.length || !pcPrev || !pcNext) return;

//     let pcIndex = 0;

//     function pcUpdate() {
//         const slideWidth = pcSlides[0].offsetWidth;

//         pcTrack.style.transform = `translateX(-${pcIndex * slideWidth}px)`;

//         pcSlides.forEach(s => s.classList.remove("is-active"));
//         pcSlides[pcIndex].classList.add("is-active");

//         pcPrev.disabled = pcIndex === 0;
//         pcNext.disabled = pcIndex === pcSlides.length - 1;
//     }

//     pcNext.addEventListener("click", () => {
//         if (pcIndex < pcSlides.length - 1) {
//             pcIndex++;
//             pcUpdate();
//         }
//     });

//     pcPrev.addEventListener("click", () => {
//         if (pcIndex > 0) {
//             pcIndex--;
//             pcUpdate();
//         }
//     });

//     window.addEventListener("resize", pcUpdate);

//     pcUpdate();
// }



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

    if (!ham || !mobileMenu || !mobileClose) return;

    ham.addEventListener("click", () => {
        ham.classList.toggle("active");
        mobileMenu.classList.toggle("open");
        ham.style.display = "none";
    });

    mobileClose.addEventListener("click", () => {
        ham.classList.remove("active");
        mobileMenu.classList.remove("open");
        ham.style.display = "flex";
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

// function initStatsCounter2() {
//     const section2 = $(".stats-banner-mobile");
//     const counterEl2 = $("#counter-mobile");

//     if (!section2 || !counterEl2) return;

//     let start2 = 0;
//     const end2 = 2000;
//     const duration2 = 1200;
//     const step2 = end2 / (duration2 / 16);

//     function runCounter() {
//         start2 += step2;
//         if (start2 < end2) {
//             counterEl2.innerText = Math.floor(start2);
//             requestAnimationFrame(runCounter);
//         } else {
//             counterEl2.innerText = end2;
//         }
//     }

//     const observer = new IntersectionObserver(entries => {
//         if (entries[0].isIntersecting) {
//             section2.classList.add("animate");
//             runCounter();
//             observer.disconnect();
//         }
//     }, { threshold: 0.4 });

//     observer.observe(section2);
// }

/* ==============================
   PROJECT CAROUSEL (KEEP NEW WORKING VERSION)
============================== */
function initProjectCarousel() {
    const track = $(".project-carousel__track");
    const slides = $$(".project-carousel__slide");
    const prev = $(".project-carousel__btn--prev");
    const next = $(".project-carousel__btn--next");
    const viewport = $(".project-carousel__viewport");

    if (!track || !slides.length || !prev || !next || !viewport) return;

    let pcIndex = 0;
    const gap = 24;

    const slideWidth = () => slides[0].offsetWidth + gap;

    function visibleSlides() {
        return Math.round(viewport.offsetWidth / slideWidth());
    }

    function maxIndex() {
        return Math.max(slides.length - visibleSlides(), 0);
    }

    function updateButtons() {
        prev.disabled = pcIndex === 0;
        next.disabled = pcIndex === maxIndex();
    }

    function updateActive() {
        slides.forEach(s => s.classList.remove("is-active"));
        const centerOffset = Math.floor(visibleSlides() / 2);
        const activeIndex = pcIndex + centerOffset;
        if (slides[activeIndex]) {
            slides[activeIndex].classList.add("is-active");
        }
    }

    function update() {
        track.style.transform =
            `translateX(-${pcIndex * slideWidth()}px)`;
        updateActive();
        updateButtons();
    }

    next.addEventListener("click", () => {
        if (pcIndex < maxIndex()) {
            pcIndex++;
            update();
        }
    });

    prev.addEventListener("click", () => {
        if (pcIndex > 0) {
            pcIndex--;
            update();
        }
    });

    window.addEventListener("resize", () => {
        pcIndex = Math.min(pcIndex, maxIndex());
        update();
    });

    update();
}

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
    // initStatsCounter2();
    initProjectCarousel();
});