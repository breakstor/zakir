// init swiper inside phone
const swiper = new Swiper('.mySwiper', {
  loop: true,
  autoplay: {
    delay: 2400,
    disableOnInteraction: false,
  },
  speed: 600,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  simulateTouch: true,
  grabCursor: true,
  a11y: {
    enabled: true,
    prevSlideMessage: 'الشريحة السابقة',
    nextSlideMessage: 'الشريحة التالية',
  }
});

// fallback display لو فشل تحميل موك اب الهاتف
const phoneFrame = document.getElementById('phoneFrame');
const phoneFallback = document.getElementById('phoneFallback');
const phoneScreen = document.getElementById('phoneScreen');

phoneFrame.addEventListener('error', () => {
  // اخفاء الصورة واظهار عنصر بديل داخل .phone-wrap
  phoneFrame.style.display = 'none';
  phoneFallback.style.display = 'flex';
  // لو حبيت نضع لون خلفي للشاشة بدل الصورة:
  phoneScreen.style.background = 'linear-gradient(180deg,#ffffff,#f4f4f4)';
});

// تجربة: لو حبيت تأكد أن الصورة تم تحميلها بنجاح:
phoneFrame.addEventListener('load', () => {
  phoneFallback.style.display = 'none';
});
