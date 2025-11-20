// Mobile navigation toggle
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("nav--open");
    navToggle.classList.toggle("is-active");
  });

  // Close mobile nav when clicking a link
  nav.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav--open");
      navToggle.classList.remove("is-active");
    });
  });
}

// Sticky header shrink on scroll
const header = document.querySelector(".header");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentY = window.scrollY;

  if (header) {
    if (currentY > 24) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  lastScrollY = currentY;
});

// Smooth scroll for internal links (fallback for older browsers)
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Reveal on scroll
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // Fallback: show all
  revealElements.forEach((el) => el.classList.add("is-visible"));
}

// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Simple form handling (front-end only)
const contactForm = document.querySelector(".contact__form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // In a real project, send this data with fetch() or similar.
    alert(
      "Thank you for reaching out to Sangat Production. We’ll get back to you shortly."
    );

    contactForm.reset();
  });
}
