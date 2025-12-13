document.addEventListener("DOMContentLoaded", () => {
    /* ==============================
       HERO SLIDER
    ============================== */
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.getElementById("dots");

    let currentSlide = 0;
    const totalSlides = slides.length;
    const slideDuration = 5000; // 5 seconds
    let slideInterval;

    // Create navigation dots dynamically
    slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll(".dot");

    function goToSlide(index) {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");

        currentSlide = index;

        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % totalSlides);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Start slideshow
    startSlideshow();


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

    // ==============================
    // Popup Form  
    // ==============================

    const openFormBtn = document.querySelector(".open-form-btn");
    const popupOverlay = document.getElementById("popupOverlay");
    const closePopup = document.getElementById("closePopup");

    openFormBtn.addEventListener("click", () => {
        popupOverlay.style.display = "flex";
    });

    closePopup.addEventListener("click", () => {
        popupOverlay.style.display = "none";
    });

    popupOverlay.addEventListener("click", (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = "none";
        }
    });

    // Handle form submission without reloading the page.

    document.getElementById("contactForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        fetch(this.action, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                if (data.trim() === "success") {
                    alert("Message sent successfully!");
                    this.reset();
                } else {
                    alert("Error sending message.");
                }
            })
            .catch(err => alert("An error occurred: " + err));
    });

});
document.addEventListener("DOMContentLoaded", () => {
    const ham = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileClose = document.querySelector(".mobile-close");

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
});
const carousel = document.getElementById('galleryCarousel');
const nextBtn = document.getElementById('galleryNext');
const prevBtn = document.getElementById('galleryPrev');

let index = 0;

function updateCarousel() {
    const slideWidth = carousel.children[0].offsetWidth + 40; // slide + gap
    carousel.style.transform = `translateX(-${index * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    if (index < carousel.children.length - 3) {
        index++;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
        updateCarousel();
    }
});

window.addEventListener('resize', updateCarousel);

const counterEl = document.getElementById('counter');
let start = 0;
const end = 2000;  // final number
const duration = 1200; // ms
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

// Run when section becomes visible
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        runCounter();
        observer.disconnect();
    }
});

observer.observe(document.querySelector('.stats-banner'));


document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector(".about-section");

    if (!aboutSection) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add("animate");
                    observer.unobserve(aboutSection); // run only once
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    observer.observe(aboutSection);
});


document.addEventListener("DOMContentLoaded", () => {
    const gallerySection = document.querySelector(".gallery-section");

    if (!gallerySection) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gallerySection.classList.add("animate");
                    observer.unobserve(gallerySection); // animate only once
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    observer.observe(gallerySection);
});


document.addEventListener("DOMContentLoaded", () => {
    const statsSection = document.querySelector(".stats-banner");
    const counterEl = document.getElementById("counter");

    if (!statsSection || !counterEl) return;

    let hasAnimated = false;

    const animateCounter = (target, duration = 1200) => {
        let start = 0;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);

            counterEl.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counterEl.textContent = target;
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;

                    // Section animation
                    statsSection.classList.add("animate");

                    // Counter animation
                    animateCounter(2000); // 👈 change number here if needed

                    observer.unobserve(statsSection);
                }
            });
        },
        {
            threshold: 0.4
        }
    );

    observer.observe(statsSection);
});