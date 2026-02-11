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

  const heartTimer = setInterval(() => spawnHeart(hero), 900);

  yesBtn.addEventListener('click', () => {
    yesBtn.disabled = true;
    maybeBtn.disabled = true;
    note?.classList.remove('hidden');
    launchConfetti(confettiColors);
    modal?.classList.remove('hidden');
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
