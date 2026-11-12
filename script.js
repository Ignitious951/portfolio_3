// ===== NAV SCROLL EFFECT =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    formMsg.textContent = '';
    formMsg.className = 'form-msg';

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Network error');
    })
    .then(() => {
      formMsg.textContent = 'Message sent successfully. I\'ll be in touch shortly.';
      formMsg.className = 'form-msg success';
      contactForm.reset();
    })
    .catch(() => {
      formMsg.textContent = 'Something went wrong. Please try again or email directly.';
      formMsg.className = 'form-msg error';
    })
    .finally(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});