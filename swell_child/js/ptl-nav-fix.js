(function(){
  'use strict';

  var mqSP = window.matchMedia && window.matchMedia('(max-width: 768px)');
  function isSP(){ return mqSP && typeof mqSP.matches === 'boolean' ? mqSP.matches : (window.innerWidth <= 768); }

  function recalc(container){
    var root = container && container.nodeType ? container : document;
    root.querySelectorAll('.ptl-nav-collapsible').forEach(function(panel){
      try{
        if (panel.classList.contains('is-open')) {
          var h = panel.scrollHeight;
          if (h && isFinite(h)) panel.style.maxHeight = h + 'px';
        } else {
          panel.style.maxHeight = '';
        }
      }catch(e){}
    });
  }

  function findMenuFor(btn){
    if (!btn) return null;
    var sib = btn.nextElementSibling;
    if (sib && sib.classList && sib.classList.contains('ptl-nav-collapsible')) return sib;
    var sec = btn.closest('section');
    if (sec) {
      var cand = sec.querySelector('.ptl-nav-collapsible'); if (cand) return cand;
      cand = sec.querySelector('#ptl-nav-menu'); if (cand) return cand;
    }
    var ac = btn.getAttribute('aria-controls');
    if (ac) { var byId = document.getElementById(ac); if (byId) return byId; }
    return null;
  }

  function toggle(btn){
    var menu = findMenuFor(btn);
    if (!menu) return;
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', (!expanded).toString());
    if (!expanded) { menu.classList.add('is-open'); setTimeout(function(){ recalc(menu.parentNode||document); }, 40); }
    else { menu.classList.remove('is-open'); menu.style.maxHeight = ''; }
  }

  // 競合回避：キャプチャ段階＋伝播停止
  document.addEventListener('click', function(ev){
    var btn = ev.target && ev.target.closest ? ev.target.closest('.ptl-nav-toggle') : null;
    if (!btn || !isSP()) return;
    ev.preventDefault();
    ev.stopPropagation();
    if (typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation();
    toggle(btn);
  }, true);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ recalc(document); }, {once:true});
  else recalc(document);

  window.addEventListener('resize', function(){ if (isSP()) recalc(document); });
  window.addEventListener('orientationchange', function(){ if (isSP()) recalc(document); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ if (isSP()) recalc(document); }).catch(function(){});
})();