export function initForm() {
  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) setupContactForm(contactForm);
}

const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
    messages: {
      required: "Por favor, informe seu nome.",
      minLength: "O nome deve ter ao menos 2 caracteres.",
      pattern: "Por favor, insira apenas letras no nome.",
    },
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    messages: {
      required: "Por favor, informe seu e-mail.",
      pattern: "Informe um endereço de e-mail válido.",
    },
  },
  phone: {
    required: false,
    pattern: /^[\d\s\(\)\-\+]{8,15}$/,
    messages: {
      pattern: "Informe um telefone válido.",
    },
  },
  message: {
    required: true,
    minLength: 10,
    messages: {
      required: "Por favor, escreva sua mensagem.",
      minLength: "A mensagem deve ter ao menos 10 caracteres.",
    },
  },
};

function setupContactForm(form) {
  const inputs = form.querySelectorAll("[data-validate]");
  const toast = form.querySelector(".form__toast");

  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => clearFieldError(input));
  });

  const phoneInput = form.querySelector('[data-mask="phone"]');
  if (phoneInput) applyPhoneMask(phoneInput);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    handleSubmit(form, inputs, toast);
  });
}

function validateField(field) {
  const fieldName = field.dataset.validate;
  const rules = VALIDATION_RULES[fieldName];
  const value = field.value.trim();

  if (!rules) return true;

  if (rules.required && !value) {
    showFieldError(field, rules.messages.required);
    return false;
  }

  if (!value && !rules.required) {
    clearFieldError(field);
    return true;
  }

  if (rules.minLength && value.length < rules.minLength) {
    showFieldError(field, rules.messages.minLength);
    return false;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    showFieldError(field, rules.messages.pattern);
    return false;
  }

  markFieldValid(field);
  return true;
}

function validateForm(inputs) {
  let isValid = true;

  inputs.forEach((input) => {
    const fieldIsValid = validateField(input);
    if (!fieldIsValid) isValid = false;
  });

  return isValid;
}

async function handleSubmit(form, inputs, toast) {
  const isValid = validateForm(inputs);
  const submitBtn = form.querySelector('[type="submit"]');

  if (!isValid) {
    const firstError = form.querySelector(".form__input.is-error");
    firstError?.focus();
    return;
  }

  setButtonLoading(submitBtn, true);

  try {
    await simulateApiCall(collectFormData(form));

    showSuccessToast(toast);
    form.reset();
    inputs.forEach(clearFieldError);
  } catch {
    showFieldError(
      form.querySelector('[data-validate="email"]'),
      "Ocorreu um erro. Tente novamente mais tarde.",
    );
  } finally {
    setButtonLoading(submitBtn, false);
  }
}

function collectFormData(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}

function simulateApiCall(data) {
  console.log("[Pet Love] Formulário enviado:", data);
  return new Promise((resolve) => setTimeout(resolve, 1200));
}

function setButtonLoading(button, isLoading) {
  if (!button) return;

  button.disabled = isLoading;

  if (isLoading) {
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = '<span class="spinner"></span> Enviando…';
  } else {
    button.innerHTML = button.dataset.originalText || "Enviar mensagem";
  }
}

function showSuccessToast(toast) {
  if (!toast) return;

  toast.classList.add("is-visible");

  setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 5000);
}

function showFieldError(field, message) {
  field.classList.add("is-error");
  field.classList.remove("is-valid");
  field.setAttribute("aria-invalid", "true");

  const messageEl = getMessageElement(field);
  if (messageEl) {
    messageEl.textContent = message;
    messageEl.className = "form__message form__message--error";
  }
}

function markFieldValid(field) {
  field.classList.remove("is-error");
  field.classList.add("is-valid");
  field.setAttribute("aria-invalid", "false");

  const messageEl = getMessageElement(field);
  if (messageEl) {
    messageEl.textContent = "";
    messageEl.className = "form__message";
  }
}

function clearFieldError(field) {
  field.classList.remove("is-error", "is-valid");
  field.removeAttribute("aria-invalid");

  const messageEl = getMessageElement(field);
  if (messageEl) {
    messageEl.textContent = "";
    messageEl.className = "form__message";
  }
}

function getMessageElement(field) {
  return field.closest(".form__group")?.querySelector(".form__message");
}

function applyPhoneMask(input) {
  input.addEventListener("input", () => {
    let digits = input.value.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 10) {
      digits = digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      digits = digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    input.value = digits;
  });
}
