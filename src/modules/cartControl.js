const addToToCart = (id, count = 1) => {
  const cartGoods = localStorage.getItem('cart-ts') ?
    JSON.parse(localStorage.getItem('cart-ts')) :
    {};

  cartGoods[id] = count;

  localStorage.setItem('cart-ts', JSON.stringify(cartGoods))
};

const removeToCart = (id) => {
  const cartGoods = localStorage.getItem('cart-ts') ?
    JSON.parse(localStorage.getItem('cart-ts')) :
    {};

  delete cartGoods[id];

  localStorage.setItem('cart-ts', JSON.stringify(cartGoods))
};

const checkItems = ({classDelete, classAdd, classCount} = {}) => {
  const cartGoods = localStorage.getItem('cart-ts') ?
    JSON.parse(localStorage.getItem('cart-ts')) :
    {};

  let count = 0;

  for (const cartGoodsKey in cartGoods) {
    count += cartGoods[cartGoodsKey];
  }

  const cartElem = document.querySelector('.header__cart');
  cartElem.dataset.count = count;

  if (classDelete) {
    const elems = document.querySelectorAll('[data-id-goods]');

    elems.forEach(elem => {
      if (cartGoods[elem.dataset.idGoods]) {
        elem.classList.add(classDelete);
        elem.textContent = 'В корзине';
      } else {
        elem.classList.remove(classDelete);
        elem.textContent = 'В корзину';
      }
    })
  }

  if (classAdd && classCount) {
    const countElem = document.querySelector(`.${classCount}`);
    const addElem = document.querySelector(`.${classAdd}`);
    countElem.value = cartGoods[addElem.dataset.idGoods] || 1;

  }
};

export const cartControl = ({wrapper, classAdd, classDelete, classCount}) => {
  checkItems({classDelete, classAdd, classCount});

  if (wrapper) {
    wrapper.addEventListener('click', (e) => {
      const target = e.target;
      const id = target.dataset.idGoods;

      if (!id) return;

      if (target.closest(`.${classDelete}`)) {
        removeToCart(id);
      } else if (target.closest(`.${classAdd}`)) {
        addToToCart(id);
      }

      checkItems({classDelete});

    })
  } else {
    const btn = document.querySelector(`.${classAdd}`);
    const id = btn.dataset.idGoods;

    const countElem = document.querySelector(`.${classCount}`);

    btn.addEventListener('click', () => {
      const count = +countElem.value;

      addToToCart(id, count);
      checkItems();
    })
  }
}
