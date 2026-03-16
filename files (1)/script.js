/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ===== MOBILE HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity   = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => {
            s.style.transform = '';
            s.style.opacity   = '1';
        });
    });
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-a');

const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navAs.forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`.nav-a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.35 });

sections.forEach(s => observerNav.observe(s));

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger children if timeline or certs
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .timeline-item, .cert-card').forEach(el => {
    revealObserver.observe(el);
});

/* ===== SKILL BAR ANIMATION ===== */
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-bar-fill');
            fills.forEach(fill => {
                const pct = fill.dataset.pct;
                setTimeout(() => {
                    fill.style.width = pct + '%';
                }, 100);
            });
            skillBarObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillBarsContainer = document.querySelector('.skill-bars');
if (skillBarsContainer) skillBarObserver.observe(skillBarsContainer);

/* ===== STAGGER TIMELINE & CERTS ===== */
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.timeline-item, .cert-card');
            items.forEach((item, i) => {
                setTimeout(() => item.classList.add('visible'), i * 150);
            });
            staggerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const timeline = document.querySelector('.timeline');
const certsGrid = document.querySelector('.certs-grid');
if (timeline) staggerObserver.observe(timeline);
if (certsGrid) staggerObserver.observe(certsGrid);

/* ===== CONTACT FORM ===== */
const form    = document.getElementById('contact-form');
const success = document.getElementById('form-success');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.form-submit');
        btn.textContent = 'Sending…';
        btn.disabled = true;

        setTimeout(() => {
            form.reset();
            btn.textContent = 'Send Message →';
            btn.disabled = false;
            success.classList.add('show');
            setTimeout(() => success.classList.remove('show'), 4000);
        }, 1200);
    });
}

/* ===== SMOOTH CURSOR GLOW (subtle) ===== */
const glow = document.createElement('div');
glow.style.cssText = `
    position: fixed;
    width: 300px; height: 300px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(circle, rgba(102,0,197,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.12s ease, top 0.12s ease;
    will-change: left, top;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
});

/* ===== ACTIVE NAV STYLE ===== */
const style = document.createElement('style');
style.textContent = `.nav-a.active { color: #fff; } .nav-a.active::after { width: 100%; }`;
document.head.appendChild(style);
