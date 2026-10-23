(() => {
  const slider = document.getElementById('slider');
  if (!slider) return;
  const slides = Array.from(slider.querySelectorAll('img'));
  if (slides.length < 2) return;
  let index = 0;
  let timer;
  const showSlide = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    slider.style.transform = `translateX(${-index * 100}%)`;
  };
  const start = () => {
    window.clearInterval(timer);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = window.setInterval(() => showSlide(index + 1), 3200);
    }
  };
  slides.forEach((slide) => slide.addEventListener('error', () => { slide.style.background = '#f3f4f6'; slide.alt = 'شاشة من تطبيق ذاكر'; }));
  showSlide(0);
  start();
  document.addEventListener('visibilitychange', () => document.hidden ? window.clearInterval(timer) : start());
})();