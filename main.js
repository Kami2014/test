/* ============================================================
   TYPOGRAFICA — Centro Stampa Professionale
   js/main.js — Tutta la logica JavaScript del sito
   ============================================================ */

/* ── SUPABASE CONFIG ──────────────────────────────────────────
   Sostituisci questi due valori con quelli del tuo progetto.
   Li trovi in: Supabase → Project Settings → API
   ─────────────────────────────────────────────────────────── */
const SUPABASE_URL      = 'https://XXXXXXXXXXXX.supabase.co';
const SUPABASE_ANON_KEY = 'eyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

/* ── INIT SUPABASE ── */
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ── CUSTOM CURSOR ── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .service-card, .material-card, .tesi-feature')
    .forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width       = '56px';
        ring.style.height      = '56px';
        ring.style.borderColor = 'rgba(184,151,90,0.6)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width       = '32px';
        ring.style.height      = '32px';
        ring.style.borderColor = 'rgba(184,151,90,0.4)';
      });
    });
})();

/* ── NAVBAR SCROLL ── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
})();

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ── FORM: INVIA PREVENTIVO + NEWSLETTER ── */
async function submitPreventivo() {
  const nome        = document.getElementById('f-nome').value.trim();
  const email       = document.getElementById('f-email').value.trim();
  const servizio    = document.getElementById('f-servizio').value;
  const quantita    = document.getElementById('f-quantita').value.trim();
  const formato     = document.getElementById('f-formato').value.trim();
  const descrizione = document.getElementById('f-descrizione').value.trim();
  const newsletter  = document.getElementById('f-newsletter').checked;
  const btn         = document.getElementById('form-submit-btn');
  const btnLabel    = document.getElementById('btn-label');

  /* Validazione */
  if (!nome || !email) {
    showFeedback('Inserisci almeno nome e email.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFeedback('Indirizzo email non valido.', 'error');
    return;
  }

  btn.disabled = true;
  btnLabel.textContent = 'Invio in corso…';

  try {
    /* 1 — Salva richiesta preventivo */
    const { error: errPreventivo } = await _supabase
      .from('preventivi')
      .insert([{ nome, email, servizio, quantita, formato, descrizione }]);

    if (errPreventivo) throw errPreventivo;

    /* 2 — Se checkbox newsletter spuntata, salva email */
    if (newsletter) {
      await _supabase
        .from('newsletter')
        .upsert([{ email, nome }], { onConflict: 'email' });
    }

    showFeedback('✓ Richiesta inviata! Ti risponderemo entro 30 minuti.', 'success');

    /* Reset campi */
    ['f-nome', 'f-email', 'f-quantita', 'f-formato', 'f-descrizione']
      .forEach(id => { document.getElementById(id).value = ''; });
    document.getElementById('f-newsletter').checked = false;

  } catch (err) {
    console.error('Supabase error:', err);
    showFeedback('Errore nell\'invio. Riprova o contattaci telefonicamente.', 'error');
  } finally {
    btn.disabled = false;
    btnLabel.textContent = 'Invia Richiesta';
  }
}

/* ── HELPER: mostra messaggio feedback form ── */
function showFeedback(msg, type) {
  const el = document.getElementById('form-feedback');
  if (!el) return;
  el.textContent    = msg;
  el.style.display  = 'block';
  el.style.border   = type === 'success'
    ? '1px solid rgba(184,151,90,0.4)'
    : '1px solid rgba(220,80,80,0.4)';
  el.style.color      = type === 'success' ? 'var(--gold)' : '#e05555';
  el.style.background = type === 'success'
    ? 'rgba(184,151,90,0.07)'
    : 'rgba(220,80,80,0.07)';
  el.style.padding    = '14px 20px';
  el.style.fontSize   = '13px';
  el.style.letterSpacing = '0.05em';
}
