// Patolaqshe バストアップページ - JS
// =====================================================
// 動画背景挿入（PC・SP共通）
// =====================================================
(function() {
  // 既に動画が存在する場合は何もしない
  if (document.getElementById('bg-video')) return;
  
  // video要素を作成
  const video = document.createElement('video');
  video.id = 'bg-video';
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true; // iOS対応
  
  // source要素を作成
  const source = document.createElement('source');
  source.src = 'https://patolaqshe.com/wp-content/uploads/2026/01/corse-bg.mp4';
  source.type = 'video/mp4';
  
  // videoにsourceを追加
  video.appendChild(source);
  
  // bodyの最初の子要素として挿入
  if (document.body) {
    document.body.insertBefore(video, document.body.firstChild);
  } else {
    // bodyがまだ存在しない場合はDOMContentLoadedを待つ
    document.addEventListener('DOMContentLoaded', function() {
      document.body.insertBefore(video, document.body.firstChild);
    });
  }
})();

// =====================================================
// Nicescroll初期化（PC専用）
// =====================================================
(function() {
    
    if (window.innerWidth < 768) {
        return;
    }
    
    function loadJQuery(callback) {
        if (typeof jQuery !== 'undefined') {
            callback();
            return;
        }
        
        var script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        script.onload = callback;
        document.head.appendChild(script);
    }
    
    function loadNicescroll() {
        loadJQuery(function() {
            var script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.6/jquery.nicescroll.min.js';
            script.onload = function() {
                initNicescroll();
            };
            document.head.appendChild(script);
        });
    }
    
    function initNicescroll() {
        jQuery(document).ready(function($) {
            $("html").niceScroll({
                cursorcolor: "transparent",
                cursorwidth: "0px",
                cursorborder: "none",
                scrollspeed: 100,
                mousescrollstep: 50,
                smoothscroll: true,
                hwacceleration: true,
                autohidemode: false,
                background: "transparent",
                railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
                zindex: 999,
                horizrailenabled: false,
                preservenativescrolling: false,
                cursordragontouch: false,
                enablemousewheel: true,
                enablekeyboard: true,
                bouncescroll: false,
                spacebarenabled: true,
                railoffset: false,
                enabletranslate3d: true,
                enablescrollonselection: true
            });
            
            console.log('Nicescroll initialized');
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNicescroll);
    } else {
        loadNicescroll();
    }
    
})();
