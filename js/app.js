(() => {
  const hero = document.getElementById('hero');
  const yesBtn = document.getElementById('yes-btn');
  const maybeBtn = document.getElementById('maybe-btn');
  const note = document.getElementById('response-note');
  const modal = document.getElementById('love-modal');
  const closeModal = document.getElementById('close-modal');
  // Lightbox elements
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!hero || !yesBtn || !maybeBtn) return;

  const heartSymbols = ['❤', '💕', '💖'];
  const confettiColors = ['#ff7eb3', '#ff4f7d', '#ffd166', '#fff', '#c56cf0'];

  let currentImageIndex = 0;
  const totalImages = galleryItems.length;

  // Initialize EmailJS with your public key (replace placeholder when ready)
  if (typeof emailjs !== 'undefined') {
    emailjs.init('UMRhWCwxnVALG4kC6');
  }

  const heartTimer = setInterval(() => spawnHeart(hero), 900);

  yesBtn.addEventListener('click', () => {
    yesBtn.disabled = true;
    maybeBtn.disabled = true;
    note?.classList.remove('hidden');
    launchConfetti(confettiColors);
    modal?.classList.remove('hidden');
    sendEmailNotification();
  });

  const dodge = () => playfulMove(maybeBtn, hero);
  maybeBtn.addEventListener('mouseenter', dodge);
  maybeBtn.addEventListener('focus', dodge);
  maybeBtn.addEventListener('click', dodge);

  closeModal?.addEventListener('click', () => modal.classList.add('hidden'));
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) modal.classList.add('hidden');
  });

  // Gallery lightbox
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentImageIndex = index;
      openLightbox();
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    showPreviousImage();
  });

  lightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPreviousImage();
      if (e.key === 'ArrowRight') showNextImage();
    }
  });

  function openLightbox() {
    const img = galleryItems[currentImageIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    updateCounter();
    lightbox?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox?.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    const img = galleryItems[currentImageIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    updateCounter();
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    const img = galleryItems[currentImageIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    updateCounter();
  }

  function updateCounter() {
    if (lightboxCounter) lightboxCounter.textContent = `${currentImageIndex + 1} / ${totalImages}`;
  }

  window.addEventListener('beforeunload', () => clearInterval(heartTimer));

  function sendEmailNotification() {
    if (typeof emailjs === 'undefined') return;
    const templateParams = {
      to_name: 'Adrien',
      from_name: 'Moon (Kesita)',
      to_email: 'montheadrien@gmail.com',  // Add your email here
      message: 'She said YES! 🎉💘 Kesita accepted your Valentine proposal!',
      reply_to: 'noreply@valentine.com'
    };
    emailjs.send('service_2frsak7', 'template_acftsg5', templateParams)
      .then((response) => console.log('Email sent', response.status, response.text))
      .catch((error) => console.log('Email failed', error));
  }

  function spawnHeart(container) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${6 + Math.random() * 4}s`;
    heart.style.fontSize = `${14 + Math.random() * 10}px`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 11000);
  }

  function playfulMove(button, container) {
    if (button.disabled) return;
    const bounds = container.getBoundingClientRect();
    const maxOffsetX = Math.min(220, bounds.width / 2 - button.offsetWidth / 2);
    const maxOffsetY = Math.min(140, bounds.height / 2 - button.offsetHeight / 2);
    const offsetX = randomInRange(-maxOffsetX, maxOffsetX);
    const offsetY = randomInRange(-maxOffsetY, maxOffsetY);
    const tilt = randomInRange(-10, 10);
    button.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${tilt}deg)`;
    setTimeout(() => { button.style.transform = 'translate(0, 0)'; }, 1400);
  }

  function launchConfetti(colors) {
    const count = 40;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti';
      const left = Math.random() * 100;
      const duration = 3 + Math.random() * 2;
      const dx = `${randomInRange(-30, 30)}vw`;
      piece.style.left = `${left}vw`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDuration = `${duration}s`;
      piece.style.setProperty('--dx', dx);
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), duration * 1000);
    }
  }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
})();
