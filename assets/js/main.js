/* ============================================================
   TESLIUK TETIANA — behaviour
   ============================================================ */
(function () {
  'use strict';
  var S = window.SITE || {};
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ============================================================
     ЯЗЫК
     ============================================================ */
  var LANGS = ['uk', 'en'];
  var LANG = resolveLang();

  function resolveLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (LANGS.indexOf(q) > -1) return q;
    try {
      var saved = localStorage.getItem('tes.lang');
      if (LANGS.indexOf(saved) > -1) return saved;
    } catch (e) { /* приватный режим — просто берём язык по умолчанию */ }
    return LANGS.indexOf(S.defaultLang) > -1 ? S.defaultLang : 'uk';
  }

  /* T('nav.work') -> строка из словаря текущего языка */
  function T(path) {
    var node = S.i18n && S.i18n[LANG];
    var parts = String(path).split('.');
    for (var i = 0; i < parts.length && node != null; i++) node = node[parts[i]];
    return node == null ? '' : node;
  }

  function setLang(next) {
    if (LANGS.indexOf(next) < 0 || next === LANG) return;
    LANG = next;
    try { localStorage.setItem('tes.lang', next); } catch (e) { /* не страшно */ }
    render();
  }

  /* переключатель рядом с иконкой инстаграма / бургером */
  function langSwitch() {
    $$('[data-lang]').forEach(function (box) {
      if (box.children.length) return;          /* рисуем один раз */
      box.innerHTML = LANGS.map(function (code, i) {
        return (i ? '<i></i>' : '') +
          '<button type="button" data-set-lang="' + code + '">' +
          esc(S.i18n[code].label) + '</button>';
      }).join('');
      box.addEventListener('click', function (e) {
        var b = e.target.closest('[data-set-lang]');
        if (b) setLang(b.getAttribute('data-set-lang'));
      });
    });
    $$('[data-set-lang]').forEach(function (b) {
      b.classList.toggle('is-on', b.getAttribute('data-set-lang') === LANG);
    });
  }

  /* подставляем тексты во всё, что помечено data-i18n */
  function applyI18n() {
    document.documentElement.lang = T('htmlLang') || LANG;

    $$('[data-i18n]').forEach(function (el) {
      var v = T(el.getAttribute('data-i18n'));
      if (v) el.textContent = v;
    });
    $$('[data-i18n-html]').forEach(function (el) {
      var v = T(el.getAttribute('data-i18n-html'));
      if (v) el.innerHTML = esc(v).replace(/\n/g, '<br>');
    });

    var titleKey = document.body.getAttribute('data-title');
    if (titleKey) document.title = T(titleKey);

    var d = $('meta[name="description"]');
    if (d && T('description')) d.setAttribute('content', T('description'));

    /* подписи первого экрана, которые приходят массивом */
    var tags = T('hero.tags') || [];
    $$('[data-hero-tag]').forEach(function (el, i) {
      if (tags[i]) el.textContent = tags[i];
    });

    /* подписи под цифрами на странице About */
    var facts = T('facts') || [];
    $$('[data-fact]').forEach(function (el, i) {
      if (facts[i]) el.textContent = facts[i];
    });
  }

  var PH_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">' +
    '<rect x="3" y="5" width="18" height="14" rx="1"/><circle cx="8.5" cy="10" r="1.6"/>' +
    '<path d="M3 16l5-4 4 3 3-2 6 4"/></svg>';

  /* рамка с фиксированной пропорцией + заглушка, если файла ещё нет */
  function frame(src, ratio, label) {
    return (
      '<div class="frame" data-ratio="' + esc(ratio || 'portrait') + '">' +
        '<img src="' + esc(src) + '" alt="' + esc(label || '') + '" loading="lazy" decoding="async">' +
        '<div class="ph">' + PH_ICON + '<span>' + esc(label || 'photo') + '</span></div>' +
      '</div>'
    );
  }

  function watchImages(root) {
    $$('.frame img', root).forEach(function (img) {
      function fail() { img.closest('.frame').classList.add('is-empty'); }
      if (img.complete) { if (!img.naturalWidth) fail(); }
      else { img.addEventListener('error', fail); }
    });
  }

  /* название проекта на текущем языке */
  function pText(slug, key) { return T('projects.' + slug + '.' + key); }

  /* ============================================================
     PRELOADER
     ============================================================ */
  function loader() {
    var el = $('.loader');
    if (!el) { document.body.classList.remove('is-locked'); heroIntro(); return; }
    var num = $('.loader__num', el), bar = $('.loader__bar i', el), n = 0;
    document.body.classList.add('is-locked');
    var t = setInterval(function () {
      n += Math.random() * 14;
      if (n >= 100) { n = 100; clearInterval(t); done(); }
      num.textContent = String(Math.floor(n)).padStart(3, '0');
      bar.style.width = n + '%';
    }, 90);
    function done() {
      setTimeout(function () {
        el.classList.add('is-done');
        document.body.classList.remove('is-locked');
        heroIntro();
      }, 320);
    }
  }

  function heroIntro() {
    $$('.hero__title .word span').forEach(function (s, i) {
      s.style.transition = 'transform 1.1s cubic-bezier(.16,1,.3,1) ' + (i * 0.08 + 0.05) + 's';
      requestAnimationFrame(function () { s.style.transform = 'none'; });
    });
    $$('.hero .reveal').forEach(function (r) { r.classList.add('is-in'); });
  }

  /* ============================================================
     CURSOR
     ============================================================ */
  function cursor() {
    if (window.matchMedia('(hover:none)').matches) return;
    var c = document.createElement('div');
    c.className = 'cursor';
    c.innerHTML = '<span class="cursor__label"></span>';
    document.body.appendChild(c);
    var lbl = $('.cursor__label', c);
    var x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;

    addEventListener('mousemove', function (e) { x = e.clientX; y = e.clientY; });
    (function loop() {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      c.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest('[data-cursor]');
      if (t) { c.classList.add('is-big'); lbl.textContent = t.getAttribute('data-cursor'); }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('[data-cursor]')) c.classList.remove('is-big');
    });
  }

  /* ============================================================
     HEADER / MENU
     ============================================================ */
  function header() {
    var h = $('.hdr'), last = 0;
    if (!h) return;
    addEventListener('scroll', function () {
      var y = scrollY;
      h.classList.toggle('is-hidden', y > last && y > 200 && !$('.menu.is-open'));
      last = y;
    }, { passive: true });
  }

  function menu() {
    var b = $('.burger'), m = $('.menu');
    if (!b || !m) return;
    b.addEventListener('click', function () {
      var open = m.classList.toggle('is-open');
      b.classList.toggle('is-open', open);
      document.body.classList.toggle('is-locked', open);
    });
  }

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  var io = null;
  function reveal() {
    if (io) io.disconnect();
    io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8%' });
    $$('.reveal').forEach(function (el) {
      if (!el.closest('.hero')) io.observe(el);
    });
  }

  /* ============================================================
     HERO FLOW — бесконечный коллаж + 3D-наклон карточек
     ============================================================ */
  function flow() {
    var el = $('[data-flow]');
    if (!el || !S.hero || !S.hero.length || el.children.length) return;

    var row = S.hero.map(function (it) {
      return (
        '<div class="fcard" style="' +
          '--x:' + (+it.x || 0) + ';--w:' + (+it.w || 20) +
          ';--t:' + (+it.t || 0) + ';--r:' + esc(it.ratio || '3/2') + '">' +
          '<img src="' + esc(it.src) + '" alt="" decoding="async">' +
        '</div>'
      );
    }).join('');

    el.innerHTML = '<div class="flow__track">' +
      '<div class="flow__row">' + row + '</div>' +
      '<div class="flow__row">' + row + '</div>' +
    '</div>';

    /* пропавший файл просто убираем, дыру в раскладке не показываем */
    $$('.fcard img', el).forEach(function (img) {
      function fail() { img.closest('.fcard').style.display = 'none'; }
      if (img.complete) { if (!img.naturalWidth) fail(); }
      else { img.addEventListener('error', fail); }
    });

    tilt($$('.fcard', el), 1.05);
  }

  /* ============================================================
     3D-НАКЛОН: карточка ведёт себя как физическая и
     поворачивается от положения мыши. Движение не останавливается.
     ============================================================ */
  function tilt(cards, zoom) {
    if (window.matchMedia('(hover:none)').matches) return;

    var MAX = 11;            /* градусов */
    var Z = zoom || 1.03;

    cards.forEach(function (card) {
      if (card.dataset.tilt) return;
      card.dataset.tilt = '1';

      card.addEventListener('mouseenter', function () {
        card.classList.add('is-lit');
        card.style.transition = 'transform .25s var(--ease), box-shadow .6s var(--ease)';
      });
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          'perspective(1100px) rotateY(' + (px * MAX * 2).toFixed(2) + 'deg)' +
          ' rotateX(' + (-py * MAX * 2).toFixed(2) + 'deg)' +
          ' scale(' + Z + ')';
      });
      card.addEventListener('mouseleave', function () {
        card.classList.remove('is-lit');
        card.style.transition = '';
        card.style.transform = 'perspective(1100px)';
      });
    });
  }

  /* ============================================================
     WORK GRID
     ============================================================ */
  function grid() {
    var wrap = $('[data-grid]');
    if (!wrap) return;

    wrap.innerHTML = S.projects.map(function (p) {
      return (
        '<a class="card reveal" href="project.html?p=' + esc(p.slug) + '"' +
        ' data-cat="' + esc(p.category) + '" data-cursor="' + esc(T('nav.work')) + '">' +
          frame(p.cover, p.ratio, pText(p.slug, 'title')) +
          '<div class="card__meta">' +
            '<span class="card__title">' + esc(pText(p.slug, 'title')) + '</span>' +
            '<span class="mono card__cat">' +
              esc(T('categories.' + p.category) || p.category) + ' — ' + esc(p.year) +
            '</span>' +
          '</div>' +
        '</a>'
      );
    }).join('');

    watchImages(wrap);
    tilt($$('.card .frame', wrap));

    var f = $('[data-filter]');
    if (!f) return;
    var cats = S.projects.map(function (p) { return p.category; })
      .filter(function (v, i, a) { return a.indexOf(v) === i; });

    f.innerHTML =
      '<button type="button" class="is-on" data-c="*">' + esc(T('filterAll')) + '</button>' +
      cats.map(function (c) {
        return '<button type="button" data-c="' + esc(c) + '">' +
          esc(T('categories.' + c) || c) + '</button>';
      }).join('');

    f.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      $$('button', f).forEach(function (x) { x.classList.toggle('is-on', x === b); });
      var c = b.getAttribute('data-c');
      $$('.card', wrap).forEach(function (card) {
        card.classList.toggle('is-gone', c !== '*' && card.getAttribute('data-cat') !== c);
      });
    });
  }

  /* ============================================================
     SERVICES / MARQUEE
     ============================================================ */
  function services() {
    var el = $('[data-services]');
    if (!el) return;
    var list = T('services') || [];
    el.innerHTML = list.map(function (s, i) {
      return (
        '<div class="srv__row reveal">' +
          '<span class="mono srv__n">0' + (i + 1) + '</span>' +
          '<span class="srv__t">' + esc(s.title) + '</span>' +
          '<span class="srv__d">' + esc(s.desc) + '</span>' +
        '</div>'
      );
    }).join('');
  }

  function marquee() {
    var el = $('[data-marquee]');
    if (!el || el.children.length) return;
    var items = (S.clients || []).map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('');
    el.innerHTML = '<div class="marq__row">' + items + '</div><div class="marq__row">' + items + '</div>';
  }

  function bio() {
    var el = $('[data-bio]');
    if (!el) return;
    el.innerHTML = (T('bio') || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('');
  }

  /* ============================================================
     PROJECT PAGE
     ============================================================ */
  function project() {
    var root = $('[data-project]');
    if (!root) return;

    var slug = new URLSearchParams(location.search).get('p');
    var idx = S.projects.findIndex(function (p) { return p.slug === slug; });
    if (idx < 0) idx = 0;
    var p = S.projects[idx];
    var next = S.projects[(idx + 1) % S.projects.length];
    var caps = pText(p.slug, 'captions') || [];

    document.title = pText(p.slug, 'title') + ' — ' + S.name;

    $('[data-p-title]').textContent = pText(p.slug, 'title');
    $('[data-p-intro]').textContent = pText(p.slug, 'intro');

    $('[data-p-meta]').innerHTML = [
      [T('meta.category'), T('categories.' + p.category) || p.category],
      [T('meta.year'),     p.year],
      [T('meta.location'), pText(p.slug, 'location')],
      [T('meta.frames'),   String(p.images.length)]
    ].map(function (r) {
      return '<div><span class="mono">' + esc(r[0]) + '</span><b>' + esc(r[1]) + '</b></div>';
    }).join('');

    var vIdx = 0;
    $('[data-p-gallery]').innerHTML = p.images.map(function (im, i) {
      var off = '';
      if (im.ratio === 'portrait') { off = (vIdx % 2) ? ' is-offset' : ''; vIdx++; }
      else { vIdx = 0; }
      return (
        '<figure class="shot reveal' + off + '" data-ratio="' + esc(im.ratio) + '">' +
          frame(im.src, im.ratio, pText(p.slug, 'title')) +
          (caps[i] ? '<figcaption class="mono">' + esc(caps[i]) + '</figcaption>' : '') +
        '</figure>'
      );
    }).join('');

    var nx = $('[data-p-next]');
    nx.textContent = pText(next.slug, 'title');
    nx.setAttribute('href', 'project.html?p=' + next.slug);

    watchImages(root);
    tilt($$('.shot .frame', root));
  }

  /* ============================================================
     ОБЩЕЕ: имя, контакты, год, активный пункт меню
     ============================================================ */
  function chrome() {
    $$('[data-name]').forEach(function (e) { e.textContent = S.name; });
    $$('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
    $$('[data-tglink]').forEach(function (e) {
      e.textContent = T('contactPage.tgLink'); e.setAttribute('href', S.contact.telegram);
    });
    $$('[data-phone]').forEach(function (e) {
      e.textContent = S.contact.phone; e.setAttribute('href', 'tel:' + S.contact.phone.replace(/\s/g, ''));
    });
    $$('[data-ig]').forEach(function (e) { e.setAttribute('href', S.contact.instagram); });
    $$('[data-tg]').forEach(function (e) { e.setAttribute('href', S.contact.telegram); });

    var file = location.pathname.split('/').pop() || 'index.html';
    $$('.hdr__nav a, .menu__list a').forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === file);
    });
  }

  /* ============================================================
     ФОРМА (без бэкенда — текст в буфер + открывает Telegram)
     ============================================================ */
  function form() {
    var f = $('[data-form]');
    if (!f || f.dataset.bound) return;
    f.dataset.bound = '1';
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(f);
      var body = T('contactPage.mailSubject') + '\n' +
                 T('contactPage.mailName') + ': ' + d.get('name') + '\n' +
                 T('contactPage.mailContact') + ': ' + d.get('contact') + '\n\n' + d.get('msg');

      var note = f.querySelector('[data-note]');
      function go() {
        if (note) { note.textContent = T('contactPage.copied'); note.classList.add('is-on'); }
        window.open(S.contact.telegram, '_blank', 'noopener');
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(body).then(go, go);
      } else { go(); }
    });
  }

  /* ---------- перерисовка при смене языка ---------- */
  function render() {
    applyI18n();
    langSwitch();
    chrome();
    grid();
    services();
    bio();
    project();
    form();
    reveal();
    $$('.reveal').forEach(function (el) {
      if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-in');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();
    flow();
    marquee();
    cursor();
    header();
    menu();
    loader();
  });
})();
