/* ==========================================================================
   VASUDEV JYOTISH & MARRIAGE BUREAU — script
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     Footer year
     --------------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     Sticky header shadow on scroll
     --------------------------------------------------------------------- */
  var header = document.getElementById("siteHeader");
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------------------------------------------------------------------
     Mobile nav toggle
     --------------------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  function closeNav() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a[data-nav]").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------------------------------------------------------------------
     Active nav link highlighting while scrolling
     --------------------------------------------------------------------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll("main section[id]")
  );
  var navAnchors = navLinks
    ? Array.prototype.slice.call(navLinks.querySelectorAll("a[data-nav]"))
    : [];

  function setActiveNav() {
    if (!sections.length || !navAnchors.length) return;
    var scrollPos = window.scrollY + 140;
    var current = sections[0].id;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    });
    navAnchors.forEach(function (a) {
      var match = a.getAttribute("href") === "#" + current;
      a.style.color = match ? "var(--vermillion)" : "";
    });
  }
  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  /* ---------------------------------------------------------------------
     Scroll-reveal animation (IntersectionObserver)
     --------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // No IntersectionObserver support, or reduced motion: show everything immediately.
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------------------------------------------------------------------
     Hero star field — generated once, CSS handles the twinkle animation
     --------------------------------------------------------------------- */
  var starField = document.getElementById("starField");
  if (starField && !reduceMotion) {
    var STAR_COUNT = window.innerWidth < 760 ? 18 : 34;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < STAR_COUNT; i++) {
      var star = document.createElement("span");
      star.style.top = Math.random() * 100 + "%";
      star.style.left = Math.random() * 100 + "%";
      star.style.animationDelay = (Math.random() * 3).toFixed(2) + "s";
      star.style.animationDuration = (2.4 + Math.random() * 2.2).toFixed(2) + "s";
      frag.appendChild(star);
    }
    starField.appendChild(frag);
  }

  /* ---------------------------------------------------------------------
     FAQ accordion
     --------------------------------------------------------------------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var answer = item.querySelector(".faq-a");
    if (!btn || !answer) return;

    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      // Close every other open item (single-open accordion behaviour)
      faqItems.forEach(function (other) {
        if (other === item) return;
        other.classList.remove("open");
        var otherBtn = other.querySelector(".faq-q");
        var otherAnswer = other.querySelector(".faq-a");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (isOpen) {
        item.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Keep open FAQ panel sized correctly on resize (text reflow changes height)
  window.addEventListener("resize", function () {
    var openItem = document.querySelector(".faq-item.open");
    if (!openItem) return;
    var answer = openItem.querySelector(".faq-a");
    if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
  });

  /* ---------------------------------------------------------------------
     Scroll-to-top button
     --------------------------------------------------------------------- */
  var scrollTopBtn = document.getElementById("scrollTop");
  if (scrollTopBtn) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 480) scrollTopBtn.classList.add("visible");
        else scrollTopBtn.classList.remove("visible");
      },
      { passive: true }
    );

    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }
})();
