import {API_URI} from "./var";
import Swiper from "swiper";
import {cartControl} from "./cartControl";

export const renderRecommended = (recommended, data, id) => {
  const goods = data.goods.filter(item => item.id !== id);
  if (goods.length) {

    const container = document.createElement('div');
    container.className = 'container';
    recommended.append(container);

    const titleSection = document.createElement('h2');
    titleSection.className = 'recommended__title';
    titleSection.textContent = 'Возможно вам также понравится';

    const swiperBlock = document.createElement('div');
    swiperBlock.className = 'swiper recommended__carousel';

    container.append(titleSection, swiperBlock);

    const swiperWrapper = document.createElement('ul');
    swiperWrapper.className = 'swiper-wrapper';

    swiperBlock.append(swiperWrapper);

    const goodsCards = goods.map(item => {
      console.log(item)
      const swiperSlide = document.createElement('li');
      swiperSlide.className = 'swiper-slide';

      const itemCard = document.createElement('article');
      itemCard.className = 'goods-item';

      const itemLink = document.createElement('a');
      itemLink.className = 'goods-item-link';
      itemLink.href = `card.html?id=${item.id}`

      const itemImage = document.createElement('img');
      itemImage.className = 'goods-item__image';
      itemImage.src = `${API_URI}${item.images.present}`;
      itemImage.alt = item.title;

      const itemTitle = document.createElement('h3');
      itemTitle.className = 'goods-item__title';
      itemTitle.textContent = item.title;

      const itemBuy = document.createElement('div');
      itemBuy.className = 'goods-item__buy';

      const itemPrice = document.createElement('p');
      itemPrice.className = 'goods-item__price';
      itemPrice.textContent = new Intl.NumberFormat('ru-RU', {
        style: 'currency', currency: 'RUB', maximumFractionDigits: 0,
      }).format(item.price);

      const itemToCart = document.createElement('button');
      itemToCart.className = 'goods-item__to-cart';
      itemToCart.textContent = 'В корзину';
      itemToCart.dataset.idGoods = item.id;

      itemLink.append(itemImage, itemTitle);
      itemBuy.append(itemPrice, itemToCart);
      itemCard.append(itemLink, itemBuy);
      swiperSlide.append(itemCard);
      return swiperSlide;
    })

    swiperWrapper.append(...goodsCards);

    new Swiper(swiperBlock, {
      spaceBetween: 10,
      slidesPerView: 2,
      breakpoints: {
        521: {
          spaceBetween: 20,
          slidesPerView: 1,
        },
        620: {
          spaceBetween: 20,
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1600: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1920: {
          slidesPerView: 5,
        },
      }
    });

    cartControl({
      wrapper: swiperWrapper,
      classAdd: 'goods-item__to-cart',
      classDelete: 'goods-item__to-cart_remove',
    });

  } else {
    recommended.remove();
  }
};
