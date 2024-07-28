function userRegistration(user) {
  document
    .getElementById("register-form")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      // Логіка реєстрації
      alert(`Реєстрація користувача ${user} успішна!`);
    });
}

userRegistration("Renat");
