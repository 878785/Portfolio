// ============================================
// 🚀 SUMIT MISHRA - GOD LEVEL PORTFOLIO JS
// ============================================

// ============================================
// 1. PRELOADER
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const counter = document.getElementById("preloader-counter");

  // Agar preloader element exist karta hai tabhi chale
  if (preloader) {
    let count = 0;
    const interval = setInterval(() => {
      count += 2;
      if (counter) counter.textContent = count + "%";
      if (count >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add("hide");
          document.body.classList.add("loaded");
          initAllAnimations();
        }, 400);
      }
    }, 20);
  } else {
    // Agar preloader nahi hai toh seedha init karo
    document.body.classList.add("loaded");
    initAllAnimations();
  }
});

// ============================================
// 2. CUSTOM CURSOR
// ============================================
let mouseX = 0,
  mouseY = 0;
let outlineX = 0,
  outlineY = 0;

function initCursor() {
  // Check if mobile — mobile pe cursor mat dikhao
  if (window.innerWidth <= 768) return;

  const cursorDot = document.createElement("div");
  const cursorOutline = document.createElement("div");
  cursorDot.className = "cursor-dot";
  cursorOutline.className = "cursor-outline";
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  });

  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    cursorOutline.style.left = outlineX + "px";
    cursorOutline.style.top = outlineY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects
  document.addEventListener("mouseover", (e) => {
    if (
      e.target.tagName === "A" ||
      e.target.tagName === "BUTTON" ||
      e.target.classList.contains("hoverable") ||
      e.target.classList.contains("tech-tag") ||
      e.target.classList.contains("filter-btn") ||
      e.target.classList.contains("nav-link")
    ) {
      cursorDot.classList.add("cursor-hover");
      cursorOutline.classList.add("cursor-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (
      e.target.tagName === "A" ||
      e.target.tagName === "BUTTON" ||
      e.target.classList.contains("hoverable") ||
      e.target.classList.contains("tech-tag") ||
      e.target.classList.contains("filter-btn") ||
      e.target.classList.contains("nav-link")
    ) {
      cursorDot.classList.remove("cursor-hover");
      cursorOutline.classList.remove("cursor-hover");
    }
  });
}

// ============================================
// 3. PARTICLE BACKGROUND
// ============================================
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 60;
  const colors = ["#ff0080", "#7928ca", "#4a00e0", "#2196f3", "#00bcd4"];

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 1;
      this.speedY = (Math.random() - 0.5) * 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        this.x -= dx * 0.015;
        this.y -= dy * 0.015;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = particles[i].color;
          ctx.globalAlpha = 0.08 * (1 - dist / 130);
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ============================================
// 4. TYPING EFFECT
// ============================================
function initTypingEffect() {
  const typingElement = document.getElementById("typing-text");
  if (!typingElement) return;

  const texts = [
    "Frontend Web Developer 💻",
    "BCA Student 🎓",
    "JavaScript Enthusiast ⚡",
    "UI/UX Lover 🎨",
    "Problem Solver 🧠",
    "Open Source Contributor 🌍",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }
  type();
}

// ============================================
// 5. NAVBAR
// ============================================
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  let lastScroll = 0;

  if (!navbar) return;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Hide/show on scroll
    if (currentScroll > lastScroll && currentScroll > 300) {
      navbar.classList.add("nav-hidden");
    } else {
      navbar.classList.remove("nav-hidden");
    }
    lastScroll = currentScroll;

    // Active link update
    updateActiveLink();
  });

  // Smooth scroll for nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Only smooth scroll for same-page anchors
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }

      // Close mobile menu
      if (mobileMenu && hamburger) {
        mobileMenu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  });

  // Hamburger
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });
  }
}

function updateActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length === 0) return;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    const scrollY = window.pageYOffset;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      const currentId = section.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentId) {
          link.classList.add("active");
        }
      });
    }
  });
}

// ============================================
// 6. SCROLL REVEAL
// ============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-scale, .project-card"
  );

  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("revealed");
          }, i * 100);

          const children = entry.target.querySelectorAll(".stagger-child");
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add("revealed");
            }, index * 150);
          });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// ============================================
// 7. COUNTER ANIMATION
// ============================================
function initCounters() {
  const counters = document.querySelectorAll(".counter");
  if (counters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute("data-target"));
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              entry.target.textContent = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              entry.target.textContent = target + "+";
            }
          };
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

