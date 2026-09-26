/* ============================================================
   Детская клиника «Колибри» — общий скрипт сайта:
   шапка и подвал, меню, слайдер, карточки врачей/услуг/цен,
   форма записи, подгрузка фото.
   ============================================================ */
(function () {
  'use strict';
  var C = window.CLINIC;

  /* ---------- Иконки ---------- */
  var I = {
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.8 2z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.3-2.9c-.2-.4.3-.4.8-1.4.1-.2 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.5 11.5 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.5-.3z"/></svg>',
    tg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.6 18.7 19.7c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.2 13.3l-4.8-1.5c-1-.3-1.1-1 .2-1.5L20.4 3c.9-.3 1.6.2 1.5 1.6z"/></svg>',
    vk: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.2 18.5c-6.8 0-10.7-4.7-10.9-12.4h3.4c.1 5.7 2.6 8.1 4.6 8.6V6.1h3.2v4.9c2-.2 4.1-2.4 4.8-4.9h3.2a9.4 9.4 0 0 1-4.3 6.1 9.8 9.8 0 0 1 5 6.3h-3.5a6.1 6.1 0 0 0-4.9-4.5v4.5h-.6z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></svg>',
    chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>',
    chevD: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>',
    wave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/></svg>'
  };
  window.ICONS = I;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function money(n) { return n.toLocaleString('ru-RU') + ' ₽'; }
  function years(n) { var m = n % 10, d = n % 100; if (d >= 11 && d <= 14) return n + ' лет'; if (m === 1) return n + ' год'; if (m >= 2 && m <= 4) return n + ' года'; return n + ' лет'; }
  function photo(key, cls, alt) { return '<div class="ph ' + (cls || '') + '"><img data-photo="' + key + '" alt="' + esc(alt || '') + '"></div>'; }
  window.photoTag = photo;

  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  /* ---------- Шапка ---------- */
  var NAV = [
    { t: 'Врачи', h: 'vrachi.html' },
    { t: 'Услуги', h: 'uslugi.html', drop: window.DIRECTIONS.map(function (d) { return { t: d.title, h: 'uslugi.html#' + d.id }; }).concat([{ t: 'Все услуги', h: 'uslugi.html', all: true }]) },
    { t: 'УЗИ', h: 'uzi.html' },
    { t: 'Программы и цены', h: 'ceny.html' },
    { t: 'О клинике', h: 'o-klinike.html' },
    { t: 'Полезное', h: 'poleznoe.html' },
    { t: 'Контакты', h: 'kontakty.html' }
  ];

  function renderHeader() {
    var items = NAV.map(function (n) {
      var active = page === n.h ? ' is-active' : '';
      var drop = '';
      if (n.drop) {
        drop = '<div class="nav__drop">' + n.drop.map(function (d) { return '<a href="' + d.h + '"' + (d.all ? ' class="all"' : '') + '>' + esc(d.t) + '</a>'; }).join('') + '</div>';
      }
      return '<li class="nav__item' + active + '"><a class="nav__link" href="' + n.h + '"' + (n.drop ? ' data-drop' : '') + '>' + esc(n.t) + (n.drop ? I.chevD : '') + '</a>' + drop + '</li>';
    }).join('');
    return '<header class="header"><div class="container">' +
      '<div class="header__top">' +
      '<a class="header__logo" href="index.html"><img src="img/logo-full.png" alt="' + esc(C.name) + '"></a>' +
      '<div class="header__place">' + I.pin + '<span>' + esc(C.addressShort) + '</span></div>' +
      '<a class="header__phone" href="' + C.phoneHref + '">' + esc(C.phone) + '<small>Запись по телефону и в мессенджерах</small></a>' +
      '<a class="btn btn--primary btn--book" href="#" data-book>Записаться</a>' +
      '<button class="header__burger" type="button" aria-label="Меню">' + I.menu + '</button>' +
      '</div>' +
      '<nav class="nav"><ul class="nav__list">' + items + '</ul></nav>' +
      '</div></header>';
  }

  /* ---------- Подвал ---------- */
  function renderFooter() {
    var hours = C.hours.map(function (h) { return '<div><span>' + h[0] + '</span><span>' + h[1] + '</span></div>'; }).join('');
    return '<footer class="footer"><div class="container">' +
      '<div class="footer__grid">' +
      '<div><a class="footer__logo" href="index.html"><img src="img/logo-full.png" alt="' + esc(C.name) + '"></a>' +
      '<p>Детская клиника в Симферопольском районе: педиатрия и неонатология, сопровождение недоношенных детей, УЗИ экспертного класса пациентам от 0 до 99 лет, вакцинация с рождения.</p>' +
      '<div class="footer__social"><a href="' + C.whatsapp + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + I.chat + '</a><a href="' + C.telegram + '" target="_blank" rel="noopener" aria-label="Telegram">' + I.tg + '</a><a href="#" aria-label="ВКонтакте">' + I.vk + '</a></div></div>' +
      '<div><h4>Пациентам</h4><ul><li><a href="vrachi.html">Врачи</a></li><li><a href="uslugi.html">Услуги</a></li><li><a href="uzi.html">УЗИ-диагностика</a></li><li><a href="ceny.html">Программы и цены</a></li><li><a href="poleznoe.html">Полезное</a></li></ul></div>' +
      '<div><h4>Клиника</h4><ul><li><a href="o-klinike.html">О клинике</a></li><li><a href="index.html#reviews">Отзывы</a></li><li><a href="o-klinike.html#docs">Документы и лицензии</a></li><li><a href="kontakty.html">Контакты</a></li></ul></div>' +
      '<div><h4>Контакты</h4><p>' + esc(C.addressFull) + '</p><p><a href="' + C.phoneHref + '"><b>' + esc(C.phone) + '</b></a><br><a href="mailto:' + C.email + '">' + C.email + '</a></p><div class="hours">' + hours + '</div></div>' +
      '</div>' +
      '<div class="footer__warn">ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ. НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА</div>' +
      '<div class="footer__bottom"><span>© 2026 ' + esc(C.name) + '. Информация на сайте не является публичной офертой.</span><span><a href="app-concept.html" style="margin-right:16px">Концепция мобильного приложения</a>' + esc(C.site) + '</span></div>' +
      '</div></footer>' +
      '<div class="float"><a class="float__chat" href="' + C.whatsapp + '" target="_blank" rel="noopener" aria-label="Написать в WhatsApp">' + I.chat + '</a><a class="float__phone" href="' + C.phoneHref + '" aria-label="Позвонить">' + I.phone + '</a></div>';
  }

  /* ---------- Модальные окна ---------- */
  function renderModals() {
    var opts = window.DOCTORS.map(function (d) { return '<option value="' + d.id + '">' + esc(d.name) + ' — ' + esc(d.spec[0]) + '</option>'; }).join('');
    return '<div class="modal" id="modal-book"><div class="modal__box">' +
      '<button class="modal__close" type="button" data-close aria-label="Закрыть">' + I.close + '</button>' +
      '<h2 style="font-size:26px">Записаться на приём</h2><p class="muted" style="font-size:15px">Оставьте контакты — администратор перезвонит, подберёт врача и удобное время.</p>' +
      '<form class="form" id="form-book">' +
      '<label>Ваше имя<input name="name" required placeholder="Как к вам обращаться"></label>' +
      '<label>Телефон<input name="phone" type="tel" required placeholder="+7 (___) ___-__-__"></label>' +
      '<label>Врач или услуга<select name="doctor"><option value="">Подобрать врача</option>' + opts + '</select></label>' +
      '<label>Комментарий<textarea name="comment" rows="3" placeholder="Возраст ребёнка, что беспокоит, удобное время"></textarea></label>' +
      '<button class="btn btn--primary btn--block" type="submit">Отправить заявку</button>' +
      '<small>Нажимая кнопку, вы соглашаетесь с <a href="#">политикой обработки персональных данных</a>.</small>' +
      '</form></div></div>' +
      '<div class="modal" id="modal-doctor"><div class="modal__box modal__box--wide"><button class="modal__close" type="button" data-close aria-label="Закрыть">' + I.close + '</button><div id="doctor-body"></div></div></div>';
  }

  function openModal(id) { document.getElementById(id).classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function closeModals() { document.querySelectorAll('.modal.is-open').forEach(function (m) { m.classList.remove('is-open'); }); document.body.style.overflow = ''; }

  function openBooking(doctorId) {
    var f = document.getElementById('form-book');
    f.style.display = '';
    var ok = f.parentNode.querySelector('.form__ok'); if (ok) ok.remove();
    if (doctorId) f.doctor.value = doctorId;
    openModal('modal-book');
  }
  window.openBooking = openBooking;

  function openDoctor(id) {
    var d = window.DOCTORS.filter(function (x) { return x.id === id; })[0];
    if (!d) return;
    var meta = [];
    if (d.category) meta.push('<span class="tag">' + esc(d.category) + '</span>');
    if (d.exp) meta.push('<span class="tag">Стаж ' + years(d.exp) + '</span>');
    document.getElementById('doctor-body').innerHTML = '<div class="doc-modal">' + photo(d.photo, 'ph--portrait', d.name) +
      '<div><h2>' + esc(d.name) + '</h2><div class="doc-modal__spec">' + d.spec.map(esc).join(' · ') + '</div>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">' + meta.join('') + '</div>' +
      '<div class="doc-modal__text">' + d.text.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' +
      '<a href="#" class="btn btn--primary" data-book="' + d.id + '">Записаться к врачу</a></div></div>';
    loadPhotos(document.getElementById('doctor-body'));
    openModal('modal-doctor');
  }
  window.openDoctor = openDoctor;

  /* ---------- Карточки ---------- */
  function doctorCard(d) {
    return '<div class="doctor">' + photo(d.photo, 'ph--round doctor__photo', d.name).replace('class="ph ', 'data-doctor="' + d.id + '" class="ph ') +
      '<h3>' + esc(d.name) + '</h3>' +
      (d.exp ? '<span class="tag doctor__exp">Стаж ' + years(d.exp) + '</span>' : (d.category ? '<span class="tag doctor__exp">' + esc(d.category) + '</span>' : '<span class="tag doctor__exp">Приём детей с рождения</span>')) +
      '<div class="doctor__spec">' + d.spec.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('') + '</div>' +
      '<div class="doctor__actions"><a href="#" class="btn btn--primary btn--sm" data-book="' + d.id + '">Записаться</a><a href="#" class="btn btn--outline btn--sm" data-doctor="' + d.id + '">Подробнее</a></div></div>';
  }
  function renderDoctors(el) {
    var limit = parseInt(el.dataset.limit || '0', 10);
    var ids = (el.dataset.ids || '').split(',').filter(Boolean);
    var list = ids.length ? window.DOCTORS.filter(function (d) { return ids.indexOf(d.id) >= 0; }) : window.DOCTORS;
    if (limit) list = list.slice(0, limit);
    el.innerHTML = list.map(doctorCard).join('');
  }

  function renderPackages(el) {
    var only = el.dataset.featured === '1';
    var list = only ? window.PACKAGES.filter(function (p) { return p.featured; }).concat(window.PACKAGES.filter(function (p) { return !p.featured; }).slice(0, 2)) : window.PACKAGES;
    el.innerHTML = list.map(function (p) {
      return '<div class="package' + (p.featured ? ' package--featured' : '') + '"><div><div class="package__name">' + esc(p.name) + '</div>' + (p.note ? '<div class="package__note">' + esc(p.note) + '</div>' : '') + '</div><div class="package__price">' + money(p.price) + '</div></div>';
    }).join('');
  }

  function renderPriceTable(el) {
    el.innerHTML = '<table class="price-table"><thead><tr><th>Услуга</th><th>Стоимость</th></tr></thead><tbody>' +
      window.PACKAGES.map(function (p) { return '<tr><td>' + esc(p.name) + (p.note ? '<div class="muted" style="font-size:14px">' + esc(p.note) + '</div>' : '') + '</td><td>' + money(p.price) + '</td></tr>'; }).join('') +
      '</tbody></table>';
  }

  function renderNews(el) {
    var limit = parseInt(el.dataset.limit || '0', 10);
    var list = limit ? window.ARTICLES.slice(0, limit) : window.ARTICLES;
    el.innerHTML = list.map(function (a) {
      return '<a class="news-card" href="poleznoe.html#' + a.id + '">' + photo(a.photo, '', a.title) + '<div class="news-card__body"><div class="news-card__meta">' + a.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '<span>' + a.date + '</span></div><h3>' + esc(a.title) + '</h3></div></a>';
    }).join('');
  }

  function renderArticles(el) {
    el.innerHTML = window.ARTICLES.map(function (a) {
      return '<article class="article" id="' + a.id + '">' + photo(a.photo, '', a.title) + '<div><div class="news-card__meta">' + a.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '<span>' + a.date + '</span></div><h2>' + esc(a.title) + '</h2>' + a.text.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '<a href="#" class="btn btn--primary btn--sm" data-book>Записаться на приём</a></div></article>';
    }).join('');
  }

  function renderReviews(el) {
    el.innerHTML = '<div class="review review--cta"><div><h3>Для нас важно ваше мнение!</h3><p>Расскажите, как прошёл визит в «Колибри» — это помогает нам становиться лучше.</p></div><a href="#" class="btn btn--light" data-review>Оставить отзыв</a></div>' +
      window.REVIEWS.map(function (r) {
        return '<div class="review"><div class="review__head"><h3>' + esc(r.name) + '</h3><span class="review__date">' + r.date + '</span></div><div class="review__stars">' + '★★★★★'.slice(0, r.stars) + '</div><p>' + esc(r.text) + '</p><div class="review__doctor">Врач: ' + esc(r.doctor) + '</div></div>';
      }).join('');
  }

  function renderUzi(el) {
    el.innerHTML = window.UZI.map(function (u) {
      return '<div class="uzi-item"><div class="uzi-item__icon">' + I.wave + '</div><div><h3>' + esc(u.title) + '</h3><p>' + esc(u.text) + '</p></div></div>';
    }).join('');
  }

  function renderDirections(el) {
    var byId = {}; window.DOCTORS.forEach(function (d) { byId[d.id] = d; });
    el.innerHTML = window.DIRECTIONS.map(function (d) {
      var docs = d.doctors.map(function (id) { return byId[id] ? '<a href="#" data-doctor="' + id + '">' + esc(byId[id].name) + '</a>' : ''; }).filter(Boolean).join(', ');
      return '<div class="dir" id="' + d.id + '"><div><h3>' + esc(d.title) + '</h3><p>' + esc(d.short) + '</p><ul>' + d.list.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul>' +
        (docs ? '<div class="dir__doctors">Специалисты: ' + docs + '</div>' : '<div class="dir__doctors">Специалист ведёт приём по записи</div>') +
        '<div style="display:flex;gap:8px;flex-wrap:wrap"><a href="#" class="btn btn--primary btn--sm" data-book>Записаться</a>' + (d.link ? '<a href="' + d.link + '" class="btn btn--outline btn--sm">Подробнее</a>' : '') + '</div></div>' +
        photo(d.photo, '', d.title) + '</div>';
    }).join('');
  }

  function renderDirectionsNav(el) {
    el.innerHTML = window.DIRECTIONS.map(function (d) { return '<a class="tag" href="uslugi.html#' + d.id + '">' + esc(d.title) + '</a>'; }).join(' ');
  }

  function renderHours(el) {
    el.innerHTML = C.hours.map(function (h) { return '<div><span>' + h[0] + '</span><span>' + h[1] + '</span></div>'; }).join('');
  }

  function renderMap(el) {
    var ll = C.lon + '%2C' + C.lat;
    el.innerHTML = '<iframe src="https://yandex.ru/map-widget/v1/?ll=' + ll + '&z=16&pt=' + ll + '%2Cpm2vvl&l=map" title="Карта: ' + esc(C.addressShort) + '" allowfullscreen loading="lazy"></iframe>';
  }

  var RENDER = { doctors: renderDoctors, packages: renderPackages, pricetable: renderPriceTable, news: renderNews, articles: renderArticles, reviews: renderReviews, uzi: renderUzi, directions: renderDirections, dirnav: renderDirectionsNav, hours: renderHours, map: renderMap };

  /* ---------- Фото: локальный файл → генератор ---------- */
  var queue = [], active = 0, MAX = 2;
  function next() {
    while (active < MAX && queue.length) {
      var img = queue.shift(); active++;
      (function (img) {
        var tries = parseInt(img.dataset.tries || '0', 10);
        img.onload = function () { active--; img.classList.add('is-loaded'); next(); };
        img.onerror = function () {
          active--;
          if (tries < 4) { img.dataset.tries = tries + 1; setTimeout(function () { queue.push(img); next(); }, 8000 * (tries + 1)); }
          next();
        };
        img.src = window.photoUrl(img.dataset.photo);
      })(img);
    }
  }
  function loadPhotos(root) {
    (root || document).querySelectorAll('img[data-photo]:not([data-init])').forEach(function (img) {
      img.dataset.init = '1';
      img.loading = 'lazy';
      var key = img.dataset.photo;
      img.onload = function () { img.classList.add('is-loaded'); };
      img.onerror = function () { queue.push(img); next(); };
      img.src = 'img/photos/' + key + '.jpg';
    });
  }
  window.loadPhotos = loadPhotos;

  /* ---------- Слайдер ---------- */
  function initSlider(root) {
    var slides = root.querySelectorAll('.slide'), i = 0, timer;
    if (!slides.length) return;
    var dots = document.createElement('div'); dots.className = 'slider__dots';
    slides.forEach(function (_, n) { var b = document.createElement('button'); b.className = 'slider__dot'; b.type = 'button'; b.setAttribute('aria-label', 'Слайд ' + (n + 1)); b.onclick = function () { go(n); }; dots.appendChild(b); });
    root.appendChild(dots);
    var prev = document.createElement('button'); prev.className = 'slider__arrow slider__arrow--prev'; prev.type = 'button'; prev.innerHTML = I.chevL; prev.setAttribute('aria-label', 'Назад'); prev.onclick = function () { go(i - 1); };
    var nxt = document.createElement('button'); nxt.className = 'slider__arrow slider__arrow--next'; nxt.type = 'button'; nxt.innerHTML = I.chevR; nxt.setAttribute('aria-label', 'Вперёд'); nxt.onclick = function () { go(i + 1); };
    root.appendChild(prev); root.appendChild(nxt);
    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
      dots.querySelectorAll('.slider__dot').forEach(function (d, k) { d.classList.toggle('is-active', k === i); });
      clearInterval(timer); timer = setInterval(function () { go(i + 1); }, 7000);
    }
    go(0);
    root.addEventListener('mouseenter', function () { clearInterval(timer); });
    root.addEventListener('mouseleave', function () { timer = setInterval(function () { go(i + 1); }, 7000); });
  }

  /* ---------- Инициализация ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('afterbegin', renderHeader());
    document.body.insertAdjacentHTML('beforeend', renderFooter() + renderModals());

    document.querySelectorAll('[data-render]').forEach(function (el) { var fn = RENDER[el.dataset.render]; if (fn) fn(el); });
    document.querySelectorAll('.slider').forEach(initSlider);
    loadPhotos();

    /* меню */
    var burger = document.querySelector('.header__burger'), nav = document.querySelector('.nav');
    burger.addEventListener('click', function () { nav.classList.toggle('is-open'); });
    document.querySelectorAll('.nav__link[data-drop]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.innerWidth <= 960) { e.preventDefault(); a.parentNode.classList.toggle('is-open'); }
      });
    });

    /* клики: запись, врач, отзыв, закрытие */
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-book],[data-doctor],[data-close],[data-review],.modal');
      if (!t) return;
      if (t.hasAttribute('data-book')) { e.preventDefault(); openBooking(t.getAttribute('data-book')); }
      else if (t.hasAttribute('data-doctor')) { e.preventDefault(); openDoctor(t.getAttribute('data-doctor')); }
      else if (t.hasAttribute('data-review')) { e.preventDefault(); openBooking(); document.querySelector('#modal-book h2').textContent = 'Оставить отзыв'; document.querySelector('#form-book textarea').placeholder = 'Ваш отзыв'; }
      else if (t.hasAttribute('data-close') || t.classList.contains('modal')) { if (t.classList.contains('modal') && e.target !== t) return; closeModals(); }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModals(); });

    /* форма (демо: без отправки на сервер) */
    var form = document.getElementById('form-book');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      form.insertAdjacentHTML('afterend', '<div class="form__ok">' + I.check + '<h3>Спасибо!</h3><p class="muted">Мы получили заявку и перезвоним вам в ближайшее время.<br>Срочный вопрос? Звоните: <a href="' + C.phoneHref + '"><b>' + esc(C.phone) + '</b></a></p></div>');
      form.reset();
    });

    /* заголовок модалки записи по умолчанию */
    document.getElementById('modal-book').addEventListener('transitionend', function () {});
    var origTitle = 'Записаться на приём';
    var mb = document.getElementById('modal-book');
    new MutationObserver(function () { if (!mb.classList.contains('is-open')) { mb.querySelector('h2').textContent = origTitle; mb.querySelector('textarea').placeholder = 'Возраст ребёнка, что беспокоит, удобное время'; } }).observe(mb, { attributes: true });
  });
})();
