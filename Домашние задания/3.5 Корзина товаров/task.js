const productsEl = document.querySelector('.products');
const cartProductsEl = document.querySelector('.cart__products');

function clampQuantity(value) {
  const n = Number.parseInt(String(value), 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return n;
}

function updateQuantity(productEl, delta) {
  const valueEl = productEl.querySelector('.product__quantity-value');
  const current = clampQuantity(valueEl.textContent);
  valueEl.textContent = String(clampQuantity(current + delta));
}

function addToCart(productEl) {
  const id = productEl.dataset.id;
  const imgEl = productEl.querySelector('.product__image');
  const quantityEl = productEl.querySelector('.product__quantity-value');
  const quantity = clampQuantity(quantityEl.textContent);

  const existing = cartProductsEl.querySelector(`.cart__product[data-id="${CSS.escape(id)}"]`);
  if (existing) {
    const countEl = existing.querySelector('.cart__product-count');
    const current = clampQuantity(countEl.textContent);
    countEl.textContent = String(current + quantity);
    return;
  }

  const cartProductEl = document.createElement('div');
  cartProductEl.className = 'cart__product';
  cartProductEl.dataset.id = id;

  const cartImgEl = document.createElement('img');
  cartImgEl.className = 'cart__product-image';
  cartImgEl.src = imgEl.getAttribute('src');

  const countEl = document.createElement('div');
  countEl.className = 'cart__product-count';
  countEl.textContent = String(quantity);

  cartProductEl.append(cartImgEl, countEl);
  cartProductsEl.appendChild(cartProductEl);
}

productsEl.addEventListener('click', (e) => {
  const target = e.target;
  if (!(target instanceof Element)) return;

  const productEl = target.closest('.product');
  if (!productEl) return;

  if (target.classList.contains('product__quantity-control_dec')) {
    updateQuantity(productEl, -1);
    return;
  }

  if (target.classList.contains('product__quantity-control_inc')) {
    updateQuantity(productEl, 1);
    return;
  }

  if (target.classList.contains('product__add')) {
    addToCart(productEl);
  }
});

