const SHOW_THRESHOLD = 400;

export function initBackToTop() {
  const button = document.querySelector(".back-to-top");
  if (!button) return;

  let ticking = false;

  function updateVisibility() {
    if (window.scrollY > SHOW_THRESHOLD) {
      button.classList.add("is-visible");
    } else {
      button.classList.remove("is-visible");
    }
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    },
    { passive: true },
  );

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      button.click();
    }
  });

  updateVisibility();
}
