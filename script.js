// =============================================
// script.js - Interactive Portfolio Website
// Week 3: JavaScript - Making Websites Interactive
// =============================================

// -----------------------------------------------
// 1. DARK / LIGHT MODE TOGGLE
// -----------------------------------------------
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark);

  // Update toggle button label
  const btn = document.getElementById('darkModeBtn');
  if (btn) btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// Load saved preference on page start
function loadDarkModePreference() {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode === 'true') {
    document.body.classList.add('dark-mode');
    const btn = document.getElementById('darkModeBtn');
    if (btn) btn.textContent = '☀️ Light Mode';
  }
}

// -----------------------------------------------
// 2. FORM VALIDATION WITH REAL-TIME FEEDBACK
// -----------------------------------------------
function showError(fieldId, message) {
  const errorEl = document.getElementById(fieldId + 'Error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
  const field = document.getElementById(fieldId);
  if (field) field.style.borderColor = '#e74c3c';
}

function clearError(fieldId) {
  const errorEl = document.getElementById(fieldId + 'Error');
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.style.display = 'none';
  }
  const field = document.getElementById(fieldId);
  if (field) field.style.borderColor = '';
}

function showSuccess(message) {
  const successEl = document.getElementById('formSuccess');
  if (successEl) {
    successEl.textContent = message;
    successEl.style.display = 'block';
    setTimeout(() => { successEl.style.display = 'none'; }, 4000);
  }
}

function validateForm(event) {
  event.preventDefault();
  let isValid = true;

  // Clear previous errors
  ['name', 'email', 'subject', 'message'].forEach(clearError);

  const name    = document.getElementById('name')?.value.trim();
  const email   = document.getElementById('email')?.value.trim();
  const subject = document.getElementById('subject')?.value.trim();
  const message = document.getElementById('message')?.value.trim();

  if (!name || name.length < 2) {
    showError('name', 'Please enter your full name (at least 2 characters).');
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showError('email', 'Please enter a valid email address (e.g. you@example.com).');
    isValid = false;
  }

  if (!subject || subject.length < 3) {
    showError('subject', 'Please enter a subject (at least 3 characters).');
    isValid = false;
  }

  if (!message || message.length < 10) {
    showError('message', 'Message must be at least 10 characters long.');
    isValid = false;
  }

  if (isValid) {
    showSuccess('✅ Message sent successfully! I will get back to you soon.');
    document.getElementById('contactForm')?.reset();
    ['name', 'email', 'subject', 'message'].forEach(clearError);
  }

  return isValid;
}

// Real-time validation as user types
function setupRealTimeValidation() {
  const fields = ['name', 'email', 'subject', 'message'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => clearError(id));
    }
  });
}

// -----------------------------------------------
// 3. SKILLS PROGRESS BAR ANIMATION
// -----------------------------------------------
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  bars.forEach(bar => {
    const target = bar.getAttribute('data-width') || '0';
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.transition = 'width 1.2s ease-in-out';
      bar.style.width = target + '%';
    }, 200);
  });
}

// Trigger animation when Skills section comes into view
function setupSkillsObserver() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target); // Run only once
      }
    });
  }, { threshold: 0.3 });

  observer.observe(skillsSection);
}

// -----------------------------------------------
// 4. IMAGE GALLERY / SLIDER (Projects Section)
// -----------------------------------------------
let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  if (!slides.length) return;

  slides.forEach(s => s.classList.remove('active'));
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');

  // Update dots
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }

function setupSliderDots() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('sliderDots');
  if (!dotsContainer || !slides.length) return;

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
  });
}

// Auto-advance slider every 4 seconds
let sliderInterval;
function startAutoSlide() {
  sliderInterval = setInterval(nextSlide, 4000);
}
function stopAutoSlide() {
  clearInterval(sliderInterval);
}

