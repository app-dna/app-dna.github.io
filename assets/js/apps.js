// Renders the "Our apps" cards from apps/index.json and one JSON file per app.
(function () {
  'use strict';

  var ICONS = {
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10H20.5M8 3V7M16 3V7"/><path d="M8 14H10M14 14H16M8 17H10"/></svg>',
    gauge: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 16.5A8 8 0 0 1 20 16.5"/><path d="M12 16.5L16 11.5"/><circle cx="12" cy="16.5" r="1.5" fill="currentColor" stroke="none"/><path d="M6.5 12L7.6 12.8M12 8.5V9.8M17.5 12L16.4 12.8"/></svg>'
  };
  var TILES = ['indigo', 'mint', 'ink'];

  function renderCard(app) {
    var el = window.appdna.el;
    var card = el('article', 'app-card');

    var head = el('div', 'app-head');
    var tile = el('div', 'app-tile tile-' + (TILES.indexOf(app.tile) >= 0 ? app.tile : 'indigo'));
    if (ICONS[app.icon]) {
      tile.innerHTML = ICONS[app.icon];
    } else {
      var letter = el('span', 'app-letter', (app.name || '?').charAt(0).toUpperCase());
      letter.setAttribute('aria-hidden', 'true');
      tile.appendChild(letter);
    }
    head.appendChild(tile);

    var titles = el('div');
    titles.appendChild(el('h3', 'app-name', app.name || ''));
    if (app.subtitle) titles.appendChild(el('p', 'app-subtitle', app.subtitle));
    head.appendChild(titles);
    card.appendChild(head);

    if (app.description) card.appendChild(el('p', 'app-desc', app.description));

    if (app.tags && app.tags.length) {
      var tags = el('ul', 'tags');
      app.tags.forEach(function (tag) {
        tags.appendChild(el('li', 'tag', tag));
      });
      card.appendChild(tags);
    }

    var links = el('div', 'app-links');
    if (app.link && app.link.url) {
      var store = el('a', 'app-store', app.link.label || 'Learn more');
      store.href = app.link.url;
      if (/^https?:/i.test(app.link.url)) store.rel = 'noopener';
      links.appendChild(store);
    }
    if (app.legal && app.legal.length) {
      var legal = el('div', 'app-legal');
      app.legal.forEach(function (doc) {
        if (!doc.url) return;
        var a = el('a', null, doc.label || 'Legal');
        a.href = doc.url;
        legal.appendChild(a);
      });
      links.appendChild(legal);
    }

    if (links.childNodes.length || app.note) {
      var foot = el('div', 'app-foot');
      if (links.childNodes.length) foot.appendChild(links);
      if (app.note) foot.appendChild(el('p', 'app-note', app.note));
      card.appendChild(foot);
    }

    return card;
  }

  function init() {
    var grid = document.getElementById('app-grid');
    var status = document.getElementById('app-status');
    if (!grid) return;
    var loadJson = window.appdna.loadJson;

    loadJson('apps/index.json')
      .then(function (index) {
        return Promise.all((index.apps || []).map(function (file) {
          return loadJson('apps/' + file);
        }));
      })
      .then(function (apps) {
        apps.forEach(function (app) {
          grid.appendChild(renderCard(app));
        });
        status.hidden = true;
      })
      .catch(function (err) {
        console.error(err);
        status.textContent = 'Sorry, the app list could not be loaded.';
        status.classList.add('is-error');
      });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
