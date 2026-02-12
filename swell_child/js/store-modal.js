/**
 * Store Select Modal JavaScript
 * 店舗選択モーダルウィンドウ機能
 *
 * @version 1.0.0
 * @date 2026-02-12
 */

(function() {
  'use strict';

  function initStoreModal() {
    var modal = document.getElementById('store-select-modal');
    if (!modal) {
      return;
    }


    var currentSection = '';

    // モーダルを開く
    function openModal(section) {
      currentSection = section;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    // モーダルを閉じる
    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      currentSection = '';
    }

    // reserve-btn トリガー登録
    var reserveBtns = document.querySelectorAll('#facial-content .reserve-btn, #body-content .reserve-btn, #bust-content .reserve-btn');

    reserveBtns.forEach(function(btn, index) {
      // div自体にクリックハンドラ
      btn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        var section = btn.closest('#facial-content') ? 'facial' : btn.closest('#bust-content') ? 'bust' : 'body';
        openModal(section);
      };

      // 中のaタグにもクリックハンドラ
      var link = btn.querySelector('a');
      if (link) {
        link.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();

          var section = btn.closest('#facial-content') ? 'facial' : btn.closest('#bust-content') ? 'bust' : 'body';
          openModal(section);
        };
      }

    });

    // 代官山店ボタン
    var daikanyamaBtn = modal.querySelector('.pato-modal-btn-daikanyama');
    if (daikanyamaBtn) {
      daikanyamaBtn.onclick = function(e) {
        e.preventDefault();
        var url = '';
        if (currentSection === 'facial') {
          url = 'https://book.squareup.com/appointments/xgp5fm2xb93b2t/location/5PESR3FP3XMAS/services/EL5PVFHAOJVW4O3DSY2H2TIG';
        } else if (currentSection === 'body') {
          url = 'https://book.squareup.com/appointments/xgp5fm2xb93b2t/location/5PESR3FP3XMAS/services/CILKFLR3KMORKZPF6ULTTUJF';
        } else if (currentSection === 'bust') {
          url = 'https://book.squareup.com/appointments/xgp5fm2xb93b2t/location/5PESR3FP3XMAS';
        }
        if (url) { window.open(url, '_blank'); }
        closeModal();
      };
    }

    // 銀座店ボタン
    var ginzaBtn = modal.querySelector('.pato-modal-btn-ginza');
    if (ginzaBtn) {
      ginzaBtn.onclick = function(e) {
        e.preventDefault();
        var url = '';
        if (currentSection === 'facial') {
          url = 'https://book.squareup.com/appointments/qt8e7316fy17nd/location/CMN5YZFYZARSA/services/3TCVDDG5RUL7K5RKNH6VUQZG';
        } else if (currentSection === 'body') {
          url = 'https://book.squareup.com/appointments/qt8e7316fy17nd/location/CMN5YZFYZARSA/services/TA6JUQJMHM4VHORAUJQC6PDM';
        } else if (currentSection === 'bust') {
          url = 'https://book.squareup.com/appointments/qt8e7316fy17nd/location/CMN5YZFYZARSA';
        }
        if (url) { window.open(url, '_blank'); }
        closeModal();
      };
    }

    // 閉じるボタン
    var closeBtn = modal.querySelector('.pato-modal-close');
    if (closeBtn) {
      closeBtn.onclick = function(e) {
        e.preventDefault();
        closeModal();
      };
    }

    // オーバーレイクリック
    var overlay = modal.querySelector('.pato-modal-overlay');
    if (overlay) {
      overlay.onclick = function() {
        closeModal();
      };
    }

    // ESCキー
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display !== 'none') {
        closeModal();
      }
    });

  }

  // DOM準備完了後に初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStoreModal);
  } else {
    initStoreModal();
  }

})();