// ============================================
// 8. SKILL BARS
// ============================================
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  if (skillBars.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute("data-width");
          entry.target.style.width = width + "%";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

// ============================================
// 9. PROJECT FILTER
// ============================================
function initProjectFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterBtns.length === 0 || projectCards.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          card.style.display = "";
          card.style.opacity = "0";
          card.style.transform = "translateY(30px)";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          setTimeout(() => {
            card.style.display = "none";
          }, 400);
        }
      });
    });
  });
}

// ============================================
// 10. TILT EFFECT
// ============================================
function initTiltEffect() {
  const cards = document.querySelectorAll(".tilt-card, .project-card:not(.featured-project)");
  if (cards.length === 0) return;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;

      const glare = card.querySelector(".glare");
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.12) 0%, transparent 80%)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
      const glare = card.querySelector(".glare");
      if (glare) glare.style.background = "transparent";
    });
  });
}

// ============================================
// 11. MAGNETIC BUTTONS
// ============================================
function initMagneticButtons() {
  const buttons = document.querySelectorAll(".magnetic-btn");
  if (buttons.length === 0) return;

  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });
}

// ============================================
// 12. SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });
}

// ============================================
// 13. BACK TO TOP
// ============================================
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ============================================
// 14. THEME TOGGLE
// ============================================
function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  toggle.innerHTML = savedTheme === "dark" ? "☀️" : "🌙";

  toggle.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    toggle.innerHTML = newTheme === "dark" ? "☀️" : "🌙";
  });
}

// ============================================
// 15. CONTACT FORM
// ============================================
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("form-name");
    const email = document.getElementById("form-email");
    const message = document.getElementById("form-message");

    if (!name || !email || !message) return;

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      showNotification("Please fill all fields! ⚠️", "error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showNotification("Please enter a valid email! 📧", "error");
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      showNotification("Message sent successfully! ✅", "success");
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      launchConfetti();
    }, 2000);
  });

  // Floating label
  const inputs = form.querySelectorAll(".form-input");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });
    input.addEventListener("blur", () => {
      if (!input.value) {
        input.parentElement.classList.remove("focused");
      }
    });
  });
}

