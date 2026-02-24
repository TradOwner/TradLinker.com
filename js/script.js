(function () {
  const onReady = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  };

  onReady(() => {
    initLoader();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initFAQ();
    initToTop();
    initAnimations();
  });

  function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;

    const hideLoader = () => {
      setTimeout(() => {
        if (!loader.isConnected) return;
        loader.classList.add("is-hidden");
        setTimeout(() => loader.remove(), 400);
      }, 250);
    };

    if (document.readyState === "complete") hideLoader();
    else window.addEventListener("load", hideLoader, { once: true });
  }

  function initNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMobileMenu() {
    const button = document.getElementById("mobileMenuButton");
    const menu = document.getElementById("mobileMenu");
    const icon = document.getElementById("menuIcon");
    if (!button || !menu || !icon) return;

    const openPath = "M4 6h16M4 12h16M4 18h16";
    const closePath = "M6 18L18 6M6 6l12 12";
    const path = icon.querySelector("path");

    const setMenu = (open) => {
      menu.classList.toggle("hidden", !open);
      button.setAttribute("aria-expanded", String(open));
      if (path) path.setAttribute("d", open ? closePath : openPath);
    };

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = button.getAttribute("aria-expanded") === "true";
      setMenu(!isOpen);
    });

    menu.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("click", (e) => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      if (!isOpen) return;
      if (!menu.contains(e.target) && !button.contains(e.target)) {
        setMenu(false);
      }
    });
  }

  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const nav = document.querySelector("header");
        const navHeight = nav ? nav.offsetHeight : 0;
        const y = target.getBoundingClientRect().top + window.scrollY - navHeight + 8;

        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
  }

  function initFAQ() {
    const items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    items.forEach((item) => {
      const trigger = item.querySelector(".faq-trigger");
      if (!trigger) return;

      trigger.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        items.forEach((other) => {
          other.classList.remove("open");
          const btn = other.querySelector(".faq-trigger");
          if (btn) btn.setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
          item.classList.add("open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function initToTop() {
    const btn = document.getElementById("toTopBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const onScroll = () => {
      btn.classList.toggle("show", window.scrollY > 500);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initAnimations() {
    if (typeof window.gsap === "undefined") return;

    if (typeof window.ScrollTrigger !== "undefined") {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    const gsap = window.gsap;

    gsap.from("#hero-title", {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from("#hero-subtitle", {
      opacity: 0,
      y: 18,
      duration: 0.75,
      delay: 0.15,
      ease: "power3.out",
    });

    gsap.from("#hero-ctas", {
      opacity: 0,
      y: 12,
      duration: 0.65,
      delay: 0.25,
      ease: "power3.out",
    });

    gsap.from("#hero-visual", {
      opacity: 0,
      y: 18,
      scale: 0.98,
      duration: 0.9,
      delay: 0.2,
      ease: "power3.out",
    });

    const revealSelectors = [
      "#fonctionnalites .feature-card",
      "#offres .plan-card",
      "#paiements .pay-card",
      "#faq .faq-item",
      ".step-item",
      ".glass-card",
    ];

    revealSelectors.forEach((selector) => {
      gsap.utils.toArray(selector).forEach((el) => {
        if (!el.classList.contains("no-reveal")) {
          el.classList.add("reveal");
        }

        if (el.classList.contains("no-reveal")) return;

        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        });
      });
    });
  }
})();
