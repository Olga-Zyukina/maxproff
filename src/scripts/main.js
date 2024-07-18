// Calculator
const rangeInput = document.querySelector('input[type="range"]');
const periodValue = document.querySelector('.calc__period span');
const discountValue = document.querySelector('.calc__discount span');
function inputChange(e) {
  let target = e.target;
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min;
  const max = target.max;
  const val = target.value;
  let percentage = (val - min) * 100 / (max - min);
  let period = Math.round(val/1.4);
  let discount = Math.round(val*700).toLocaleString('ru-RU');
  target.style.backgroundSize = percentage + '% 100%';
  periodValue.textContent = period;
  discountValue.textContent = discount;
}
rangeInput.addEventListener('input', inputChange);
 
// Price
function imgChange(el, index) {
  el.classList.toggle("rotate");
  document.querySelectorAll('.price__list')[index].classList.toggle("price__part");
  document.querySelectorAll('.price__list p:nth-child(7)')[index].classList.toggle("price__blurred");
}
const colorItem = document.querySelectorAll('.price__list p:nth-child(7)');
const checkImg = document.querySelectorAll('.price__unwrap img');
// Изменение цвета каждого 7 элемента
colorItem.forEach((item) => item.classList.add("price__blurred"));
// Разворачивание полного списка работ
checkImg.forEach((item, index) => item.addEventListener('click', () => { imgChange(item, index) }))

// Portfolio
// Переключение между радиокнопками
function onClickInput(event) {
  var idInput = event.target.getAttribute('data-id');
  document.querySelectorAll('.portfolio__carousel.active').forEach(
    function( el ) {
      el.classList.remove('active');
    }
  );
  document.querySelector('.portfolio__carousel[data-id = "' + idInput + '"]').classList.toggle('active');
};
document.querySelectorAll(".portfolio__radio").forEach( 
  function( el ) {
    el.addEventListener("click", onClickInput);
  }
);
// Рамка на активном фото в галерее
const portfolioImg = document.querySelectorAll('.carousel__thumbnails img');
for (const img of portfolioImg) {
  img.addEventListener('click', function () {
    for (let img of portfolioImg) {
      img.classList.remove('carousel__active');
    }
    this.classList.add('carousel__active');
    let idImg = this.getAttribute('data-img');
    onClickImg(idImg);
  });
}
// Переключение галереи
function onClickImg(id) {
  document.querySelectorAll('.carousel__slides li').forEach(
    function( el ) {
      el.style.zIndex = "2";
    }
  );
  document.querySelector('.carousel__slides li[data-img = "' + id + '"]').style.zIndex = "3";
}
onClickImg('slide1');

