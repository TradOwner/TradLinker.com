(() => {
  const state = {
    active: null,
    isSwitching: false,
  };

  const VALID_VIEWS = ["accueil", "tradlinker", "tradassist", "tradcoord", "offres"];

  const onReady = (fn) => {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
    else fn();
  };

  onReady(() => {
    initYear();
    initMobileMenu();
    initViewRouter();
    initHeaderLinks();
    window.addEventListener("resize", debounce(syncStageHeight, 60));
    window.addEventListener("hashchange", handleHashRoute);
    requestAnimationFrame(syncStageHeight);
  });

  function initYear() {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function initMobileMenu() {
    const btn = document.getElementById("menuToggle");
    const nav = document.getElementById("topNav");
    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });

    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        btn.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
      });
    });
  }

  function initHeaderLinks() {
    document.querySelectorAll("[data-view-target]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const target = el.getAttribute("data-view-target");
        if (!target || !VALID_VIEWS.includes(target)) return;

        const isAnchor = el.tagName.toLowerCase() === "a";
        if (isAnchor) e.preventDefault();
        navigateToView(target, true);
      });
    });
  }

  function initViewRouter() {
    const initial = getViewFromHash() || "accueil";
    const initialEl = getViewEl(initial) || getViewEl("accueil");
    if (!initialEl) return;

    document.querySelectorAll(".view-page").forEach((page) => {
      const isActive = page === initialEl;
      page.classList.toggle("is-active", isActive);
      page.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    state.active = initialEl.dataset.view;
    setNavActive(state.active);
    ensureHash(state.active, false);
    syncStageHeight();
  }

  function handleHashRoute() {
    const target = getViewFromHash();
    if (!target || target === state.active) return;
    navigateToView(target, false);
  }

  function navigateToView(target, updateHash = true) {
    if (!VALID_VIEWS.includes(target)) return;
    if (state.isSwitching || target === state.active) {
      if (updateHash) ensureHash(target, false);
      return;
    }

    const currentEl = getViewEl(state.active);
    const nextEl = getViewEl(target);
    if (!nextEl) return;

    state.isSwitching = true;
    setNavActive(target);

    if (!currentEl) {
      nextEl.classList.add("is-active");
      nextEl.setAttribute("aria-hidden", "false");
      state.active = target;
      if (updateHash) ensureHash(target, false);
      syncStageHeight();
      state.isSwitching = false;
      return;
    }

    // Prepare transition and height
    nextEl.classList.add("is-active");
    nextEl.setAttribute("aria-hidden", "false");
    syncStageHeight();

    currentEl.classList.add("is-leaving");
    currentEl.setAttribute("aria-hidden", "true");

    window.setTimeout(() => {
      currentEl.classList.remove("is-active", "is-leaving");
      state.active = target;
      if (updateHash) ensureHash(target, false);
      syncStageHeight();
      state.isSwitching = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 290);
  }

  function setNavActive(view) {
    document.querySelectorAll("[data-view-target]").forEach((el) => {
      const match = el.getAttribute("data-view-target") === view;
      el.classList.toggle("is-active", match);
      if (el.tagName.toLowerCase() === "button") {
        el.setAttribute("aria-pressed", match ? "true" : "false");
      }
    });
  }

  function getViewFromHash() {
    const raw = window.location.hash.replace(/^#/, "").trim().toLowerCase();
    if (!raw) return null;
    return VALID_VIEWS.includes(raw) ? raw : null;
  }

  function ensureHash(view, replace = true) {
    const hash = `#${view}`;
    if (window.location.hash === hash) return;
    if (replace) history.replaceState(null, "", hash);
    else window.location.hash = hash;
  }

  function getViewEl(view) {
    if (!view) return null;
    return document.querySelector(`.view-page[data-view="${view}"]`);
  }

  function syncStageHeight() {
    const stage = document.getElementById("viewStage");
    if (!stage) return;
    const active = stage.querySelector(".view-page.is-active");
    if (!active) return;
    const h = active.offsetHeight;
    stage.style.height = `${h}px`;
  }

  function debounce(fn, wait = 100) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }
})();
