// scripts/consoleLogger.js
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("formValid", (event) => {
    const d = event.detail;

    console.clear();
    console.log("=== FitMeal: отправка формы ===");
    console.log("ФИО:", d.fullname);
    console.log("Телефон:", d.phone);
    console.log("Email:", d.email);
    console.log("Сообщение:", d.message);
    console.log("Время (ISO):", d.createdAt);

    console.table([d]);
  });
});