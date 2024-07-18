"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// Calculator
var rangeInput = document.querySelector('input[type="range"]');
var periodValue = document.querySelector('.calc__period span');
var discountValue = document.querySelector('.calc__discount span');
function inputChange(e) {
  var target = e.target;
  if (e.target.type !== 'range') {
    target = document.getElementById('range');
  }
  var min = target.min;
  var max = target.max;
  var val = target.value;
  var percentage = (val - min) * 100 / (max - min);
  var period = Math.round(val / 1.4);
  var discount = Math.round(val * 700).toLocaleString('ru-RU');
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
var colorItem = document.querySelectorAll('.price__list p:nth-child(7)');
var checkImg = document.querySelectorAll('.price__unwrap img');
// Изменение цвета каждого 7 элемента
colorItem.forEach(function (item) {
  return item.classList.add("price__blurred");
});
// Разворачивание полного списка работ
checkImg.forEach(function (item, index) {
  return item.addEventListener('click', function () {
    imgChange(item, index);
  });
});

// Portfolio
// Переключение между радиокнопками
function onClickInput(event) {
  var idInput = event.target.getAttribute('data-id');
  document.querySelectorAll('.portfolio__carousel.active').forEach(function (el) {
    el.classList.remove('active');
  });
  document.querySelector('.portfolio__carousel[data-id = "' + idInput + '"]').classList.toggle('active');
}
;
document.querySelectorAll(".portfolio__radio").forEach(function (el) {
  el.addEventListener("click", onClickInput);
});
// Рамка на активном фото в галерее
var portfolioImg = document.querySelectorAll('.carousel__thumbnails img');
var _iterator = _createForOfIteratorHelper(portfolioImg),
  _step;
try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var img = _step.value;
    img.addEventListener('click', function () {
      var _iterator2 = _createForOfIteratorHelper(portfolioImg),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _img = _step2.value;
          _img.classList.remove('carousel__active');
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      this.classList.add('carousel__active');
      var idImg = this.getAttribute('data-img');
      onClickImg(idImg);
    });
  }
  // Переключение галереи
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
function onClickImg(id) {
  document.querySelectorAll('.carousel__slides li').forEach(function (el) {
    el.style.zIndex = "2";
  });
  document.querySelector('.carousel__slides li[data-img = "' + id + '"]').style.zIndex = "3";
}
onClickImg('slide1');

