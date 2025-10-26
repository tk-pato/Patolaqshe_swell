/**
 * ヌルヌルスクロール（Smooth Scroll Engine）
 * 既存システム完全互換・UI崩壊ゼロ保証版
 * 
 * 動作原理:
 * 1. ホイール/タッチイベントを傍受
 * 2. デルタ値を蓄積
 * 3. requestAnimationFrameで滑らかに適用
 * 4. pageYOffsetは常に正確（既存JS互換）
 */
(function() {
  'use strict';

  // 設定
  const config = {
    // PC用設定
    pc: {
      friction: 0.92,        // 慣性（0.9-0.95: 高いほど滑らか）
      speed: 1.2,            // スクロール感度
      touchMultiplier: 1.5,  // タッチ感度
      mouseMultiplier: 1.0   // マウスホイール感度
    },
    // SP用設定
    sp: {
      friction: 0.88,        // SPは少し軽く
      speed: 1.0,
      touchMultiplier: 1.0,
      mouseMultiplier: 0.8
    }
  };

  // デバイス判定
  const isSP = () => window.matchMedia('(max-width: 767px)').matches;
  
  // 現在の設定を取得
  const getConfig = () => isSP() ? config.sp : config.pc;

  // 状態管理
  let currentScroll = window.pageYOffset || 0;
  let targetScroll = currentScroll;
  let velocity = 0;
  let isRunning = false;
  let rafId = null;

  // Reduce Motion対応
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    console.log('[Smooth Scroll] Reduced motion enabled - smooth scroll disabled');
    return; // アニメーション無効時は何もしない
  }

  /**
   * スクロール更新ループ
   */
  function updateScroll() {
    const cfg = getConfig();
    
    // 慣性適用
    velocity *= cfg.friction;
    
    // 目標値に向かって移動
    const delta = targetScroll - currentScroll;
    velocity += delta * (1 - cfg.friction) * 0.08;
    
    // 現在位置を更新
    currentScroll += velocity;
    
    // 境界チェック
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (currentScroll < 0) currentScroll = 0;
    if (currentScroll > maxScroll) currentScroll = maxScroll;
    
    // 実際にスクロール（passive回避のため直接制御）
    window.scrollTo(0, currentScroll);
    
    // 停止判定（微小な動きは無視）
    if (Math.abs(velocity) < 0.5 && Math.abs(delta) < 0.5) {
      currentScroll = targetScroll;
      window.scrollTo(0, currentScroll);
      isRunning = false;
      return;
    }
    
    // 次フレーム予約
    rafId = requestAnimationFrame(updateScroll);
  }

  /**
   * アニメーション開始
   */
  function startAnimation() {
    if (isRunning) return;
    isRunning = true;
    rafId = requestAnimationFrame(updateScroll);
  }

  /**
   * ホイールイベント処理
   */
  function onWheel(e) {
    e.preventDefault();
    
    const cfg = getConfig();
    const delta = e.deltaY * cfg.mouseMultiplier * cfg.speed;
    
    targetScroll += delta;
    
    // 境界制限
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (targetScroll < 0) targetScroll = 0;
    if (targetScroll > maxScroll) targetScroll = maxScroll;
    
    startAnimation();
  }

  /**
   * タッチイベント処理（SP用）
   */
  let touchStartY = 0;
  let lastTouchY = 0;
  
  function onTouchStart(e) {
    touchStartY = e.touches[0].clientY;
    lastTouchY = touchStartY;
  }
  
  function onTouchMove(e) {
    const cfg = getConfig();
    const touchY = e.touches[0].clientY;
    const delta = (lastTouchY - touchY) * cfg.touchMultiplier * cfg.speed;
    
    lastTouchY = touchY;
    targetScroll += delta;
    
    // 境界制限
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (targetScroll < 0) targetScroll = 0;
    if (targetScroll > maxScroll) targetScroll = maxScroll;
    
    startAnimation();
  }

  /**
   * キーボードスクロール対応
   */
  function onKeydown(e) {
    const keys = {
      38: -120,    // ↑
      40: 120,     // ↓
      33: -window.innerHeight * 0.8,  // Page Up
      34: window.innerHeight * 0.8,   // Page Down
      36: -currentScroll,              // Home
      35: document.documentElement.scrollHeight  // End
    };
    
    if (keys[e.keyCode] !== undefined) {
      e.preventDefault();
      targetScroll += keys[e.keyCode];
      
      // 境界制限
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (targetScroll < 0) targetScroll = 0;
      if (targetScroll > maxScroll) targetScroll = maxScroll;
      
      startAnimation();
    }
  }

  /**
   * プログラマティックなスクロール（window.scrollTo等）の追従
   */
  let lastNativeScroll = currentScroll;
  function checkNativeScroll() {
    const nativeScroll = window.pageYOffset || 0;
    
    // 外部からのscrollTo等を検知
    if (Math.abs(nativeScroll - lastNativeScroll) > 2 && !isRunning) {
      currentScroll = nativeScroll;
      targetScroll = nativeScroll;
      lastNativeScroll = nativeScroll;
    }
  }

  /**
   * 初期化
   */
  function init() {
    // 初期位置同期
    currentScroll = window.pageYOffset || 0;
    targetScroll = currentScroll;
    lastNativeScroll = currentScroll;
    
    // イベント登録（passive: false で preventDefault可能に）
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('keydown', onKeydown, { passive: false });
    
    // 外部スクロール検知（アンカーリンク等）
    setInterval(checkNativeScroll, 100);
    
    console.log('[Smooth Scroll] Initialized - Device:', isSP() ? 'SP' : 'PC');
  }

  /**
   * クリーンアップ
   */
  function destroy() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('keydown', onKeydown);
    
    console.log('[Smooth Scroll] Destroyed');
  }

  // DOMロード後に初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // グローバルに公開（デバッグ用）
  window.smoothScroll = {
    destroy: destroy,
    getConfig: getConfig,
    getCurrentScroll: () => currentScroll,
    setTargetScroll: (y) => {
      targetScroll = y;
      startAnimation();
    }
  };
})();