// ============================================
// 16. NOTIFICATION
// ============================================
function showNotification(message, type) {
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.className = `notification notification-${type || "info"}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === "error" ? "#ff4444" : type === "success" ? "#00c853" : "#2196f3"};
    color: #fff;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    z-index: 99999;
    transform: translateX(120%);
    transition: transform 0.4s ease;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 400px;
  `;
  notification.innerHTML = `
    <span>${message}</span>
    <button style="background:none;border:none;color:#fff;font-size:20px;cursor:pointer;padding:0 0 0 10px;" onclick="this.parentElement.remove()">×</button>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 10);

  setTimeout(() => {
    notification.style.transform = "translateX(120%)";
    setTimeout(() => notification.remove(), 400);
  }, 5000);
}

// ============================================
// 17. CONFETTI
// ============================================
function launchConfetti() {
  const colors = ["#ff0080", "#7928ca", "#4a00e0", "#2196f3", "#00bcd4", "#ffeb3b", "#ff5722"];

  if (!document.getElementById("confetti-style")) {
    const style = document.createElement("style");
    style.id = "confetti-style";
    style.textContent = `
      @keyframes confettiFall {
        0% { top: -10px; opacity: 1; transform: rotate(0deg) translateX(0); }
        25% { transform: rotate(90deg) translateX(30px); }
        50% { transform: rotate(180deg) translateX(-20px); opacity: 1; }
        75% { transform: rotate(270deg) translateX(40px); }
        100% { top: 110vh; opacity: 0; transform: rotate(360deg) translateX(0); }
      }
    `;
    document.head.appendChild(style);
  }

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.style.cssText = `
      position: fixed;
      top: -10px;
      left: ${Math.random() * 100}vw;
      width: ${Math.random() * 10 + 5}px;
      height: ${Math.random() * 10 + 5}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
      z-index: 99999;
      pointer-events: none;
      animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
      animation-delay: ${Math.random() * 0.5}s;
    `;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

// ============================================
// 18. CERTIFICATE MODAL
// ============================================
function initCertificateModal() {
  const certCards = document.querySelectorAll(".certificate-card");
  const modal = document.getElementById("certificate-modal");

  if (!modal || certCards.length === 0) return;

  const modalImg = document.getElementById("modal-cert-img");
  const modalTitle = document.getElementById("modal-cert-title");
  const modalDesc = document.getElementById("modal-cert-desc");
  const closeBtn = document.querySelector(".modal-close");

  certCards.forEach((card) => {
    card.addEventListener("click", () => {
      const imgSrc = card.getAttribute("data-img");
      const title = card.getAttribute("data-title");
      const desc = card.getAttribute("data-desc");

      if (modalImg) modalImg.src = imgSrc;
      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

// ============================================
// 19. TEXT SPLIT ANIMATION
// ============================================
function initTextAnimations() {
  const splitTexts = document.querySelectorAll(".split-text");
  if (splitTexts.length === 0) return;

  splitTexts.forEach((text) => {
    const content = text.textContent;
    text.textContent = "";

    content.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.className = "split-char";
      span.style.animationDelay = i * 0.04 + "s";
      text.appendChild(span);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  splitTexts.forEach((text) => observer.observe(text));
}

// ============================================
// 20. PARALLAX
// ============================================
function initParallax() {
  const parallaxElements = document.querySelectorAll(".parallax");
  if (parallaxElements.length === 0) return;

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    parallaxElements.forEach((el) => {
      const speed = el.getAttribute("data-speed") || 0.5;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
}

// ============================================
// 21. FLOATING SHAPES
// ============================================
function initFloatingShapes() {
  const container = document.getElementById("floating-shapes");
  if (!container) return;

  const colors = [
    "rgba(255,0,128,0.1)",
    "rgba(121,40,202,0.1)",
    "rgba(74,0,224,0.1)",
    "rgba(33,150,243,0.1)",
    "rgba(0,188,212,0.1)",
  ];

  if (!document.getElementById("float-style")) {
    const style = document.createElement("style");
    style.id = "float-style";
    style.textContent = `
      @keyframes floatShape {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-30px) rotate(90deg); }
        50% { transform: translateY(-15px) rotate(180deg); }
        75% { transform: translateY(-40px) rotate(270deg); }
      }
    `;
    document.head.appendChild(style);
  }

  for (let i = 0; i < 12; i++) {
    const shape = document.createElement("div");
    const size = Math.random() * 80 + 20;
    shape.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border: 1px solid ${colors[Math.floor(Math.random() * colors.length)].replace("0.1", "0.3")};
      border-radius: ${Math.random() > 0.5 ? "50%" : "10px"};
      animation: floatShape ${Math.random() * 10 + 8}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
      pointer-events: none;
    `;
    container.appendChild(shape);
  }
}

// ============================================
// 22. CLICK RIPPLE
// ============================================
function initRippleEffect() {
  if (!document.getElementById("ripple-style")) {
    const style = document.createElement("style");
    style.id = "ripple-style";
    style.textContent = `
      @keyframes rippleExpand {
        0% { width: 0; height: 0; opacity: 1; }
        100% { width: 200px; height: 200px; opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener("click", (e) => {
    const ripple = document.createElement("div");
    ripple.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 0; height: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,0,128,0.25), transparent);
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 99998;
      animation: rippleExpand 0.6s ease-out forwards;
    `;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
}

// ============================================
// 23. TIMELINE
// ============================================
function initTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  if (timelineItems.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  timelineItems.forEach((item) => observer.observe(item));
}

// ============================================
// 24. MOUSE TRAIL
// ============================================
function initMouseTrail() {
  if (window.innerWidth <= 768) return;

  const trail = [];
  for (let i = 0; i < 8; i++) {
    const dot = document.createElement("div");
    dot.style.cssText = `
      position: fixed;
      width: ${6 - i * 0.6}px;
      height: ${6 - i * 0.6}px;
      background: rgba(255, 0, 128, ${0.5 - i * 0.05});
      border-radius: 50%;
      pointer-events: none;
      z-index: 99996;
      transition: transform ${0.08 + i * 0.02}s ease;
    `;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }

  document.addEventListener("mousemove", (e) => {
    trail[0].x = e.clientX;
    trail[0].y = e.clientY;
  });

  function animTrail() {
    for (let i = trail.length - 1; i > 0; i--) {
      trail[i].x += (trail[i - 1].x - trail[i].x) * 0.35;
      trail[i].y += (trail[i - 1].y - trail[i].y) * 0.35;
    }
    trail.forEach((d) => {
      d.el.style.left = d.x + "px";
      d.el.style.top = d.y + "px";
    });
    requestAnimationFrame(animTrail);
  }
  animTrail();
}

// ============================================
// 25. STATS COUNTER
// ============================================
function initStatsCounter() {
  const stats = document.querySelectorAll(".stat-number");
  if (stats.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
          entry.target.classList.add("counted");
          const target = parseInt(entry.target.getAttribute("data-count"));
          const suffix = entry.target.getAttribute("data-suffix") || "";
          let current = 0;
          const step = target / 50;

          const counter = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(counter);
            }
            entry.target.textContent = Math.floor(current) + suffix;
          }, 30);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((stat) => observer.observe(stat));
}

