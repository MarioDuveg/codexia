const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];

window.addEventListener('scroll', () => {
  const y = window.scrollY + 160;
  let active = 'inicio';

  sections.forEach((section) => {
    if (section.offsetTop <= y) active = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${active}`);
  });
}, { passive: true });

const SUPABASE_URL = 'https://qtqisnnuaygwdshenqhv.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_mhdseBhBlfLq7CHVxQUzhg_bmeGQsM-';

const preregistroForm = document.getElementById('preregistroForm');
const formMessage = document.getElementById('formMessage');
const submitButton = document.getElementById('submitPreregistro');

function showFormMessage(type, message) {
  if (!formMessage) return;

  formMessage.className = `form-message ${type ? `is-${type}` : ''}`;
  formMessage.textContent = message;
}

function setSubmitting(isSubmitting) {
  if (!submitButton) return;

  submitButton.disabled = isSubmitting;
  submitButton.classList.toggle('is-loading', isSubmitting);

  const label = submitButton.querySelector('.submit-label');
  if (label) {
    label.textContent = isSubmitting ? 'ENVIANDO...' : 'ENVIAR PREREGISTRO';
  }
}

if (preregistroForm) {
  preregistroForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    showFormMessage('', '');

    if (!preregistroForm.checkValidity()) {
      preregistroForm.reportValidity();
      showFormMessage('error', 'Revisa los campos obligatorios antes de continuar.');
      return;
    }

    const formData = new FormData(preregistroForm);

    // Campo señuelo contra bots simples. Las personas no lo ven.
    if (String(formData.get('website') || '').trim()) {
      showFormMessage('success', 'Preregistro recibido.');
      preregistroForm.reset();
      return;
    }

    const payload = {
      nombre: String(formData.get('nombre') || '').trim(),
      edad: Number(formData.get('edad')),
      email: String(formData.get('email') || '').trim().toLowerCase(),
      telefono: String(formData.get('telefono') || '').trim(),
      preparatoria: String(formData.get('preparatoria') || '').trim(),
      semestre: Number(formData.get('semestre')),
      tiene_laptop: formData.get('tiene_laptop') === 'true',
      areas_interes: formData.getAll('areas_interes'),
      experiencia_programando: String(formData.get('experiencia_programando') || '')
    };

    setSubmitting(true);
    showFormMessage('info', 'Enviando tu preregistro...');

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/preregistros`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        let errorBody = {};

        try {
          errorBody = await response.json();
        } catch {
          // Si Supabase no responde JSON, usamos el estado HTTP.
        }

        if (response.status === 409 || errorBody.code === '23505') {
          throw new Error('duplicate_email');
        }

        console.error('Supabase preregistro error:', response.status, errorBody);
        throw new Error('request_failed');
      }

      preregistroForm.reset();
      showFormMessage(
        'success',
        '¡Listo! Tu preregistro quedó guardado. Te contactaremos cuando tengamos novedades de CODEXIA.'
      );
    } catch (error) {
      if (error.message === 'duplicate_email') {
        showFormMessage(
          'error',
          'Ese correo ya está preregistrado. Si necesitas actualizar tus datos, contáctanos.'
        );
      } else {
        showFormMessage(
          'error',
          'No pudimos guardar tu preregistro. Revisa tu conexión e inténtalo de nuevo en unos momentos.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  });
}


function getNextEventDate() {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, 10, 7, 8, 0, 0, 0); // 7 noviembre, 8:00 AM

  if (target.getTime() <= now.getTime()) {
    target = new Date(year + 1, 10, 7, 8, 0, 0, 0);
  }

  return target;
}

function updateCountdown() {
  const countdown = document.getElementById('countdown');
  if (!countdown) return;

  const daysEl = document.getElementById('countdownDays');
  const hoursEl = document.getElementById('countdownHours');
  const minutesEl = document.getElementById('countdownMinutes');
  const secondsEl = document.getElementById('countdownSeconds');

  const now = new Date();
  const target = getNextEventDate();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    countdown.classList.add('countdown-ended');
    if (daysEl) daysEl.textContent = '0';
    if (hoursEl) hoursEl.textContent = '0';
    if (minutesEl) minutesEl.textContent = '0';
    if (secondsEl) secondsEl.textContent = '0';
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);


// Carga progresiva del hero: primero preview ligera, después reemplazo por HQ.
(function setupProgressiveUltronHero() {
  const low = document.getElementById('ultronHeroLow');
  const high = document.getElementById('ultronHeroHigh');
  if (!low || !high) return;

  const highSrc = high.dataset.src;
  if (!highSrc) return;

  let requested = false;

  const loadHighResolution = () => {
    if (requested) return;
    requested = true;

    // La imagen HQ comienza a descargarse solamente después de que la preview ya está disponible.
    high.src = highSrc;

    const revealHigh = async () => {
      try {
        if (high.decode) await high.decode();
      } catch {
        // Algunos navegadores resuelven load antes de decode; el recurso ya está utilizable.
      }

      high.classList.add('is-loaded');

      const removeLow = () => {
        if (low.isConnected) low.remove();
      };

      high.addEventListener('transitionend', removeLow, { once: true });
      window.setTimeout(removeLow, 700);
    };

    if (high.complete && high.naturalWidth > 0) {
      revealHigh();
    } else {
      high.addEventListener('load', revealHigh, { once: true });
    }
  };

  if (low.complete && low.naturalWidth > 0) {
    loadHighResolution();
  } else {
    low.addEventListener('load', loadHighResolution, { once: true });
  }
})();