// -----------------------------------------------
// 5. TO-DO / TASK LIST (Interactive Feature)
// -----------------------------------------------
function addTask() {
  const input = document.getElementById('taskInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.className = 'task-item';

  const span = document.createElement('span');
  span.textContent = text;
  span.addEventListener('click', () => li.classList.toggle('done'));

  const delBtn = document.createElement('button');
  delBtn.textContent = '✕';
  delBtn.className = 'task-delete';
  delBtn.addEventListener('click', () => li.remove());

  li.appendChild(span);
  li.appendChild(delBtn);
  document.getElementById('taskList')?.appendChild(li);
  input.value = '';
  input.focus();

  saveTasksToStorage();
}

function saveTasksToStorage() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      done: li.classList.contains('done')
    });
  });
  localStorage.setItem('portfolioTasks', JSON.stringify(tasks));
}

function loadTasksFromStorage() {
  const saved = localStorage.getItem('portfolioTasks');
  if (!saved) return;
  JSON.parse(saved).forEach(task => {
    const input = document.getElementById('taskInput');
    if (input) {
      input.value = task.text;
      addTask();
      if (task.done) {
        const items = document.querySelectorAll('.task-item');
        items[items.length - 1]?.classList.add('done');
      }
    }
  });
}

// Allow pressing Enter to add a task
function setupTaskInput() {
  document.getElementById('taskInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
  });
}

// -----------------------------------------------
// 6. SMOOTH SCROLL FOR NAV LINKS
// -----------------------------------------------
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// -----------------------------------------------
// 7. SCROLL-TO-TOP BUTTON
// -----------------------------------------------
function setupScrollToTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// -----------------------------------------------
// 8. NAVBAR ACTIVE LINK HIGHLIGHT ON SCROLL
// -----------------------------------------------
function setupActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 80) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// -----------------------------------------------
// 9. TYPING EFFECT FOR HERO HEADING
// -----------------------------------------------
function typeEffect(elementId, text, speed = 80) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

// -----------------------------------------------
// INIT — Run everything on DOM ready
// -----------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  loadDarkModePreference();
  setupRealTimeValidation();
  setupSkillsObserver();
  setupSliderDots();
  showSlide(0);
  startAutoSlide();
  setupTaskInput();
  loadTasksFromStorage();
  setupSmoothScroll();
  setupScrollToTop();
  setupActiveNavHighlight();

  // Typing effect (update text to your own tagline)
  typeEffect('heroTyping', "Hi, I'm Sarla — Frontend Developer 👋");

  // Form submission
  document.getElementById('contactForm')?.addEventListener('submit', validateForm);

  // Dark mode button
  document.getElementById('darkModeBtn')?.addEventListener('click', toggleDarkMode);

  // Slider buttons
  document.getElementById('prevBtn')?.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });
  document.getElementById('nextBtn')?.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  // Add task button
  document.getElementById('addTaskBtn')?.addEventListener('click', addTask);

  console.log('✅ Portfolio JS loaded successfully!');
});
/**
 * script.js
 * Extra interactivity: navbar scroll, hamburger, contact form, scroll reveal.
 * Week 5: Advanced CSS & Modern Layouts
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Set current year in footer ─────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Navbar: add shadow/bg on scroll ────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('nav--scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ── Hamburger menu toggle ───────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav__links--open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked (mobile UX)
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav__links--open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Contact form ────────────────────────────────────── */
  const contactForm   = document.getElementById('contactForm');
  const formSuccess   = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formSuccess) {
        formSuccess.hidden = false;
        // Hide success message after 5 seconds
        setTimeout(() => { formSuccess.hidden = true; }, 5000);
      }
      contactForm.reset();
    });
  }

  /* ── Scroll reveal via IntersectionObserver ──────────── */
  const revealEls = document.querySelectorAll(
    '.skill-card, .project-card, .cert-card, .stat-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal', 'visible');
            observer.unobserve(entry.target); // only animate once
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(el => {
      el.classList.add('scroll-reveal'); // start hidden (CSS handles this)
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything for older browsers
    revealEls.forEach(el => el.classList.add('scroll-reveal', 'visible'));
  }

  /* ── Smooth active nav link highlight ───────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav__link');

  if (sections.length && navLinkEls.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinkEls.forEach(link => {
              link.classList.toggle(
                'nav__link--active',
                link.getAttribute('href') === `#${entry.target.id}`
              );
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach(section => sectionObserver.observe(section));
  }

});