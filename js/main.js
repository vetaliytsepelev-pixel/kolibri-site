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
    /* значок «написать в MAX»: облачко сообщения (не логотип MAX) */
    max: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.3 8.7 8.7 0 0 1-3.8-.9L3 20.5l1.6-4.9a8.1 8.1 0 0 1-1.1-4.1A8.4 8.4 0 0 1 12 3.2a8.4 8.4 0 0 1 9 8.3z"/><path d="M8 13.5v-4l2.5 3 2.5-3v4M15.5 9.5l2.5 4M18 9.5l-2.5 4"/></svg>',
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
    wave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'
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
    { t: 'Пациентам', h: 'pacientam.html' },
    { t: 'Полезное', h: 'poleznoe.html' },
    { t: 'Контакты', h: 'kontakty.html' }
  ];
  // поиск по сайту и версия для слабовидящих — кнопки в конце меню (на телефоне — в «бургере»)
  var NAV_TOOLS = '<li class="nav__item nav__item--tool"><button class="nav__tool" type="button" data-search>' + I.search + '<span class="nav__tool-text">Поиск</span></button></li>' +
    '<li class="nav__item nav__item--tool"><button class="nav__tool" type="button" data-a11y title="Версия для слабовидящих" aria-label="Версия для слабовидящих">' + I.eye + '<span class="nav__tool-label">Версия для слабовидящих</span></button></li>';

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
      '<nav class="nav"><ul class="nav__list">' + items + NAV_TOOLS + '</ul></nav>' +
      '</div></header>';
  }

  /* ---------- Подвал ---------- */
  function renderFooter() {
    var hours = C.hours.map(function (h) { return '<div><span>' + h[0] + '</span><span>' + h[1] + '</span></div>'; }).join('');
    return '<footer class="footer"><div class="container">' +
      '<div class="footer__grid">' +
      '<div><a class="footer__logo" href="index.html"><img src="img/logo-full.png" alt="' + esc(C.name) + '"></a>' +
      '<p>Детская клиника в Симферопольском районе: педиатрия и неонатология, сопровождение недоношенных детей, УЗИ экспертного класса пациентам от 0 до 99 лет, вакцинация с рождения.</p>' +
      social() + '</div>' +
      '<div><h4>Пациентам</h4><ul><li><a href="pacientam.html">Информация для пациентов</a></li><li><a href="vrachi.html">Врачи</a></li><li><a href="uslugi.html">Услуги</a></li><li><a href="uzi.html">УЗИ-диагностика</a></li><li><a href="ceny.html">Программы и цены</a></li><li><a href="poleznoe.html">Полезное</a></li></ul></div>' +
      '<div><h4>Клиника</h4><ul><li><a href="o-klinike.html">О клинике</a></li><li><a href="index.html#reviews">Отзывы</a></li><li><a href="o-klinike.html#docs">Документы и лицензии</a></li><li><a href="kontakty.html">Контакты</a></li></ul></div>' +
      '<div><h4>Контакты</h4><p>' + esc(C.addressFull) + '</p><p><a href="' + C.phoneHref + '"><b>' + esc(C.phone) + '</b></a><br><a href="mailto:' + C.email + '">' + C.email + '</a></p><div class="hours">' + hours + '</div></div>' +
      '</div>' +
      '<div class="footer__warn">ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ. НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА</div>' +
      '<div class="footer__bottom"><span>© 2026 ' + esc(C.name) + '. Информация на сайте не является публичной офертой.</span><span><a href="politika.html" style="margin-right:16px">Политика конфиденциальности</a><a href="app-concept.html" style="margin-right:16px">Концепция мобильного приложения</a>' + esc(C.site) + '</span></div>' +
      // реквизиты и лицензия — отдельной строкой под копирайтом
      '<div class="footer__legal">' + [C.legalName && (esc(C.legalName) + (C.inn ? ', ИНН ' + esc(C.inn) : '') + (C.ogrnip ? ', ОГРНИП ' + esc(C.ogrnip) : '')), C.license && ('Лицензия на медицинскую деятельность № ' + esc(C.license))].filter(Boolean).join('. ') + '.</div>' +
      '</div></footer>' +
      '<div class="float">' + (C.max ? '<a class="float__chat" href="' + esc(C.max) + '" target="_blank" rel="noopener" aria-label="Написать в MAX" title="Написать в MAX">' + I.max + '</a>' : '') + '<a class="float__phone" href="' + C.phoneHref + '" aria-label="Позвонить">' + I.phone + '</a></div>';
  }

  /* значки мессенджеров и соцсетей в подвале: только те, для которых в data.js есть ссылка */
  function social() {
    var links = [];
    if (C.max) links.push('<a href="' + esc(C.max) + '" target="_blank" rel="noopener" aria-label="Написать в MAX" title="Написать в MAX">' + I.max + '</a>');
    if (C.vk) links.push('<a href="' + esc(C.vk) + '" target="_blank" rel="noopener" aria-label="ВКонтакте" title="ВКонтакте">' + I.vk + '</a>');
    return links.length ? '<div class="footer__social">' + links.join('') + '</div>' : '';
  }

  /* Кнопки и строки «Написать в MAX» в страницах (атрибут data-max): пока ссылки нет — прячем.
     Если у кнопки есть data-book, без ссылки на MAX она остаётся кнопкой «Оставить заявку». */
  function initMax() {
    document.querySelectorAll('[data-max]').forEach(function (el) {
      if (C.max) {
        if (el.tagName === 'A') { el.href = C.max; el.target = '_blank'; el.rel = 'noopener'; el.removeAttribute('data-book'); if (el.dataset.max) el.textContent = el.dataset.max; }
        el.querySelectorAll('a[data-max-link]').forEach(function (a) { a.href = C.max; });
        el.hidden = false;
      } else if (!el.hasAttribute('data-book')) {
        el.hidden = true;
      }
    });
  }

  /* ---------- Модальные окна ---------- */
  var COMMENT_HINT = 'Возраст ребёнка, удобное время для звонка';
  function renderModals() {
    var opts = window.DOCTORS.filter(function (d) { return !d.staff; }).map(function (d) { return '<option value="' + d.id + '">' + esc(d.name) + ' — ' + esc(d.spec[0]) + '</option>'; }).join('');
    return '<div class="modal" id="modal-book"><div class="modal__box">' +
      '<button class="modal__close" type="button" data-close aria-label="Закрыть">' + I.close + '</button>' +
      '<h2 style="font-size:26px">Записаться на приём</h2><p class="muted" style="font-size:15px">Оставьте контакты — администратор перезвонит, подберёт врача и удобное время.</p>' +
      '<form class="form" id="form-book" novalidate>' +
      '<input type="hidden" name="type" value="zapis"><input type="hidden" name="started" value="">' +
      /* ловушка для спам-ботов: человек это поле не видит и не заполняет */
      '<label class="form__hp" aria-hidden="true">Сайт<input name="website" tabindex="-1" autocomplete="off"></label>' +
      '<label>Ваше имя<input name="name" required maxlength="80" autocomplete="name" placeholder="Как к вам обращаться"></label>' +
      '<label>Телефон<input name="phone" type="tel" required maxlength="30" autocomplete="tel" placeholder="+7 (___) ___-__-__"></label>' +
      '<label>E-mail<input name="email" type="email" required maxlength="120" autocomplete="email" inputmode="email" placeholder="name@mail.ru"></label>' +
      '<label>Врач или услуга<select name="doctor"><option value="">Подобрать врача</option>' + opts + '</select></label>' +
      '<label>Комментарий<textarea name="comment" rows="3" maxlength="1000" placeholder="' + COMMENT_HINT + '"></textarea></label>' +
      '<small class="form__hint">Пожалуйста, не указывайте сведения о здоровье ребёнка — врач уточнит всё на приёме.</small>' +
      '<label class="form__check"><input type="checkbox" name="consent" value="1" required><span>Я даю <a href="soglasie.html" target="_blank">согласие на обработку персональных данных</a> и ознакомлен(а) с <a href="politika.html" target="_blank">политикой конфиденциальности</a></span></label>' +
      '<div class="form__err" hidden></div>' +
      '<button class="btn btn--primary btn--block" type="submit">Отправить заявку</button>' +
      '</form></div></div>' +
      '<div class="modal" id="modal-doctor"><div class="modal__box modal__box--wide"><button class="modal__close" type="button" data-close aria-label="Закрыть">' + I.close + '</button><div id="doctor-body"></div></div></div>' +
      '<div class="modal modal--top" id="modal-search"><div class="modal__box modal__box--wide search-box"><button class="modal__close" type="button" data-close aria-label="Закрыть">' + I.close + '</button>' +
      '<h2 style="font-size:24px">Поиск по сайту</h2>' +
      '<label class="pl__search">' + I.search + '<input type="search" id="site-search" placeholder="Врач, услуга, цена или вопрос — например «УЗИ сердца»" aria-label="Поиск по сайту" autocomplete="off"></label>' +
      '<div class="search-results" id="site-search-results"></div></div></div>';
  }

  /* ---------- Поиск по сайту ----------
     Ищет по страницам, врачам, направлениям, УЗИ, ценам (вместе с кодами услуг) и статьям из data.js — без сервера.
     Слова ищутся по началу, как в прайсе: «почек» найдёт «почки». Цена открывается на «Ценах» с готовым поиском (?q=). */
  var SEARCH_PAGES = [
    ['Главная', 'index.html', 'детская клиника колибри мирное'],
    ['Врачи', 'vrachi.html', 'врачи специалисты доктор'],
    ['Услуги', 'uslugi.html', 'направления услуги'],
    ['УЗИ-диагностика', 'uzi.html', 'узи ультразвуковая диагностика'],
    ['Программы и цены', 'ceny.html', 'цены прайс прейскурант стоимость программы наблюдения пакеты'],
    ['О клинике', 'o-klinike.html', 'о клинике фото галерея'],
    ['Документы и лицензия', 'o-klinike.html#docs', 'лицензия документы инн огрнип реквизиты'],
    ['Информация для пациентов', 'pacientam.html', 'пациентам'],
    ['Права и обязанности пациента', 'pacientam.html#prava', 'права пациента обязанности 323 фз закон'],
    ['Куда обратиться с вопросом или жалобой', 'pacientam.html#obrashcheniya', 'жалоба обращение минздрав росздравнадзор роспотребнадзор контролирующие органы'],
    ['Бесплатная помощь: программа госгарантий', 'pacientam.html#gosgarantii', 'омс полис бесплатно программа государственных гарантий территориальная'],
    ['Лекарственное обеспечение', 'pacientam.html#lekarstva', 'лекарства льготные жнвлп рецепт препараты'],
    ['Стандарты и клинические рекомендации', 'pacientam.html#standarty', 'клинические рекомендации стандарты медицинской помощи'],
    ['Полезное: статьи для родителей', 'poleznoe.html', 'статьи советы полезное'],
    ['Контакты', 'kontakty.html', 'адрес телефон часы режим работы как доехать карта'],
    ['Политика конфиденциальности', 'politika.html', 'персональные данные'],
    ['Согласие на обработку персональных данных', 'soglasie.html', 'персональные данные согласие']
  ];
  var searchIndex = null;
  function qnorm(s) { return ' ' + String(s || '').toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]+/g, ' ').trim() + ' '; }
  function buildSearchIndex() {
    var list = [];
    function add(t, s, u, extra, rank) { list.push({ t: t, s: s, u: u, q: qnorm(t + ' ' + (extra || '')), tq: qnorm(t), r: rank }); }
    SEARCH_PAGES.forEach(function (p) { add(p[0], 'Раздел сайта', p[1], p[2], 0); });
    window.DOCTORS.forEach(function (d) { if (!d.staff) add(d.name, d.spec.join(', '), 'vrachi.html#doc-' + d.id, d.spec.join(' ') + ' ' + (d.category || ''), 1); });
    window.DIRECTIONS.forEach(function (d) { add(d.title, 'Направление', 'uslugi.html#' + d.id, (d.short || '') + ' ' + (d.list || []).join(' '), 2); });
    (window.UZI || []).forEach(function (u) { add(u.title, 'УЗИ', 'uzi.html', u.text, 3); });
    var priceLink = function (name) { return 'ceny.html?q=' + encodeURIComponent(name) + '#prais'; };
    (window.PRICES || []).forEach(function (c) {
      c.groups.forEach(function (g) { g.items.forEach(function (it) { add(it[0], money(it[1]) + ' · ' + c.title, priceLink(it[0]), c.title + ' ' + (it[2] || '') + ' ' + (it[3] || '') + ' ' + (it[4] || ''), 4); }); });
    });
    window.PACKAGES.forEach(function (p) { add(p.name, money(p.price) + ' · Программы и пакеты', priceLink(p.name), (p.note || '') + ' ' + (p.code || ''), 4); });
    (window.ARTICLES || []).forEach(function (a) { add(a.title, 'Статья', 'poleznoe.html#' + a.id, (a.tags || []).join(' '), 5); });
    return list;
  }
  function runSearch(value) {
    var box = document.getElementById('site-search-results');
    var words = qnorm(value).split(' ').filter(Boolean).map(function (w) { return ' ' + (w.length > 4 ? w.slice(0, Math.max(3, w.length - 2)) : w); });
    if (!words.length) { box.innerHTML = '<p class="muted">Начните вводить — например, фамилию врача, «прививки», «ЛОР» или «цены УЗИ».</p>'; return; }
    searchIndex = searchIndex || buildSearchIndex();
    var found = searchIndex.filter(function (x) { return words.every(function (w) { return x.q.indexOf(w) >= 0; }); })
      .map(function (x) { return { x: x, score: words.filter(function (w) { return x.tq.indexOf(w) >= 0; }).length * 10 - x.r }; })
      .sort(function (a, b) { return b.score - a.score; }).slice(0, 25);
    box.innerHTML = found.length ? found.map(function (f) { return '<a class="search-hit" href="' + f.x.u + '"><b>' + esc(f.x.t) + '</b><small>' + esc(f.x.s) + '</small></a>'; }).join('') +
      (found.length === 25 ? '<p class="muted">Показаны первые 25 результатов — уточните запрос.</p>' : '')
      : '<p class="muted">Ничего не нашлось. Позвоните нам: <a href="' + C.phoneHref + '"><b>' + esc(C.phone) + '</b></a> — администратор подскажет.</p>';
  }
  function openSearch() {
    openModal('modal-search');
    var input = document.getElementById('site-search');
    runSearch(input.value);
    setTimeout(function () { input.focus(); }, 50);
  }

  /* ---------- Версия для слабовидящих ----------
     Кнопка с глазом в меню включает панель настроек: размер шрифта (масштаб страницы), цвета (чёрным по белому,
     белым по чёрному, тёмно-синим по голубому), межбуквенный интервал, изображения. Настройки запоминаются в браузере. */
  var A11Y_KEY = 'kolibri-a11y';
  var a11y = (function () { try { return JSON.parse(localStorage.getItem(A11Y_KEY)) || {}; } catch (e) { return {}; } })();
  function saveA11y() { try { localStorage.setItem(A11Y_KEY, JSON.stringify(a11y)); } catch (e) { /* приватный режим — просто не запоминаем */ } }
  function applyA11y() {
    var h = document.documentElement;
    h.className = h.className.replace(/\ba11y[\w-]*\b/g, '').trim();
    var bar = document.querySelector('.a11y-bar');
    if (!a11y.on) { if (bar) bar.remove(); return; }
    h.classList.add('a11y', 'a11y-z' + (a11y.size || 1));
    if (a11y.color) h.classList.add('a11y-c-' + a11y.color);
    if (a11y.noimg) h.classList.add('a11y-noimg');
    if (a11y.ls) h.classList.add('a11y-ls');
    var btn = function (k, v, label, title) { return '<button type="button" data-a11y-set="' + k + ':' + v + '"' + ((a11y[k] || '') === v || (k === 'size' && (a11y.size || 1) === +v) ? ' aria-pressed="true"' : ' aria-pressed="false"') + (title ? ' title="' + title + '"' : '') + '>' + label + '</button>'; };
    var html = '<div class="container a11y-bar__in">' +
      '<div class="a11y-bar__group"><span>Шрифт</span>' + btn('size', '1', 'А', 'Обычный') + btn('size', '2', 'А+', 'Крупный') + btn('size', '3', 'А++', 'Очень крупный') + '</div>' +
      '<div class="a11y-bar__group"><span>Цвета</span>' + btn('color', 'bw', 'Ц', 'Чёрным по белому') + btn('color', 'wb', 'Ц', 'Белым по чёрному') + btn('color', 'blue', 'Ц', 'Тёмно-синим по голубому') + btn('color', '', 'Сайт', 'Обычные цвета сайта') + '</div>' +
      '<div class="a11y-bar__group"><span>Интервал</span>' + btn('ls', '', 'Обычный') + btn('ls', '1', 'Большой') + '</div>' +
      '<div class="a11y-bar__group"><span>Изображения</span>' + btn('noimg', '', 'Вкл') + btn('noimg', '1', 'Выкл') + '</div>' +
      '<button type="button" class="a11y-bar__off" data-a11y-off>Обычная версия сайта</button></div>';
    if (!bar) { bar = document.createElement('div'); bar.className = 'a11y-bar'; bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', 'Настройки версии для слабовидящих'); document.body.insertBefore(bar, document.body.firstChild); }
    bar.innerHTML = html;
    bar.querySelectorAll('[data-a11y-set="color:bw"]').forEach(function (b) { b.classList.add('sw-bw'); });
    bar.querySelectorAll('[data-a11y-set="color:wb"]').forEach(function (b) { b.classList.add('sw-wb'); });
    bar.querySelectorAll('[data-a11y-set="color:blue"]').forEach(function (b) { b.classList.add('sw-blue'); });
  }
  function initA11y() {
    applyA11y();
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-a11y],[data-a11y-set],[data-a11y-off]');
      if (!t) return;
      if (t.hasAttribute('data-a11y')) { a11y.on = !a11y.on; if (a11y.on && !a11y.size) { a11y.size = 2; a11y.color = 'bw'; } }
      else if (t.hasAttribute('data-a11y-off')) a11y.on = false;
      else { var kv = t.getAttribute('data-a11y-set').split(':'); a11y[kv[0]] = kv[0] === 'size' ? +kv[1] : kv[1]; }
      saveA11y(); applyA11y();
    });
  }

  function openModal(id) { document.getElementById(id).classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function closeModals() { document.querySelectorAll('.modal.is-open').forEach(function (m) { m.classList.remove('is-open'); }); document.body.style.overflow = ''; }

  function openBooking(doctorId, type) {
    var f = document.getElementById('form-book');
    f.style.display = '';
    var ok = f.parentNode.querySelector('.form__ok'); if (ok) ok.remove();
    f.querySelector('.form__err').hidden = true;
    f.elements['type'].value = type || 'zapis';
    f.elements['started'].value = String(Date.now());
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
    /* администраторы и младший персонал (staff): только фото, ФИО и должность — без записи и «Подробнее» */
    if (d.staff) return '<div class="doctor doctor--staff">' + photo(d.photo, 'ph--round doctor__photo', d.name) + '<h3>' + esc(d.name) + '</h3><div class="doctor__spec">' + d.spec.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('') + '</div></div>';
    return '<div class="doctor">' + photo(d.ava || d.photo, 'ph--round doctor__photo', d.name).replace('class="ph ', 'data-doctor="' + d.id + '" class="ph ') +
      '<h3>' + esc(d.name) + '</h3>' +
      (d.exp ? '<span class="tag doctor__exp">Стаж ' + years(d.exp) + '</span>' : (d.category ? '<span class="tag doctor__exp">' + esc(d.category) + '</span>' : '<span class="tag doctor__exp">Приём детей с рождения</span>')) +
      '<div class="doctor__spec">' + d.spec.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('') + '</div>' +
      '<div class="doctor__actions"><a href="#" class="btn btn--primary btn--sm" data-book="' + d.id + '">Записаться</a><a href="#" class="btn btn--outline btn--sm" data-doctor="' + d.id + '">Подробнее</a></div></div>';
  }
  function renderDoctors(el) {
    var limit = parseInt(el.dataset.limit || '0', 10);
    var ids = (el.dataset.ids || '').split(',').filter(Boolean);
    var staff = el.dataset.staff === '1';
    var list = ids.length ? window.DOCTORS.filter(function (d) { return ids.indexOf(d.id) >= 0; }) : window.DOCTORS.filter(function (d) { return !!d.staff === staff; });
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

  /* Прайс-лист (ceny.html): поиск по услугам, кнопки разделов и разделы-«гармошки». Данные — PRICES в data.js,
     последний раздел собирается из PACKAGES. Ссылка ceny.html#p-uzi сразу открывает нужный раздел. */
  function plural(n, one, few, many) { var m = n % 10, d = n % 100; return n + ' ' + (d >= 11 && d <= 14 ? many : m === 1 ? one : m >= 2 && m <= 4 ? few : many); }
  // для поиска: строчные, ё → е, всё кроме букв и цифр — пробел (чтобы «(ЛОР)» и «ЛОР-органов» находились по «лор»)
  function norm(s) { return ' ' + String(s).toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]+/g, ' ').trim() + ' '; }
  var SEARCH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
  function renderPriceTable(el) {
    var cats = (window.PRICES || []).concat([{ id: 'p-pakety', title: 'Программы и пакеты', groups: [{ items: window.PACKAGES.map(function (p) { return [p.name, p.price, p.note, '', p.code]; }) }] }]);
    el.innerHTML = '<div class="pl">' +
      '<div class="pl__tools"><label class="pl__search">' + SEARCH_ICON + '<input type="search" placeholder="Найти услугу, например «УЗИ почек» или «гипс»" aria-label="Поиск по прайсу" autocomplete="off"></label>' +
      '<div class="pl__cats">' + cats.map(function (c) { return '<a class="pl__chip" href="#' + c.id + '">' + esc(c.title) + '</a>'; }).join('') + '</div></div>' +
      '<p class="pl__found" hidden></p>' +
      cats.map(function (c) {
        // в открытом разделе сначала видны первые SHOW услуг, остальные — по кнопке «Ещё … ∨» (просьба клиента 12.10.2026);
        // разделы до SHOW + 2 услуг показываются целиком
        var SHOW = 5, total = c.groups.reduce(function (s, g) { return s + g.items.length; }, 0), fold = total > SHOW + 2;
        var n = 0, min = Infinity;
        var body = c.groups.map(function (g) {
          var hiddenGroup = fold && n >= SHOW;
          return '<div class="pl-group' + (hiddenGroup ? ' pl-group--more' : '') + '">' + (g.title ? '<h4>' + esc(g.title) + '</h4>' : '') + g.items.map(function (it) {
            var more = fold && n >= SHOW;
            n++; if (it[1] < min) min = it[1];
            // ищем по разделу, названию, пояснению и коду (без подраздела: «Сердце и сосуды» иначе находило бы все сосуды по «сердца»)
            // it[4] — код услуги по номенклатуре (из прейскуранта клиники), несколько кодов — через запятую
            var code = it[4] ? '<span class="pl-row__code">' + (it[4].indexOf(',') > 0 ? 'Коды: ' : 'Код: ') + esc(it[4]) + '</span>' : '';
            return '<div class="pl-row' + (more ? ' pl-row--more' : '') + '" data-q="' + esc(norm(c.title + ' ' + it[0] + ' ' + (it[2] || '') + ' ' + (it[3] || '') + ' ' + (it[4] || ''))) + '">' +
              '<div class="pl-row__name">' + esc(it[0]) + (it[2] ? '<small>' + esc(it[2]) + '</small>' : '') + code + '</div><div class="pl-row__price">' + money(it[1]) + '</div></div>';
          }).join('') + '</div>';
        }).join('');
        var moreBtn = fold ? '<button type="button" class="pl-more" data-rest="' + (total - SHOW) + '">' + 'Ещё ' + plural(total - SHOW, 'услуга', 'услуги', 'услуг') + I.chevD + '</button>' : '';
        return '<details class="pl-cat' + (fold ? ' is-folded' : '') + '" id="' + c.id + '"><summary><span class="pl-cat__title">' + esc(c.title) + '</span>' +
          '<span class="pl-cat__meta">' + plural(n, 'услуга', 'услуги', 'услуг') + ' · от ' + money(min) + '</span></summary>' +
          '<div class="pl-cat__body">' + (c.note ? '<p class="pl-cat__note">' + esc(c.note) + '</p>' : '') + body + moreBtn +
          '<div class="pl-cat__foot"><a href="#" class="btn btn--primary btn--sm" data-book>Записаться</a></div></div></details>';
      }).join('') +
      '<p class="pl__empty" hidden>Ничего не нашлось. Позвоните нам: <a href="' + C.phoneHref + '"><b>' + esc(C.phone) + '</b></a> — администратор подскажет.</p></div>';

    var input = el.querySelector('.pl__search input'), found = el.querySelector('.pl__found'), empty = el.querySelector('.pl__empty');
    var blocks = [].slice.call(el.querySelectorAll('.pl-cat'));
    // поиск по началу слов: «почек» найдёт «почки», «сердца» — «сердце» (у длинных слов отбрасываем окончание),
    // «лор» не найдёт «пилорический»
    input.addEventListener('input', function () {
      var words = norm(input.value).split(' ').filter(Boolean).map(function (w) { return ' ' + (w.length > 4 ? w.slice(0, Math.max(3, w.length - 2)) : w); });
      var total = 0;
      blocks.forEach(function (d) {
        var cnt = 0;
        [].forEach.call(d.querySelectorAll('.pl-group'), function (g) {
          var gc = 0;
          [].forEach.call(g.querySelectorAll('.pl-row'), function (r) { var ok = words.every(function (w) { return r.dataset.q.indexOf(w) >= 0; }); r.hidden = !ok; if (ok) gc++; });
          g.hidden = gc === 0; cnt += gc;
        });
        d.hidden = cnt === 0; d.open = words.length > 0 && cnt > 0; total += cnt;
      });
      found.hidden = !words.length || !total; found.textContent = 'Найдено: ' + plural(total, 'услуга', 'услуги', 'услуг');
      empty.hidden = !words.length || total > 0;
      pl.classList.toggle('is-searching', words.length > 0);   // при поиске видны все найденные, кнопки «Ещё» скрыты
    });
    // «Ещё … ∨» / «Свернуть ∧»
    var pl = el.querySelector('.pl');
    pl.addEventListener('click', function (e) {
      var b = e.target.closest('.pl-more'); if (!b) return;
      var d = b.closest('.pl-cat'), folded = d.classList.toggle('is-folded');
      b.innerHTML = folded ? 'Ещё ' + plural(+b.dataset.rest, 'услуга', 'услуги', 'услуг') + I.chevD : 'Свернуть' + I.chevD;
      b.classList.toggle('is-open', !folded);
      // свернули длинный раздел, прокрутив его вниз, — возвращаемся к его началу
      if (folded && d.getBoundingClientRect().top < 0) d.scrollIntoView({ block: 'start' });
    });
    function openCat(id, scroll) {
      var d = document.getElementById(id); if (!d || !d.classList.contains('pl-cat')) return;
      if (input.value) { input.value = ''; input.dispatchEvent(new Event('input')); }
      d.open = true; if (scroll) d.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    el.querySelector('.pl__cats').addEventListener('click', function (e) {
      var a = e.target.closest('a'); if (!a) return; e.preventDefault();
      var id = a.getAttribute('href').slice(1); openCat(id, true); history.replaceState(null, '', '#' + id);
    });
    // ceny.html?q=… (из поиска по сайту) — сразу показать найденные услуги
    var q0 = new URLSearchParams(location.search).get('q');
    if (q0) {
      input.value = q0; input.dispatchEvent(new Event('input'));
      setTimeout(function () { window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 150); }, 120);   // к прайсу, под шапкой
    }
    if (location.hash) setTimeout(function () { openCat(location.hash.slice(1), true); }, 50);
    window.addEventListener('hashchange', function () { openCat(location.hash.slice(1), true); });
  }

  function renderNews(el) {
    var limit = parseInt(el.dataset.limit || '0', 10);
    var list = limit ? window.ARTICLES.slice(0, limit) : window.ARTICLES;
    el.innerHTML = list.map(function (a) {
      return '<a class="news-card" href="poleznoe.html#' + a.id + '">' + photo(a.photo, '', a.title) + '<div class="news-card__body"><div class="news-card__meta">' + a.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '<span>' + a.date + '</span></div><h3>' + esc(a.title) + '</h3></div></a>';
    }).join('');
  }

  /* Блок статьи: строка — абзац, {h} — подзаголовок, {ul} — список, {warn, title} — тревожные признаки в рамке, {note} — заметка */
  function articleBlock(b) {
    if (typeof b === 'string') return '<p>' + esc(b) + '</p>';
    if (b.h) return '<h3>' + esc(b.h) + '</h3>';
    var li = function (x) { return '<li>' + esc(x) + '</li>'; };
    if (b.ul) return '<ul>' + b.ul.map(li).join('') + '</ul>';
    if (b.warn) return '<div class="article__warn">' + (b.title ? '<b>' + esc(b.title) + '</b>' : '') + '<ul>' + b.warn.map(li).join('') + '</ul></div>';
    if (b.note) return '<p class="article__note">' + esc(b.note) + '</p>';
    return '';
  }

  /* Статьи: видно вступление (до первого подзаголовка), остальное раскрывается кнопкой «Читать полностью».
     Ссылка poleznoe.html#id с главной сразу раскрывает нужную статью. */
  function renderArticles(el) {
    el.innerHTML = window.ARTICLES.map(function (a) {
      var cut = a.text.findIndex(function (b) { return b && b.h; });
      if (cut < 0) cut = a.text.length;
      var lead = a.text.slice(0, cut).map(articleBlock).join('');
      var rest = a.text.slice(cut).map(articleBlock).join('');
      return '<article class="article" id="' + a.id + '">' + photo(a.photo, '', a.title) + '<div><div class="news-card__meta">' + a.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '<span>' + a.date + '</span></div><h2>' + esc(a.title) + '</h2>' + lead +
        (rest ? '<details class="article__more"><summary><span class="article__open">Читать полностью</span><span class="article__close">Свернуть</span></summary>' + rest + '</details>' : '') +
        '</div></article>';
    }).join('');
    function openFromHash() {
      var id = decodeURIComponent(location.hash.slice(1)), art = id && document.getElementById(id);
      var d = art && art.querySelector('details.article__more');
      if (d) { d.open = true; art.scrollIntoView(); }
    }
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
  }

  function renderReviews(el) {
    el.innerHTML = '<div class="review review--cta' + (window.REVIEWS.length ? '' : ' review--wide') + '"><div><h3>Для нас важно ваше мнение!</h3><p>Расскажите, как прошёл визит в «Колибри» — это помогает нам становиться лучше.</p></div><a href="#" class="btn btn--light" data-review>Оставить отзыв</a></div>' +
      window.REVIEWS.map(function (r) {
        return '<div class="review"><div class="review__head"><h3>' + esc(r.name) + '</h3><span class="review__date">' + r.date + '</span></div><div class="review__stars">' + '★★★★★'.slice(0, r.stars) + '</div><p>' + esc(r.text) + '</p><div class="review__doctor">Врач: ' + esc(r.doctor) + '</div></div>';
      }).join('');
  }

  function renderUzi(el) {
    el.innerHTML = window.UZI.map(function (u) {
      return '<div class="uzi-item"><div class="uzi-item__icon">' + I.wave + '</div><div><h3>' + esc(u.title) + '</h3><p>' + esc(u.text) + '</p></div></div>';
    }).join('');
  }

  /* Иконки направлений (линейные, 24×24) */
  var S = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">';
  var DIR_ICONS = {
    pediatr: S + '<path d="M5 3v6a6 6 0 0 0 12 0V3"/><path d="M4 3h2M16 3h2"/><path d="M11 15v1.5a4.5 4.5 0 0 0 9 0V14"/><circle cx="20" cy="11.5" r="2.5"/></svg>',
    nedonoshennye: S + '<circle cx="12" cy="13.5" r="7"/><path d="M12 6.5c0-2 1.5-3 3-2.5"/><path d="M9.5 12.5h.01M14.5 12.5h.01"/><path d="M9.5 16c1.5 1.3 3.5 1.3 5 0"/></svg>',
    ortoped: S + '<path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"/></svg>',
    hirurg: S + '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M12 11v5M9.5 13.5h5"/></svg>',
    nevrolog: S + '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/></svg>',
    oftalmolog: S + '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    lor: S + '<path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"/></svg>',
    uzd: S + '<rect x="3" y="4" width="18" height="13" rx="2.5"/><path d="M6.5 11c1.4-2.6 2.6-2.6 4 0s2.6 2.6 4 0 2-2 3 0"/><path d="M12 17v3M8 20h8"/></svg>',
    logoped: S + '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z"/><path d="M8.5 11h7M8.5 14h4"/></svg>',
    psiholog: S + '<circle cx="12" cy="12" r="9"/><path d="M8.5 10h.01M15.5 10h.01"/><path d="M8.5 14.5c1 1.5 2.3 2 3.5 2s2.5-.5 3.5-2"/></svg>',
    medsestra: S + '<path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3a2.4 2.4 0 0 1-3.4 0L2.6 16.6a2.4 2.4 0 0 1 0-3.4L13 3"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>',
    gv: S + '<path d="M9 2h6M10 2v3.3a2 2 0 0 1-1 1.7A4 4 0 0 0 7 10.5V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.5a4 4 0 0 0-2-3.5 2 2 0 0 1-1-1.7V2"/><path d="M7 13h10M7 17h10"/></svg>'
  };
  var DEFAULT_ICON = S + '<path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/></svg>';
  window.DIR_ICONS = DIR_ICONS;

  function renderDirections(el) {
    var byId = {}; window.DOCTORS.forEach(function (d) { byId[d.id] = d; });
    el.innerHTML = window.DIRECTIONS.map(function (d) {
      var docs = d.doctors.map(function (id) { return byId[id] ? '<a href="#" data-doctor="' + id + '">' + esc(byId[id].name) + '</a>' : ''; }).filter(Boolean).join(', ');
      var ico = DIR_ICONS[d.id] || DEFAULT_ICON;
      return '<div class="dir" id="' + d.id + '"><div class="dir__bg">' + ico + '</div><div class="dir__icon">' + ico + '</div>' +
        '<h3>' + esc(d.title) + '</h3><p>' + esc(d.short) + '</p><ul>' + d.list.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul>' +
        (docs ? '<div class="dir__doctors">Специалисты: ' + docs + '</div>' : '<div class="dir__doctors">Специалист ведёт приём по записи</div>') +
        '<div class="dir__actions"><a href="#" class="btn btn--primary btn--sm" data-book>Записаться</a>' +
        ((window.PRICES_FOR_DIRECTION || {})[d.id] ? '<a href="ceny.html#' + window.PRICES_FOR_DIRECTION[d.id] + '" class="btn btn--outline btn--sm">Цены</a>' : '') +
        (d.link ? '<a href="' + d.link + '" class="btn btn--outline btn--sm">Подробнее</a>' : '') + '</div></div>';
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
  /* версия файлов из адреса main.js (…/main.js?v=XXXX) — чтобы браузер не показывал старые фото из кэша */
  var mainSrc = (document.querySelector('script[src*="main.js"]') || {}).src || '';
  var ASSET_VER = /[?&]v=([^&]+)/.test(mainSrc) ? RegExp.$1 : '';
  function loadPhotos(root) {
    (root || document).querySelectorAll('img[data-photo]:not([data-init])').forEach(function (img) {
      img.dataset.init = '1';
      img.loading = 'lazy';
      var key = img.dataset.photo;
      img.onload = function () { img.classList.add('is-loaded'); };
      img.onerror = function () { queue.push(img); next(); };
      img.src = 'img/photos/' + key + '.jpg' + (ASSET_VER ? '?v=' + ASSET_VER : '');
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
      else if (t.hasAttribute('data-review')) { e.preventDefault(); openBooking(null, 'otzyv'); document.querySelector('#modal-book h2').textContent = 'Оставить отзыв'; document.querySelector('#form-book textarea').placeholder = 'Ваш отзыв'; }
      else if (t.hasAttribute('data-close') || t.classList.contains('modal')) { if (t.classList.contains('modal') && e.target !== t) return; closeModals(); }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModals(); });
    initMax();

    /* поиск по сайту */
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-search]')) { e.preventDefault(); openSearch(); }
      else if (e.target.closest('.search-hit')) closeModals();   // переход по ссылке, в том числе на якорь этой же страницы
    });
    document.getElementById('site-search').addEventListener('input', function (e) { runSearch(e.target.value); });
    /* vrachi.html#doc-<id> (из поиска) — сразу открыть карточку врача */
    function docFromHash() { var m = /^#doc-(.+)$/.exec(location.hash); if (m) openDoctor(decodeURIComponent(m[1])); }
    docFromHash(); window.addEventListener('hashchange', docFromHash);
    initA11y();

    /* Форма записи. Заявка уходит на C.formEndpoint (обработчик form/send.php на хостинге: письмо на почту клиники
       и уведомление администратору в MAX). Если адрес пустой — демо: только «Спасибо», без отправки. */
    var form = document.getElementById('form-book');
    var err = form.querySelector('.form__err');
    function showErr(html) { err.innerHTML = html; err.hidden = false; }
    function done() {
      form.style.display = 'none';
      form.insertAdjacentHTML('afterend', '<div class="form__ok">' + I.check + '<h3>Спасибо!</h3><p class="muted">' +
        (form.elements['type'].value === 'otzyv' ? 'Мы получили ваш отзыв.' : 'Мы получили заявку и перезвоним вам в ближайшее время.') +
        '<br>Срочный вопрос? Звоните: <a href="' + C.phoneHref + '"><b>' + esc(C.phone) + '</b></a></p></div>');
      form.reset();
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      err.hidden = true;
      var el = form.elements;
      if (!el['name'].value.trim()) { showErr('Напишите, пожалуйста, как к вам обращаться.'); el['name'].focus(); return; }
      if (el['phone'].value.replace(/\D/g, '').length < 10) { showErr('Проверьте номер телефона — нужно не меньше 10 цифр.'); el['phone'].focus(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el['email'].value.trim())) { showErr('Проверьте e-mail — например, name@mail.ru.'); el['email'].focus(); return; }
      if (!el['consent'].checked) { showErr('Чтобы отправить заявку, отметьте согласие на обработку персональных данных.'); el['consent'].focus(); return; }
      if (!C.formEndpoint) { done(); return; }
      var btn = form.querySelector('button[type=submit]'), label = btn.textContent;
      btn.disabled = true; btn.textContent = 'Отправляем…';
      var data = new FormData(form), sel = el['doctor'];
      data.append('page', location.pathname);
      data.append('doctor_name', sel.value ? sel.options[sel.selectedIndex].text : '');
      fetch(C.formEndpoint, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
        .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
        .then(function (res) {
          if (res && res.ok) done();
          else showErr((res && res.error ? esc(res.error) + '<br>' : 'Не получилось отправить заявку. ') + 'Позвоните нам: <a href="' + C.phoneHref + '"><b>' + esc(C.phone) + '</b></a>');
        })
        .catch(function () { showErr('Нет связи с сервером. Позвоните нам: <a href="' + C.phoneHref + '"><b>' + esc(C.phone) + '</b></a>'); })
        .then(function () { btn.disabled = false; btn.textContent = label; });
    });

    /* заголовок и подсказка модалки записи по умолчанию */
    var origTitle = 'Записаться на приём';
    var mb = document.getElementById('modal-book');
    new MutationObserver(function () { if (!mb.classList.contains('is-open')) { mb.querySelector('h2').textContent = origTitle; mb.querySelector('textarea').placeholder = COMMENT_HINT; } }).observe(mb, { attributes: true });
  });
})();
