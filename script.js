document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('slider');
    const slides = document.querySelectorAll('.slider-track img');
    let index = 0;

    function moveSlide() {
        index++;
        if (index >= slides.length) index = 0;
        // التحريك بنسبة مئوية موجبة لأن الصفحة RTL
        track.style.transform = `translateX(${index * 100}%)`;
    }

    setInterval(moveSlide, 3000);
});
