export function initGallery() {
  initLazyLoading();
  initLightbox();
  initProductFilters();
}

function initLazyLoading() {
  const lazyImages = document.querySelectorAll("img[data-src]");
  if (!lazyImages.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const img = entry.target;
        loadImage(img);
        observer.unobserve(img);
      });
    },
    { rootMargin: "100px 0px", threshold: 0.01 },
  );

  lazyImages.forEach((img) => observer.observe(img));
}

function loadImage(imgElement) {
  const src = imgElement.dataset.src;
  if (!src) return;

  imgElement.src = src;
  imgElement.removeAttribute("data-src");

  const placeholder = imgElement
    .closest(".gallery-item")
    ?.querySelector(".gallery-item__placeholder");

  imgElement.addEventListener("load", () => {
    imgElement.classList.add("is-loaded");
    placeholder?.classList.add("hidden");
  });

  imgElement.addEventListener("error", () => {
    placeholder?.classList.remove("hidden");
  });
}

function initLightbox() {
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.querySelector(".lightbox__img");
  const closeBtn = document.querySelector(".lightbox__close");
  const prevBtn = document.querySelector(".lightbox__nav--prev");
  const nextBtn = document.querySelector(".lightbox__nav--next");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!lightbox || !lightboxImg) return;

  let currentIndex = 0;

  const images = Array.from(galleryItems).map((item) => ({
    src:
      item.querySelector("img")?.dataset.src ||
      item.querySelector("img")?.src ||
      "",
    caption:
      item.querySelector(".gallery-item__caption")?.textContent ||
      item.querySelector("img")?.alt ||
      "",
  }));

  function openLightbox(index) {
    currentIndex = index;
    showImage(currentIndex);
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function showImage(index) {
    const item = images[index];
    if (!item || !item.src) return;

    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption;

    prevBtn?.toggleAttribute("disabled", index === 0);
    nextBtn?.toggleAttribute("disabled", index === images.length - 1);
  }

  function showPrev() {
    if (currentIndex > 0) {
      currentIndex--;
      showImage(currentIndex);
    }
  }

  function showNext() {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      showImage(currentIndex);
    }
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  closeBtn?.addEventListener("click", closeLightbox);
  prevBtn?.addEventListener("click", showPrev);
  nextBtn?.addEventListener("click", showNext);

  lightbox
    .querySelector(".lightbox__overlay")
    ?.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showPrev();
    if (event.key === "ArrowRight") showNext();
  });
}

function initProductFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  if (!filterButtons.length || !productCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      filterProducts(productCards, category);
    });
  });
}

function filterProducts(cards, category) {
  cards.forEach((card) => {
    const cardCategory = card.dataset.category;
    const shouldShow = category === "all" || cardCategory === category;

    card.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    if (shouldShow) {
      card.style.opacity = "1";
      card.style.transform = "scale(1)";
      card.style.display = "";
    } else {
      card.style.opacity = "0";
      card.style.transform = "scale(0.95)";

      setTimeout(() => {
        if (card.style.opacity === "0") {
          card.style.display = "none";
        }
      }, 300);
    }
  });
}
