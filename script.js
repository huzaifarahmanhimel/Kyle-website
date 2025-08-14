// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('navMenu');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});
// Scroll spy for active link
const sections = [...document.querySelectorAll('section[id]')];
const links = [...document.querySelectorAll('.nav-link')];
const byId = id => links.find(a => a.getAttribute('href') === `#${id}`);
const spy = () => {
  const offset = 100; let current = sections[0]?.id;
  sections.forEach(sec => { const top = sec.getBoundingClientRect().top; if (top - offset <= 0) current = sec.id; });
  links.forEach(a => a.classList.remove('active'));
  const active = current && byId(current);
  if (active) active.classList.add('active');
};
window.addEventListener('scroll', spy);
window.addEventListener('load', () => {
  spy();
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});