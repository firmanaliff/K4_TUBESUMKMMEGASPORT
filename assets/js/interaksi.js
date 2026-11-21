/* Mega Sports – interaksi tambahan */
(function () {
  'use strict';

  /* 1. Progress bar scroll */
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 2. Cari brand */
  var input = document.getElementById('brandSearch');
  var grid = document.getElementById('brandGrid');
  if (input && grid) {
    var items = Array.prototype.slice.call(grid.querySelectorAll('.brand-item'));
    var count = document.getElementById('brandCount');
    var empty = document.getElementById('brandEmpty');
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      items.forEach(function (el) {
        var ok = !q || el.getAttribute('data-name').indexOf(q) !== -1;
        el.hidden = !ok;
        if (ok) shown++;
      });
      if (count) count.textContent = shown + ' brand';
      if (empty) empty.hidden = shown !== 0;
    });
  }

  /* 3. Klik link internal: scroll mulus ke bagian tsb (tanpa reload / tab baru),
        lalu perbarui alamat (#bagian) tanpa menumpuk riwayat */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id === '#' || id.length < 2) return;
    var target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (history.replaceState) history.replaceState(null, '', id);
  });
})();