// ============================================
// 26. DYNAMIC YEAR
// ============================================
function initDynamicYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ============================================
// 27. LAZY LOADING
// ============================================
function initLazyLoad() {
  const lazyImages = document.querySelectorAll("img[data-src]");
  if (lazyImages.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute("data-src");
          img.removeAttribute("data-src");
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: "100px" }
  );

  lazyImages.forEach((img) => observer.observe(img));
}

// ============================================
// 28. EASTER EGG
// ============================================
function initEasterEgg() {
  const konamiCode = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
  ];
  let konamiIndex = 0;

  document.addEventListener("keydown", (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        launchConfetti();
        showNotification("🎮 KONAMI CODE ACTIVATED! Easter Egg Found! 🥚✨", "success");
      }
    } else {
      konamiIndex = 0;
    }
  });
}

// ============================================
// 29. SMOOTH ANCHORS
// ============================================
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ============================================
// 30. SCROLL INDICATOR DOTS
// ============================================
function initScrollIndicator() {
  const sections = document.querySelectorAll("section[id]");
  if (sections.length === 0) return;

  const container = document.createElement("div");
  container.className = "scroll-indicator";
  container.style.cssText = `
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `;

  sections.forEach((section) => {
    const dot = document.createElement("a");
    dot.href = "#" + section.id;
    dot.className = "indicator-dot";
    dot.title = section.id.charAt(0).toUpperCase() + section.id.slice(1);
    dot.style.cssText = `
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      border: 1px solid rgba(255,0,128,0.5);
      cursor: pointer;
      transition: all 0.3s ease;
    `;
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      section.scrollIntoView({ behavior: "smooth" });
    });
    container.appendChild(dot);
  });

  document.body.appendChild(container);

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    const dots = container.querySelectorAll(".indicator-dot");

    sections.forEach((section, i) => {
      const top = section.offsetTop - 200;
      const bottom = top + section.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        dots.forEach((d) => {
          d.style.background = "rgba(255,255,255,0.3)";
          d.style.transform = "scale(1)";
          d.style.boxShadow = "none";
        });
        if (dots[i]) {
          dots[i].style.background = "#ff0080";
          dots[i].style.transform = "scale(1.5)";
          dots[i].style.boxShadow = "0 0 10px rgba(255,0,128,0.5)";
        }
      }
    });
  });
}

// ============================================
// 31. GLITCH TEXT
// ============================================
function initGlitchEffect() {
  const glitchTexts = document.querySelectorAll(".glitch-text");
  glitchTexts.forEach((text) => {
    text.setAttribute("data-text", text.textContent);
  });
}

// ============================================
// 32. INITIALIZE EVERYTHING
// ============================================
function initAllAnimations() {
  initCursor();
  initParticles();
  initTypingEffect();
  initNavbar();
  initScrollReveal();
  initCounters();
  initSkillBars();
  initProjectFilter();
  initTiltEffect();
  initMagneticButtons();
  initScrollProgress();
  initBackToTop();
  initThemeToggle();
  initContactForm();
  initTextAnimations();
  initParallax();
  initFloatingShapes();
  initRippleEffect();
  initTimeline();
  initMouseTrail();
  initStatsCounter();
  initDynamicYear();
  initLazyLoad();
  initEasterEgg();
  initScrollIndicator();
  initGlitchEffect();
  initSmoothAnchors();
  initCertificateModal();

  console.log(
    "%c🚀 Sumit Mishra Portfolio Loaded!",
    "color: #ff0080; font-size: 18px; font-weight: bold;"
  );
  console.log(
    "%c💻 Built with ❤️ by Sumit Mishra",
    "color: #7928ca; font-size: 14px;"
  );
  console.log(
    "%c📧 sumitmishr2904@gmail.com",
    "color: #4a00e0; font-size: 12px;"
  );
}
