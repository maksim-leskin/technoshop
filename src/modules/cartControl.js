import {API_URI} from "./var";
import {serviceCounter} from "./counterControl";

const addToCart = (id, count = 1) => {
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

export const cartControl = ({wrapper, classAdd, classDelete, classCount} = {}) => {
  checkItems({classDelete, classAdd, classCount});

  if (wrapper && classAdd && classDelete) {
    wrapper.addEventListener('click', (e) => {
      const target = e.target;
      const id = target.dataset.idGoods;

      if (!id) return;

      if (target.closest(`.${classDelete}`)) {
        removeToCart(id);
      } else if (target.closest(`.${classAdd}`)) {
        addToCart(id);
      }

      checkItems({classDelete});

    })
  } else if (classAdd && classCount) {
    const btn = document.querySelector(`.${classAdd}`);
    const id = btn.dataset.idGoods;

    const countElem = document.querySelector(`.${classCount}`);

    btn.addEventListener('click', () => {
      const count = +countElem.value;

      addToCart(id, count);
      checkItems();
    })
  }
};

export const renderCart = (goods, cartGoods) => {
  const cartGoodsList = document.querySelector('.cart-goods__list');
  cartGoodsList.textContent = '';

  goods.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('cart-goods__item', 'item');

    const img = new Image(200, 200);
    img.className = "item__img";
    img.src = `${API_URI}${item.images.present}`;
    img.alt = item.title;

    const detail = document.createElement('div');
    detail.className = 'item__detail';

    const title = document.createElement('h4');
    title.className = 'item__title';
    title.textContent = item.title;

    const vendor = document.createElement('p');
    vendor.className = 'item__vendor-code';
    vendor.textContent = `Артикул: ${item.id}`

    const control = document.createElement('div');
    control.className = 'item__control';

    const count = document.createElement('div');
    count.className = 'item__count';
    count.dataset.idGoods = item.id;

    const dec = document.createElement('button');
    dec.className = 'item__btn item__btn_dec';
    dec.textContent = '–'

    const number = document.createElement('output');
    number.className = 'item__number';
    number.value = cartGoods[item.id];

    const inc = document.createElement('button');
    inc.className = 'item__btn item__btn_inc';
    inc.textContent = '+'

    count.append(dec, number, inc);

    const price = document.createElement('p');
    price.className = 'item__price';
    price.textContent = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(item.price);

    const remove = document.createElement('button');
    remove.className = 'item__remove-cart';
    remove.innerHTML = `
      <svg>
        <use href="#remove"></use>
      </svg>
    `;

    detail.append(title, vendor);
    control.append(count, price, remove)
    li.append(img, detail, control);


    cartGoodsList.append(li);

    serviceCounter({
      wrapper: count,
      number: number,
      selectorDec: '.item__btn_dec',
      selectorInc: '.item__btn_inc',
    });

    count.addEventListener('click', (e) => {
      const target = e.target;

      if (target.closest('.item__btn_dec, .item__btn_inc')) {
        addToCart(item.id, +number.value)
        checkItems();
      }
    });

    remove.addEventListener('click', () => {
      removeToCart(item.id);
      li.remove();
      checkItems();
    })
  })

}
