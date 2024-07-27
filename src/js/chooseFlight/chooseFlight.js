//import chooseFlight from "../../../flights.json";

export function chooseFlight() {
  document
    .getElementById("flight-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const to = document.getElementById("to").value;
      const date = document.getElementById("date").value;

      try {
        // Загрузка данных из JSON-файла
        const response = await fetch("flights.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const flights = await response.json();

        // Сохранение данных в переменную
        const results = flights.filter(
          (flight) => flight.to === to && flight.date === date
        );

        // Отображение результатов на странице
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";

        if (results.length > 0) {
          results.forEach((flight) => {
            const flightDiv = document.createElement("div");
            flightDiv.className = "flight-result";
            flightDiv.innerHTML = `
              <p>Номер рейсу: ${flight.flightNumber}</p>
              <p>Звідки: ${flight.from}</p>
              <p>Куди: ${flight.to}</p>
              <p>Дата: ${flight.date}</p>
              <p>Ціна: ${flight.price}</p>
          `;
            resultsDiv.appendChild(flightDiv);
          });
        } else {
          resultsDiv.innerHTML =
            "<p>Немає доступних рейсів за вибраними критеріями.</p>";
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    });
}

// Вызов функции choiseFlight
