(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  root.setAttribute('data-theme', current);

  function renderIcon() {
    if (!toggle) return;

    toggle.innerHTML = current === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

    toggle.setAttribute('aria-label', current === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro');
  }


renderIcon();

  if (toggle) {
    toggle.addEventListener('click', function () {
      current = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', current);
      renderIcon();
    });
  }



const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

if (carousel && prevBtn && nextBtn) {
  const scrollAmount = 300;
  let isAnimating = false;
  let autoScrollInterval;

  function nextSlide() {
    if (isAnimating) return;
    
    isAnimating = true;
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    setTimeout(() => {
      isAnimating = false;
      
      // Se chegou no final, volta pro início suavemente
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 50) {
        setTimeout(() => {
          carousel.scrollTo({ left: 0, behavior: 'instant' });
        }, 300);
      }
    }, 600);
  }

  function prevSlide() {
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }

  // Auto-scroll infinito SEMPRE para frente
  autoScrollInterval = setInterval(() => {
    nextSlide();
  }, 10000);

  // Botões
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
}


document.addEventListener('DOMContentLoaded', () => {
  const playBtns = document.querySelectorAll('.play-btn');
  
  playBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const audioId = btn.dataset.audio;
      playAudio(audioId, btn);
    });
  });
});

function playAudio(audioId, btn) {
  // Para outros áudios
  document.querySelectorAll('audio').forEach(audio => {
    if (audio.id !== `audio-${audioId}`) {
      audio.pause();
    }
  });
  
  const audio = document.getElementById(`audio-${audioId}`);
  
  if (audio.paused) {
    // Inicia reprodução
    btn.textContent = '⏸️ Pausar';
    btn.classList.add('playing');
    audio.play();
  } else {
    // Pausa
    btn.textContent = '▶️ Continuar';
    btn.classList.remove('playing');
    audio.pause();
  }
  
  audio.onended = () => {
    btn.textContent = '🎤 Ouvir Novamente';
    btn.classList.remove('playing');
  };
}







}
)();
