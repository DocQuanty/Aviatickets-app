import { chooseFlight } from "./chooseFlight/chooseFlight.js";

document.addEventListener("DOMContentLoaded", () => {
  // Авторизація користувача
  document.getElementById("login-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    // Логіка авторизації
    alert("Авторизація успішна!");
  });

  // Зміна паролю
  document
    .getElementById("change-password-form")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      // Логіка зміни паролю

      alert("Пароль успішно змінено!");
    });

  // Додавання платіжної картки
  document
    .getElementById("payment-cards-form")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      // Логіка додавання картки
      alert("Картка успішно додана!");
    });

  // Логіка вибору рейсу
  chooseFlight();
});
