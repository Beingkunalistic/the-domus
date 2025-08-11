document.addEventListener("DOMContentLoaded", () => {
    /* ==============================
       HERO SLIDER
    ============================== */
    const slidesContainer = document.querySelector(".slides");
    const slideElements = document.querySelectorAll(".slide");
    const dotsContainer = document.getElementById("dots");

    let currentSlide = 0;
    const totalSlides = slideElements.length;
    const slideDuration = 5000; // ms
    let slideInterval;

    // Create navigation dots dynamically
    slideElements.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll(".dot");

    function goToSlide(index) {
        // Start overlay fade
        slidesContainer.classList.add("changing");

        setTimeout(() => {
            currentSlide = index;
            updateSlidePosition();
            updateDots();
            slidesContainer.classList.remove("changing");
        }, 300); // matches your CSS fade duration
    }

    function updateSlidePosition() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function updateDots() {
        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentSlide);
        });
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % totalSlides);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    startSlideShow();

    /* ==============================
       LOGO SCROLL SCALE ANIMATION
    ============================== */
    const logo = document.getElementById("logo");
    const hero = document.getElementById("hero");
    const header = document.querySelector("header");

    const maxWidth = 420; // px (hero size)
    const minWidth = 240; // px (header size)

    function updateLogoPosition() {
        const heroRect = hero.getBoundingClientRect();
        const headerHeight = header.offsetHeight;

        // Move only until halfway through hero
        const triggerDistance = heroRect.height / 2 - headerHeight;
        let progress = Math.min(Math.max((0 - heroRect.top) / triggerDistance, 0), 1);

        // Smooth easing
        progress = 1 - Math.pow(1 - progress, 2); // easeOutQuad

        // Scale factor
        const scale = (minWidth / maxWidth - 1) * progress + 1;

        // Vertical position shift
        const heroCenterY = heroRect.height / 2;
        const headerCenterY =
            headerHeight / 2 + header.getBoundingClientRect().top;
        const translateY = (headerCenterY - heroCenterY) * progress;

        logo.style.transform = `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale})`;
    }

    window.addEventListener("scroll", () => {
        requestAnimationFrame(updateLogoPosition);
    });
    window.addEventListener("resize", updateLogoPosition);

    updateLogoPosition();

    // ==============================
    // Abous Us Home Page Slider
    // ==============================

    const carousel = document.getElementById("carousel");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let scrollAmount = 0;
    const cardWidth = 236; // card width + gap

    // Clone slides for infinite effect
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

});