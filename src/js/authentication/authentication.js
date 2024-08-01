export function authentication() {
  document
    .getElementById("login-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      console.log(result);
      document.getElementById("result").innerText = JSON.stringify(result);

      // Сохраняем токен в localStorage
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", username);
        window.location.href = "/";
      }
    });

  document.getElementById("check-auth").addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("/auth/protected", {
      headers: { Authorization: token },
    });
    const result = await response.json();
    document.getElementById("result").innerText = JSON.stringify(result);
  });
}
authentication();
