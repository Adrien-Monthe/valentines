(() => {
  const hero = document.getElementById('hero');
  const yesBtn = document.getElementById('yes-btn');
  const maybeBtn = document.getElementById('maybe-btn');
  const note = document.getElementById('response-note');
  const modal = document.getElementById('love-modal');
  const closeModal = document.getElementById('close-modal');

  if (!hero || !yesBtn || !maybeBtn) return;

  const heartSymbols = ['❤', '💕', '💖'];
  const confettiColors = ['#ff7eb3', '#ff4f7d', '#ffd166', '#fff', '#c56cf0'];

  // Initialize EmailJS with your public key
  // TODO: Replace with your actual EmailJS public key after setup
  // Get your key from: https://dashboard.emailjs.com/admin/account
  if (typeof emailjs !== 'undefined') {
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual public key
  }

  const heartTimer = setInterval(() => spawnHeart(hero), 900);

  yesBtn.addEventListener('click', () => {
    yesBtn.disabled = true;
    maybeBtn.disabled = true;
    note?.classList.remove('hidden');
    launchConfetti(confettiColors);
    modal?.classList.remove('hidden');

    // Send email notification
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

  window.addEventListener('beforeunload', () => clearInterval(heartTimer));

  function sendEmailNotification() {
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
      console.log('EmailJS not loaded - email notification skipped');
      return;
    }

    const templateParams = {
      to_name: 'Adrien',
      from_name: 'Moon (Kesita)',
      message: 'She said YES! 🎉💘 Kesita accepted your Valentine proposal!',
      reply_to: 'noreply@valentine.com'
    };

    // TODO: Replace with your actual service ID and template ID
    // Get these from: https://dashboard.emailjs.com/admin
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      }, (error) => {
        console.log('Email failed to send:', error);
      });
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
    setTimeout(() => {
      button.style.transform = 'translate(0, 0)';
    }, 1400);
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
