/**
 * Privacy Modal JavaScript
 * 
 * プライバシーポリシーモーダルの開閉制御
 * ブログモーダルと同じパターンで実装
 */

(function() {
  'use strict';

  // DOMContentLoadedで初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPrivacyModal);
  } else {
    initPrivacyModal();
  }

  function initPrivacyModal() {
    // モーダルコンテナを取得
    const modal = document.getElementById('privacy-modal');
    if (!modal) {
      console.warn('Privacy modal not found');
      return;
    }

    // トリガー要素を取得（フッターのPRIVACYリンク）
    const triggers = document.querySelectorAll('.privacy-modal-trigger');
    const closeBtn = modal.querySelector('.js-modal_close');
    const background = modal.querySelector('.js-modal_bg');

    // トリガークリック時のモーダル開閉
    triggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        // リンク本体のデフォルト動作を防止
        e.preventDefault();
        
        // モーダルを開く
        openModal(modal);
      });
    });

    // クローズボタン
    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(modal);
      });
    }

    // 背景クリック時に閉じる
    if (background) {
      background.addEventListener('click', function(e) {
        if (e.target === background) {
          closeModal(modal);
        }
      });
    }

    // ESCキーで閉じる
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeModal(modal);
      }
    });
  }

  /**
   * モーダルを開く
   */
  function openModal(modal) {
    // 既に開いている場合はスキップ
    if (modal.classList.contains('is-active')) {
      return;
    }

    // アクティブクラスを追加
    modal.classList.add('is-active');

    // ボディのスクロールを禁止
    document.body.style.overflow = 'hidden';

    // ブログモーダルと同様、スライドインアニメーション後の処理は不要
    // （CSS @keyframes で完全にアニメーション制御）
  }

  /**
   * モーダルを閉じる
   */
  function closeModal(modal) {
    // 既に閉じている場合はスキップ
    if (!modal.classList.contains('is-active')) {
      return;
    }

    // クローズアニメーション用のクラスを追加
    modal.classList.add('is-closing');

    // アニメーション完了後（500ms）に表示を非表示にして、元の状態に戻す
    setTimeout(function() {
      // アクティブクラスを削除
      modal.classList.remove('is-active');
      modal.classList.remove('is-closing');

      // ボディのスクロール禁止を解除
      document.body.style.overflow = '';
    }, 500);
  }
})();
