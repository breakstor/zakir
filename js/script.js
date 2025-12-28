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

// مثال: تغيير رابط التحميل ديناميكياً (إن أردت لاحقًا)
document.getElementById('downloadBtn').addEventListener('click', function(e){
  // مثال: لو عندك APK خارجي بدل '#'
  // window.location.href = 'https://yourserver.com/zakir.apk';
});
