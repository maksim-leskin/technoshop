import './index.html';
import './card.html';
import './cart.html';
import './index.scss';

import Swiper, {Thumbs, Scrollbar} from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';

const thumbSwiper = new Swiper('.card__slider-thumb', {
  spaceBetween: 44,
  slidesPerView: 3,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  modules: [Scrollbar]
});

new Swiper('.card__image', {
  spaceBetween: 10,
  slidesPerView: 1,
  thumbs: {
    swiper: thumbSwiper,
    slideThumbActiveClass: 'card__thumb-btn_active',
  },
  modules: [Thumbs]
});

new Swiper('.recommended__carousel', {
  spaceBetween: 30,
  slidesPerView: 5,
});
