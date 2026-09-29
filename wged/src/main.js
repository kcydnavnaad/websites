import './style.css';
import { applyLang, initialLang, tr } from './i18n.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lang = initialLang();
applyLang(lang);
document.querySelectorAll('[data-lang]').forEach((b) => b.addEventListener('click', () => { lang = b.dataset.lang; applyLang(lang); }));
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- reveal bij scrollen ----------
document.querySelectorAll('.hero .reveal').forEach((el, i) => el.style.setProperty('--i', i));
const io = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ---------- tellers ----------
const countIO = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (!e.isIntersecting) return;
  countIO.unobserve(e.target);
  const end = +e.target.dataset.count; if (reduced) return;
  const start = end > 1000 ? end - 30 : 0; const t0 = performance.now();
  const tick = (now) => {
    const k = Math.min(1, (now - t0) / 1400); const v = Math.round(start + (end - start) * (1 - Math.pow(1 - k, 3)));
    e.target.textContent = v; if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}), { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach((el) => countIO.observe(el));

// ---------- navigatie ----------
const nav = document.querySelector('.nav');
const onNav = () => nav.classList.toggle('is-scrolled', window.scrollY > 30);

// ---------- werkwijze + 3D ----------
const proc = document.getElementById('werkwijze');
const steps = [...document.querySelectorAll('.step')];
const meter = document.getElementById('meter');
const coords = document.getElementById('coords');
let scene = null;

function processProgress() {
  const r = proc.getBoundingClientRect();
  const vh = window.innerHeight;
  const span = r.height - vh;
  // < 0 zolang de sectie nog niet vastzit: -1 in de hero, 0 bij het vastzetten
  if (r.top > 0) return -Math.min(1, r.top / vh);
  return Math.min(4, (-r.top / span) * 4.2);
}

function onScroll() {
  onNav();
  const p = processProgress();
  const active = Math.max(0, Math.min(3, Math.floor(p)));
  steps.forEach((s, i) => s.classList.toggle('is-active', i === active));
  meter.style.width = `${Math.max(0, Math.min(1, p / 4)) * 100}%`;
  if (scene) {
    scene.setProcess(p);
    // alleen renderen zolang hero of werkwijze in beeld is
    scene.setVisible(proc.getBoundingClientRect().bottom > 0);
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);

// pointer-parallax + coördinaten in de hoek
let px = 0, py = 0;
window.addEventListener('pointermove', (e) => {
  px = (e.clientX / window.innerWidth) * 2 - 1; py = (e.clientY / window.innerHeight) * 2 - 1;
  if (scene && !reduced) scene.setPointer(px, py);
  if (coords) coords.textContent = `X ${(px * 210).toFixed(3)} · Y ${(py * -140).toFixed(3)} · Z ${(Math.hypot(px, py) * 88).toFixed(3)}`;
}, { passive: true });

// 3D pas laden na de eerste paint, zodat de tekst meteen staat
const boot = () => import('./scene.js').then(({ createScene }) => {
  scene = createScene(document.getElementById('scene'), { reducedMotion: reduced });
  onScroll();
});
('requestIdleCallback' in window) ? requestIdleCallback(boot, { timeout: 600 }) : setTimeout(boot, 200);
onScroll();

// ---------- contactformulier (mailto, geen backend nodig) ----------
document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target; let ok = true;
  ['name', 'email', 'msg'].forEach((n) => {
    const el = f.elements[n]; const bad = !el.value.trim() || (n === 'email' && !/^\S+@\S+\.\S+$/.test(el.value));
    el.classList.toggle('is-invalid', bad); if (bad) ok = false;
  });
  if (!ok) return;
  const body = `${f.elements.msg.value}\n\n— ${f.elements.name.value}\n${f.elements.email.value}\n(${f.elements.topic.value})`;
  window.location.href = `mailto:info@wged.be?subject=${encodeURIComponent(tr(lang, 'contact.subject') + ': ' + f.elements.topic.value)}&body=${encodeURIComponent(body)}`;
});
