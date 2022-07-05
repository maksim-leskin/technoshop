import './index.html';
import './card.html';
import './cart.html';
import './index.scss';

import Swiper, {Thumbs, Scrollbar} from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import {pagination} from "./modules/pagination";

const paginationWrapper = document.querySelector('.pagination');

const pageURL = new URL(location);
const page = +pageURL.searchParams.get('page') || 1;

let isMobile = false;

const startPagination = () => {
  if (window.innerWidth <= 560) {
    pagination(paginationWrapper, 12, page, 4);
    isMobile = true;
  } else {
    pagination(paginationWrapper, 12, page, 6);
    isMobile = false;
  }
}

try {
  startPagination();

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 560 && !isMobile) {
      pagination(paginationWrapper, 12, page, 4);
      isMobile = true;
    }

    if (window.innerWidth > 560 && isMobile)  {
      pagination(paginationWrapper, 12, page, 6);
      isMobile = false;
    }
  })

} catch (e) {
  console.warn(e)
  console.warn('Это не главная страница')
}

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
