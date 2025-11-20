const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("nav--open");
    navToggle.classList.toggle("is-active");
  });

  nav.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav--open");
      navToggle.classList.remove("is-active");
    });
  });
}

/* ===========================================================
   STICKY HEADER
=========================================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 24) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

/* ===========================================================
   SMOOTH SCROLL
=========================================================== */

document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const id = anchor.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ===========================================================
   REVEAL ON SCROLL
=========================================================== */

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => obs.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

/* ===========================================================
   FOOTER YEAR
=========================================================== */

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* ===========================================================
   GSAP + PRELOADER
=========================================================== */

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    preloader.classList.add("preloader--hide");
    setTimeout(() => (preloader.style.display = "none"), 500);
  }

  if (window.gsap) {
    gsap.from(".hero__title", {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.15,
    });

    gsap.from(".hero__subtitle", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.3,
    });

    gsap.from(".hero__actions .btn", {
      y: 18,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.4,
      stagger: 0.08,
    });

    gsap.from(".hero__meta .meta-item", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.5,
      stagger: 0.06,
    });
  }
});

/* ===========================================================
   CUSTOM CURSOR
=========================================================== */

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (cursorDot && cursorOutline) {
  let x = 0,
    y = 0,
    ox = 0,
    oy = 0;
  const speed = 0.2;

  window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    cursorDot.style.transform = `translate(${x}px, ${y}px)`;
  });

  const animate = () => {
    ox += (x - ox) * speed;
    oy += (y - oy) * speed;
    cursorOutline.style.transform = `translate(${ox}px, ${oy}px)`;
    requestAnimationFrame(animate);
  };
  animate();

  document.querySelectorAll("a, button, .btn").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorOutline.style.transform += " scale(1.4)";
    });
    el.addEventListener("mouseleave", () => {
      cursorOutline.style.transform =
        cursorOutline.style.transform.replace(" scale(1.4)", "");
    });
  });

  window.addEventListener("mousedown", () => {
    cursorDot.style.transform += " scale(0.7)";
  });
  window.addEventListener("mouseup", () => {
    cursorDot.style.transform = cursorDot.style.transform.replace(
      " scale(0.7)",
      ""
    );
  });
}

/* ===========================================================
   FORM VALIDATION + ERROR ANIMATION + GOOGLE FORM SUBMISSION
=========================================================== */

const form = document.querySelector(".contact__form");
const modal = document.getElementById("form-modal");

/* ---- Modal ---- */
function openModal() {
  modal.classList.add("modal--open");
}
function closeModal() {
  modal.classList.remove("modal--open");
}

document.querySelectorAll("[data-modal-close]").forEach((btn) =>
  btn.addEventListener("click", closeModal)
);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ---- Validation Helpers ---- */
function clearErrors() {
  document.querySelectorAll(".error").forEach((e) => e.classList.remove("error"));
  document.querySelectorAll(".error-message").forEach((m) => m.remove());
}

function showError(wrapper, msg) {
  wrapper.classList.add("error");
  const err = document.createElement("div");
  err.className = "error-message";
  err.textContent = msg;
  wrapper.appendChild(err);
}

/* Checkbox group */
const serviceCheckboxes = document.querySelectorAll(
  "input[name='entry.1957010127']"
);

function isAnyCheckboxSelected() {
  return [...serviceCheckboxes].some((c) => c.checked);
}

/* ---- Main Validation ---- */
function validateForm() {
  clearErrors();
  let valid = true;

  const requiredFields = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );

  requiredFields.forEach((f) => {
    if (!f.value.trim()) {
      showError(f.parentElement, "This field is required");
      valid = false;
    }
  });

  const checkboxGroup = document.querySelector(".checkbox-group");
  if (!isAnyCheckboxSelected()) {
    checkboxGroup.classList.add("error");
    showError(checkboxGroup, "Please select at least one option");
    valid = false;
  }

  return valid;
}

/* ---- Submit Handler ---- */

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const data = new FormData(form);
  const actionURL = form.getAttribute("action");

  fetch(actionURL, {
    method: "POST",
    mode: "no-cors",
    body: data,
  })
    .then(() => {
      openModal();
      form.reset();
      clearErrors();
    })
    .catch(() => {
      openModal(); 
    });
});
