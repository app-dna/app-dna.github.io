// Shared helpers for the appDNA site.
(function () {
  'use strict';

  window.appdna = {
    loadJson: function (path) {
      return fetch(path).then(function (response) {
        if (!response.ok) throw new Error(path + ' (' + response.status + ')');
        return response.json();
      });
    },

    // Creates an element with an optional class and text content (never HTML).
    el: function (tag, className, text) {
      var node = document.createElement(tag);
      if (className) node.className = className;
      if (text !== undefined && text !== null) node.textContent = text;
      return node;
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var year = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach(function (node) {
      node.textContent = year;
    });
  });
})();
