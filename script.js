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
// Contact form handling
      (function(){
        const form = document.getElementById('contactForm');
        const sendBtn = document.getElementById('sendBtn');
        const replyTo = document.getElementById('_replyto');

        // Replace this with the email address you want the mailto to open
        const recipientEmail = 'kyle@kyleblackwell.com';

        if (!form) return;

        form.addEventListener('submit', async function(e){
        e.preventDefault();

        const name = (form.name && form.name.value || '').trim();
        const email = (form.email && form.email.value || '').trim();
        const message = (form.message && form.message.value || '').trim();

        // populate hidden reply-to for Formspree
        if (replyTo) replyTo.value = email;

        // Build mailto link (opens user's email client)
        const subject = encodeURIComponent(`Contact from ${name || 'Website visitor'}`);
        const bodyLines = [
          `Name: ${name}`,
          `Email: ${email}`,
          '',
          'Message:',
          message
        ];
        const body = encodeURIComponent(bodyLines.join('\n'));
        const mailto = `mailto:${encodeURIComponent(recipientEmail)}?subject=${subject}&body=${body}`;

        // Try to submit to Formspree (so you still get a copy server-side)
        const action = form.action || '';
        const formData = new FormData(form);

        // Fire-and-forget POST to Formspree
        try {
          await fetch(action, { method: 'POST', body: formData, mode: 'no-cors' });
        } catch (err) {
          // ignore fetch errors (no-cors may block response)
        }

        // Open user's email client with prefilled message
        window.location.href = mailto;

        // Optionally, you can show a quick UI change after send:
        if (sendBtn) {
          sendBtn.disabled = true;
          sendBtn.textContent = 'Opening mail…';
        }
        });
      })();