/* =========================
           Slider: simple 3-slide implementation with dots + autoplay
           ========================= */
(function () {
    const slidesEl = document.getElementById('slides');
    const dotsEl = document.getElementById('dots');
    const slides = Array.from(slidesEl.children); // auto-detect slides
    const slideCount = slides.length;
    let current = 0;
    let autoplayTimer = null;
    const AUTOPLAY_DELAY = 4200;

    function createDots() {
        dotsEl.innerHTML = ""; // reset in case of re-init
        slides.forEach((_, i) => {
            const d = document.createElement('button');
            d.className = 'dot';
            d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            d.dataset.index = i;
            d.addEventListener('click', () => goTo(i));
            dotsEl.appendChild(d);
        });
    }

    function updateDots() {
        Array.from(dotsEl.children).forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
        });
    }

    function goTo(index) {
        if (index === current) return; // no change
        slidesEl.classList.add("changing"); // trigger fade overlay
        current = (index + slideCount) % slideCount;
        slidesEl.style.transform = `translateX(-${current * 100}%)`;
        updateDots();
        setTimeout(() => slidesEl.classList.remove("changing"), 600);
        restartAutoplay();
    }

    function goRandom() {
        let next;
        do {
            next = Math.floor(Math.random() * slideCount);
        } while (next === current); // avoid same slide twice
        goTo(next);
    }

    function startAutoplay() {
        autoplayTimer = setInterval(goRandom, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    }

    function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // init
    createDots();
    goTo(0);
    startAutoplay();

    // pause on hover
    document.getElementById('hero').addEventListener('mouseenter', stopAutoplay);
    document.getElementById('hero').addEventListener('mouseleave', startAutoplay);
})();

/* =========================
   Logo scroll animation
   - single logo element fixed in viewport center moves & scales to the header-center anchor
   - the transform applied is:
       translate(-50%,-50%) translate(tx, ty) scale(s)
     where tx/ty are computed differences between viewport center and header anchor center,
     multiplied by progress p (0..1) determined from scroll.
   - RequestAnimationFrame used for smoothness and to avoid heavy scroll handlers.
   ========================= */
(function () {
    const logo = document.getElementById('logo');
    const hero = document.getElementById('hero');
    const headerAnchor = document.getElementById('header-anchor');
    const header = document.getElementById('site-header');

    let target = { x: 0, y: 0, scale: 1 };
    let endScroll = 1; // px at which animation completes (calculated)
    let ticking = false;

    function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

    // compute geometry once and on resize
    function computeTarget() {
        // header anchor center in viewport coords
        const anchorRect = headerAnchor.getBoundingClientRect();
        const anchorCx = anchorRect.left + anchorRect.width / 2;
        const anchorCy = anchorRect.top + anchorRect.height / 2;

        // viewport center
        const vpCx = window.innerWidth / 2;
        const vpCy = window.innerHeight / 2;

        // difference (how far, in px, the logo needs to move)
        const dx = anchorCx - vpCx;
        const dy = anchorCy - vpCy;

        // compute scale target: how much the logo should shrink to visually fit the header height
        // derive from ratio of anchor height to current logo height
        const logoRect = logo.getBoundingClientRect();
        // protect from division by zero
        const logoHeight = Math.max(6, logoRect.height);
        const anchorHeight = Math.max(6, anchorRect.height);
        // make target slightly smaller than anchor height (0.9 factor) so it fits nicely
        const scaleTarget = (anchorHeight * 0.9) / logoHeight;

        // Pick the scroll range where we want the animation to complete.
        // Use a percentage of hero height (so it's responsive).
        const heroHeight = Math.max(120, hero.clientHeight || window.innerHeight);
        // completing within 55% of hero height (tweakable)
        const end = Math.max(120, Math.round(heroHeight * 0.55));

        target.x = dx;
        target.y = dy;
        target.scale = scaleTarget;
        endScroll = end;
    }

    // called on scroll: schedule update via rAF
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateLogo);
            ticking = true;
        }
    }

    // compute progress and apply transform
    function updateLogo() {
        ticking = false;
        // Use scrollY from top of document
        const scrollY = window.scrollY || window.pageYOffset || 0;

        // progress 0..1
        const p = clamp(scrollY / endScroll, 0, 1);

        // compute intermediate translation & scale
        const tx = target.x * p;
        const ty = target.y * p;
        // scale moves from 1 -> target.scale
        const s = 1 + (target.scale - 1) * p;

        // apply transforms while preserving initial translate(-50%,-50%)
        logo.style.transform = `translate(-50%,-50%) translate(${tx}px, ${ty}px) scale(${s})`;

        // optional: when fully snapped, add class for potential style tweaks
        if (p >= 0.999) {
            logo.classList.add('logo--snapped');
            // if you want to make sure logo can't be dragged or flicker, you can also set pointer-events etc.
        } else {
            logo.classList.remove('logo--snapped');
        }
    }

    // recalc on resize because the anchor/viewport change
    let resizeTimer = null;
    function onResize() {
        // debounce recalculation slightly
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            computeTarget();
            updateLogo(); // update immediately to avoid jump
        }, 80);
    }

    // initial compute and listeners
    computeTarget();
    updateLogo();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Recompute target if fonts/images load and change layout
    window.addEventListener('load', () => { computeTarget(); updateLogo(); });

})();