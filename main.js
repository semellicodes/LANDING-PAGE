import { initAnimations } from "./animations.js";
import { initBackToTop } from "./backToTop.js";
import { initForm } from "./form.js";
import { initGallery } from "./gallery.js";
import { initMenu } from "./menu.js";
import { initScroll } from "./scroll.js";
import { initSlider } from "./slider.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initScroll();
  initAnimations();
  initSlider();
  initGallery();
  initForm();
  initBackToTop();
});
