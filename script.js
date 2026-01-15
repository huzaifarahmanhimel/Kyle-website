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


const YOUTUBE_URL = "https://www.youtube.com/watch?v=1uvwUf5c9c8";

function getYouTubeID(url) {
  const u = new URL(url);
  if (u.hostname.includes("youtu.be")) {
    return u.pathname.slice(1);
  }
  return u.searchParams.get("v");
}

const videoId = getYouTubeID(YOUTUBE_URL);

const videoWrap = document.getElementById("videoWrap");
const playBtn = document.getElementById("playBtn");
const thumbnail = document.getElementById("thumbnail");

thumbnail.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

function playVideo() {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;

  videoWrap.innerHTML = "";
  videoWrap.appendChild(iframe);
}

playBtn.addEventListener("click", playVideo);
videoWrap.addEventListener("click", playVideo);



// Optional: track CTA clicks (safe to remove)
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-cta]");
  if (!a) return;
  console.log("[The Path] CTA click:", a.getAttribute("data-cta"), "->", a.href);
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