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

(() => {
  const form = document.getElementById('deleteAccountForm');
  if (!form) return;

  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('accountEmail');
  const levelInput = document.getElementById('studyLevel');
  const reasonInput = document.getElementById('deleteReason');
  const confirmInput = document.getElementById('confirmPermanent');
  const errorBox = document.getElementById('deleteFormError');
  const readyBox = document.getElementById('deleteRequestReady');
  const previewEl = document.getElementById('deleteRequestPreview');
  const whatsappLink = document.getElementById('sendDeleteWhatsapp');
  const copyBtn = document.getElementById('copyRequestBtn');

  let generatedMessage = '';

  const showError = (msg) => {
    errorBox.textContent = msg;
    errorBox.classList.add('is-visible');
  };

  const clearError = () => {
    errorBox.textContent = '';
    errorBox.classList.remove('is-visible');
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const studyLevel = levelInput.value.trim() || 'غير محدد';
    const reason = reasonInput.value.trim() || 'لم يُذكر سبب';

    if (fullName.length < 2) {
      showError('يرجى إدخال الاسم الكامل المسجل في الحساب.');
      fullNameInput.focus();
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      showError('يرجى إدخال بريد إلكتروني صحيح مسجل في تطبيق ذاكر.');
      emailInput.focus();
      return;
    }

    if (!confirmInput.checked) {
      showError('يرجى الموافقة على إقرار الحذف النهائي قبل المتابعة.');
      confirmInput.focus();
      return;
    }

    const today = new Date().toLocaleDateString('ar-EG');
    generatedMessage = [
      'طلب حذف حساب نهائي - تطبيق ذاكر (sd.zakir.zakirapp)',
      '------------------------------------',
      `الاسم المسجل: ${fullName}`,
      `البريد الإلكتروني للحساب: ${email}`,
      `المرحلة الدراسية: ${studyLevel}`,
      `سبب الطلب: ${reason}`,
      `تاريخ الطلب: ${today}`,
      '------------------------------------',
      'أؤكد رغبتي في حذف الحساب وجميع بياناتي المرتبطة به نهائياً.'
    ].join('\n');

    previewEl.textContent = generatedMessage;
    whatsappLink.href = `https://wa.me/249920702900?text=${encodeURIComponent(generatedMessage)}`;
    readyBox.classList.add('is-visible');
    readyBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      if (!generatedMessage) return;
      const originalText = 'نسخ نص الطلب';
      try {
        await navigator.clipboard.writeText(generatedMessage);
        copyBtn.textContent = 'تم نسخ نص الطلب ✓';
      } catch {
        const temp = document.createElement('textarea');
        temp.value = generatedMessage;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        copyBtn.textContent = 'تم نسخ نص الطلب ✓';
      }
      window.setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2400);
    });
  }
})();