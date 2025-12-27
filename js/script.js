document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('slideshowTrack');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('nextSlide');
    const prevBtn = document.getElementById('prevSlide');

    const slideCount = slides.length;
    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    // Remove old interval if any, and start fresh
    let slideInterval;

    function startTimer() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        setPositionByIndex();
        resetTimer();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        setPositionByIndex();
        resetTimer();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Touch & Mouse Events for Dragging
    slides.forEach((slide, index) => {
        const slideImage = slide.querySelector('img');
        slideImage.addEventListener('dragstart', (e) => e.preventDefault());

        // Touch events
        slide.addEventListener('touchstart', touchStart(index));
        slide.addEventListener('touchend', touchEnd);
        slide.addEventListener('touchmove', touchMove);

        // Mouse events
        slide.addEventListener('mousedown', touchStart(index));
        slide.addEventListener('mouseup', touchEnd);
        slide.addEventListener('mouseleave', touchEnd);
        slide.addEventListener('mousemove', touchMove);
    });

    function touchStart(index) {
        return function (event) {
            currentIndex = index;
            startPos = getPositionX(event);
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            track.style.transition = 'none';
            clearInterval(slideInterval);
        };
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < slideCount - 1) currentIndex += 1;
        if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

        setPositionByIndex();
        track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        resetTimer();
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderTranslate();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderTranslate() {
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function getSlideWidth() {
        return track.parentElement ? track.parentElement.offsetWidth : 300;
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -getSlideWidth();
        prevTranslate = currentTranslate;
        setSliderTranslate();
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50 && currentIndex < slideCount - 1) currentIndex += 1;
        if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;

        track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        setPositionByIndex();
        resetTimer();
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        track.style.transition = 'none';
        setPositionByIndex();
    });

    // Initialize
    setTimeout(() => {
        setPositionByIndex();
        startTimer();
    }, 100);
});

