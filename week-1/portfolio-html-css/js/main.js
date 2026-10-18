/**
 * Portfolio JavaScript
 * Handles: nav scroll, mobile menu, active link, form validation, back-to-top
 */

/* =========================================================
   NAVIGATION
   ========================================================= */
const navbar     = document.getElementById('navbar');
const navToggle  = document.getElementById('nav-toggle');
const navMobile  = document.getElementById('nav-mobile');
const navLinks   = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.nav-mobile-link');

// Navbar scroll state
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveLink();
  updateBackToTop();
}, { passive: true });

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMobile.classList.toggle('open');
  navToggle.setAttribute('aria-label', expanded ? 'Open navigation menu' : 'Close navigation menu');
});

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !navMobile.contains(e.target)) {
    navMobile.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// Keyboard: close with Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMobile.classList.contains('open')) {
    navMobile.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.focus();
  }
});

// Active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}

/* =========================================================
   SMOOTH SCROLL (fallback for older browsers)
   ========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* =========================================================
   BACK TO TOP
   ========================================================= */
const backToTop = document.getElementById('back-to-top');

function updateBackToTop() {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =========================================================
   CONTACT FORM VALIDATION
   ========================================================= */
const form         = document.getElementById('contact-form');
const formContent  = document.getElementById('contact-form-content');
const formSuccess  = document.getElementById('contact-success');

const nameInput    = document.getElementById('contact-name');
const emailInput   = document.getElementById('contact-email');
const messageInput = document.getElementById('contact-message');

const nameError    = document.getElementById('name-error');
const emailError   = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

/**
 * Validates a single field and shows/hides its error message.
 * Returns true if valid, false otherwise.
 */
function validateField(input, errorEl, validatorFn, errorMsg) {
  const isValid = validatorFn(input.value.trim());
  input.classList.toggle('error', !isValid);
  input.classList.toggle('valid',  isValid);
  errorEl.classList.toggle('visible', !isValid);
  if (!isValid) {
    errorEl.textContent = errorMsg;
  }
  return isValid;
}

const validators = {
  name:    (v) => v.length >= 2,
  email:   (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  message: (v) => v.length >= 10,
};

// Live validation on blur for better UX
nameInput.addEventListener('blur', () =>
  validateField(nameInput, nameError, validators.name, 'Please enter your name (at least 2 characters).')
);

emailInput.addEventListener('blur', () =>
  validateField(emailInput, emailError, validators.email, 'Please enter a valid email address.')
);

messageInput.addEventListener('blur', () =>
  validateField(messageInput, messageError, validators.message, 'Please enter a message (at least 10 characters).')
);

// Clear errors on input
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('error');
    // Only show valid state if the field has content
    if (input.value.trim().length > 0) {
      // re-validate silently
    }
  });
});

// Form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameValid    = validateField(nameInput, nameError, validators.name, 'Please enter your name (at least 2 characters).');
  const emailValid   = validateField(emailInput, emailError, validators.email, 'Please enter a valid email address.');
  const messageValid = validateField(messageInput, messageError, validators.message, 'Please enter a message (at least 10 characters).');

  if (nameValid && emailValid && messageValid) {
    // All valid — show success state
    formContent.classList.add('hidden');
    formSuccess.classList.add('visible');
    formSuccess.focus();
  } else {
    // Focus the first invalid field
    if (!nameValid) {
      nameInput.focus();
    } else if (!emailValid) {
      emailInput.focus();
    } else {
      messageInput.focus();
    }
  }
});

/* =========================================================
   INIT
   ========================================================= */
updateActiveLink();
updateBackToTop();
