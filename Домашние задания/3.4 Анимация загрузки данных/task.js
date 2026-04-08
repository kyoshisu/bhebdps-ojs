const loaderEl = document.getElementById('loader');
const itemsEl = document.getElementById('items');

function setLoading(isLoading) {
  if (!loaderEl) return;
  loaderEl.classList.toggle('loader_active', isLoading);
}

function renderCourses(valute) {
  if (!itemsEl) return;
  itemsEl.innerHTML = '';

  Object.values(valute).forEach((v) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'item';

    const codeEl = document.createElement('div');
    codeEl.className = 'item__code';
    codeEl.textContent = v.CharCode;

    const valueEl = document.createElement('div');
    valueEl.className = 'item__value';
    valueEl.textContent = String(v.Value);

    const currencyEl = document.createElement('div');
    currencyEl.className = 'item__currency';
    currencyEl.textContent = 'руб.';

    itemEl.append(codeEl, valueEl, currencyEl);
    itemsEl.appendChild(itemEl);
  });
}

function loadCourses() {
  setLoading(true);

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
  xhr.responseType = 'json';

  xhr.addEventListener('load', () => {
    try {
      const data = xhr.response ?? JSON.parse(xhr.responseText);
      renderCourses(data.response.Valute);
    } finally {
      setLoading(false);
    }
  });

  xhr.addEventListener('error', () => {
    setLoading(false);
  });

  xhr.send();
}

loadCourses();

