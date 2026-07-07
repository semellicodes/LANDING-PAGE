export function initAnimations() {
  initScrollReveal();
  initCounters();
  initFAQ();
  initHeroBgLoad();
  initPromoCopyCode();
}

function initScrollReveal() {
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  revealEls.forEach((el) => observer.observe(el));
}

function initCounters() {
  const counterEls = document.querySelectorAll("[data-counter]");
  if (!counterEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 },
  );

  counterEls.forEach((el) => observer.observe(el));
}

function animateCounter(element) {
  const target = parseFloat(element.dataset.counter);
  const duration = parseInt(element.dataset.duration || "1800", 10);
  const decimals = (String(target).split(".")[1] || "").length;
  const suffix = element.dataset.suffix || "";
  const prefix = element.dataset.prefix || "";
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    const current = target * eased;

    element.textContent = prefix + current.toFixed(decimals) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-item__trigger");

    trigger?.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          closeAccordionItem(otherItem);
        }
      });

      isOpen ? closeAccordionItem(item) : openAccordionItem(item);
    });

    trigger?.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        trigger.click();
      }
    });
  });
}

function openAccordionItem(item) {
  item.classList.add("is-open");
  item
    .querySelector(".faq-item__trigger")
    ?.setAttribute("aria-expanded", "true");
}

function closeAccordionItem(item) {
  item.classList.remove("is-open");
  item
    .querySelector(".faq-item__trigger")
    ?.setAttribute("aria-expanded", "false");
}

function initHeroBgLoad() {
  const heroBg = document.querySelector(".hero__bg");
  if (!heroBg) return;

  const bgImage = new Image();
  bgImage.src =
    "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1920&q=80";

  bgImage.addEventListener("load", () => {
    heroBg.classList.add("is-loaded");
  });
}

function initPromoCopyCode() {
  const codeValue = document.querySelector(".promo-banner__code-value");
  if (!codeValue) return;

  codeValue.addEventListener("click", () => {
    const code = codeValue.dataset.code;
    if (!code) return;

    navigator.clipboard.writeText(code).then(() => {
      const originalHtml = codeValue.innerHTML;
      codeValue.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';

      setTimeout(() => {
        codeValue.innerHTML = originalHtml;
      }, 2000);
    });
  });
}
