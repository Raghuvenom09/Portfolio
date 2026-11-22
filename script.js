/**
 * RAGHAVENDRA PANDEY — PORTFOLIO JAVASCRIPT
 * Simple, robust, zero-dependency client interactions.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // 1. Current Year in Footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // 3. Scroll Spy Navigation Highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-25% 0px -65% 0px' });

  sections.forEach(sec => observer.observe(sec));

  // 4. Toast Notifications
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, duration = 3000) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7ee787" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 200);
    }, duration);
  }

  // 5. Copy Email Buttons
  async function copyEmail(email = 'raghavendrapandey909@gmail.com') {
    try {
      await navigator.clipboard.writeText(email);
      showToast('Copied email to clipboard: ' + email);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('Copied email to clipboard!');
    }
  }

  const btnCopyEmail = document.getElementById('btnCopyEmail');
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      const email = btnCopyEmail.getAttribute('data-email') || 'raghavendrapandey909@gmail.com';
      copyEmail(email);
    });
  }

  const btnCopyEmailSide = document.getElementById('btnCopyEmailSide');
  if (btnCopyEmailSide) {
    btnCopyEmailSide.addEventListener('click', () => {
      const email = btnCopyEmailSide.getAttribute('data-email') || 'raghavendrapandey909@gmail.com';
      copyEmail(email);
    });
  }

  // 6. Project Category Filter
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectBoxes = document.querySelectorAll('.project-box');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      projectBoxes.forEach(box => {
        const cat = box.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          box.style.display = 'flex';
        } else {
          box.style.display = 'none';
        }
      });
    });
  });

  // 7. Contact Form Handler (Direct mailto)
  const contactForm = document.getElementById('contactForm');
  const btnSendMsg = document.getElementById('btnSendMsg');

  if (contactForm && btnSendMsg) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('cName')?.value.trim();
      const email = document.getElementById('cEmail')?.value.trim();
      const subject = document.getElementById('cSubject')?.value.trim();
      const message = document.getElementById('cMessage')?.value.trim();

      if (!name || !email || !subject || !message) {
        alert('Please fill out all fields.');
        return;
      }

      btnSendMsg.disabled = true;
      const originalText = btnSendMsg.innerHTML;
      btnSendMsg.innerHTML = '<span>Opening Email...</span>';

      setTimeout(() => {
        const mailtoUri = `mailto:raghavendrapandey909@gmail.com?subject=${encodeURIComponent(
          `[Portfolio Contact] ${subject} - from ${name}`
        )}&body=${encodeURIComponent(
          `Hi Raghavendra,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
        )}`;

        window.location.href = mailtoUri;

        showToast('Opening your default email client to send to Raghavendra!');
        btnSendMsg.innerHTML = originalText;
        btnSendMsg.disabled = false;
        contactForm.reset();
      }, 400);
    });
  }

});
