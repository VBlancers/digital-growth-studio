/**
 * Digital Growth Studio — Main JavaScript
 * Handles navigation, animations, form, FAQ, portfolio, and scroll behaviors.
 */

(function () {
  'use strict';

  // ========================================
  // CONFIGURATION — Update these values
  // ========================================
  const CONFIG = {
    // Replace with your real business email
    contactEmail: 'vblancers@gmail.com',
    // Subject used for "Email Us Directly" mailto link
    directEmailSubject: 'Project Enquiry — Digital Growth Studio',
    // Form submission mode: 'mailto' | 'api'
    // Set to 'api' and update apiEndpoint when you have a backend
    formMode: 'mailto',
    // Backend endpoint for form submissions (when formMode === 'api')
    apiEndpoint: '/api/contact',
  };

  // ========================================
  // DOM READY
  // ========================================
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScroll();
    initScrollReveal();
    initFAQ();
    initPortfolioFilter();
    initContactForm();
    initBackToTop();
    initDirectEmail();
  });

  // ========================================
  // NAVIGATION
  // ========================================
  function initNavigation() {
    const nav = document.querySelector('.nav-wrapper');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileClose = document.querySelector('.mobile-close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // Scroll style
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
      lastScroll = y;
    }, { passive: true });

    // Hamburger toggle
    function openMobile() {
      mobileMenu.classList.add('open');
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMobile() {
      mobileMenu.classList.remove('open');
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburger?.addEventListener('click', openMobile);
    mobileClose?.addEventListener('click', closeMobile);
    mobileOverlay?.addEventListener('click', closeMobile);
    mobileLinks.forEach(link => link.addEventListener('click', closeMobile));
  }

  // ========================================
  // SMOOTH SCROLL
  // ========================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ========================================
  // SCROLL REVEAL
  // ========================================
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(el => observer.observe(el));
  }

  // ========================================
  // FAQ ACCORDION
  // ========================================
  function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      const btn = item.querySelector('.faq-question');
      btn?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all
        items.forEach(i => i.classList.remove('active'));
        // Open clicked (if it was closed)
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // ========================================
  // PORTFOLIO FILTER
  // ========================================
  function initPortfolioFilter() {
    const buttons = document.querySelectorAll('.portfolio-filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        items.forEach(item => {
          const cat = item.dataset.category;
          if (filter === 'all' || cat === filter) {
            item.style.display = '';
            // Trigger re-animation
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            });
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ========================================
  // CONTACT FORM
  // ========================================
  function initContactForm() {
    const form = document.getElementById('enquiryForm');
    const successEl = document.querySelector('.form-success');
    const formInner = document.getElementById('formInner');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Honeypot check
      const hp = form.querySelector('.hp-field input');
      if (hp && hp.value) return;

      // Validate
      if (!validateForm(form)) return;

      // Gather data
      const data = new FormData(form);
      const formObj = Object.fromEntries(data.entries());

      if (CONFIG.formMode === 'api') {
        await submitViaAPI(formObj, form, formInner, successEl);
      } else {
        submitViaMailto(formObj, form, formInner, successEl);
      }
    });
  }

  function validateForm(form) {
    let valid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      const errorEl = field.parentElement.querySelector('.form-error');
      if (!field.value.trim()) {
        field.classList.add('error');
        if (errorEl) { errorEl.textContent = 'This field is required.'; errorEl.classList.add('visible'); }
        valid = false;
      } else if (field.type === 'email' && !isValidEmail(field.value)) {
        field.classList.add('error');
        if (errorEl) { errorEl.textContent = 'Please enter a valid email address.'; errorEl.classList.add('visible'); }
        valid = false;
      } else {
        field.classList.remove('error');
        if (errorEl) errorEl.classList.remove('visible');
      }
    });

    return valid;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function submitViaMailto(data, form, formInner, successEl) {
    const subject = encodeURIComponent(`New Enquiry from ${data.fullName || 'Website Visitor'}`);
    const bodyLines = [
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Business: ${data.businessName || 'Not provided'}`,
      `Service: ${data.service}`,
      `Budget: ${data.budget || 'Not provided'}`,
      `Timeline: ${data.timeline || 'Not provided'}`,
      ``,
      `Project Details:`,
      data.projectDetails,
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailtoLink = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;

    // Open mailto
    window.location.href = mailtoLink;

    // Show success with note
    if (formInner) formInner.style.display = 'none';
    if (successEl) {
      successEl.classList.add('visible');
      const note = successEl.querySelector('.mailto-note');
      if (note) note.style.display = 'block';
    }
  }

  async function submitViaAPI(data, form, formInner, successEl) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn?.innerHTML;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    }

    try {
      const res = await fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Server error');

      if (formInner) formInner.style.display = 'none';
      if (successEl) successEl.classList.add('visible');
    } catch (err) {
      // Fallback to mailto
      const fallback = confirm(
        'We could not send your enquiry automatically. Would you like to send it via your email application instead?'
      );
      if (fallback) {
        submitViaMailto(data, form, formInner, successEl);
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }
  }

  // ========================================
  // DIRECT EMAIL BUTTON
  // ========================================
  function initDirectEmail() {
    const btn = document.getElementById('directEmailBtn');
    if (btn) {
      btn.href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent(CONFIG.directEmailSubject)}`;
    }
  }

  // ========================================
  // BACK TO TOP
  // ========================================
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
