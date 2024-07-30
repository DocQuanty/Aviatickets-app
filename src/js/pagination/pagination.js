const data = [...Array(100).keys()]; // Пример массива данных
const itemsPerPage = 10;
let currentPage = 1;

function renderPage(page) {
  const container = document.getElementById('data-container');
  container.innerHTML = '';

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = data.slice(start, end);

  pageData.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `Item ${item}`;
    container.appendChild(div);
  });
}

function updateButtons() {
  document.getElementById('prev-btn').disabled = currentPage === 1;
  document.getElementById('next-btn').disabled = currentPage * itemsPerPage >= data.length;
}

document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
    updateButtons();
  }
});

document.getElementById('next-btn').addEventListener('click', () => {
  if (currentPage * itemsPerPage < data.length) {
    currentPage++;
    renderPage(currentPage);
    updateButtons();
  }
});

// Инициализация
renderPage(currentPage);
updateButtons();
