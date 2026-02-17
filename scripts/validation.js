// scripts/validation.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  if (!form) return;

  const fullname = document.getElementById("fullname");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const agreement = document.getElementById("agreement");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    let ok = true;

    const full = (fullname.value || "").trim();
    const words = full.split(/\s+/).filter(Boolean);
    if (full === "" || words.length < 2) {
      showError(fullname, "Введите минимум фамилию и имя (2 слова).");
      ok = false;
    }

    const ph = (phone.value || "").trim();
    const digits = ph.replace(/\D/g, "");
    if (ph === "") {
      showError(phone, "Введите номер телефона.");
      ok = false;
    } else if (digits.length < 10) {
      showError(phone, "Введите минимум 10 цифр.");
      ok = false;
    }

    const em = (email.value || "").trim();
    if (em === "") {
      showError(email, "Введите email.");
      ok = false;
    } else if (!emailPattern.test(em)) {
      showError(email, "Введите корректный email.");
      ok = false;
    }

    if (!agreement.checked) {
      alert("Необходимо согласие на обработку персональных данных.");
      ok = false;
    }

    if (!ok) return;

    const data = {
      fullname: full,
      phone: ph,
      email: em,
      message: (message.value || "").trim() || "(не заполнено)",
      createdAt: new Date().toISOString()
    };

    document.dispatchEvent(new CustomEvent("formValid", { detail: data }));
    alert("Форма отправлена! Данные выведены в консоль.");
    form.reset();
  });

  [fullname, phone, email, message].forEach((el) => {
    el.addEventListener("input", () => {
      el.classList.remove("is-danger");
      removeHelp(el);
    });
  });

  function clearErrors() {
    [fullname, phone, email, message].forEach((el) => {
      el.classList.remove("is-danger");
      removeHelp(el);
    });
  }

  function showError(input, text) {
    input.classList.add("is-danger");
    const help = document.createElement("p");
    help.className = "help is-danger";
    help.textContent = text;
    const field = input.closest(".field");
    if (field) field.appendChild(help);
  }

  function removeHelp(input) {
    const field = input.closest(".field");
    if (!field) return;
    field.querySelectorAll(".help.is-danger").forEach((h) => h.remove());
  }
});