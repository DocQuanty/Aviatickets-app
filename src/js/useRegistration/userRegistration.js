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

document.getElementById('register-form').addEventListener('submit', async (event) => {
   event.preventDefault();
   const username = document.getElementById('register-username').value;
   const password = document.getElementById('register-password').value;

   const response = await fetch('/auth/register', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ username, password })
   });
   const result = await response.json();
   document.getElementById('result').innerText = JSON.stringify(result);
});