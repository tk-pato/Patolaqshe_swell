/* ptl-navigation | セクション専用スクリプト（子テーマ専用）
   - 条件: is_front_page() で enqueue。さらにDOM存在チェックで早期return
   - 依存: ['jquery']、in_footer: true
   - 分岐: window.matchMedia('(max-width: 768px)') でPC/SP切替の土台のみ */
(function(){
  'use strict';
  var root = document.querySelector('.ptl-navigation');
  if(!root) return; // 対象セクションが無いページでは即終了

  var isSP = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
  // ここにPC/SPそれぞれの初期化処理を後続で実装

})();