// Cлайдер: Portfolio, Team
var prevButton = document.querySelectorAll('.prev-button');
var nextButton = document.querySelectorAll('.next-button');
var tabIndex = 0;
prevButton.forEach(function (item, index) {
  return item.addEventListener('click', function () {
    showPreviousSlide(index);
  });
});
nextButton.forEach(function (item, index) {
  return item.addEventListener('click', function () {
    showNextSlide(index);
  });
});
// Функция для показа предыдущего слайда
function showPreviousSlide(index) {
  if (index == 0) {
    var slider = document.querySelector('.portfolio__tabs');
    var tabs = Array.from(slider.querySelectorAll('.portfolio__tab > input'));
    tabIndex = document.querySelector('input[name="portfolio-tabs"]:checked').id - 1;
  } else if (index == 1) {
    var _slider = document.querySelector('.team__carousel');
    var tabs = Array.from(_slider.querySelectorAll('.team__slide'));
    var dots = Array.from(_slider.querySelectorAll('ol li'));
  } else {
    var _slider2 = document.querySelector('.professional__carousel');
    var tabs = Array.from(_slider2.querySelectorAll('.professional__slide'));
    var dots = Array.from(_slider2.querySelectorAll('ol li'));
  }
  var tabCount = tabs.length;
  tabIndex = (tabIndex - 1 + tabCount) % tabCount;
  updateSlider(index, tabs, tabCount);
  if (index != 0) {
    updateDots(dots);
  }
}
// Функция для показа следующего слайда
function showNextSlide(index) {
  if (index == 0) {
    var slider = document.querySelector('.portfolio__tabs');
    var tabs = Array.from(slider.querySelectorAll('.portfolio__tab > input'));
    tabIndex = document.querySelector('input[name="portfolio-tabs"]:checked').id - 1;
  } else if (index == 1) {
    var _slider3 = document.querySelector('.team__carousel');
    var tabs = Array.from(_slider3.querySelectorAll('.team__slide'));
    var dots = Array.from(_slider3.querySelectorAll('ol li'));
  } else {
    var _slider4 = document.querySelector('.professional__carousel');
    var tabs = Array.from(_slider4.querySelectorAll('.professional__slide'));
    var dots = Array.from(_slider4.querySelectorAll('ol li'));
  }
  var tabCount = tabs.length;
  tabIndex = (tabIndex + 1) % tabCount;
  updateSlider(index, tabs, tabCount);
  if (index != 0) {
    updateDots(dots);
  }
}
// Функция для обновления отображения слайдера
function updateSlider(i, tabs, tabCount) {
  tabs.forEach(function (tab, index) {
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
  dots.forEach(function (dot, index) {
    if (index === tabIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}
// FAQ
// Аккордеон
var accordionButtons = document.querySelectorAll(".accordion button");
function toggleAccordion(item, index) {
  var buttonToggle = item.getAttribute('aria-expanded');
  var itemToggle = document.querySelectorAll(".accordion__item");
  for (var i = 0; i < accordionButtons.length; i++) {
    itemToggle[i].style.backgroundColor = "#fff";
    accordionButtons[i].setAttribute('aria-expanded', 'false');
  }
  if (buttonToggle == 'false') {
    itemToggle[index].style.backgroundColor = "#f2f2f2";
    item.setAttribute('aria-expanded', 'true');
  }
}
accordionButtons.forEach(function (item, index) {
  return item.addEventListener('click', function () {
    toggleAccordion(item, index);
  });
});

// Карусель для @media (min-width: 768px) and (max-width: 1199px) Promo, Price, Feedback
// const checkTablet = window.matchMedia("(min-width: 768px) and (max-width: 1199px)")
var checkTablet = window.matchMedia("(max-width: 1199px)");
function carouselTabletChange(e) {
  if (e.matches) {
    var priceDots = Array.from(document.querySelectorAll('.price ol li'));
    priceDots.forEach(function (item, index) {
      return item.addEventListener('click', function () {
        showPriceSlide(item, index, 40);
      });
    });
    var promoDots = Array.from(document.querySelectorAll('.promo ol li'));
    promoDots.forEach(function (item, index) {
      return item.addEventListener('click', function () {
        showPromoSlide(item, index, 40);
      });
    });
    var feedbackDots = Array.from(document.querySelectorAll('.feedback ol li'));
    feedbackDots.forEach(function (item, index) {
      return item.addEventListener('click', function () {
        showFeedbackSlide(item, index, 10);
      });
    });
  }
}
function showPriceSlide(item, index, pos) {
  document.querySelector('.price .active').classList.remove('active');
  item.classList.add('active');
  var priceSlide = document.querySelectorAll('.price__item');
  for (var i = 0; i < priceSlide.length; i++) {
    var leftPos = String(i * pos - index * pos) + "%";
    priceSlide[i].style.left = leftPos;
  }
}
function showPromoSlide(item, index, pos) {
  document.querySelector('.promo .active').classList.remove('active');
  item.classList.add('active');
  var promoSlide = document.querySelectorAll('.promo__item');
  for (var i = 0; i < promoSlide.length; i++) {
    var leftPos = String(i * pos - index * pos) + "%";
    promoSlide[i].style.left = leftPos;
  }
}
function showFeedbackSlide(item, index, pos) {
  document.querySelector('.feedback .active').classList.remove('active');
  item.classList.add('active');
  var feedbackSlide = document.querySelectorAll('.feedback__item');
  for (var i = 0; i < feedbackSlide.length; i++) {
    var leftPos = String(i * 100 + pos - index * 100) + "%";
    feedbackSlide[i].style.left = leftPos;
  }
}
carouselTabletChange(checkTablet);
checkTablet.addEventListener("change", function () {
  carouselTabletChange(checkTablet);
});

// Всплывающее меню, карусель @media max-width: 767px
var checkMobile = window.matchMedia("(max-width: 767px)");
function carouselMobileChange(e) {
  if (e.matches) {
    var mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    var mobileNavClose = document.querySelector('.nav-close');
    var priceDots = Array.from(document.querySelectorAll('.price ol li'));
    var promoDots = Array.from(document.querySelectorAll('.promo ol li'));
    var feedbackDots = Array.from(document.querySelectorAll('.feedback ol li'));
    var blogDots = Array.from(document.querySelectorAll('.blog ol li'));
    mobileNavToggle.addEventListener('click', function () {
      document.querySelector('.header__wrapper').classList.toggle('header__wrapper-mobile');
    });
    mobileNavClose.addEventListener('click', function () {
      document.querySelector('.header__wrapper').classList.toggle('header__wrapper-mobile');
    });
    priceDots.forEach(function (item, index) {
      return item.addEventListener('click', function () {
        showPriceSlide(item, index, 80);
      });
    });
    promoDots.forEach(function (item, index) {
      return item.addEventListener('click', function () {
        showPromoSlide(item, index, 100);
      });
    });
    feedbackDots.forEach(function (item, index) {
      return item.addEventListener('click', function () {
        showFeedbackSlide(item, index, 0);
      });
    });
    blogDots.forEach(function (item, index) {
      return item.addEventListener('click', function () {
        showBlogSlide(item, index);
      });
    });
  }
}
function showBlogSlide(item, index) {
  document.querySelector('.blog .active').classList.remove('active');
  item.classList.add('active');
  var blogSlide = document.querySelectorAll('.blog__item');
  for (var i = 0; i < blogSlide.length; i++) {
    if (i == index) {
      blogSlide[i].style.opacity = "1";
    } else {
      blogSlide[i].style.opacity = "0";
    }
  }
}
carouselMobileChange(checkMobile);
checkMobile.addEventListener("change", function () {
  carouselMobileChange(checkMobile);
});