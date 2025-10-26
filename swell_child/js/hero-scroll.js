/**
 * Hero Scroll Button - SP専用スムーススクロール（修正版）
 * PC表示には影響なし
 * 
 * @package SWELL_CHILD
 * @since 1.0.1
 * @updated 2025-10-26
 */

(function() {
  'use strict';
  
  // デバッグ用ログ
  function log(msg) {
    console.log('[Hero Scroll]', msg);
  }
  
  function initHeroScroll() {
    log('初期化開始');
    log('ウィンドウ幅: ' + window.innerWidth + 'px');
    
    // SP判定(767px以下)
    if (window.innerWidth > 767) {
      log('PC表示のため処理をスキップ');
      return;
    }
    
    log('SP表示を検出');
    
    // INTROセクションの存在確認
    const introSection = document.getElementById('intro');
    
    if (!introSection) {
      log('エラー: INTRO section (#intro) が見つかりません');
      return;
    }
    
    log('INTROセクションを確認: ' + introSection.tagName);
    
    // SWELLのヒーローボタンを探す（優先度順）
    const selectors = [
      '.p-mainVisual__btn',           // SWELL標準
      '.p-mainVisual__scroll',        // スクロールボタン用
      '.p-mainVisual a[href*="hotpepper"]',  // ホットペッパーリンク
      '.p-mainVisual a[href*="beauty.hotpepper"]',
      '.p-mainVisual .c-plainBtn',    // プレーンボタン
      '.p-mainVisual a',              // 任意のリンク
      '.p-mainVisual button'          // ボタン要素
    ];
    
    let heroButton = null;
    let foundSelector = '';
    
    for (let selector of selectors) {
      heroButton = document.querySelector(selector);
      if (heroButton) {
        foundSelector = selector;
        log('ボタン発見: ' + selector);
        log('ボタンタグ: ' + heroButton.tagName);
        log('現在のhref: ' + (heroButton.href || 'なし'));
        break;
      }
    }
    
    if (!heroButton) {
      log('エラー: ヒーローボタンが見つかりません');
      log('試したセレクタ: ' + selectors.join(', '));
      return;
    }
    
    // リンクを#introに変更
    if (heroButton.tagName === 'A') {
      heroButton.href = '#intro';
      log('hrefを#introに変更');
    }
    
    // 不要な属性を削除
    ['data-onclick', 'onclick', 'target', 'rel'].forEach(function(attr) {
      if (heroButton.hasAttribute(attr)) {
        heroButton.removeAttribute(attr);
        log(attr + '属性を削除');
      }
    });
    
    // 既存のイベントを完全にクリア（クローン＆置換）
    const newButton = heroButton.cloneNode(true);
    heroButton.parentNode.replaceChild(newButton, heroButton);
    log('ボタンをクローンして既存イベントをクリア');
    
    // 新しいクリックイベントを設定（キャプチャフェーズで最優先）
    newButton.addEventListener('click', function(e) {
      log('クリックイベント発火');
      
      // すべての伝播を停止
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      log('INTROセクションへスクロール開始');
      
      // スムーススクロール実行
      const targetTop = introSection.offsetTop;
      log('スクロール先の位置: ' + targetTop + 'px');
      
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
      
      // URLハッシュを更新
      setTimeout(function() {
        history.pushState(null, null, '#intro');
        log('URLハッシュを#introに更新');
      }, 800);
      
      return false;
    }, true); // キャプチャフェーズで実行
    
    log('クリックイベント設定完了');
  }
  
  // 実行タイミング1: DOMContentLoaded
  if (document.readyState === 'loading') {
    log('DOMContentLoadedを待機中');
    document.addEventListener('DOMContentLoaded', function() {
      log('DOMContentLoaded発火');
      initHeroScroll();
    });
  } else {
    log('DOMは既に準備完了');
    initHeroScroll();
  }
  
  // 実行タイミング2: 1秒後（遅延読み込み対応）
  setTimeout(function() {
    log('1秒後の再実行');
    initHeroScroll();
  }, 1000);
  
  // 実行タイミング3: ページ完全読み込み後
  window.addEventListener('load', function() {
    log('window.load発火');
    setTimeout(initHeroScroll, 500);
  });
  
})();
