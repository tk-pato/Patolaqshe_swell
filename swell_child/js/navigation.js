/* ptl-navigation | NAVIGATIONセクション専用スクリプト（統合版）
   - 条件: is_front_page() で enqueue
   - 依存: ['jquery']、in_footer: true
   - 機能: SPでのメニュー開閉トグル制御 */
(function(){
  'use strict';

  var mqSP = window.matchMedia && window.matchMedia('(max-width: 768px)');

  function isSP(){
    return mqSP && typeof mqSP.matches === 'boolean' ? mqSP.matches : (window.innerWidth <= 768);
  }

  function recalc(container){
    var root = container && container.nodeType ? container : document;
    var panels = root.querySelectorAll('.ptl-nav-collapsible');
    panels.forEach(function(panel){
      try {
        // 開いている時だけ高さを張る。閉じる時はクリア。
        if (panel.classList.contains('is-open')) {
          var h = panel.scrollHeight;
          if (h && isFinite(h)) panel.style.maxHeight = h + 'px';
        } else {
          panel.style.maxHeight = '';
        }
      } catch(e){}
    });
  }

  function findMenuFor(btn){
    if (!btn) return null;
    // 1) 隣接（テンプレート構造がボタン直後にメニューの場合）
    var sib = btn.nextElementSibling;
    if (sib && sib.classList && sib.classList.contains('ptl-nav-collapsible')) return sib;

    // 2) 同一セクション内の候補
    var sec = btn.closest('section');
    if (sec) {
      var cand = sec.querySelector('.ptl-nav-collapsible');
      if (cand) return cand;
      cand = sec.querySelector('#ptl-nav-menu');
      if (cand) return cand;
    }

    // 3) aria-controls があれば最終手段として参照
    var ac = btn.getAttribute('aria-controls');
    if (ac) {
      var byId = document.getElementById(ac);
      if (byId) return byId;
    }
    return null;
  }

  function toggle(btn){
    var menu = findMenuFor(btn);
    if (!menu) return;

    var expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', (!expanded).toString());

    if (!expanded) {
      menu.classList.add('is-open');
      // レイアウト確定後に高さ再計算
      setTimeout(function(){ recalc(menu.parentNode || document); }, 40);
    } else {
      menu.classList.remove('is-open');
      menu.style.maxHeight = '';
    }
  }

  // クリックを1本で拾う（イベントデリゲーション）
  document.addEventListener('click', function(ev){
    var btn = ev.target && ev.target.closest ? ev.target.closest('.ptl-nav-toggle') : null;
    if (!btn) return;
    if (!isSP()) return; // SPのみ処理
    ev.preventDefault();
    ev.stopPropagation(); // 伝播停止（既存リスナーへの伝達を防ぐ）
    if (typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation(); // 同一要素の他のリスナーも停止
    toggle(btn);
  }, true);

  // 初期計算と各種イベントでの再計算
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ recalc(document); }, { once: true });
  } else {
    recalc(document);
  }
  window.addEventListener('resize', function(){ if (isSP()) recalc(document); });
  window.addEventListener('orientationchange', function(){ if (isSP()) recalc(document); });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function(){ if (isSP()) recalc(document); }).catch(function(){});
  }
})();
