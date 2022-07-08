export const serviceCounter = ({ selectorWrapper, selectorNumber, selectorDec, selectorInc }) => {
  const wrapCounter = document.querySelector(selectorWrapper);
  const numberElem = document.querySelector(selectorNumber);

  wrapCounter.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest(selectorDec)) {
      numberElem.value = +numberElem.value === 1 ? 1 : +numberElem.value - 1
    }

    if (target.closest(selectorInc)) {
      numberElem.value = +numberElem.value + 1;
    }
  })
}