// Cлайдер: Portfolio, Team
const prevButton = document.querySelectorAll('.prev-button');
const nextButton = document.querySelectorAll('.next-button');
let tabIndex = 0;
prevButton.forEach((item, index) => item.addEventListener('click', () => { showPreviousSlide(index) }));
nextButton.forEach((item, index) => item.addEventListener('click', () => { showNextSlide(index) }))
// Функция для показа предыдущего слайда
function showPreviousSlide(index) {
  if (index == 0) {
    let slider = document.querySelector('.portfolio__tabs');
    var tabs = Array.from(slider.querySelectorAll('.portfolio__tab > input'));
    tabIndex = document.querySelector('input[name="portfolio-tabs"]:checked').id - 1;
  } else if (index == 1) {
    let slider = document.querySelector('.team__carousel');
    var tabs = Array.from(slider.querySelectorAll('.team__slide'));
    var dots = Array.from(slider.querySelectorAll('ol li'));
  } else {
    let slider = document.querySelector('.professional__carousel');
    var tabs = Array.from(slider.querySelectorAll('.professional__slide'));
    var dots = Array.from(slider.querySelectorAll('ol li'));
  } 
  let tabCount = tabs.length;
  tabIndex = (tabIndex - 1 + tabCount) % tabCount;
  updateSlider(index, tabs, tabCount);
  if (index != 0) {
    updateDots(dots);
  }
}
// Функция для показа следующего слайда
function showNextSlide(index) {
  if (index == 0) {
    let slider = document.querySelector('.portfolio__tabs');
    var tabs = Array.from(slider.querySelectorAll('.portfolio__tab > input'));
    tabIndex = document.querySelector('input[name="portfolio-tabs"]:checked').id - 1;
  } else if (index == 1) {
    let slider = document.querySelector('.team__carousel');
    var tabs = Array.from(slider.querySelectorAll('.team__slide'));
    var dots = Array.from(slider.querySelectorAll('ol li'));
  } else {
    let slider = document.querySelector('.professional__carousel');
    var tabs = Array.from(slider.querySelectorAll('.professional__slide'));
    var dots = Array.from(slider.querySelectorAll('ol li'));
  }
  let tabCount = tabs.length;
  tabIndex = (tabIndex + 1) % tabCount;
  updateSlider(index, tabs, tabCount);
  if (index != 0) {
    updateDots(dots);
  }
}
// Функция для обновления отображения слайдера
function updateSlider(i, tabs, tabCount) {
  tabs.forEach((tab, index) => {
    if (i == 0) {
      if (index == tabIndex) {
        tab.checked = true;
      } else {
        tab.checked = false;
      }
    } else if (i == 1) {
      if (index == tabIndex) {
        tab.classList.add('team__active');
      } else {
        tab.classList.remove('team__active');
      }
    } else {
      tab.classList.remove('active');
      tab.classList.remove('next');
      tab.classList.remove('prev');
      if (index == tabIndex) {
        tab.classList.add('active');
      } else if (index == (tabIndex + 1) % tabCount) {
        tab.classList.add('next');
      } else if (index == (tabIndex - 1 + tabCount) % tabCount) {
        tab.classList.add('prev');
      }
    }
  });
}
function updateDots(dots) {
  dots.forEach((dot, index) => {
      if (index === tabIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
  });
}
// FAQ
// Аккордеон
const accordionButtons = document.querySelectorAll(".accordion button");
function toggleAccordion(item, index) {
  const buttonToggle = item.getAttribute('aria-expanded');
  const itemToggle = document.querySelectorAll(".accordion__item");
  for (let i = 0; i < accordionButtons.length; i++) {
    itemToggle[i].style.backgroundColor = "#fff";
    accordionButtons[i].setAttribute('aria-expanded', 'false');
  }
  if (buttonToggle == 'false') {
    itemToggle[index].style.backgroundColor = "#f2f2f2";
    item.setAttribute('aria-expanded', 'true');
  }
}
accordionButtons.forEach((item, index) => item.addEventListener('click', () => { toggleAccordion(item, index) }));

// Карусель для @media (min-width: 768px) and (max-width: 1199px) Promo, Price, Feedback
// const checkTablet = window.matchMedia("(min-width: 768px) and (max-width: 1199px)")
const checkTablet = window.matchMedia("(max-width: 1199px)");

function carouselTabletChange(e) {
  if (e.matches) {
    let priceDots = Array.from(document.querySelectorAll('.price ol li'));
    priceDots.forEach((item, index) => item.addEventListener('click', () => { showPriceSlide(item, index, 40) }));
    let promoDots = Array.from(document.querySelectorAll('.promo ol li'));
    promoDots.forEach((item, index) => item.addEventListener('click', () => { showPromoSlide(item, index, 40) }));
    let feedbackDots = Array.from(document.querySelectorAll('.feedback ol li'));
    feedbackDots.forEach((item, index) => item.addEventListener('click', () => { showFeedbackSlide(item, index, 10) }));
  }
}
function showPriceSlide(item, index, pos) {
  document.querySelector('.price .active').classList.remove('active');
  item.classList.add('active');
  let priceSlide = document.querySelectorAll('.price__item');
  for (let i = 0; i < priceSlide.length; i++) {
    let leftPos = String( i * pos - index * pos) + "%";
    priceSlide[i].style.left = leftPos;
  }
}
function showPromoSlide(item, index, pos) {
  document.querySelector('.promo .active').classList.remove('active');
  item.classList.add('active');
  let promoSlide = document.querySelectorAll('.promo__item');
  for (let i = 0; i < promoSlide.length; i++) {
    let leftPos = String( i * pos - index * pos) + "%";
    promoSlide[i].style.left = leftPos;
  }
}
function showFeedbackSlide(item, index, pos) {
  document.querySelector('.feedback .active').classList.remove('active');
  item.classList.add('active');
  let feedbackSlide = document.querySelectorAll('.feedback__item');
  for (let i = 0; i < feedbackSlide.length; i++) {
    let leftPos = String( (i * 100 + pos) - index * 100) + "%";
    feedbackSlide[i].style.left = leftPos;
  }
}
carouselTabletChange(checkTablet);
checkTablet.addEventListener("change", function() {
  carouselTabletChange(checkTablet);
});

// Всплывающее меню, карусель @media max-width: 767px
const checkMobile = window.matchMedia("(max-width: 767px)");
function carouselMobileChange(e) {
   if (e.matches) {
    let mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    let mobileNavClose = document.querySelector('.nav-close');
    let priceDots = Array.from(document.querySelectorAll('.price ol li'));
    let promoDots = Array.from(document.querySelectorAll('.promo ol li'));
    let feedbackDots = Array.from(document.querySelectorAll('.feedback ol li'));
    let blogDots = Array.from(document.querySelectorAll('.blog ol li'));
    mobileNavToggle.addEventListener('click', () => {
      document.querySelector('.header__wrapper').classList.toggle('header__wrapper-mobile')
    });
    mobileNavClose.addEventListener('click', () => {
      document.querySelector('.header__wrapper').classList.toggle('header__wrapper-mobile')
    });
    priceDots.forEach((item, index) => item.addEventListener('click', () => { showPriceSlide(item, index, 80) }));
    promoDots.forEach((item, index) => item.addEventListener('click', () => { showPromoSlide(item, index, 100) }));
    feedbackDots.forEach((item, index) => item.addEventListener('click', () => { showFeedbackSlide(item, index, 0) }));
    blogDots.forEach((item, index) => item.addEventListener('click', () => { showBlogSlide(item, index) }));
  }
}
function showBlogSlide(item, index) {
  document.querySelector('.blog .active').classList.remove('active');
  item.classList.add('active');
  let blogSlide = document.querySelectorAll('.blog__item');
  for (let i = 0; i < blogSlide.length; i++) {
    if (i == index) {
      blogSlide[i].style.opacity = "1";
    } else {
      blogSlide[i].style.opacity = "0";
    }
  }
}
carouselMobileChange(checkMobile);
checkMobile.addEventListener("change", function() {
  carouselMobileChange(checkMobile);
});