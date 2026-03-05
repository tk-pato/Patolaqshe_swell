<?php
if (!defined('ABSPATH')) exit;

/**
 * アクセシビリティ: スキップリンク
 */
add_action('wp_body_open', function () {
  echo '<a href="#content" class="ptl-skip-link">メインコンテンツへスキップ</a>';
});

// WP 6.9: media TinyMCE プラグインのスタンドアロンファイルが削除されたためエラー回避
add_filter('tiny_mce_plugins', function ($plugins) {
    return array_diff($plugins, ['media']);
});

/**
 * ガラス背景クリティカルCSS — 外部CSSより先に<head>内にインライン出力
 * 外部page-xxx.cssの読み込み遅延による背景チラつき(FOUC)を防止
 */
add_action('wp_head', function () {
  if (!is_page()) return;
  ?>
  <style id="ptl-critical-glass">
  .glass-bg{background:rgba(255,255,255,.1)!important;backdrop-filter:blur(10px)!important;-webkit-backdrop-filter:blur(10px)!important;border:1px solid rgba(255,255,255,.3);box-shadow:0 8px 32px rgba(0,0,0,.1);margin-top:0!important;margin-bottom:0!important;border-top:none!important;border-bottom:none!important}
  .transparent-bg{background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:none!important;box-shadow:none!important;margin-top:0!important;margin-bottom:0!important}
  </style>
  <?php
}, 1);

add_action('wp_enqueue_scripts', function () {
  $rel  = '/css/issues-navigation.css';
  $path = get_stylesheet_directory() . $rel;
  if (file_exists($path)) {
    wp_enqueue_style('ptl-issues-bundle', get_stylesheet_directory_uri() . $rel, ['main_style'], filemtime($path));
  }
}, 999);

/* BUST-ISSUES: PC専用CSS */
add_action('wp_enqueue_scripts', function () {
  $issues_pc = get_stylesheet_directory() . '/css/pc/issues-navigation.css';
  if (file_exists($issues_pc)) {
    wp_enqueue_style('ptl-issues-pc', get_stylesheet_directory_uri() . '/css/pc/issues-navigation.css', ['ptl-issues-bundle'], filemtime($issues_pc), 'screen and (min-width: 960px)');
  }
  $issues_sp = get_stylesheet_directory() . '/css/sp/issues-navigation-sp.css';
  if (file_exists($issues_sp)) {
    wp_enqueue_style('ptl-issues-sp', get_stylesheet_directory_uri() . '/css/sp/issues-navigation-sp.css', ['ptl-issues-bundle'], filemtime($issues_sp), 'screen and (max-width: 767px)');
  }
  $hero_scroll_sp = get_stylesheet_directory() . '/css/sp/hero-scroll-sp.css';
  if (file_exists($hero_scroll_sp)) {
    wp_enqueue_style('ptl-hero-scroll-sp', get_stylesheet_directory_uri() . '/css/sp/hero-scroll-sp.css', ['main_style'], filemtime($hero_scroll_sp), 'screen and (max-width: 959px)');
  }
  $hero_scroll_js = get_stylesheet_directory() . '/js/hero-scroll-toggle.js';
  if (file_exists($hero_scroll_js)) {
    wp_enqueue_script('ptl-hero-scroll-toggle', get_stylesheet_directory_uri() . '/js/hero-scroll-toggle.js', [], filemtime($hero_scroll_js), true);
  }
  // ヒーロー動画フォールバック（トップページのみ）
  if (is_front_page()) {
    $hero_video_fix = get_stylesheet_directory() . '/js/hero-video-fix.js';
    if (file_exists($hero_video_fix)) {
      wp_enqueue_script('ptl-hero-video-fix', get_stylesheet_directory_uri() . '/js/hero-video-fix.js', [], filemtime($hero_video_fix), false);
    }
  }
}, 999);

function ptl_get_nav_background(): array
{
  $video_mod = get_theme_mod('ptl_nav_video');
  $bg_pc     = (string) get_theme_mod('ptl_nav_bg_pc', get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg');
  $bg_sp     = (string) get_theme_mod('ptl_nav_bg_sp', get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg');
  $overlay   = (float) get_theme_mod('ptl_nav_overlay', 0.25);
  $p_speed   = (float) get_theme_mod('ptl_nav_parallax_speed', 0.6);
  $result = [
    'bg_pc'           => $bg_pc,
    'bg_sp'           => $bg_sp,
    'overlay_opacity' => $overlay,
    'parallax_speed'  => $p_speed,
  ];

  // 動画の設定（あれば）
  if ($video_mod) {
    if (is_numeric($video_mod)) {
      $u = wp_get_attachment_url((int) $video_mod);
      if ($u) $result['video_url'] = $u;
    } else {
      $video_url = esc_url_raw((string) $video_mod);
      if ($video_url) $result['video_url'] = $video_url;
    }
  }

  return $result;
}

function ptl_get_bust_issues_background(): array
{
  $video_mod = get_theme_mod('ptl_bust_issues_video');
  $bg_pc     = (string) get_theme_mod('ptl_bust_issues_bg_pc', get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg');
  $bg_sp     = (string) get_theme_mod('ptl_bust_issues_bg_sp', get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg');
  $overlay   = (float) get_theme_mod('ptl_bust_issues_overlay', 0.25);
  $p_speed   = (float) get_theme_mod('ptl_bust_issues_parallax_speed', 0.6);
  $result = [
    'bg_pc'           => $bg_pc,
    'bg_sp'           => $bg_sp,
    'overlay_opacity' => $overlay,
    'parallax_speed'  => $p_speed,
  ];
  if ($video_mod) {
    if (is_numeric($video_mod)) {
      $u = wp_get_attachment_url((int) $video_mod);
      if ($u) $result['video_url'] = $u;
    } else {
      $video_url = esc_url_raw((string) $video_mod);
      if ($video_url) $result['video_url'] = $video_url;
    }
  }
  return $result;
}

add_filter('body_class', function ($classes) {
  if (is_front_page() || is_page_template('page-landing.php')) {
    $classes[] = 'has-head-toggle';
  }
  return $classes;
});

add_action('wp_footer', function () {
  if (is_admin()) return;
?>
  <script id="ptl-header-guard">
    (() => {
      'use strict';
      // 1) ヘッダー候補を取得（構造変更なし）
      const sels = ['[data-header]', '#masthead', '.l-header', 'header.site-header', 'header[role="banner"]', 'header'];
      let header = null;
      for (const s of sels) {
        const el = document.querySelector(s);
        if (el) {
          header = el;
          break;
        }
      }
      if (!header) {
        console.warn('[PTL] header not found');
        return;
      }
      header.setAttribute('data-ptl-guard', '');

      // 2) 非表示化だけを無効化（display/visibilityのみ）。opacity/transform/色は触らない＝デザイン不変
      const forceShow = () => {
        try {
          // inlineのdisplay/visibilityを強制上書き（!important）
          header.style.setProperty('display', 'block', 'important');
          header.style.setProperty('visibility', 'visible', 'important');
          // 万一親要素でvisibility隠蔽がある場合は最小限で剥がす
          let p = header.parentElement,
            hop = 0;
          while (p && hop < 3) { // 直近の親3階層まで
            const pv = getComputedStyle(p);
            if (pv.visibility === 'hidden') p.style.setProperty('visibility', 'visible', 'important');
            p = p.parentElement;
            hop++;
          }
        } catch (e) {}
      };

      // 3) 初期適用
      const apply = () => forceShow();
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {
        once: true
      });
      else apply();
      window.addEventListener('load', apply, {
        once: true
      });

      // 4) 監視：class/styleの変更で隠されたら即座に解除
      const mo = new MutationObserver(muts => {
        for (const m of muts) {
          if (m.type === 'attributes' && (m.attributeName === 'class' || m.attributeName === 'style')) {
            forceShow();
          }
        }
      });
      mo.observe(header, {
        attributes: true,
        attributeFilter: ['class', 'style']
      });

      // 5) スクロール/リサイズ時も最小負荷で確認
      let ticking = false;
      const tick = () => {
        if (ticking) return;
        ticking = true;
        (window.requestAnimationFrame || setTimeout)(() => {
          forceShow();
          ticking = false;
        }, 0);
      };
      window.addEventListener('scroll', tick, {
        passive: true
      });
      window.addEventListener('resize', tick);

      // 6) 予防：外部JSがdisplay:noneを直書きしても勝てるように、周期的に軽く再適用
      setInterval(forceShow, 3000);
    })();
  </script>
  <?php
}, 9999);

/**
 * 子テーマでのファイルの読み込み
 */
add_action('wp_enqueue_scripts', function () {
  // style.css
  $style_path = get_stylesheet_directory() . '/style.css';
  $style_ver  = file_exists($style_path) ? date('Ymdgis', filemtime($style_path)) : null;
  // 親テーマ main.css のハンドルは 'main_style'（SWELL）
  wp_enqueue_style('child_style', get_stylesheet_directory_uri() . '/style.css', ['main_style'], $style_ver);

  // ========================================
  // セクション別CSS読み込みループ（PC/SP分離対応）
  // ========================================

  // ブレークポイント統一定義
  $breakpoint_pc = 'screen and (min-width: 960px)';
  $breakpoint_sp = 'screen and (max-width: 767px)';

  // セクション定義配列：[ファイルプレフィックス, ハンドル名基, 依存関係, SP suffix]
  $sections = [
    ['section-commitment', 'ptlCommit', ['child_style'], '-sp'],
    ['section-menu', 'ptl_section_menu', ['child_style'], '-sp'],
    ['section-salon', 'ptl_section_salon', ['child_style'], '-sp'],
  ];

  // Footer CSS（child_style依存）
  $footer_path = get_stylesheet_directory() . '/css/footer.css';
  if (file_exists($footer_path)) {
    wp_enqueue_style(
      'ptl_footer',
      get_stylesheet_directory_uri() . '/css/footer.css',
      ['child_style'],
      filemtime($footer_path)
    );

    // Footer PC CSS
    $footer_pc_path = get_stylesheet_directory() . '/css/pc/footer-pc.css';
    if (file_exists($footer_pc_path)) {
      wp_enqueue_style(
        'ptl_footer-pc',
        get_stylesheet_directory_uri() . '/css/pc/footer-pc.css',
        ['ptl_footer'],
        filemtime($footer_pc_path),
        'screen and (min-width: 768px)'
      );
    }

    // Footer SP CSS
    $footer_sp_path = get_stylesheet_directory() . '/css/sp/footer-sp.css';
    if (file_exists($footer_sp_path)) {
      wp_enqueue_style(
        'ptl_footer-sp',
        get_stylesheet_directory_uri() . '/css/sp/footer-sp.css',
        ['ptl_footer'],
        filemtime($footer_sp_path),
        $breakpoint_sp
      );
    }
  }

  foreach ($sections as list($file_prefix, $handle, $deps, $sp_suffix)) {
    // ベースCSS
    $base_path = get_stylesheet_directory() . "/css/{$file_prefix}.css";
    if (file_exists($base_path)) {
      // 旧ハンドルクリーンアップ（COMMITMENT用）
      if ($file_prefix === 'section-commitment') {
        foreach (['ptl_commitment_styles', 'ptl-section-commitment'] as $old_handle) {
          if (wp_style_is($old_handle, 'enqueued')) {
            wp_dequeue_style($old_handle);
            wp_deregister_style($old_handle);
          }
        }
      }

      wp_enqueue_style(
        $handle,
        get_stylesheet_directory_uri() . "/css/{$file_prefix}.css",
        $deps,
        filemtime($base_path)
      );

      // PC専用CSS
      $pc_path = get_stylesheet_directory() . "/css/pc/{$file_prefix}.css";
      if (file_exists($pc_path)) {
        wp_enqueue_style(
          "{$handle}-pc",
          get_stylesheet_directory_uri() . "/css/pc/{$file_prefix}.css",
          [$handle],
          filemtime($pc_path),
          $breakpoint_pc
        );
      }

      // SP専用CSS
      $sp_path = get_stylesheet_directory() . "/css/sp/{$file_prefix}{$sp_suffix}.css";
      if (file_exists($sp_path)) {
        wp_enqueue_style(
          "{$handle}-sp",
          get_stylesheet_directory_uri() . "/css/sp/{$file_prefix}{$sp_suffix}.css",
          [$handle],
          filemtime($sp_path),
          $breakpoint_sp
        );
      }
    }
  }

  // head-toggle.js
  $head_js_path = get_stylesheet_directory() . '/js/head-toggle.js';
  $head_js_ver  = file_exists($head_js_path) ? date('Ymdgis', filemtime($head_js_path)) : ($style_ver ?: '1.0');
  wp_enqueue_script('child_head_toggle', get_stylesheet_directory_uri() . '/js/head-toggle.js', [], $head_js_ver, true);

  // URLハッシュによる自動スクロール防止（ページ読み込み時は常にトップ表示）
  if (is_front_page()) {
    add_action('wp_footer', function () {
  ?>
      <script>
        if (window.location.hash) {
          history.replaceState(null, null, window.location.pathname + window.location.search);
          setTimeout(function() {
            window.scrollTo(0, 0);
          }, 1);
        }
      </script>
  <?php
    }, 1);
  }

  // 統合パララックスJS（旧: section-parallax.js + section-infohub.js）
  $parallax_js_path = get_stylesheet_directory() . '/js/ptl-parallax.js';
  if (file_exists($parallax_js_path)) {
    $parallax_js_ver = date('Ymdgis', filemtime($parallax_js_path));
    wp_enqueue_script('ptl-parallax', get_stylesheet_directory_uri() . '/js/ptl-parallax.js', [], $parallax_js_ver, true);
  }

  // ========================================
  // SALON セクション用CSS/JS（3重管理継承）
  // ========================================
  $salon_css = get_stylesheet_directory() . '/css/section-salon.css';
  if (file_exists($salon_css)) {
    wp_enqueue_style('ptl_section_salon', get_stylesheet_directory_uri() . '/css/section-salon.css', ['child_style'], filemtime($salon_css));
  }

  // SALON PC版CSS（960px以上）
  $salon_pc_css = get_stylesheet_directory() . '/css/pc/section-salon.css';
  if (file_exists($salon_pc_css)) {
    wp_enqueue_style('ptl_section_salon-pc', get_stylesheet_directory_uri() . '/css/pc/section-salon.css', ['ptl_section_salon'], filemtime($salon_pc_css), 'screen and (min-width: 960px)');
  }

  // SALON SP版CSS（767px以下）
  $salon_sp_css = get_stylesheet_directory() . '/css/sp/section-salon-sp.css';
  if (file_exists($salon_sp_css)) {
    wp_enqueue_style('ptl_section_salon-sp', get_stylesheet_directory_uri() . '/css/sp/section-salon-sp.css', ['ptl_section_salon'], filemtime($salon_sp_css), 'screen and (max-width: 767px)');
  }
}, 20);

// SP専用: セクション順序変更CSS
add_action('wp_enqueue_scripts', function () {
  $order_sp = get_stylesheet_directory() . '/css/sp/section-order-sp.css';
  if (file_exists($order_sp)) {
    wp_enqueue_style('ptl-order-sp', get_stylesheet_directory_uri() . '/css/sp/section-order-sp.css', [], filemtime($order_sp), 'screen and (max-width: 767px)');
  }
}, 998);

/* === Spacing Debug Toggle (front only) === */
add_action('wp_footer', function () {
  if (is_admin()) return; // 全公開ページで有効
  ?>
  <script id="ptl-spacing-debug" data-desc="Press Shift+D or use ?debug=spacing to toggle">
    (function() {
      try {
        var enable = /[?#&]debug=spacing\b/.test(location.search) || /#debug-spacing\b/.test(location.hash);
        var root = document.documentElement || document.body;
        var apply = function(on) {
          if (!root) return;
          if (on) {
            root.setAttribute('data-ptl-debug-spacing', '');
          } else {
            root.removeAttribute('data-ptl-debug-spacing');
          }
        };
        apply(enable);
        window.addEventListener('keydown', function(e) {
          if (e.key.toLowerCase() === 'd' && e.shiftKey) {
            var on = !root.hasAttribute('data-ptl-debug-spacing');
            apply(on);
          }
        }, {
          passive: true
        });
      } catch (_) {
        /* noop */
      }
    })();
  </script>
<?php
}, 9999);

// パターン: 選ばれる理由（4カード）
add_action('init', function () {
  if (!function_exists('register_block_pattern')) return;

  // カテゴリ登録（なければ）
  if (function_exists('register_block_pattern_category')) {
    register_block_pattern_category('patolaqshe', [
      'label' => 'Patolaqshe',
    ]);
  }

  $reason_url = home_url('/reason/'); // 後で変更可（現在は /media/reason/ 相当）

  $content = '<!-- wp:group {"tagName":"section","className":"ptlCommit","anchor":"brand-reason"} -->
  <section class="wp-block-group ptlCommit" id="brand-reason"><div class="wp-block-group__inner-container">
  <!-- wp:heading {"textAlign":"center"} -->
  <h2 class="has-text-align-center">選ばれる理由</h2>
  <!-- /wp:heading -->

  <!-- wp:columns {"className":"ptlCommit__grid"} -->
  <div class="wp-block-columns ptlCommit__grid">

    <!-- wp:column -->
    <div class="wp-block-column">
      <!-- wp:group {"className":"ptl-reason-card"} -->
      <div class="wp-block-group ptl-reason-card">
        <!-- wp:group {"className":"ptl-reason-card__media"} -->
        <div class="wp-block-group ptl-reason-card__media"><a href="' . esc_url($reason_url) . '"><div class="ptl-ph" aria-hidden="true"></div></a></div>
        <!-- /wp:group -->
        <!-- wp:heading {"level":4,"className":"ptl-reason-card__title"} -->
        <h4 class="ptl-reason-card__title"><a href="' . esc_url($reason_url) . '">施術からホームケアまでアドバイス</a></h4>
        <!-- /wp:heading -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:column -->

    <!-- wp:column -->
    <div class="wp-block-column">
      <!-- wp:group {"className":"ptl-reason-card"} -->
      <div class="wp-block-group ptl-reason-card">
        <!-- wp:group {"className":"ptl-reason-card__media"} -->
        <div class="wp-block-group ptl-reason-card__media"><a href="' . esc_url($reason_url) . '"><div class="ptl-ph" aria-hidden="true"></div></a></div>
        <!-- /wp:group -->
        <!-- wp:heading {"level":4,"className":"ptl-reason-card__title"} -->
        <h4 class="ptl-reason-card__title"><a href="' . esc_url($reason_url) . '">様々なバストのお悩みに対処</a></h4>
        <!-- /wp:heading -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:column -->

    <!-- wp:column -->
    <div class="wp-block-column">
      <!-- wp:group {"className":"ptl-reason-card"} -->
      <div class="wp-block-group ptl-reason-card">
        <!-- wp:group {"className":"ptl-reason-card__media"} -->
        <div class="wp-block-group ptl-reason-card__media"><a href="' . esc_url($reason_url) . '"><div class="ptl-ph" aria-hidden="true"></div></a></div>
        <!-- /wp:group -->
        <!-- wp:heading {"level":4,"className":"ptl-reason-card__title"} -->
        <h4 class="ptl-reason-card__title"><a href="' . esc_url($reason_url) . '">お一人お一人のお悩みに合わせた施術を</a></h4>
        <!-- /wp:heading -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:column -->

    <!-- wp:column -->
    <div class="wp-block-column">
      <!-- wp:group {"className":"ptl-reason-card"} -->
      <div class="wp-block-group ptl-reason-card">
        <!-- wp:group {"className":"ptl-reason-card__media"} -->
        <div class="wp-block-group ptl-reason-card__media"><a href="' . esc_url($reason_url) . '"><div class="ptl-ph" aria-hidden="true"></div></a></div>
        <!-- /wp:group -->
        <!-- wp:heading {"level":4,"className":"ptl-reason-card__title"} -->
        <h4 class="ptl-reason-card__title"><a href="' . esc_url($reason_url) . '">創業10年以上の安心の実績</a></h4>
        <!-- /wp:heading -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:column -->

  </div>
  <!-- /wp:columns -->

  <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
  <div class="wp-block-buttons"><div class="wp-block-button"><a class="wp-block-button__link ptlCommit__more" href="' . esc_url($reason_url) . '">MORE</a></div></div>
  <!-- /wp:buttons -->

  </div></section>
  <!-- /wp:group -->';

  register_block_pattern('patolaqshe/commitment-4', [
    'title'       => '選ばれる理由（4カード）',
    'description' => 'グレープレースホルダー画像付きの4カード。Moreボタン・各カードから「選ばれる理由・施術の流れ」へリンクします。',
    'categories'  => ['patolaqshe'],
    'content'     => $content,
  ]);
});

/**
 * カスタマイザー: NAVIGATION 背景の動画/画像とオーバーレイ濃度
 */
add_action('customize_register', function (WP_Customize_Manager $wp_customize) {
  // セクション（表示名だけ汎用化：既存IDは互換のため維持）
  $wp_customize->add_section('ptl_navigation', [
    'title'       => 'セクション背景',
    'priority'    => 160,
    'description' => '共通で使えるセクション背景（現在は NAVIGATION で使用）。動画またはPC/SP画像とオーバーレイ濃度を設定できます。',
  ]);

  // NAV: 動画
  $wp_customize->add_setting('ptl_nav_video', [
    'type'              => 'theme_mod',
    'transport'         => 'refresh',
    'sanitize_callback' => function ($v) {
      return is_numeric($v) ? (int)$v : esc_url_raw($v);
    },
  ]);
  if (class_exists('WP_Customize_Media_Control')) {
    $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'ptl_nav_video', [
      'label'     => 'セクション背景動画（MP4推奨）',
      'section'   => 'ptl_navigation',
      'mime_type' => 'video',
    ]));
  }

  // NAV: PC画像
  $wp_customize->add_setting('ptl_nav_bg_pc', [
    'type'              => 'theme_mod',
    'transport'         => 'refresh',
    'sanitize_callback' => 'esc_url_raw',
    'default'           => get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg',
  ]);
  if (class_exists('WP_Customize_Image_Control')) {
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'ptl_nav_bg_pc', [
      'label'   => 'PC用セクション背景画像',
      'section' => 'ptl_navigation',
    ]));
  }

  // NAV: SP画像
  $wp_customize->add_setting('ptl_nav_bg_sp', [
    'type'              => 'theme_mod',
    'transport'         => 'refresh',
    'sanitize_callback' => 'esc_url_raw',
    'default'           => get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg',
  ]);
  if (class_exists('WP_Customize_Image_Control')) {
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'ptl_nav_bg_sp', [
      'label'   => 'SP用セクション背景画像',
      'section' => 'ptl_navigation',
    ]));
  }

  // NAV: オーバーレイ濃度
  $wp_customize->add_setting('ptl_nav_overlay', [
    'type'              => 'theme_mod',
    'transport'         => 'refresh',
    'sanitize_callback' => function ($v) {
      $f = floatval($v);
      if ($f < 0) $f = 0;
      if ($f > 0.8) $f = 0.8;
      return $f;
    },
    'default'           => 0.25,
  ]);
  $wp_customize->add_control('ptl_nav_overlay', [
    'label'       => 'オーバーレイ濃度（0〜0.8）',
    'section'     => 'ptl_navigation',
    'type'        => 'number',
    'input_attrs' => [
      'min'  => 0,
      'max'  => 0.8,
      'step' => 0.01,
    ],
  ]);

  // NAV: パララックス速度
  $wp_customize->add_setting('ptl_nav_parallax_speed', [
    'type'              => 'theme_mod',
    'transport'         => 'refresh',
    'sanitize_callback' => function ($v) {
      $f = floatval($v);
      if ($f < 0) $f = 0.0;
      if ($f > 1) $f = 1.0;
      return $f;
    },
    'default'           => 0.6,
  ]);
  $wp_customize->add_control('ptl_nav_parallax_speed', [
    'label'       => 'パララックス速度（0〜1、1で追従なし）',
    'section'     => 'ptl_navigation',
    'type'        => 'number',
    'input_attrs' => [
      'min'  => 0,
      'max'  => 1,
      'step' => 0.05,
    ],
  ]);
});

/**
 * BUST-ISSUES専用背景のカスタマイザー設定
 */
add_action('customize_register', function (WP_Customize_Manager $wp_customize) {
  // BUST-ISSUESセクション（完全独立）
  $wp_customize->add_section('ptl_bust_issues', [
    'title'       => 'BUST-ISSUES背景',
    'priority'    => 161,
    'description' => 'BUST-ISSUES専用の背景設定（動画・画像・オーバーレイ・パララックス）',
  ]);

  // BUST-ISSUES: 動画
  $wp_customize->add_setting('ptl_bust_issues_video', [
    'type'              => 'theme_mod',
    'transport'         => 'refresh',
    'sanitize_callback' => function ($v) {
      return is_numeric($v) ? (int)$v : esc_url_raw($v);
    },
  ]);
  if (class_exists('WP_Customize_Media_Control')) {
    $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'ptl_bust_issues_video', [
      'label'     => '背景動画（MP4推奨）',
      'section'   => 'ptl_bust_issues',
      'mime_type' => 'video',
    ]));
  }

  // BUST-ISSUES: PC画像
  $wp_customize->add_setting('ptl_bust_issues_bg_pc', [
    'type'              => 'theme_mod',
    'transport'         => 'refresh',
    'sanitize_callback' => 'esc_url_raw',
    'default'           => get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg',
  ]);
  if (class_exists('WP_Customize_Image_Control')) {
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'ptl_bust_issues_bg_pc', [
      'label'   => 'PC用背景画像',
      'section' => 'ptl_bust_issues',
    ]));
  }

  // BUST-ISSUES: SP画像
  $wp_customize->add_setting('ptl_bust_issues_bg_sp', [
    'type'              => 'theme_mod',
    'transport'         => 'refresh',
    'sanitize_callback' => 'esc_url_raw',
    'default'           => get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg',
  ]);
  if (class_exists('WP_Customize_Image_Control')) {
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'ptl_bust_issues_bg_sp', [
      'label'   => 'SP用背景画像',
      'section' => 'ptl_bust_issues',
    ]));
  }

  // BUST-ISSUES: オーバーレイ濃度
  $wp_customize->add_setting('ptl_bust_issues_overlay', [
    'type'              => 'theme_mod',
    'transport'         => 'refresh',
    'sanitize_callback' => function ($v) {
      $f = floatval($v);
      if ($f < 0) $f = 0;
      if ($f > 0.8) $f = 0.8;
      return $f;
    },
    'default'           => 0.25,
  ]);
  $wp_customize->add_control('ptl_bust_issues_overlay', [
    'label'       => 'オーバーレイ濃度（0〜0.8）',
    'section'     => 'ptl_bust_issues',
    'type'        => 'number',
    'input_attrs' => [
      'min'  => 0,
      'max'  => 0.8,
      'step' => 0.01,
    ],
  ]);

  // BUST-ISSUES: パララックス速度
  $wp_customize->add_setting('ptl_bust_issues_parallax_speed', [
    'type'              => 'theme_mod',
    'transport'         => 'refresh',
    'sanitize_callback' => function ($v) {
      $f = floatval($v);
      if ($f < 0) $f = 0.0;
      if ($f > 1) $f = 1.0;
      return $f;
    },
    'default'           => 0.6,
  ]);
  $wp_customize->add_control('ptl_bust_issues_parallax_speed', [
    'label'       => 'パララックス速度（0〜1、1で追従なし）',
    'section'     => 'ptl_bust_issues',
    'type'        => 'number',
    'input_attrs' => [
      'min'  => 0,
      'max'  => 1,
      'step' => 0.05,
    ],
  ]);
});

// ===========================================
// INFO HUB セクション カスタマイザー設定
// ===========================================
add_action('customize_register', function (WP_Customize_Manager $wp_customize) {
  // セクション
  $wp_customize->add_section('ptl_infohub', [
    'title'    => 'INFO HUB',
    'priority' => 162,
  ]);

  // セクション表示/非表示
  $wp_customize->add_setting('ptl_infohub_show', [
    'default' => true,
    'sanitize_callback' => function ($v) {
      return (bool)$v;
    },
  ]);
  $wp_customize->add_control('ptl_infohub_show', [
    'label' => 'セクションを表示',
    'section' => 'ptl_infohub',
    'type' => 'checkbox',
  ]);

  // メインタイトル
  $wp_customize->add_setting('ptl_infohub_title', [
    'default' => 'INFO HUB',
    'sanitize_callback' => 'sanitize_text_field',
  ]);
  $wp_customize->add_control('ptl_infohub_title', [
    'label' => 'メインタイトル',
    'section' => 'ptl_infohub',
    'type' => 'text',
  ]);

  // 動画使用ON/OFF
  $wp_customize->add_setting('ptl_infohub_use_video', [
    'default' => false,
    'sanitize_callback' => function ($v) {
      return (bool)$v;
    },
  ]);
  $wp_customize->add_control('ptl_infohub_use_video', [
    'label' => '動画を使用',
    'section' => 'ptl_infohub',
    'type' => 'checkbox',
  ]);

  // 背景動画URL
  $wp_customize->add_setting('ptl_infohub_bg_video', [
    'default' => '',
    'sanitize_callback' => 'esc_url_raw',
  ]);
  if (class_exists('WP_Customize_Media_Control')) {
    $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'ptl_infohub_bg_video', [
      'label' => '背景動画（MP4推奨）',
      'section' => 'ptl_infohub',
      'mime_type' => 'video',
    ]));
  }

  // PC用背景画像
  $wp_customize->add_setting('ptl_infohub_bg_pc', [
    'default' => '',
    'sanitize_callback' => 'esc_url_raw',
  ]);
  if (class_exists('WP_Customize_Image_Control')) {
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'ptl_infohub_bg_pc', [
      'label' => 'PC用背景画像',
      'section' => 'ptl_infohub',
      'description' => '🔴 固定背景モード：スクロール時に背景が固定されます（推奨: 1920x1080px以上）',
    ]));
  }

  // SP用背景画像
  $wp_customize->add_setting('ptl_infohub_bg_sp', [
    'default' => '',
    'sanitize_callback' => 'esc_url_raw',
  ]);
  if (class_exists('WP_Customize_Image_Control')) {
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'ptl_infohub_bg_sp', [
      'label' => 'SP用背景画像',
      'section' => 'ptl_infohub',
    ]));
  }

  // オーバーレイ濃度
  $wp_customize->add_setting('ptl_infohub_overlay', [
    'default' => 0.25,
    'sanitize_callback' => function ($v) {
      $f = (float)$v;
      return max(0, min(0.8, $f));
    },
  ]);
  $wp_customize->add_control('ptl_infohub_overlay', [
    'label' => 'オーバーレイ濃度（0〜0.8）',
    'section' => 'ptl_infohub',
    'type' => 'number',
    'input_attrs' => [
      'min' => 0,
      'max' => 0.8,
      'step' => 0.05,
    ],
  ]);



  // カード1画像（BRIDAL）
  $wp_customize->add_setting('ptl_infohub_card1_image', [
    'default' => '',
    'sanitize_callback' => 'esc_url_raw',
  ]);
  if (class_exists('WP_Customize_Image_Control')) {
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'ptl_infohub_card1_image', [
      'label' => 'カード1画像（BRIDAL）',
      'section' => 'ptl_infohub',
    ]));
  }

  // カード2画像（INFORMATION）
  $wp_customize->add_setting('ptl_infohub_card2_image', [
    'default' => '',
    'sanitize_callback' => 'esc_url_raw',
  ]);
  if (class_exists('WP_Customize_Image_Control')) {
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'ptl_infohub_card2_image', [
      'label' => 'カード2画像（INFORMATION）',
      'section' => 'ptl_infohub',
    ]));
  }

  // カード3画像（FAQ）
  $wp_customize->add_setting('ptl_infohub_card3_image', [
    'default' => '',
    'sanitize_callback' => 'esc_url_raw',
  ]);
  if (class_exists('WP_Customize_Image_Control')) {
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'ptl_infohub_card3_image', [
      'label' => 'カード3画像（FAQ）',
      'section' => 'ptl_infohub',
    ]));
  }
});

// INFO HUB: 固定背景画像をCSS変数として出力
add_action('wp_head', function () {
  if (!is_front_page()) return;

  $bg_image = get_theme_mod('ptl_infohub_bg_pc', '');
  if (!$bg_image) return;

  echo '<style id="ptlHub-fixed-bg">';
  echo '.ptlHub { --infohub-bg-image: url(' . esc_url($bg_image) . '); }';
  echo '</style>' . "\n";
}, 101);

// ===========================================
// 【削除済み】BUST-ISSUES カスタマイザー重複（誤ってptl_nav_*を定義していた）
// → 474行目の正規BUST-ISSUES定義を使用
// ===========================================

/**
 * 共通セクション背景設定を取得（将来は他セクションでも再利用）
 * 既存の ptl_nav_* の theme_mod を利用しつつ、URLや数値IDを解決して返す。
 *
 * @return array{video_url:string,bg_pc:string,bg_sp:string,overlay:float}
 */
function ptl_get_common_section_bg(): array
{
  $video_mod = get_theme_mod('ptl_nav_video');
  $bg_pc     = (string) get_theme_mod('ptl_nav_bg_pc', get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg');
  $bg_sp     = (string) get_theme_mod('ptl_nav_bg_sp', get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg');
  $overlay   = (float) get_theme_mod('ptl_nav_overlay', 0.25);
  $p_speed   = (float) get_theme_mod('ptl_nav_parallax_speed', 0.6);

  // 動画URL解決（添付ID/URLいずれにも対応）
  $video_url = '';
  if (!empty($video_mod)) {
    if (is_numeric($video_mod)) {
      $u = wp_get_attachment_url((int) $video_mod);
      if ($u) $video_url = $u;
    } else {
      $video_url = esc_url_raw((string) $video_mod);
    }
  }

  if ($overlay < 0) $overlay = 0.0;
  if ($overlay > 0.8) $overlay = 0.8;
  if ($p_speed < 0) $p_speed = 0.0;
  if ($p_speed > 1) $p_speed = 1.0;

  return [
    'video_url' => $video_url,
    'bg_pc'     => $bg_pc,
    'bg_sp'     => $bg_sp,
    'overlay'   => $overlay,
    'parallax_speed' => $p_speed,
  ];
}

/**
 * ブロックエディタのコンテンツから、アンカーIDが一致するブロックを1つ探して描画するヘルパー。
 * 例: ptl_render_block_slot('brand-reason');
 */
function ptl_render_block_slot(string $anchor, $post = null)
{
  $post = get_post($post ?: get_the_ID());
  if (!$post) return;

  $html = ptl_get_block_by_anchor($post->post_content, $anchor);
  if ($html) echo $html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

/**
 * 指定アンカーを持つブロックを再帰的に探索してHTMLを返す
 */
function ptl_get_block_by_anchor(string $content, string $anchor)
{
  if (!has_blocks($content)) return '';
  $blocks = parse_blocks($content);
  $found = ptl_find_block_by_anchor_recursive($blocks, $anchor);
  return $found ? render_block($found) : '';
}

function ptl_find_block_by_anchor_recursive(array $blocks, string $anchor)
{
  foreach ($blocks as $block) {
    $attrs = isset($block['attrs']) ? $block['attrs'] : [];
    if (!empty($attrs['anchor']) && $attrs['anchor'] === $anchor) {
      return $block;
    }
    if (!empty($block['innerBlocks'])) {
      $inner = ptl_find_block_by_anchor_recursive($block['innerBlocks'], $anchor);
      if ($inner) return $inner;
    }
  }
  return null;
}

/**
 * ショートコード: [ptl_marquee images="1,2,3" speed="30" gap="24" height="200"]
 * - images: 添付IDまたはURLをカンマ区切り
 * - speed: アニメーション1ループの秒数（小さいほど速い）
 * - gap: 画像間の隙間(px)
 * - height: 画像の高さ(px)
 */
add_shortcode('ptl_marquee', function ($atts) {
  $atts = shortcode_atts([
    'images' => '',
    'speed'  => '30',
    'gap'    => '24',
    'height' => '200',
  ], $atts, 'ptl_marquee');

  $list = array_filter(array_map('trim', explode(',', (string) $atts['images'])));
  if (!$list) return '';

  $urls = [];
  foreach ($list as $token) {
    if (ctype_digit($token)) {
      $src = wp_get_attachment_image_src((int) $token, 'full');
      if (!empty($src[0])) $urls[] = $src[0];
    } else {
      $urls[] = esc_url_raw($token);
    }
  }
  if (!$urls) return '';

  $speed  = max(5, (int) $atts['speed']);
  $gap    = max(0, (int) $atts['gap']);
  $height = max(80, (int) $atts['height']);

  ob_start();
?>
  <div class="ptl-marquee" style="--duration: <?php echo esc_attr($speed); ?>s; --gap: <?php echo esc_attr($gap); ?>px; --height: <?php echo esc_attr($height); ?>px;">
    <div class="ptl-marquee__track" aria-hidden="true">
      <?php foreach ([$urls, $urls] as $dup): ?>
        <?php foreach ($dup as $u): ?>
          <div class="ptl-marquee__item"><img src="<?php echo esc_url($u); ?>" alt="" width="480" height="480" loading="lazy" decoding="async"></div>
        <?php endforeach; ?>
      <?php endforeach; ?>
    </div>
  </div>
<?php
  return ob_get_clean();
});

/**
 * ショートコード: [ptl_sns_buttons instagram="url" tiktok="url" youtube="url" x="url" facebook="url"]
 */
add_shortcode('ptl_sns_buttons', function ($atts) {
  $atts = shortcode_atts([
    'instagram' => '',
    'tiktok'    => '',
    'youtube'   => '',
    'x'         => '',
    'facebook'  => '',
  ], $atts, 'ptl_sns_buttons');

  $map = [
    'instagram' => 'fa-instagram',
    'tiktok'    => 'fa-tiktok',
    'youtube'   => 'fa-youtube',
    'x'         => 'fa-x-twitter',
    'facebook'  => 'fa-facebook',
  ];

  $items = [];
  foreach ($map as $key => $icon) {
    $url = trim((string) ($atts[$key] ?? ''));
    if ($url) {
      $items[] = ['url' => $url, 'icon' => $icon, 'label' => ucfirst($key)];
    }
  }
  if (!$items) return '';

  ob_start();
?>
  <ul class="ptl-sns" role="list">
    <?php foreach ($items as $it): ?>
      <li class="ptl-sns__item"><a class="ptl-sns__btn" href="<?php echo esc_url($it['url']); ?>" target="_blank" rel="noopener" aria-label="<?php echo esc_attr($it['label']); ?>">
          <i class="fa-brands <?php echo esc_attr($it['icon']); ?>" aria-hidden="true"></i>
        </a></li>
    <?php endforeach; ?>
  </ul>
<?php
  return ob_get_clean();
});

/**
 * NAVIGATION セクション専用のCSS/JSを子テーマからのみ読み込み
 * - 親テーマは不改変
 * - 読み込み順: 親 → 子 → セクション（このフックは既存の enqueue 後に実行される想定）
 */
add_action('wp_enqueue_scripts', function () {
  if (!is_front_page()) return; // DOM側で対象セレクタ存在チェックもJS側で実施

  // CSS（最後に読ませる）
  $nav_css_path = get_stylesheet_directory() . '/css/navigation.css';
  $nav_css_ver  = file_exists($nav_css_path) ? date('Ymdgis', filemtime($nav_css_path)) : null;
  wp_enqueue_style('ptl-navigation-style', get_stylesheet_directory_uri() . '/css/navigation.css', [], $nav_css_ver);

  // NAVIGATION PC版CSS（960px以上）
  $nav_pc_css = get_stylesheet_directory() . '/css/pc/navigation.css';
  if (file_exists($nav_pc_css)) {
    wp_enqueue_style('ptl-navigation-pc', get_stylesheet_directory_uri() . '/css/pc/navigation.css', ['ptl-navigation-style'], filemtime($nav_pc_css), 'screen and (min-width: 960px)');
  }

  // NAVIGATION SP版CSS（767px以下）
  $nav_sp_css = get_stylesheet_directory() . '/css/sp/navigation-sp.css';
  if (file_exists($nav_sp_css)) {
    wp_enqueue_style('ptl-navigation-sp', get_stylesheet_directory_uri() . '/css/sp/navigation-sp.css', ['ptl-navigation-style'], filemtime($nav_sp_css), 'screen and (max-width: 767px)');
  }

  // JS（統合版：navigation.js に ptl-nav-fix.js を統合済み）
  $nav_js_path = get_stylesheet_directory() . '/js/navigation.js';
  $nav_js_ver  = file_exists($nav_js_path) ? date('Ymdgis', filemtime($nav_js_path)) : null;
  wp_enqueue_script('ptl-navigation', get_stylesheet_directory_uri() . '/js/navigation.js', [], $nav_js_ver, true);

  // ========================================
  // セクション別CSS読み込みループ（INFO HUB, NEWS, FOOTER）
  // ========================================

  // ブレークポイント統一定義
  $breakpoint_pc = 'screen and (min-width: 960px)';
  $breakpoint_sp = 'screen and (max-width: 767px)';

  // セクション定義配列：[ファイルプレフィックス, ハンドル名基, 依存関係, SP suffix, JS相対パス]
  $sections = [
    ['section-infohub', 'ptlHub', ['child_style'], '-sp', null],  // JSはptl-parallax.jsに統合済み
    ['section-news', 'ptlNews', ['child_style'], '-sp', null],
  ];

  foreach ($sections as list($file_prefix, $handle, $deps, $sp_suffix, $js_file)) {
    // ベースCSS
    $base_path = get_stylesheet_directory() . "/css/{$file_prefix}.css";
    if (file_exists($base_path)) {
      wp_enqueue_style(
        $handle,
        get_stylesheet_directory_uri() . "/css/{$file_prefix}.css",
        $deps,
        filemtime($base_path)
      );

      // PC専用CSS
      $pc_path = get_stylesheet_directory() . "/css/pc/{$file_prefix}.css";
      if (file_exists($pc_path)) {
        wp_enqueue_style(
          "{$handle}-pc",
          get_stylesheet_directory_uri() . "/css/pc/{$file_prefix}.css",
          [$handle],
          filemtime($pc_path),
          $breakpoint_pc
        );
      }

      // SP専用CSS
      $sp_path = get_stylesheet_directory() . "/css/sp/{$file_prefix}{$sp_suffix}.css";
      if (file_exists($sp_path)) {
        wp_enqueue_style(
          "{$handle}-sp",
          get_stylesheet_directory_uri() . "/css/sp/{$file_prefix}{$sp_suffix}.css",
          [$handle],
          filemtime($sp_path),
          $breakpoint_sp
        );
      }

      // JSファイルがあれば読み込み
      if ($js_file) {
        $js_path = get_stylesheet_directory() . "/js/{$js_file}";
        if (file_exists($js_path)) {
          wp_enqueue_script($handle, get_stylesheet_directory_uri() . "/js/{$js_file}", [], filemtime($js_path), true);
        }
      }
    }
  }

  // BUST-ISSUESは共通のsection-parallax.jsを使用（ptlNavHeroクラス併用）
}, 20);

/**
 * ptl-navigation: PC パララックス強化（インラインCSS/JS）
 * - 親/子のenqueueは不変更
 * - DOMは .ptl-navigation 前提（動画 <video> にも対応）
 */
add_action('wp_enqueue_scripts', function () {
  if (!is_front_page()) return;

  // CSS（インライン）
  $css = <<<CSS
/* ptl-navigation: PC parallax boost */
.ptl-navigation { position: relative; overflow: clip; }

@media (min-width: 960px) {
  /* 背景画像を直接持つ .ptl-navigation 用 */
  .ptl-navigation {
    --ptl-parallax: 0px;
    background-position: 50% calc(50% + var(--ptl-parallax));
    background-size: 120% auto; /* 背景を縦方向に大きく見せる */
    will-change: background-position;
  }
  .ptl-navigation.ptl-has-video video {
    transform: translateY(var(--ptl-parallax)) scale(1.15);
    transform-origin: center;
    will-change: transform;
  }

  /* 子要素に video / image を持つ .ptlNavHero 用（既存DOMに追従） */
  .ptlNavHero { --ptl-parallax: 0px; }
  .ptlNavHero.ptl-has-video .ptlNavHero__video,
  .ptlNavHero.ptl-has-image .ptlNavHero__image img {
    transform: translateY(var(--ptl-parallax)) scale(1.12);
    transform-origin: center;
    will-change: transform;
  }
}

@media (max-width: 767px) {
  /* ③ SPカード縮小（.ptl-nav-collapsible 配下のみ） */
  .ptl-navigation .ptl-nav-collapsible,
  .ptlNavHero .ptl-nav-collapsible {
    /* gapは30-40%縮小（例: 24px -> 12-16px） */
    --ptl-gap: 14px;
    gap: var(--ptl-gap);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease;
  }
  
  /* ハンバーガーメニュー表示/非表示 */
  .ptl-nav-collapsible.is-open {
    max-height: 1000px;
  }
  
  /* ハンバーガーボタン */
  .ptl-nav-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    margin: 8px auto 16px;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    letter-spacing: 0.1em;
  }
  
  .ptl-nav-toggle__icon {
    position: relative;
    width: 24px;
    height: 2px;
    background: #fff;
    transition: all 0.3s ease;
    margin-top: 1px; /* テキストと中央揃え */
  }
  
  .ptl-nav-toggle__icon::before,
  .ptl-nav-toggle__icon::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: #fff;
    transition: all 0.3s ease;
    left: 0;
  }
  
  .ptl-nav-toggle__icon::before { top: -7px; }
  .ptl-nav-toggle__icon::after { bottom: -7px; }
  
  /* 開いたときのアイコン */
  .ptl-nav-toggle[aria-expanded="true"] .ptl-nav-toggle__icon {
    background: transparent;
  }
  
  .ptl-nav-toggle[aria-expanded="true"] .ptl-nav-toggle__icon::before {
    top: 0;
    transform: rotate(45deg);
  }
  
  .ptl-nav-toggle[aria-expanded="true"] .ptl-nav-toggle__icon::after {
    bottom: 0;
    transform: rotate(-45deg);
  }
  
  /* メニューテキスト調整 */
  .ptl-nav-toggle__text {
    font-weight: 500;
    letter-spacing: 0.1em;
    position: relative;
    top: 1px;
  }

  /* カード本体（既存命名に合わせて双方を網羅） */
  .ptl-nav-collapsible .ptlNavHero__btn,
  .ptl-nav-collapsible .ptl-navCard {
    /* 縦パディング40-50%縮小＆タップ最小確保 */
    padding-block: 10px;
    min-height: 44px;
  }

  /* アイコン縮小（35-45%） */
  .ptl-nav-collapsible .ptlNavHero__icon,
  .ptl-nav-collapsible .ptl-navCard__icon {
    width: 26px;
    height: 26px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .ptl-nav-collapsible .ptlNavHero__icon img,
  .ptl-nav-collapsible .ptlNavHero__icon svg,
  .ptl-nav-collapsible .ptl-navCard__icon img,
  .ptl-nav-collapsible .ptl-navCard__icon svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* テキスト可読性（12-14px, 行高1.25-1.35） */
  .ptl-nav-collapsible .ptlNavHero__label,
  .ptl-nav-collapsible .ptl-navCard__label {
    font-size: 13px;
    line-height: 1.3;
  }
}
CSS;

  // JS（インライン）
  $js = <<<JS
// パララックス処理は section-parallax.js に一本化済み
// SP向け：ナビ折り畳みの max-height 再計測（<=767pxのみ）
(function(){
  var mqSP = window.matchMedia('(max-width: 767px)');
  
  // ハンバーガーメニューの制御
  function setupToggle() {
    // 「page-navigation」セクション内のトグルボタンとメニューを取得
    var navToggle = document.querySelector('#page-navigation .ptl-nav-toggle');
    var navMenu = document.querySelector('#page-navigation #ptl-nav-menu');
    
    // ナビゲーションセクションのトグル設定
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function() {
        var expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        navMenu.classList.toggle('is-open');
        
        // 開いた直後にmax-heightを再計算
        if (!expanded) {
          setTimeout(recalc, 50);
        }
      });
    }
    
    // ISSUESセクション内のトグルボタンとメニューも取得（既に機能しているが念のため）
    var issuesToggle = document.querySelector('#bust-issues .ptl-nav-toggle');
    var issuesMenu = document.querySelector('#bust-issues #ptl-nav-menu');
    
    // ISSUESセクションのトグル設定
    if (issuesToggle && issuesMenu) {
      issuesToggle.addEventListener('click', function() {
        var expanded = issuesToggle.getAttribute('aria-expanded') === 'true';
        issuesToggle.setAttribute('aria-expanded', !expanded);
        issuesMenu.classList.toggle('is-open');
        
        // 開いた直後にmax-heightを再計算
        if (!expanded) {
          setTimeout(recalc, 50);
        }
      });
    }
  }

  function panelsIn(container){
    // よくある候補を包括（存在しない場合は無処理）
    return container.querySelectorAll('[style*="max-height"], .ptl-collapsible__panel, .is-open, details[open]');
  }

  function ensurePanelElement(node){
    // detailsの場合はsummary以外の直下要素を採用
    if (node && node.tagName && node.tagName.toLowerCase() === 'details') {
      return node.querySelector(':scope > :not(summary)') || node;
    }
    return node;
  }

  // スロットリング用変数
  var recalcTimer = null;
  var recalcRunning = false;

  function recalc(){
    if (!mqSP.matches) return;
    if (recalcRunning) return; // 実行中は無視
    
    recalcRunning = true;
    document.querySelectorAll('.ptl-nav-collapsible').forEach(function(c){
      panelsIn(c).forEach(function(p){
        var el = ensurePanelElement(p);
        if (!el) return;
        try {
          var h = el.scrollHeight;
          if (h && isFinite(h)) el.style.maxHeight = h + 'px';
        } catch(e) {}
      });
    });
    recalcRunning = false;
  }

  // スロットリング付きrecalc（300ms間隔で実行）
  function throttledRecalc(){
    if (recalcTimer) return;
    recalcTimer = setTimeout(function(){
      recalc();
      recalcTimer = null;
    }, 300);
  }

  // イベントフック：開閉・回転・リサイズ・フォント読み込み後
  window.addEventListener('resize', throttledRecalc);
  window.addEventListener('orientationchange', throttledRecalc);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function(){ recalc(); }).catch(function(){});
  }
  document.addEventListener('click', function(e){
    if (!mqSP.matches) return;
    var t = e.target && e.target.closest ? e.target.closest('.ptl-nav-collapsible') : null;
    if (t) setTimeout(recalc, 50);
  }, true);

  // 初期1フレーム後に実行
  setTimeout(recalc, 0);
  
  // DOMContentLoadedで初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupToggle);
  } else {
    setupToggle();
  }
})();
JS;

  // 既存のナビCSS/JSが読み込まれている前提で、インラインを追加
  if (wp_style_is('ptl-navigation-style', 'enqueued')) {
    wp_add_inline_style('ptl-navigation-style', $css);
  } else {
    // 後方互換：child_style に付与
    wp_add_inline_style('child_style', $css);
  }

  if (wp_script_is('ptl-navigation', 'enqueued')) {
    wp_add_inline_script('ptl-navigation', $js);
  } else {
    // 後方互換：child_section_parallax に付与（存在すれば）
    if (wp_script_is('child_section_parallax', 'enqueued')) {
      wp_add_inline_script('child_section_parallax', $js);
    } else {
      // 何も無ければ jQuery へ（最終手段）
      wp_add_inline_script('jquery-core', $js);
    }
  }
}, 25); // ベースのenqueue(20)の後に実行

/* === WordPress投稿画面カスタマイズ: 記事種別分類システム === */

// 標準投稿（post）に記事種別フィールドを追加
add_action('add_meta_boxes', function () {
  add_meta_box(
    'post_type_selector',
    '記事種別',
    'ptl_post_type_selector_callback',
    'post',
    'side',
    'high'
  );
});

function ptl_post_type_selector_callback($post)
{
  wp_nonce_field('ptl_post_type_selector', 'ptl_post_type_selector_nonce');

  $post_category = get_post_meta($post->ID, '_post_category', true);
  if (!$post_category) $post_category = 'news'; // デフォルトはニュース

  echo '<select name="post_category" id="post_category_select" style="width:100%;">';
  echo '<option value="news"' . selected($post_category, 'news', false) . '>📰 ニュース</option>';
  echo '<option value="uservoice"' . selected($post_category, 'uservoice', false) . '>⭐ お客様の声</option>';
  echo '<option value="blog"' . selected($post_category, 'blog', false) . '>📝 ブログ記事</option>';
  echo '</select>';
  echo '<p class="description">記事の種別を選択してください。<br>';
  echo '・<strong>ニュース</strong>：NEWSセクションに表示<br>';
  echo '・<strong>お客様の声</strong>：USER\'S VOICEセクションに表示<br>';
  echo '・<strong>ブログ記事</strong>：ブログセクションに表示</p>';
}

// お客様の声専用メタフィールドの条件表示
add_action('add_meta_boxes', function () {
  add_meta_box(
    'uservoice_details_conditional',
    'お客様の声詳細',
    'ptl_uservoice_conditional_meta_box_callback',
    'post',
    'normal',
    'high'
  );
});

function ptl_uservoice_conditional_meta_box_callback($post)
{
  wp_nonce_field('ptl_uservoice_conditional_meta', 'ptl_uservoice_conditional_nonce');

  $post_category = get_post_meta($post->ID, '_post_category', true);
  $customer_name = get_post_meta($post->ID, '_customer_name', true);
  $rating = get_post_meta($post->ID, '_rating', true);
  $customer_image = get_post_meta($post->ID, '_customer_image', true);
  $uservoice_title = get_post_meta($post->ID, '_uservoice_title', true);

  echo '<div id="uservoice-fields" style="display:' . ($post_category === 'uservoice' ? 'block' : 'none') . ';">';
  echo '<table class="form-table">';

  // 顧客名
  echo '<tr>';
  echo '<th><label for="customer_name">お客様名</label></th>';
  echo '<td><input type="text" id="customer_name" name="customer_name" value="' . esc_attr($customer_name) . '" style="width:100%;" /></td>';
  echo '</tr>';

  // 見出し
  echo '<tr>';
  echo '<th><label for="uservoice_title">見出し</label></th>';
  echo '<td><input type="text" id="uservoice_title" name="uservoice_title" value="' . esc_attr($uservoice_title) . '" style="width:100%;" placeholder="例: 一緒に働けて良かった！" /></td>';
  echo '</tr>';

  // 星評価（クリック式の5つ星UI）
  echo '<tr>';
  echo '<th><label for="rating">星評価</label></th>';
  echo '<td>';
  echo '<input type="hidden" id="rating" name="rating" value="' . esc_attr($rating) . '" />';
  echo '<div class="ptl-star-rating" style="display: flex; gap: 5px; font-size: 28px; cursor: pointer;">';
  for ($i = 1; $i <= 5; $i++) {
    $filled = ($i <= $rating) ? 'filled' : '';
    echo '<span class="ptl-star ' . $filled . '" data-value="' . $i . '" style="color: ' . ($i <= $rating ? '#FFD700' : '#ddd') . '; transition: color 0.2s;">★</span>';
  }
  echo '</div>';
  echo '<p style="margin-top: 8px; color: #666; font-size: 13px;">星をクリックして評価を選択してください（現在: <span id="rating-display">' . ($rating ? $rating : '0') . '</span>個）</p>';
  echo '</td>';
  echo '</tr>';

  // 星評価のJavaScript
  echo '<script>
  (function($) {
    $(document).ready(function() {
      const stars = $(".ptl-star");
      const ratingInput = $("#rating");
      const ratingDisplay = $("#rating-display");
      
      // 星をクリック
      stars.on("click", function() {
        const value = $(this).data("value");
        ratingInput.val(value);
        ratingDisplay.text(value);
        updateStars(value);
      });
      
      // 星にホバー
      stars.on("mouseenter", function() {
        const value = $(this).data("value");
        updateStars(value);
      });
      
      // ホバー解除で元に戻す
      $(".ptl-star-rating").on("mouseleave", function() {
        const currentValue = ratingInput.val();
        updateStars(currentValue);
      });
      
      // 星の表示を更新
      function updateStars(value) {
        stars.each(function(index) {
          if (index < value) {
            $(this).css("color", "#FFD700").addClass("filled");
          } else {
            $(this).css("color", "#ddd").removeClass("filled");
          }
        });
      }
    });
  })(jQuery);
  </script>';

  // 顧客画像
  echo '<tr>';
  echo '<th><label for="customer_image">お客様画像</label></th>';
  echo '<td>';
  echo '<input type="hidden" id="customer_image" name="customer_image" value="' . esc_attr($customer_image) . '" />';
  echo '<button type="button" class="button" id="upload_image_button">画像を選択</button>';
  echo '<button type="button" class="button" id="remove_image_button" style="margin-left: 10px;">画像を削除</button>';
  echo '<div id="image_preview" style="margin-top: 10px;">';
  if ($customer_image) {
    $image_url = wp_get_attachment_url($customer_image);
    if ($image_url) {
      echo '<img src="' . esc_url($image_url) . '" style="max-width: 120px; height: auto;" />';
    }
  }
  echo '</div>';
  echo '</td>';
  echo '</tr>';

  echo '</table>';
  echo '</div>';

  // JavaScript for conditional display and image upload
  echo '<script>
jQuery(document).ready(function($) {
  // 記事種別変更時の表示切替
  $("#post_category_select").change(function() {
    if ($(this).val() === "uservoice") {
      $("#uservoice-fields").show();
    } else {
      $("#uservoice-fields").hide();
    }
  });
  
  // 画像アップロード機能
  var mediaUploader;
  $("#upload_image_button").click(function(e) {
    e.preventDefault();
    if (mediaUploader) {
      mediaUploader.open();
      return;
    }
    mediaUploader = wp.media({
      title: "お客様画像を選択",
      button: { text: "この画像を使用" },
      multiple: false
    });
    mediaUploader.on("select", function() {
      var attachment = mediaUploader.state().get("selection").first().toJSON();
      $("#customer_image").val(attachment.id);
      $("#image_preview").html("<img src=\"" + attachment.url + "\" style=\"max-width: 120px; height: auto;\" />");
    });
    mediaUploader.open();
  });
  
  $("#remove_image_button").click(function(e) {
    e.preventDefault();
    $("#customer_image").val("");
    $("#image_preview").html("");
  });
});
</script>';
}

// メタデータ保存
add_action('save_post', function ($post_id) {
  // 記事種別の保存
  if (isset($_POST['ptl_post_type_selector_nonce']) && wp_verify_nonce($_POST['ptl_post_type_selector_nonce'], 'ptl_post_type_selector')) {
    if (!defined('DOING_AUTOSAVE') || !DOING_AUTOSAVE) {
      if (current_user_can('edit_post', $post_id) && isset($_POST['post_category'])) {
        update_post_meta($post_id, '_post_category', sanitize_text_field($_POST['post_category']));
      }
    }
  }

  // お客様の声詳細の保存
  if (isset($_POST['ptl_uservoice_conditional_nonce']) && wp_verify_nonce($_POST['ptl_uservoice_conditional_nonce'], 'ptl_uservoice_conditional_meta')) {
    if (!defined('DOING_AUTOSAVE') || !DOING_AUTOSAVE) {
      if (current_user_can('edit_post', $post_id)) {
        if (isset($_POST['customer_name'])) {
          update_post_meta($post_id, '_customer_name', sanitize_text_field($_POST['customer_name']));
        }
        if (isset($_POST['rating'])) {
          update_post_meta($post_id, '_rating', absint($_POST['rating']));
        }
        if (isset($_POST['customer_image'])) {
          update_post_meta($post_id, '_customer_image', absint($_POST['customer_image']));
        }
        if (isset($_POST['uservoice_title'])) {
          update_post_meta($post_id, '_uservoice_title', sanitize_text_field($_POST['uservoice_title']));
        }
      }
    }
  }
});

// 管理画面の投稿一覧に記事種別カラムを追加
add_filter('manage_posts_columns', function ($columns) {
  $new_columns = [];
  foreach ($columns as $key => $value) {
    $new_columns[$key] = $value;
    if ($key === 'title') {
      $new_columns['post_category'] = '記事種別';
    }
  }
  return $new_columns;
});

// 記事種別カラムの内容を表示
add_action('manage_posts_custom_column', function ($column, $post_id) {
  if ($column === 'post_category') {
    $category = get_post_meta($post_id, '_post_category', true);
    switch ($category) {
      case 'news':
        echo '<span style="color: #d63638; font-weight: bold;">📰 ニュース</span>';
        break;
      case 'uservoice':
        echo '<span style="color: #00a32a; font-weight: bold;">⭐ お客様の声</span>';
        break;
      case 'blog':
        echo '<span style="color: #0073aa; font-weight: bold;">📝 ブログ記事</span>';
        break;
      default:
        echo '<span style="color: #999;">❓ 未設定</span>';
        break;
    }
  }
}, 10, 2);

// 記事種別でのフィルタリング機能
add_action('restrict_manage_posts', function () {
  global $typenow;
  if ($typenow === 'post') {
    $selected = isset($_GET['post_category']) ? $_GET['post_category'] : '';
    echo '<select name="post_category">';
    echo '<option value="">すべての記事種別</option>';
    echo '<option value="news"' . selected($selected, 'news', false) . '>📰 ニュース</option>';
    echo '<option value="uservoice"' . selected($selected, 'uservoice', false) . '>⭐ お客様の声</option>';
    echo '<option value="blog"' . selected($selected, 'blog', false) . '>📝 ブログ記事</option>';
    echo '</select>';
  }
});

// フィルタリングクエリ
add_filter('parse_query', function ($query) {
  global $pagenow;
  if ($pagenow === 'edit.php' && isset($_GET['post_category']) && $_GET['post_category'] !== '') {
    $query->query_vars['meta_key'] = '_post_category';
    $query->query_vars['meta_value'] = $_GET['post_category'];
  }
});

// フロントエンド表示振り分け関数
function ptl_get_news_posts($limit = 5)
{
  return get_posts([
    'post_type' => 'post',
    'posts_per_page' => $limit,
    'post_status' => 'publish',
    'meta_query' => [
      [
        'key' => '_post_category',
        'value' => 'news',
        'compare' => '='
      ]
    ],
    'orderby' => 'date',
    'order' => 'DESC'
  ]);
}

function ptl_get_blog_posts($limit = 10)
{
  return get_posts([
    'post_type' => 'post',
    'posts_per_page' => $limit,
    'post_status' => 'publish',
    'meta_query' => [
      [
        'key' => '_post_category',
        'value' => 'blog',
        'compare' => '='
      ]
    ],
    'orderby' => 'date',
    'order' => 'DESC'
  ]);
}

function ptl_get_uservoice_posts($limit = 6)
{
  return get_posts([
    'post_type' => 'post',
    'posts_per_page' => $limit,
    'post_status' => 'publish',
    'meta_query' => [
      [
        'key' => '_post_category',
        'value' => 'uservoice',
        'compare' => '='
      ]
    ],
    'orderby' => 'date',
    'order' => 'DESC'
  ]);
}

function ptl_get_all_uservoice_posts($limit = 6)
{
  // 新しい投稿（_post_category = 'uservoice'）と既存のuservoiceカスタム投稿タイプを統合
  $new_uservoice = ptl_get_uservoice_posts($limit);
  $old_uservoice = get_posts([
    'post_type' => 'uservoice',
    'posts_per_page' => $limit,
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC'
  ]);

  // 両方の投稿を日付でソートして統合
  $all_posts = array_merge($new_uservoice, $old_uservoice);
  usort($all_posts, function ($a, $b) {
    return strtotime($b->post_date) - strtotime($a->post_date);
  });

  return array_slice($all_posts, 0, $limit);
}

// 既存uservoice投稿の移行用管理画面
add_action('admin_menu', function () {
  add_management_page(
    'お客様の声移行ツール',
    'お客様の声移行',
    'manage_options',
    'uservoice_migration',
    'ptl_uservoice_migration_page'
  );
});

// 投稿を記事種別ごとにサブメニュー表示
add_action('admin_menu', function () {
  $types = array(
    'news'      => 'ニュース',
    'uservoice' => 'お客様の声',
    'blog'      => 'ブログ記事',
  );
  foreach ($types as $slug => $label) {
    add_submenu_page(
      'edit.php',
      $label,
      '　' . $label,
      'edit_posts',
      'edit.php?article_type=' . $slug
    );
  }
});

function ptl_uservoice_migration_page()
{
  if (isset($_POST['migrate_uservoice']) && wp_verify_nonce($_POST['migrate_nonce'], 'migrate_uservoice')) {
    ptl_migrate_uservoice_posts();
    echo '<div class="notice notice-success"><p>お客様の声の移行が完了しました。</p></div>';
  }

  $old_uservoice_count = wp_count_posts('uservoice')->publish;
  $new_uservoice_count = count(ptl_get_uservoice_posts(-1));

  echo '<div class="wrap">';
  echo '<h1>お客様の声移行ツール</h1>';
  echo '<p>既存のuservoiceカスタム投稿タイプから新しい投稿システムへの移行を行います。</p>';
  echo '<table class="widefat">';
  echo '<tr><th>既存のuservoice投稿数</th><td>' . $old_uservoice_count . '件</td></tr>';
  echo '<tr><th>新システムのお客様の声投稿数</th><td>' . $new_uservoice_count . '件</td></tr>';
  echo '</table>';

  if ($old_uservoice_count > 0) {
    echo '<form method="post">';
    wp_nonce_field('migrate_uservoice', 'migrate_nonce');
    echo '<p><input type="submit" name="migrate_uservoice" class="button button-primary" value="移行を実行する" onclick="return confirm(\'移行を実行しますか？この操作は取り消せません。\')"></p>';
    echo '</form>';
  }
  echo '</div>';
}

function ptl_migrate_uservoice_posts()
{
  $uservoice_posts = get_posts([
    'post_type' => 'uservoice',
    'posts_per_page' => -1,
    'post_status' => 'publish'
  ]);

  foreach ($uservoice_posts as $post) {
    // 新しい標準投稿として作成
    $new_post = [
      'post_title' => $post->post_title,
      'post_content' => $post->post_content,
      'post_excerpt' => $post->post_excerpt,
      'post_status' => 'publish',
      'post_type' => 'post',
      'post_date' => $post->post_date,
      'meta_input' => [
        '_post_category' => 'uservoice',
        '_customer_name' => get_post_meta($post->ID, '_customer_name', true),
        '_rating' => get_post_meta($post->ID, '_rating', true),
        '_customer_image' => get_post_meta($post->ID, '_customer_image', true),
        '_uservoice_title' => get_post_meta($post->ID, '_uservoice_title', true),
        '_migrated_from_uservoice' => $post->ID
      ]
    ];

    $new_post_id = wp_insert_post($new_post);

    // アイキャッチ画像も移行
    $thumbnail_id = get_post_thumbnail_id($post->ID);
    if ($thumbnail_id) {
      set_post_thumbnail($new_post_id, $thumbnail_id);
    }

    // 元の投稿にマークを付ける
    update_post_meta($post->ID, '_migrated_to_post', $new_post_id);
  }
}

/* === 既存お客様の声 カスタム投稿タイプ（統合管理用に保持） === */

// お客様の声カスタム投稿タイプを登録（優先度を上げて確実に登録）
add_action('init', function () {
  $labels = [
    'name' => 'お客様の声',
    'singular_name' => 'お客様の声',
    'menu_name' => 'お客様の声',
    'add_new' => '新規追加',
    'add_new_item' => '新しいお客様の声を追加',
    'edit_item' => 'お客様の声を編集',
    'new_item' => '新しいお客様の声',
    'view_item' => 'お客様の声を表示',
    'view_items' => 'お客様の声一覧',
    'search_items' => 'お客様の声を検索',
    'not_found' => 'お客様の声が見つかりませんでした',
    'not_found_in_trash' => 'ゴミ箱にお客様の声が見つかりませんでした',
    'all_items' => 'お客様の声一覧',
  ];

  $args = [
    'label' => 'お客様の声',
    'labels' => $labels,
    'description' => 'お客様からいただいた声を管理します',
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true,
    'show_in_menu' => true,
    'show_in_admin_bar' => true,
    'show_in_nav_menus' => true,
    'show_in_rest' => true,
    'has_archive' => false,
    'hierarchical' => false,
    'rewrite' => ['slug' => 'uservoice', 'with_front' => false],
    'query_var' => true,
    'menu_position' => 5,
    'menu_icon' => 'dashicons-star-filled',
    'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    'capability_type' => 'post',
    'capabilities' => [
      'edit_post' => 'edit_posts',
      'edit_posts' => 'edit_posts',
      'edit_others_posts' => 'edit_others_posts',
      'publish_posts' => 'publish_posts',
      'read_post' => 'read',
      'read_private_posts' => 'read_private_posts',
      'delete_post' => 'delete_posts',
    ],
  ];

  register_post_type('uservoice', $args);
}, 0); // 優先度0で最優先実行

// パーマリンク設定の更新（テーマ有効化時）
add_action('after_switch_theme', function () {
  flush_rewrite_rules();
});

// お客様の声のメタボックスを追加
add_action('add_meta_boxes', function () {
  add_meta_box(
    'uservoice_details',
    'お客様の声詳細',
    'ptl_uservoice_meta_box_callback',
    'uservoice',
    'normal',
    'high'
  );
});

// メタボックスのHTML出力
function ptl_uservoice_meta_box_callback($post)
{
  wp_nonce_field('ptl_uservoice_meta_box', 'ptl_uservoice_meta_box_nonce');

  $customer_name = get_post_meta($post->ID, '_customer_name', true);
  $rating = get_post_meta($post->ID, '_rating', true);
  $customer_image = get_post_meta($post->ID, '_customer_image', true);
  $uservoice_title = get_post_meta($post->ID, '_uservoice_title', true);

  echo '<table class="form-table">';

  // 顧客名
  echo '<tr>';
  echo '<th><label for="customer_name">顧客名</label></th>';
  echo '<td><input type="text" id="customer_name" name="customer_name" value="' . esc_attr($customer_name) . '" style="width:100%;" /></td>';
  echo '</tr>';

  // 見出し
  echo '<tr>';
  echo '<th><label for="uservoice_title">見出し</label></th>';
  echo '<td><input type="text" id="uservoice_title" name="uservoice_title" value="' . esc_attr($uservoice_title) . '" style="width:100%;" placeholder="例: Amazing customer service！" /></td>';
  echo '</tr>';

  // 星評価（クリック式の5つ星UI - カスタム投稿タイプ用）
  echo '<tr>';
  echo '<th><label for="rating_uservoice">星評価</label></th>';
  echo '<td>';
  echo '<input type="hidden" id="rating_uservoice" name="rating" value="' . esc_attr($rating) . '" />';
  echo '<div class="ptl-star-rating-uservoice" style="display: flex; gap: 5px; font-size: 28px; cursor: pointer;">';
  for ($i = 1; $i <= 5; $i++) {
    $filled = ($i <= $rating) ? 'filled' : '';
    echo '<span class="ptl-star-uv ' . $filled . '" data-value="' . $i . '" style="color: ' . ($i <= $rating ? '#FFD700' : '#ddd') . '; transition: color 0.2s;">★</span>';
  }
  echo '</div>';
  echo '<p style="margin-top: 8px; color: #666; font-size: 13px;">星をクリックして評価を選択してください（現在: <span id="rating-display-uv">' . ($rating ? $rating : '0') . '</span>個）</p>';
  echo '</td>';
  echo '</tr>';

  // 星評価のJavaScript（カスタム投稿タイプ用）
  echo '<script>
  (function($) {
    $(document).ready(function() {
      const stars = $(".ptl-star-uv");
      const ratingInput = $("#rating_uservoice");
      const ratingDisplay = $("#rating-display-uv");
      
      // 星をクリック
      stars.on("click", function() {
        const value = $(this).data("value");
        ratingInput.val(value);
        ratingDisplay.text(value);
        updateStars(value);
      });
      
      // 星にホバー
      stars.on("mouseenter", function() {
        const value = $(this).data("value");
        updateStars(value);
      });
      
      // ホバー解除で元に戻す
      $(".ptl-star-rating-uservoice").on("mouseleave", function() {
        const currentValue = ratingInput.val();
        updateStars(currentValue);
      });
      
      // 星の表示を更新
      function updateStars(value) {
        stars.each(function(index) {
          if (index < value) {
            $(this).css("color", "#FFD700").addClass("filled");
          } else {
            $(this).css("color", "#ddd").removeClass("filled");
          }
        });
      }
    });
  })(jQuery);
  </script>';

  // 顧客画像
  echo '<tr>';
  echo '<th><label for="customer_image">顧客画像</label></th>';
  echo '<td>';
  echo '<input type="hidden" id="customer_image" name="customer_image" value="' . esc_attr($customer_image) . '" />';
  echo '<button type="button" class="button" id="upload_image_button">画像を選択</button>';
  echo '<button type="button" class="button" id="remove_image_button" style="margin-left: 10px;">画像を削除</button>';
  echo '<div id="image_preview" style="margin-top: 10px;">';
  if ($customer_image) {
    $image_url = wp_get_attachment_url($customer_image);
    if ($image_url) {
      echo '<img src="' . esc_url($image_url) . '" style="max-width: 120px; height: auto;" />';
    }
  }
  echo '</div>';
  echo '</td>';
  echo '</tr>';

  echo '</table>';

  // JavaScript for image upload
  echo '<script>
jQuery(document).ready(function($) {
  var mediaUploader;
  
  $("#upload_image_button").click(function(e) {
    e.preventDefault();
    
    if (mediaUploader) {
      mediaUploader.open();
      return;
    }
    
    mediaUploader = wp.media({
      title: "顧客画像を選択",
      button: {
        text: "この画像を使用"
      },
      multiple: false
    });
    
    mediaUploader.on("select", function() {
      var attachment = mediaUploader.state().get("selection").first().toJSON();
      $("#customer_image").val(attachment.id);
      $("#image_preview").html("<img src=\"" + attachment.url + "\" style=\"max-width: 120px; height: auto;\" />");
    });
    
    mediaUploader.open();
  });
  
  $("#remove_image_button").click(function(e) {
    e.preventDefault();
    $("#customer_image").val("");
    $("#image_preview").html("");
  });
});
</script>';
}

// メタボックスのデータ保存
add_action('save_post', function ($post_id) {
  if (!isset($_POST['ptl_uservoice_meta_box_nonce'])) return;
  if (!wp_verify_nonce($_POST['ptl_uservoice_meta_box_nonce'], 'ptl_uservoice_meta_box')) return;
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
  if (isset($_POST['post_type']) && 'uservoice' == $_POST['post_type']) {
    if (!current_user_can('edit_page', $post_id)) return;
  } else {
    if (!current_user_can('edit_post', $post_id)) return;
  }

  if (isset($_POST['customer_name'])) {
    update_post_meta($post_id, '_customer_name', sanitize_text_field($_POST['customer_name']));
  }
  if (isset($_POST['rating'])) {
    update_post_meta($post_id, '_rating', absint($_POST['rating']));
  }
  if (isset($_POST['customer_image'])) {
    update_post_meta($post_id, '_customer_image', absint($_POST['customer_image']));
  }
  if (isset($_POST['uservoice_title'])) {
    update_post_meta($post_id, '_uservoice_title', sanitize_text_field($_POST['uservoice_title']));
  }
});

// 管理画面の投稿一覧にカスタムカラムを追加
add_filter('manage_uservoice_posts_columns', function ($columns) {
  $new_columns = [];
  $new_columns['cb'] = $columns['cb'];
  $new_columns['title'] = $columns['title'];
  $new_columns['customer_name'] = '顧客名';
  $new_columns['rating'] = '評価';
  $new_columns['date'] = $columns['date'];
  return $new_columns;
});

// カスタムカラムの内容を表示
add_action('manage_uservoice_posts_custom_column', function ($column, $post_id) {
  switch ($column) {
    case 'customer_name':
      echo esc_html(get_post_meta($post_id, '_customer_name', true));
      break;
    case 'rating':
      $rating = get_post_meta($post_id, '_rating', true);
      if ($rating) {
        echo str_repeat('★', $rating) . ' (' . $rating . '/5)';
      }
      break;
  }
}, 10, 2);

// （旧）お客様の声スライダーのスクリプトエンキューは削除済み。新ブロックで管理。

// お客様の声セクション用の CSS/JS をフロントページで登録・エンキュー（末尾に追記のみ）

add_action('wp_enqueue_scripts', function () {

  // Swiper CDN を登録（未登録なら）
  if (! wp_style_is('swiper', 'registered')) {
    wp_register_style('swiper', 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css', [], '8.4.7');
  }
  if (! wp_script_is('swiper', 'registered')) {
    wp_register_script('swiper', 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js', [], '8.4.7', true);
  }

  // お客様の声 CSS（PC/SP分離対応）
  $css = get_stylesheet_directory() . '/css/section-uservoice.css';
  if (file_exists($css) && ! wp_style_is('ptl-uservoice', 'enqueued')) {
    wp_enqueue_style('ptl-uservoice', get_stylesheet_directory_uri() . '/css/section-uservoice.css', ['child_style', 'swiper'], filemtime($css));
  }

  // お客様の声 - PC専用CSS
  $uservoice_pc = get_stylesheet_directory() . '/css/pc/section-uservoice.css';
  if (file_exists($uservoice_pc)) {
    wp_enqueue_style('ptl-uservoice-pc', get_stylesheet_directory_uri() . '/css/pc/section-uservoice.css', ['ptl-uservoice'], filemtime($uservoice_pc), 'screen and (min-width: 960px)');
  }

  // お客様の声 - SP専用CSS（タブレット含む）
  $uservoice_sp = get_stylesheet_directory() . '/css/sp/section-uservoice-sp.css';
  if (file_exists($uservoice_sp)) {
    wp_enqueue_style('ptl-uservoice-sp', get_stylesheet_directory_uri() . '/css/sp/section-uservoice-sp.css', ['ptl-uservoice'], filemtime($uservoice_sp), 'screen and (max-width: 959px)');
  }

  // お客様の声 JS（Swiperに依存）
  $js = get_stylesheet_directory() . '/js/uservoice-slider.js';
  if (file_exists($js) && ! wp_script_is('ptl-uservoice', 'enqueued')) {
    wp_enqueue_script('ptl-uservoice', get_stylesheet_directory_uri() . '/js/uservoice-slider.js', ['swiper'], filemtime($js), true);
  }

  // INTRO Section CSS（PC/SP分離対応）
  $intro_css = get_stylesheet_directory() . '/css/section-intro.css';
  if (file_exists($intro_css)) {
    wp_enqueue_style(
      'ptl_section_intro',
      get_stylesheet_directory_uri() . '/css/section-intro.css',
      ['child_style'],
      filemtime($intro_css)
    );
  }

  // INTRO - PC専用CSS
  $intro_pc = get_stylesheet_directory() . '/css/pc/section-intro.css';
  if (file_exists($intro_pc)) {
    wp_enqueue_style('ptlIntro-pc', get_stylesheet_directory_uri() . '/css/pc/section-intro.css', ['ptl_section_intro'], filemtime($intro_pc), 'screen and (min-width: 768px)');
  }

  // INTRO - SP専用CSS
  $intro_sp = get_stylesheet_directory() . '/css/sp/section-intro-sp.css';
  if (file_exists($intro_sp)) {
    wp_enqueue_style('ptlIntro-sp', get_stylesheet_directory_uri() . '/css/sp/section-intro-sp.css', ['ptl_section_intro'], filemtime($intro_sp), 'screen and (max-width: 767px)');
  }
}, 30);

// INTRO Section - Customizer Registration
add_action('customize_register', 'ptl_intro_register_customizer');
function ptl_intro_register_customizer($wp_customize)
{
  // Add Patolaqshe Panel if not exists
  if (!$wp_customize->get_panel('patolaqshe_panel')) {
    $wp_customize->add_panel('patolaqshe_panel', [
      'title' => 'Patolaqshe',
      'priority' => 30,
    ]);
  }

  // Add INTRO Section
  $wp_customize->add_section('ptl_intro_section', [
    'title' => 'INTRO',
    'priority' => 20,
  ]);

  // Show/Hide Control
  $wp_customize->add_setting('ptl_intro_show', [
    'default' => true,
    'sanitize_callback' => 'ptl_sanitize_checkbox',
  ]);
  $wp_customize->add_control('ptl_intro_show', [
    'type' => 'checkbox',
    'section' => 'ptl_intro_section',
    'label' => 'セクションを表示',
  ]);

  // Media Type Toggle
  $wp_customize->add_setting('ptl_intro_use_video', [
    'default' => false,
    'sanitize_callback' => 'ptl_sanitize_checkbox',
  ]);
  $wp_customize->add_control('ptl_intro_use_video', [
    'type' => 'checkbox',
    'section' => 'ptl_intro_section',
    'label' => '動画を使用',
  ]);

  // Background Image
  $wp_customize->add_setting('ptl_intro_bg_image', [
    'default' => '',
    'sanitize_callback' => 'esc_url_raw',
  ]);
  $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'ptl_intro_bg_image', [
    'label' => '背景画像',
    'section' => 'ptl_intro_section',
  ]));

  // Background Video
  $wp_customize->add_setting('ptl_intro_bg_video', [
    'default' => '',
    'sanitize_callback' => 'esc_url_raw',
  ]);
  $wp_customize->add_control('ptl_intro_bg_video', [
    'type' => 'url',
    'section' => 'ptl_intro_section',
    'label' => '背景動画URL',
  ]);

  // Brand Text
  $wp_customize->add_setting('ptl_intro_brand_text', [
    'default' => 'Patolaqshe',
    'sanitize_callback' => 'sanitize_text_field',
  ]);
  $wp_customize->add_control('ptl_intro_brand_text', [
    'type' => 'text',
    'section' => 'ptl_intro_section',
    'label' => 'ブランド名',
  ]);

  // Subtitle
  $wp_customize->add_setting('ptl_intro_subtitle', [
    'default' => 'BEAUTY & WELLNESS',
    'sanitize_callback' => 'sanitize_text_field',
  ]);
  $wp_customize->add_control('ptl_intro_subtitle', [
    'type' => 'text',
    'section' => 'ptl_intro_section',
    'label' => 'サブタイトル',
  ]);

  // Title
  $wp_customize->add_setting('ptl_intro_title', [
    'default' => 'あなたの美しさを<br>最大限に引き出す',
    'sanitize_callback' => 'wp_kses_post',
  ]);
  $wp_customize->add_control('ptl_intro_title', [
    'type' => 'textarea',
    'section' => 'ptl_intro_section',
    'label' => 'メインタイトル',
  ]);

  // Description
  $wp_customize->add_setting('ptl_intro_description', [
    'default' => '私たちは一人ひとりのお客様に寄り添い、個別のニーズに合わせた最高の美容体験をご提供いたします。最新の技術と豊富な経験により、あなたの理想を現実に変えるお手伝いをさせていただきます。',
    'sanitize_callback' => 'wp_kses_post',
  ]);
  $wp_customize->add_control('ptl_intro_description', [
    'type' => 'textarea',
    'section' => 'ptl_intro_section',
    'label' => '説明文',
  ]);



  // CTA URL
  $wp_customize->add_setting('ptl_intro_cta_url', [
    'default' => '#',
    'sanitize_callback' => 'esc_url_raw',
  ]);
  $wp_customize->add_control('ptl_intro_cta_url', [
    'type' => 'url',
    'section' => 'ptl_intro_section',
    'label' => 'ボタンリンク先',
  ]);

  // Overlay Color Type
  $wp_customize->add_setting('ptl_intro_overlay_color', [
    'default' => 'white',
    'sanitize_callback' => function ($value) {
      return in_array($value, ['white', 'black']) ? $value : 'white';
    },
  ]);
  $wp_customize->add_control('ptl_intro_overlay_color', [
    'type' => 'select',
    'section' => 'ptl_intro_section',
    'label' => 'オーバーレイの色',
    'choices' => [
      'white' => '白',
      'black' => '黒',
    ],
  ]);

  // Overlay Opacity
  $wp_customize->add_setting('ptl_intro_overlay_opacity', [
    'default' => 30,
    'sanitize_callback' => function ($value) {
      return max(0, min(100, intval($value)));
    },
  ]);
  $wp_customize->add_control('ptl_intro_overlay_opacity', [
    'type' => 'range',
    'section' => 'ptl_intro_section',
    'label' => 'オーバーレイの透明度（%）',
    'description' => '0%=完全透明、100%=完全不透明',
    'input_attrs' => [
      'min' => 0,
      'max' => 100,
      'step' => 5,
    ],
  ]);

  // Margin設定は削除：style.cssで統一管理
}

// INTRO Section - Shortcode
add_shortcode('ptl_intro', 'ptl_intro_shortcode');
function ptl_intro_shortcode($atts = [])
{
  ob_start();
  get_template_part('template-parts/front/section', 'intro');
  return ob_get_clean();
}

// Sanitize checkbox helper
if (!function_exists('ptl_sanitize_checkbox')) {
  function ptl_sanitize_checkbox($checked)
  {
    return ((isset($checked) && true == $checked) ? true : false);
  }
}

/* ========================================
   BLOG セクション
======================================== */

// CSS/JSのエンキュー
add_action('wp_enqueue_scripts', function () {
  if (!is_front_page()) return;

  // CSS（PC/SP分離対応）
  $blog_css = get_stylesheet_directory() . '/css/section-blog.css';
  if (file_exists($blog_css)) {
    wp_enqueue_style(
      'ptl-blog',
      get_stylesheet_directory_uri() . '/css/section-blog.css',
      ['child_style'],
      filemtime($blog_css)
    );
  }

  // BLOG - PC専用CSS
  $blog_pc = get_stylesheet_directory() . '/css/pc/section-blog.css';
  if (file_exists($blog_pc)) {
    wp_enqueue_style('ptlBlog-pc', get_stylesheet_directory_uri() . '/css/pc/section-blog.css', ['ptl-blog'], filemtime($blog_pc), 'screen and (min-width: 960px)');
  }

  // SP専用CSS（767px以下）
  $titles_sp = get_stylesheet_directory() . '/css/sp/section-titles-sp.css';
  if (file_exists($titles_sp)) {
    wp_enqueue_style(
      'swell-child-sp-titles',
      get_stylesheet_directory_uri() . '/css/sp/section-titles-sp.css',
      ['child_style'],
      filemtime($titles_sp),
      'screen and (max-width: 767px)'
    );
  }

  // BLOG - SP専用CSS
  $blog_sp = get_stylesheet_directory() . '/css/sp/section-blog-sp.css';
  if (file_exists($blog_sp)) {
    wp_enqueue_style('ptlBlog-sp', get_stylesheet_directory_uri() . '/css/sp/section-blog-sp.css', ['ptl-blog'], filemtime($blog_sp), 'screen and (max-width: 767px)');
  }

  // JS
  $blog_js = get_stylesheet_directory() . '/js/section-blog.js';
  if (file_exists($blog_js)) {
    wp_enqueue_script(
      'ptl-blog',
      get_stylesheet_directory_uri() . '/js/section-blog.js',
      [],
      filemtime($blog_js),
      true
    );
  }

  // ========================================
  // スムーズスクロール用JavaScript読み込み
  // ========================================

  // jQueryは既にWordPressが読み込んでいるため、依存関係に指定
  // niceScrollライブラリをCDNから読み込み（PC専用スムーズスクロール）
  wp_enqueue_script(
    'nicescroll',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.6/jquery.nicescroll.min.js',
    ['jquery'],
    '3.7.6',
    true  // フッターで読み込み
  );

  // スムーズスクロール実装スクリプト
  $smooth_scroll = get_stylesheet_directory() . '/js/smooth-scroll.js';
  if (file_exists($smooth_scroll)) {
    wp_enqueue_script(
      'ptl-smooth-scroll',
      get_stylesheet_directory_uri() . '/js/smooth-scroll.js',
      ['jquery', 'nicescroll'],  // jQueryとniceScrollに依存
      filemtime($smooth_scroll),
      true  // フッターで読み込み
    );
  }
}, 30);

/* ========================================
   投稿画面の日本語化とUI改善
======================================== */

// タイトルプレースホルダーを日本語化
add_filter('enter_title_here', function ($title) {
  $screen = get_current_screen();
  if ($screen && $screen->post_type === 'post') {
    return 'タイトルを入力してください（例：バストアップマッサージの効果的な方法）';
  }
  return $title;
});

// デフォルトコンテンツを日本語に
add_filter('default_content', function ($content, $post) {
  if ($post->post_type === 'post') {
    return "ここに本文を入力してください。\n\n読者にとって役立つ情報を、わかりやすく書きましょう。";
  }
  return $content;
}, 10, 2);

// 投稿画面に説明を追加
add_action('edit_form_after_title', function ($post) {
  if ($post->post_type !== 'post') return;
?>
  <div style="background: #f0f6fc; border-left: 4px solid #0073aa; padding: 12px 16px; margin: 16px 0; font-size: 14px; line-height: 1.6;">
    <strong>📝 投稿の書き方</strong><br>
    <ul style="margin: 8px 0 0 20px; padding: 0;">
      <li><strong>タイトル：</strong>記事の内容が一目でわかるタイトルを付けましょう</li>
      <li><strong>本文：</strong>読者にとって役立つ情報を、わかりやすく書きましょう</li>
      <li><strong>アイキャッチ画像：</strong>記事のイメージに合った画像を設定しましょう（右下の「アイキャッチ画像」から設定）</li>
    </ul>
  </div>
<?php
});

/* ========================================
   投稿画面の不要項目を非表示
======================================== */

// 不要なメタボックスを削除
add_action('admin_menu', function () {
  // カスタムフィールド（混乱を避けるため）
  // remove_meta_box('postcustom', 'post', 'normal');

  // トラックバック（古い機能）
  remove_meta_box('trackbacksdiv', 'post', 'normal');

  // スラッグ編集（通常不要）
  remove_meta_box('slugdiv', 'post', 'normal');

  // コメント機能を使わない場合
  // remove_meta_box('commentsdiv', 'post', 'normal');

  // 作成者（単一運営者の場合）
  // remove_meta_box('authordiv', 'post', 'normal');
});

/* ========================================
   SEO設定メタボックス
======================================== */

// SEOメタボックスを追加
add_action('add_meta_boxes', function () {
  add_meta_box(
    'ptl_seo_meta_box',
    '📊 SEO設定',
    'ptl_seo_meta_box_callback',
    'post',
    'normal',
    'high'
  );
});

// SEOメタボックスのHTML
function ptl_seo_meta_box_callback($post)
{
  wp_nonce_field('ptl_seo_meta_box', 'ptl_seo_meta_box_nonce');

  $meta_description = get_post_meta($post->ID, '_ptl_meta_description', true);
  $meta_keywords = get_post_meta($post->ID, '_ptl_meta_keywords', true);

?>
  <div style="padding: 10px 0;">
    <p style="margin: 0 0 8px; color: #666; font-size: 13px;">
      検索エンジンに表示される情報を設定します。適切に設定することで、検索結果からのアクセスが増える可能性があります。
    </p>

    <table class="form-table">
      <tr>
        <th style="width: 200px;">
          <label for="ptl_meta_description">メタディスクリプション</label>
        </th>
        <td>
          <textarea
            id="ptl_meta_description"
            name="ptl_meta_description"
            rows="3"
            style="width: 100%; max-width: 600px;"
            placeholder="記事の内容を120〜160文字程度で要約してください"><?php echo esc_textarea($meta_description); ?></textarea>
          <p class="description">
            検索結果に表示される説明文です。<strong>120〜160文字</strong>が推奨です。<br>
            現在の文字数: <strong><span id="desc-count">0</span></strong>文字
          </p>
        </td>
      </tr>

      <tr>
        <th>
          <label for="ptl_meta_keywords">キーワード</label>
        </th>
        <td>
          <input
            type="text"
            id="ptl_meta_keywords"
            name="ptl_meta_keywords"
            value="<?php echo esc_attr($meta_keywords); ?>"
            style="width: 100%; max-width: 600px;"
            placeholder="バストアップ, マッサージ, 美容" />
          <p class="description">
            記事に関連するキーワードをカンマ区切りで入力してください。<strong>3〜5個程度</strong>が推奨です。<br>
            例：バストアップ, マッサージ, 美容, ホームケア
          </p>
        </td>
      </tr>
    </table>

    <script>
      (function() {
        const textarea = document.getElementById('ptl_meta_description');
        const counter = document.getElementById('desc-count');

        function updateCount() {
          const count = textarea.value.length;
          counter.textContent = count;
          counter.style.color = (count >= 120 && count <= 160) ? '#46b450' : (count > 160 ? '#dc3232' : '#999');
        }

        textarea.addEventListener('input', updateCount);
        updateCount();
      })();
    </script>
  </div>
<?php
}

// SEOメタデータの保存
add_action('save_post', function ($post_id) {
  // Nonce チェック
  if (!isset($_POST['ptl_seo_meta_box_nonce']) || !wp_verify_nonce($_POST['ptl_seo_meta_box_nonce'], 'ptl_seo_meta_box')) {
    return;
  }

  // 自動保存の場合は処理しない
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
  }

  // 権限チェック
  if (!current_user_can('edit_post', $post_id)) {
    return;
  }

  // メタディスクリプションを保存
  if (isset($_POST['ptl_meta_description'])) {
    update_post_meta($post_id, '_ptl_meta_description', sanitize_textarea_field($_POST['ptl_meta_description']));
  }

  // キーワードを保存
  if (isset($_POST['ptl_meta_keywords'])) {
    update_post_meta($post_id, '_ptl_meta_keywords', sanitize_text_field($_POST['ptl_meta_keywords']));
  }
});

/* ========================================
   緊急修正：カスタム投稿タイプの強制登録
======================================== */

// 管理画面アクセス時に一度だけパーマリンクを強制更新
add_action('admin_init', function () {
  $flush_flag = get_option('ptl_uservoice_flush_rewrite');

  if ($flush_flag !== 'done_v2') {
    flush_rewrite_rules(false);
    update_option('ptl_uservoice_flush_rewrite', 'done_v2');
  }
});

// SEOメタタグを<head>に出力
add_action('wp_head', function () {
  // 個別記事
  if (is_single()) {
    global $post;
    $meta_description = get_post_meta($post->ID, '_ptl_meta_description', true);
    $meta_keywords = get_post_meta($post->ID, '_ptl_meta_keywords', true);
    if ($meta_description) {
      echo '<meta name="description" content="' . esc_attr($meta_description) . '">' . "\n";
    }
    if ($meta_keywords) {
      echo '<meta name="keywords" content="' . esc_attr($meta_keywords) . '">' . "\n";
    }
    return;
  }

  // トップページ・固定ページ用 meta description
  $descriptions = [
    'front_page'    => 'バストアップ専門パトラクシェ｜銀座・恵比寿・代官山。ドイツHeraeus社製ランプ×サファイアクリスタル搭載のバストアップ専用マシンで都内随一の2000ショット。創業13年・延べ7万人以上。オーダーメイド複合施術で効果体感率99%。無料カウンセリング受付中。',
    'daikanyama'    => 'バストアップ専門パトラクシェ恵比寿・代官山店。代官山駅徒歩2分、恵比寿駅徒歩6分。平日12:00-20:00、土日祝11:00-19:00。初回体験9,500円。',
    'ginza'         => 'バストアップ専門パトラクシェ銀座店。銀座一丁目駅徒歩2分、有楽町駅徒歩5分。平日13:00-21:00、土日祝11:00-19:00。初回体験9,500円。',
    'service'       => 'パトラクシェの施術メニュー｜Heraeus社製ランプ×サファイアクリスタル搭載の専用マシンで2000ショット・乳腺マッサージ・ナノカレント・骨盤底筋ケアなど複数施術を掛け合わせるオーダーメイド複合施術。銀座・代官山。',
    'course'        => 'バストアップコース（90分）｜パトラクシェ人気No.1メニュー。初回限定9,500円（税込）。フラッシュ×オールハンド施術で左右差補正・下垂改善・ボリュームアップ。',
    'mariage'       => '銀座の結婚相談所パトラクシェ マリアージュ｜30代40代の婚活を美容×カウンセリングでトータルサポート。無料カウンセリング実施中。ブライダルエステ・自分磨きプログラムで成婚まで伴走。銀座一丁目駅徒歩1分。',
    'voice'         => 'お客様の声・体験談｜パトラクシェ。バストアップ施術を受けたお客様のリアルなBefore/Afterと感想をご紹介。効果体感率99%の実績。',
    'information'   => 'エステティシャン急募｜銀座・恵比寿のバストアップ専門パトラクシェ。正社員月給24万〜35万円・アルバイト時給1,300〜1,800円。未経験歓迎、充実した研修制度、独立開業支援あり。駅徒歩2分の好立地。',
    'privacy-policy' => 'プライバシーポリシー｜パトラクシェ。お客様の個人情報の取り扱いについて。',
  ];

  if (is_front_page()) {
    echo '<meta name="description" content="' . esc_attr($descriptions['front_page']) . '">' . "\n";
    return;
  }

  if (is_page()) {
    $slug = get_post_field('post_name', get_post());
    if (isset($descriptions[$slug])) {
      echo '<meta name="description" content="' . esc_attr($descriptions[$slug]) . '">' . "\n";
    }
  }
}, 1);

// 最強対策: すべてのWordPressフックでSWELL投稿リストを無効化
add_action('init', function () {
  if (is_front_page()) {
    remove_all_actions('swell_front_top');
    remove_all_actions('swell_front_bottom');
    remove_all_actions('swell_home_content');
    remove_all_actions('swell_post_list');
  }
}, 1);

add_action('wp_loaded', function () {
  if (is_front_page()) {
    remove_all_actions('swell_front_top');
    remove_all_actions('swell_front_bottom');
    remove_all_actions('swell_home_content');
    remove_all_actions('swell_post_list');
  }
}, 1);

add_action('template_redirect', function () {
  if (is_front_page()) {
    remove_all_actions('swell_front_top');
    remove_all_actions('swell_front_bottom');
    remove_all_actions('swell_home_content');
    remove_all_actions('swell_post_list');

    // 投稿リスト出力関数を無効化
    add_filter('swell_show_home_posts', '__return_false');
    add_filter('swell_show_post_list', '__return_false');

    // カスタマイザー設定を強制無効化
    add_filter('theme_mod_show_new_tab', '__return_false');
    add_filter('theme_mod_show_ranking_tab', '__return_false');
  }
}, 1);

// フロントページでのクエリを固定ページのみに制限
add_action('pre_get_posts', function ($query) {
  if (is_admin() || !$query->is_main_query()) return;
  if ($query->is_front_page()) {
    // フロントページは固定ページ本体のみを対象にする
    $front_id = (int) get_option('page_on_front');
    if ($front_id > 0) {
      $query->set('post_type', 'page');
      $query->set('page_id', $front_id);
    }
    $query->set('posts_per_page', 1);
    $query->set('no_found_rows', true);
    $query->set('ignore_sticky_posts', true);
  }
});

// フロントページでページコンテンツ出力を完全無効化
add_filter('the_content', function ($content) {
  // フロントページでは固定ページの本文を無効化
  if (is_front_page() && in_the_loop() && is_main_query()) {
    return '';
  }

  // 投稿リスト系ブロックを含む場合は空にする
  if (
    strpos($content, 'wp-block-query') !== false ||
    strpos($content, 'wp-block-latest-posts') !== false ||
    strpos($content, 'wp-block-post-template') !== false ||
    strpos($content, 'wp-block-archives') !== false
  ) {
    return '';
  }

  return $content;
}, 1);

// フロントだけ投稿系ブロックを無効化（ダブル保険）
add_filter('render_block', function ($block_content, $block) {
  if (is_front_page() && is_page() && isset($block['blockName'])) {
    $ban = ['core/query', 'core/latest-posts', 'core/posts-list', 'core/post-template', 'core/query-pagination'];
    if (in_array($block['blockName'], $ban, true)) return '';
  }
  return $block_content;
}, 10, 2);


// ========================================
// フロントページのページネーション完全無効化（PHPレベル）
// ========================================
add_action('template_redirect', function () {
  if (!is_front_page()) return;
  // SWELLのページネーション関数を無効化
  remove_action('swell_before_footer', 'swell_output_pagination');
  remove_action('swell_after_content', 'swell_output_pagination');
  // WordPressのページネーション関数を上書き
  add_filter('the_posts_pagination', '__return_empty_string', 999);
  add_filter('get_the_posts_pagination', '__return_empty_string', 999);
  add_filter('paginate_links', '__return_empty_string', 999);
  add_filter('get_pagenum_link', '__return_false', 999);
  // ページ番号付きURLを無効化
  add_filter('redirect_canonical', function ($redirect_url, $requested_url) {
    if (is_front_page() && preg_match('/\/page\/\d+/', $requested_url)) {
      return false;
    }
    return $redirect_url;
  }, 10, 2);
}, 5);

add_filter('query_vars', function ($vars) {
  if (is_front_page()) {
    $vars = array_diff($vars, ['paged', 'page']);
  }
  return $vars;
}, 999);

add_filter('navigation_markup_template', function ($template, $class) {
  if (is_front_page()) {
    return '';
  }
  return $template;
}, 999, 2);

// SWELLのページネーション設定を強制無効化
add_filter('swell_pagination_args', function ($args) {
  if (is_front_page()) {
    return false;
  }
  return $args;
}, 999);

add_filter('swell_post_list_args', function ($args) {
  if (is_front_page()) {
    $args['posts_per_page'] = 0;
    $args['nopaging'] = true;
  }
  return $args;
}, 999);

add_filter('body_class', function ($classes) {
  if (is_front_page()) {
    $classes = array_filter($classes, function ($class) {
      return strpos($class, 'paged') === false && strpos($class, 'page-numbers') === false;
    });
  }
  return $classes;
}, 999);

// JSによるDOM削除（保険）
add_action('wp_footer', function () {
  if (!is_front_page()) return;
?>
  <script>
    (function() {
      'use strict';

      function removePaginationElements() {
        const selectors = [
          '.pagination', '.page-numbers', '.nav-links',
          '.posts-navigation', '.post-navigation', '.paging-navigation',
          '.p-paginationNav', '.p-pageNav', '.c-paginationNav',
          '.wp-block-query-pagination', 'nav.navigation',
          '.p-postList', '.c-postList', '.wp-block-query',
          '.wp-block-latest-posts', '.wp-block-post-template'
        ];
        selectors.forEach(function(selector) {
          document.querySelectorAll(selector).forEach(function(el) {
            if (el && el.parentNode) el.parentNode.removeChild(el);
          });
        });
      }
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removePaginationElements);
      } else {
        removePaginationElements();
      }
      window.addEventListener('load', removePaginationElements);
      const observer = new MutationObserver(removePaginationElements);
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    })();
  </script>
<?php
}, 1);

// ========================================
// パフォーマンス基礎設定（開発中から実装）
// ========================================
// 作成日: 2025-10-07
// 目的: 開発フェーズから実装しておくことで、完成後の最適化作業を効率化
// 影響範囲: フロントエンドのみ（管理画面は影響なし）

// ========================================
// 1. 開発モード設定
// ========================================
// なぜ今やるべきか: CSS/JS変更時のブラウザキャッシュクリアの手間を削減

/**
 * 開発モード判定
 * wp-config.phpで define('WP_ENVIRONMENT_TYPE', 'development'); を設定
 */
function ptl_perf_is_dev_mode()
{
  return defined('WP_ENVIRONMENT_TYPE') && WP_ENVIRONMENT_TYPE === 'development';
}

/**
 * 開発モード時はファイルバージョンにタイムスタンプ自動付与
 */
add_filter('style_loader_src', 'ptl_perf_add_version_to_assets', 10, 2);
add_filter('script_loader_src', 'ptl_perf_add_version_to_assets', 10, 2);
function ptl_perf_add_version_to_assets($src, $handle)
{
  if (!ptl_perf_is_dev_mode()) return $src;

  // 外部URLは除外
  if (strpos($src, site_url()) === false) return $src;

  // 既にクエリパラメータがある場合は追加
  $separator = (strpos($src, '?') === false) ? '?' : '&';
  return $src . $separator . 'v=' . time();
}

// ========================================
// 2. 画像の遅延読み込み（自動付与）
// ========================================
// なぜ今やるべきか: 今後追加する画像全てに自動適用、後から手動修正不要

/**
 * [無効化] SWELLが独自lazy loading（data-src + class="lazyload"）を持つため、
 * ブラウザのloading="lazy"を二重追加するとSWELLのJS lazy loadと競合し
 * 画像が正しく読み込まれなくなる。WordPress 6.x + SWELLで十分対応済み。
 */
// add_filter('wp_get_attachment_image_attributes', 'ptl_perf_add_lazy_loading', 10, 3);
// add_filter('the_content', 'ptl_perf_add_lazy_to_content_images', 20);
// add_filter('widget_text', 'ptl_perf_add_lazy_to_content_images', 20);

// ========================================
// 3. 画像サイズの自動最適化
// ========================================
// なぜ今やるべきか: 大きすぎる画像のアップロードを防ぎ、ストレージ節約

/**
 * アップロード時に画像を自動リサイズ（最大幅: 2560px）
 */
add_filter('wp_handle_upload_prefilter', 'ptl_perf_resize_uploaded_image');
function ptl_perf_resize_uploaded_image($file)
{
  // 画像ファイル以外は処理しない
  if (strpos($file['type'], 'image') === false) {
    return $file;
  }

  $image_editor = wp_get_image_editor($file['tmp_name']);

  if (is_wp_error($image_editor)) {
    return $file;
  }

  $size = $image_editor->get_size();
  $max_width = 2560; // PC用最大幅
  $max_height = 2560;

  // リサイズが必要な場合のみ実行
  if ($size['width'] > $max_width || $size['height'] > $max_height) {
    $image_editor->resize($max_width, $max_height, false);
    $saved = $image_editor->save($file['tmp_name']);

    if (!is_wp_error($saved)) {
      $file['file'] = $saved['path'];
    }
  }

  return $file;
}

// ========================================
// 4. 不要なWordPress機能の無効化
// ========================================
// なぜ今やるべきか: 初回から不要なHTTPリクエストを削減、開発時も恩恵あり

/**
 * 絵文字スクリプトの無効化
 */
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('admin_print_styles', 'print_emoji_styles');
remove_filter('the_content_feed', 'wp_staticize_emoji');
remove_filter('comment_text_rss', 'wp_staticize_emoji');
remove_filter('wp_mail', 'wp_staticize_emoji_for_email');

/**
 * [無効化] SWELLテーマとの互換性問題のため以下を無効化:
 * - wp-embed: SWELLの埋め込み機能に影響の可能性
 * - jQuery Migrate: SWELLのJS（動画読み込み等）が依存
 * - Dashicons: ログインユーザー向け機能に影響
 * - Block Library CSS: SWELLのフルワイドブロック等に必要
 */
// add_action('wp_footer', 'ptl_perf_dequeue_embed_script');
// add_action('wp_default_scripts', 'ptl_perf_remove_jquery_migrate');
// add_action('wp_enqueue_scripts', 'ptl_perf_dequeue_dashicons', 999);
// add_action('wp_enqueue_scripts', 'ptl_perf_dequeue_block_library', 100);

/**
 * [無効化] SWELLがREST APIを利用するため無効化
 */
// add_filter('rest_endpoints', 'ptl_perf_disable_unused_rest_endpoints');

// ========================================
// 5. 将来の最適化準備
// ========================================
// なぜ今やるべきか: 後から構造変更すると手戻りが発生、今なら低コスト

/**
 * WebP用フォルダ構造の準備
 */
add_action('after_setup_theme', 'ptl_perf_prepare_webp_structure');
function ptl_perf_prepare_webp_structure()
{
  $webp_dir = get_stylesheet_directory() . '/img/.webp';

  if (!file_exists($webp_dir)) {
    wp_mkdir_p($webp_dir);

    // .htaccess作成（直接アクセス禁止）
    $htaccess_content = "# WebP cache directory\n";
    $htaccess_content .= "# Generated by PTL Performance Setup\n";
    $htaccess_content .= "Order deny,allow\n";
    $htaccess_content .= "Deny from all\n";

    file_put_contents($webp_dir . '/.htaccess', $htaccess_content);
  }
}

/**
 * CDN preconnect（外部リソースへの事前接続で体感速度向上）
 */
add_action('wp_head', 'ptl_perf_preconnect', 1);
function ptl_perf_preconnect()
{
  echo '<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>' . "\n";
  echo '<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>' . "\n";
  echo '<link rel="dns-prefetch" href="https://www.googletagmanager.com">' . "\n";
}

/**
 * 子ページ背景画像のpreloadヒント（CSS background-imageの先行読み込み）
 */
add_action('wp_head', 'ptl_perf_preload_page_bg', 2);
function ptl_perf_preload_page_bg()
{
  if (!is_page()) return;
  $slug = get_post_field('post_name', get_queried_object_id());
  $is_mobile = wp_is_mobile();

  $bg_map = [
    'information' => [
      'pc' => 'https://patolaqshe.com/wp-content/uploads/2026/01/recruit-pc-bg.jpg',
      'sp' => 'https://patolaqshe.com/wp-content/uploads/2026/01/voice-bg-sp.jpg',
    ],
    'about' => [
      'pc' => 'https://patolaqshe.com/wp-content/uploads/2025/12/about-bg-pc.jpg',
      'sp' => 'https://patolaqshe.com/wp-content/uploads/2025/12/about-bg-sp.jpg',
    ],
    'voice' => [
      'pc' => 'https://patolaqshe.com/wp-content/uploads/2026/01/recruit-pc-bg.jpg',
      'sp' => 'https://patolaqshe.com/wp-content/uploads/2026/01/voice-bg-sp.jpg',
    ],
  ];

  if (isset($bg_map[$slug])) {
    $url = $is_mobile ? $bg_map[$slug]['sp'] : $bg_map[$slug]['pc'];
    echo '<link rel="preload" as="image" href="' . esc_url($url) . '">' . "\n";
  }
}

/**
 * パフォーマンス最適化有効
 */
if (!defined('PTL_PERF_OPTIMIZATION_READY')) {
  define('PTL_PERF_OPTIMIZATION_READY', true);
}

/**
 * フローティングメニューの読み込み
 */
add_action('wp_enqueue_scripts', function () {
  // CSS
  $css_path = get_stylesheet_directory() . '/css/float-menu.css';
  if (file_exists($css_path)) {
    wp_enqueue_style(
      'ptl-float-menu',
      get_stylesheet_directory_uri() . '/css/float-menu.css',
      array(),
      filemtime($css_path)
    );
  }

  // JavaScript
  $js_path = get_stylesheet_directory() . '/js/float-menu.js';
  if (file_exists($js_path)) {
    wp_enqueue_script(
      'ptl-float-menu',
      get_stylesheet_directory_uri() . '/js/float-menu.js',
      array(),
      filemtime($js_path),
      true
    );
  }
}, 100);

/**
 * フローティングメニューのHTML出力
 */
add_action('wp_footer', function () {
?>
  <aside class="ptl-float-menu" aria-label="予約・お問い合わせメニュー">
    <a href="https://beauty.hotpepper.jp/kr/slnH000263216/?utm_source=site&utm_medium=nav&utm_campaign=reserve"
      class="ptl-float-menu__btn ptl-float-menu__btn--daikanyama"
      target="_blank"
      rel="noopener noreferrer">
      <span class="ptl-float-menu__btn-text">代官山予約</span>
    </a>

    <a href="https://beauty.hotpepper.jp/kr/slnH000334472/?utm_source=site&utm_medium=nav&utm_campaign=reserve"
      class="ptl-float-menu__btn ptl-float-menu__btn--ginza"
      target="_blank"
      rel="noopener noreferrer">
      <span class="ptl-float-menu__btn-text">銀座予約</span>
    </a>

    <a href="https://tayori.com/form/6d4a08aa86803c6ad6212ff3118789ea2f0b1e61/"
      class="ptl-float-menu__btn ptl-float-menu__btn--mariage"
      target="_blank"
      rel="noopener noreferrer">
      <span class="ptl-float-menu__btn-text">マリアージュ予約</span>
    </a>
  </aside>
<?php
}, 100);

/**
 * トップに戻るボタンの矢印を上向きに修正（外部ファイル読み込み）
 */
add_action('wp_enqueue_scripts', function () {
  $css_path = get_stylesheet_directory() . '/css/pagetop-arrow.css';
  if (file_exists($css_path)) {
    wp_enqueue_style('ptl-pagetop-arrow', get_stylesheet_directory_uri() . '/css/pagetop-arrow.css', [], filemtime($css_path));
  }
}, 100);

/**
 * SPヒーロー被さり効果: ヒーローにクラス追加（固定版）
 */
add_action('wp_head', function () {
  if (!is_front_page()) return;
?>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var hero = document.querySelector('.p-mainVisual');
      if (hero) {
        hero.classList.add('ptl-overlap-base');
        document.body.classList.add('has-hero-overlap');
      }
    });
  </script>
<?php
}, 999);

/**
 * テンプレート強制選択: フロントページで front-page.php を確実に使用
 * 
 * @param string $template 選択されたテンプレートのパス
 * @return string 修正後のテンプレートパス
 */
add_filter('template_include', function ($template) {
  // フロントページの場合、強制的に front-page.php を使用
  if (is_front_page()) {
    $front_page_template = get_stylesheet_directory() . '/front-page.php';
    if (file_exists($front_page_template)) {
      return $front_page_template;
    }
  }
  return $template;
}, 999);

/* === 店舗選択フィールド追加 === */

// お客様の声に店舗選択フィールドを追加
add_action('add_meta_boxes', function () {
  add_meta_box(
    'store_location_selector',
    '店舗選択',
    'ptl_store_location_selector_callback',
    'post',
    'side',
    'high'
  );
});

function ptl_store_location_selector_callback($post)
{
  wp_nonce_field('ptl_store_location_selector', 'ptl_store_location_selector_nonce');

  // 既存の店舗情報を取得（配列形式）
  $store_locations = get_post_meta($post->ID, '_store_locations', true);
  if (!is_array($store_locations)) {
    $store_locations = [];
  }

  echo '<p class="description" style="margin-bottom: 15px; color: #0073aa;">';
  echo '✅ <strong>グランド（全店舗共通ページ）</strong>には必ず表示されます。<br>';
  echo '追加で特定店舗ページにも表示したい場合は、下記をチェックしてください。';
  echo '</p>';

  echo '<p class="description" style="margin-bottom: 10px; padding: 8px; background: #fff3cd; border-left: 3px solid #ffc107; font-size: 12px;">';
  echo '<strong>📌 記事種別に関わらず適用されます：</strong><br>';
  echo 'ニュース、お客様の声、ブログ記事、全てで使用可能です。';
  echo '</p>';

  echo '<div style="padding: 10px; background: #f6f7f7; border-radius: 4px;">';

  // 銀座店チェックボックス
  echo '<label style="display: block; margin-bottom: 10px; cursor: pointer;">';
  echo '<input type="checkbox" name="store_locations[]" value="ginza" ' . checked(in_array('ginza', $store_locations), true, false) . ' />';
  echo ' <strong>🏢 銀座店ページにも表示</strong>';
  echo '</label>';

  // 代官山店チェックボックス
  echo '<label style="display: block; cursor: pointer;">';
  echo '<input type="checkbox" name="store_locations[]" value="daikanyama" ' . checked(in_array('daikanyama', $store_locations), true, false) . ' />';
  echo ' <strong>🏢 代官山店ページにも表示</strong>';
  echo '</label>';

  echo '</div>';

  echo '<p class="description" style="margin-top: 10px; font-size: 12px; color: #666;">';
  echo '<strong>使用例：</strong><br>';
  echo '・銀座店のニュース → 銀座店のみチェック<br>';
  echo '・代官山店のブログ → 代官山店のみチェック<br>';
  echo '・両店舗のお客様の声 → 両方チェック<br>';
  echo '・全店舗共通の記事 → どちらもチェックなし';
  echo '</p>';
}

// 店舗選択の保存
add_action('save_post', function ($post_id) {
  if (!isset($_POST['ptl_store_location_selector_nonce'])) return;
  if (!wp_verify_nonce($_POST['ptl_store_location_selector_nonce'], 'ptl_store_location_selector')) return;
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
  if (!current_user_can('edit_post', $post_id)) return;

  // 店舗選択を保存（配列形式）
  $store_locations = isset($_POST['store_locations']) ? array_map('sanitize_text_field', $_POST['store_locations']) : [];
  update_post_meta($post_id, '_store_locations', $store_locations);
}, 10, 1);

// 管理画面の投稿一覧に店舗表示カラムを追加
add_filter('manage_posts_columns', function ($columns) {
  $new_columns = [];
  foreach ($columns as $key => $value) {
    $new_columns[$key] = $value;
    if ($key === 'post_category') {
      $new_columns['store_locations'] = '表示店舗';
    }
  }
  return $new_columns;
});

// 店舗表示カラムの内容を表示
add_action('manage_posts_custom_column', function ($column, $post_id) {
  if ($column === 'store_locations') {
    $locations = get_post_meta($post_id, '_store_locations', true);
    if (!is_array($locations)) $locations = [];

    $display = ['グランド'];
    if (in_array('ginza', $locations)) $display[] = '銀座';
    if (in_array('daikanyama', $locations)) $display[] = '代官山';

    echo '<span style="color: #0073aa;">' . implode(' / ', $display) . '</span>';
  }
}, 10, 2);

/* === 動的パンくずリスト・動的トップリンク === */

/**
 * リファラーから店舗を判定するヘルパー関数
 * @return string 'ginza' | 'daikanyama' | 'grand'
 */
function ptl_get_store_from_referer()
{
  $referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';

  if (strpos($referer, '/ginza/') !== false || strpos($referer, '/ginza') !== false) {
    return 'ginza';
  }

  if (strpos($referer, '/daikanyama/') !== false || strpos($referer, '/daikanyama') !== false) {
    return 'daikanyama';
  }

  return 'grand';
}

/**
 * セッションに店舗情報を保存(ページ内遷移でも維持)
 */
function ptl_init_store_session()
{
  if (session_status() === PHP_SESSION_NONE) {
    session_start();
  }

  $store = ptl_get_store_from_referer();

  if ($store !== 'grand') {
    $_SESSION['ptl_current_store'] = $store;
  }
}
add_action('init', 'ptl_init_store_session');

/**
 * 現在の店舗を取得(セッション優先)
 * @return string 'ginza' | 'daikanyama' | 'grand'
 */
function ptl_get_current_store()
{
  if (session_status() === PHP_SESSION_NONE) {
    session_start();
  }

  if (isset($_SESSION['ptl_current_store'])) {
    return $_SESSION['ptl_current_store'];
  }

  return ptl_get_store_from_referer();
}

/**
 * 店舗名を取得
 * @param string $store_key
 * @return string
 */
function ptl_get_store_name($store_key)
{
  $stores = [
    'ginza' => '銀座店',
    'daikanyama' => '代官山店',
    'grand' => ''
  ];
  return isset($stores[$store_key]) ? $stores[$store_key] : '';
}

/**
 * 店舗トップURLを取得
 * @param string $store_key
 * @return string
 */
function ptl_get_store_url($store_key)
{
  $urls = [
    'ginza' => home_url('/ginza/'),
    'daikanyama' => home_url('/daikanyama/'),
    'grand' => home_url('/')
  ];
  return isset($urls[$store_key]) ? $urls[$store_key] : home_url('/');
}

/**
 * ショートコード: 動的パンくずリスト
 * 使用方法: [dynamic_breadcrumb]
 * 
 * 出力例(銀座店から来た場合):
 * ホーム > 銀座店 > 現在のページタイトル
 */
function ptl_dynamic_breadcrumb_shortcode($atts)
{
  $store = ptl_get_current_store();
  $store_name = ptl_get_store_name($store);
  $store_url = ptl_get_store_url($store);
  $current_title = get_the_title();

  $breadcrumb = '<nav class="ptl-breadcrumb" aria-label="パンくずリスト">';
  $breadcrumb .= '<ol class="ptl-breadcrumb__list">';

  $breadcrumb .= '<li class="ptl-breadcrumb__item">';
  $breadcrumb .= '<a href="' . esc_url(home_url('/')) . '" class="ptl-breadcrumb__link">ホーム</a>';
  $breadcrumb .= '</li>';

  if ($store !== 'grand' && !empty($store_name)) {
    $breadcrumb .= '<li class="ptl-breadcrumb__item">';
    $breadcrumb .= '<a href="' . esc_url($store_url) . '" class="ptl-breadcrumb__link">' . esc_html($store_name) . '</a>';
    $breadcrumb .= '</li>';
  }

  $breadcrumb .= '<li class="ptl-breadcrumb__item ptl-breadcrumb__item--current">';
  $breadcrumb .= '<span class="ptl-breadcrumb__current">' . esc_html($current_title) . '</span>';
  $breadcrumb .= '</li>';

  $breadcrumb .= '</ol>';
  $breadcrumb .= '</nav>';

  return $breadcrumb;
}
add_shortcode('dynamic_breadcrumb', 'ptl_dynamic_breadcrumb_shortcode');

/**
 * ショートコード: 動的トップリンク
 * 使用方法: [dynamic_home_link]
 * 属性: text="リンクテキスト" (省略時: "トップページに戻る")
 * 
 * 出力例(銀座店から来た場合):
 * <a href="/ginza/" class="ptl-home-link">トップページに戻る</a>
 */
function ptl_dynamic_home_link_shortcode($atts)
{
  $atts = shortcode_atts([
    'text' => 'トップページに戻る',
    'class' => 'ptl-home-link'
  ], $atts);

  $store = ptl_get_current_store();
  $store_url = ptl_get_store_url($store);

  $link = '<a href="' . esc_url($store_url) . '" class="' . esc_attr($atts['class']) . '">';
  $link .= esc_html($atts['text']);
  $link .= '</a>';

  return $link;
}
add_shortcode('dynamic_home_link', 'ptl_dynamic_home_link_shortcode');

/**
 * パンくずリスト用CSS（外部ファイル読み込み）
 */
function ptl_breadcrumb_styles()
{
  if (is_admin()) return;
  $css_path = get_stylesheet_directory() . '/css/breadcrumb.css';
  if (file_exists($css_path)) {
    wp_enqueue_style('ptl-breadcrumb', get_stylesheet_directory_uri() . '/css/breadcrumb.css', [], filemtime($css_path));
  }
}
add_action('wp_enqueue_scripts', 'ptl_breadcrumb_styles');

/**
 * お客様の声スライダー ショートコード
 * 使い方: [uservoice_slider store="daikanyama" limit="12"]
 */
function ptl_uservoice_slider_shortcode($atts)
{
  $atts = shortcode_atts(array(
    'store' => 'all',
    'limit' => 12
  ), $atts);

  $store = sanitize_text_field($atts['store']);
  $limit = absint($atts['limit']);

  // 店舗別にお客様の声を取得
  if ($store === 'all') {
    $uservoice_posts = ptl_get_all_uservoice_posts($limit);
  } else {
    // 特定店舗のみ
    $args = array(
      'post_type' => 'post',
      'posts_per_page' => $limit,
      'post_status' => 'publish',
      'meta_query' => array(
        'relation' => 'AND',
        array(
          'key' => '_post_category',
          'value' => 'uservoice',
          'compare' => '='
        ),
        array(
          'key' => '_store_locations',
          'value' => $store,
          'compare' => 'LIKE'
        )
      ),
      'orderby' => 'date',
      'order' => 'DESC'
    );
    $uservoice_posts = get_posts($args);

    // 既存のuservoiceカスタム投稿タイプも取得
    $old_uservoice_args = array(
      'post_type' => 'uservoice',
      'posts_per_page' => $limit,
      'post_status' => 'publish',
      'meta_query' => array(
        array(
          'key' => '_store_locations',
          'value' => $store,
          'compare' => 'LIKE'
        )
      ),
      'orderby' => 'date',
      'order' => 'DESC'
    );
    $old_uservoice_posts = get_posts($old_uservoice_args);

    // 統合してソート
    $uservoice_posts = array_merge($uservoice_posts, $old_uservoice_posts);
    usort($uservoice_posts, function ($a, $b) {
      return strtotime($b->post_date) - strtotime($a->post_date);
    });
    $uservoice_posts = array_slice($uservoice_posts, 0, $limit);
  }

  ob_start();
?>
  <div class="uservoice-slider swiper">
    <div class="swiper-wrapper">
      <?php if (!empty($uservoice_posts)): ?>
        <?php foreach ($uservoice_posts as $post):
          setup_postdata($post);
          $customer_name = get_post_meta($post->ID, '_customer_name', true);
          $rating = (int)get_post_meta($post->ID, '_rating', true);
          $customer_image = get_post_meta($post->ID, '_customer_image', true);
          // _uservoice_title廃止: post_titleに統一

        ?>
          <div class="swiper-slide">
            <div class="feedback-card">
              <div class="feedback-image">
                <?php if ($customer_image):
                  $image_url = is_numeric($customer_image) ? wp_get_attachment_url($customer_image) : $customer_image;
                  if ($image_url): ?>
                    <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($customer_name); ?>" class="customer-img" width="256" height="256" loading="lazy" decoding="async" />
                  <?php else: ?>
                    <img src="<?php echo get_stylesheet_directory_uri() . '/img/nav/salon.png'; ?>" alt="<?php echo esc_attr($customer_name ? $customer_name : 'お客様'); ?>" class="customer-img" width="256" height="256" loading="lazy" decoding="async" />
                  <?php endif; ?>
                <?php else: ?>
                  <img src="<?php echo get_stylesheet_directory_uri() . '/img/nav/salon.png'; ?>" alt="<?php echo esc_attr($customer_name ? $customer_name : 'お客様'); ?>" class="customer-img" width="256" height="256" loading="lazy" decoding="async" />
                <?php endif; ?>
              </div>

              <h3 class="feedback-title"><?php echo esc_html(get_the_title()); ?></h3>

              <div class="feedback-content">
                <p><?php echo get_the_content(); ?></p>
              </div>

              <div class="feedback-author"><?php echo esc_html($customer_name ? $customer_name : '匿名のお客様'); ?></div>

              <div class="feedback-rating">
                <?php for ($i = 1; $i <= 5; $i++): ?>
                  <i class="fa fa-star<?php echo ($i <= $rating) ? '' : '-o'; ?>"></i>
                <?php endfor; ?>
              </div>
            </div>
          </div>
        <?php endforeach;
        wp_reset_postdata(); ?>
      <?php else: ?>
        <!-- ダミーデータ（グランドトップと同じ） -->
        <div class="swiper-slide">
          <div class="feedback-card">
            <div class="feedback-image">
              <img src="<?php echo get_stylesheet_directory_uri() . '/img/nav/salon.png'; ?>" alt="お客様1" class="customer-img" width="256" height="256" loading="lazy" decoding="async" />
            </div>
            <h3 class="feedback-title">自分に自信が持てるようになった</h3>
            <div class="feedback-content">
              <p>施術を受けてから姿勢が良くなり、バストのラインが綺麗になりました。鏡を見るのが楽しみです。</p>
            </div>
            <div class="feedback-author">30代女性</div>
            <div class="feedback-rating">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="feedback-card">
            <div class="feedback-image">
              <img src="<?php echo get_stylesheet_directory_uri() . '/img/nav/salon.png'; ?>" alt="お客様2" class="customer-img" width="256" height="256" loading="lazy" decoding="async" />
            </div>
            <h3 class="feedback-title">諦めていたけど変化を実感</h3>
            <div class="feedback-content">
              <p>年齢的に無理だと思っていましたが、3ヶ月でサイズアップ！スタッフの方々も親切で通いやすいです。</p>
            </div>
            <div class="feedback-author">40代女性</div>
            <div class="feedback-rating">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star-o"></i>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="feedback-card">
            <div class="feedback-image">
              <img src="<?php echo get_stylesheet_directory_uri() . '/img/nav/salon.png'; ?>" alt="お客様3" class="customer-img" width="256" height="256" loading="lazy" decoding="async" />
            </div>
            <h3 class="feedback-title">体質改善にも効果あり</h3>
            <div class="feedback-content">
              <p>バストケアだけでなく、冷え性も改善されて驚きです。身体全体が軽くなった感じがします。</p>
            </div>
            <div class="feedback-author">20代女性</div>
            <div class="feedback-rating">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
            </div>
          </div>
        </div>
      <?php endif; ?>
    </div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-pagination"></div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const sliders = document.querySelectorAll('.uservoice-slider');
      const lastSlider = sliders[sliders.length - 1];

      if (lastSlider && !lastSlider.classList.contains('swiper-initialized')) {
        new Swiper(lastSlider, {
          loop: true,
          slidesPerView: 1,
          spaceBetween: 16,
          centeredSlides: true,
          speed: 1500,
          breakpoints: {
            768: {
              slidesPerView: 3,
              spaceBetween: 24
            }
          },
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: lastSlider.querySelector('.swiper-button-next'),
            prevEl: lastSlider.querySelector('.swiper-button-prev'),
          },
          pagination: {
            el: lastSlider.querySelector('.swiper-pagination'),
            clickable: true,
          },
        });
      }
    });
  </script>
<?php
  return ob_get_clean();
}
add_shortcode('uservoice_slider', 'ptl_uservoice_slider_shortcode');

/**
 * ========================================
 * 統合モーダルJS + サロン/ブログ/FAQモーダルCSS
 * ========================================
 * 旧: salon-modal.js, blog-modal.js, faq-modal.js, news-modal.js, product-modal.js
 * 新: ptl-modal.js（1ファイルに統合）
 */
function pato_enqueue_unified_modal_assets()
{
  // 統合モーダルJS（5ファイル分を1つに）
  $js_path = get_stylesheet_directory() . '/js/ptl-modal.js';
  wp_enqueue_script(
    'ptl-modal',
    get_stylesheet_directory_uri() . '/js/ptl-modal.js',
    array(),
    file_exists($js_path) ? filemtime($js_path) : '1.0.0',
    true
  );

  // サロンモーダルCSS
  $salon_pc_path = get_stylesheet_directory() . '/css/pc/salon-modal-pc.css';
  wp_enqueue_style(
    'pato-salon-modal-pc',
    get_stylesheet_directory_uri() . '/css/pc/salon-modal-pc.css',
    array(),
    file_exists($salon_pc_path) ? filemtime($salon_pc_path) : '1.0.0',
    'screen and (min-width: 768px)'
  );
  $salon_sp_path = get_stylesheet_directory() . '/css/sp/salon-modal-sp.css';
  wp_enqueue_style(
    'pato-salon-modal-sp',
    get_stylesheet_directory_uri() . '/css/sp/salon-modal-sp.css',
    array(),
    file_exists($salon_sp_path) ? filemtime($salon_sp_path) : '1.0.0',
    'screen and (max-width: 767px)'
  );

  // ブログモーダルCSS
  $css_pc_path = get_stylesheet_directory() . '/css/pc/blog-modal-pc.css';
  if (file_exists($css_pc_path)) {
    wp_enqueue_style(
      'pato-blog-modal-pc',
      get_stylesheet_directory_uri() . '/css/pc/blog-modal-pc.css',
      array(),
      filemtime($css_pc_path),
      'screen and (min-width: 768px)'
    );
  }
  $css_sp_path = get_stylesheet_directory() . '/css/sp/blog-modal-sp.css';
  if (file_exists($css_sp_path)) {
    wp_enqueue_style(
      'pato-blog-modal-sp',
      get_stylesheet_directory_uri() . '/css/sp/blog-modal-sp.css',
      array(),
      filemtime($css_sp_path),
      'screen and (max-width: 767px)'
    );
  }
}
add_action('wp_enqueue_scripts', 'pato_enqueue_unified_modal_assets');

function pato_salon_modal_shortcode($atts)
{
  $atts = shortcode_atts(
    array(
      'id' => '',
      'name' => '',
      'subtitle' => '',
      'concept' => '',
      'image' => '',
      'address' => '',
      'tel' => '',
      'hours' => '',
      'access' => '',
      'description' => '',
      'maps_url' => '',
      'modal_image' => '',
      'access_route' => '',
    ),
    $atts
  );

  // サロンIDに応じたホットペッパーURLと英語住所・道順を設定
  $salon_data = array(
    'daikanyama' => array(
      'hotpepper_id' => 'slnH000263216',
      'address_en' => 'Horii Daikanyama Bldg. 3F, 18-8 Daikanyamacho,<br>Shibuya-ku, Tokyo, 150-0034, Japan',
      'access_route' => 'JR恵比寿駅西口を出て、駒沢通りを代官山方面へ直進。代官山駅前の五差路を過ぎて、徒歩5分ほどで右手に「堀井代官山ビル」が見えます。3階が当店です。1階には飲食店が入っており、ビル入口は通り沿いにございます。',
    ),
    'ginza' => array(
      'hotpepper_id' => 'slnH000334472',
      'address_en' => 'GINZA ARROWS 6F, 1-6-6 Ginza,<br>Chuo-ku, Tokyo, 104-0061, Japan',
      'access_route' => 'JR有楽町駅中央口を出て、晴海通りを銀座方面へ。徒歩5分ほどで銀座一丁目交差点に到着します。交差点の角に2025年オープンの「ふふ東京銀座」があり、その斜め向かいが「GINZA ARROWS」ビルです。6階が当店です。1階にはショップが入っており、エレベーターで6階までお越しください。',
    ),
  );

  $salon_id = $atts['id'];
  $hotpepper_id = isset($salon_data[$salon_id]) ? $salon_data[$salon_id]['hotpepper_id'] : 'slnH000263216';
  $address_en = isset($salon_data[$salon_id]) ? $salon_data[$salon_id]['address_en'] : '';
  // ショートコード属性が空ならサロンデータのデフォルトを使用
  if (empty($atts['access_route']) && isset($salon_data[$salon_id]['access_route'])) {
    $atts['access_route'] = $salon_data[$salon_id]['access_route'];
  }

  ob_start();
?>
  <div class="salon-modal-trigger js-modal_btn" data-modal="salon-modal-<?php echo esc_attr($atts['id']); ?>">
    <div class="salon-modal-trigger__inner">
      <?php if (!empty($atts['image'])): ?>
        <picture class="salon-modal-trigger__image">
          <img src="<?php echo esc_url($atts['image']); ?>" alt="<?php echo esc_attr($atts['name']); ?>" width="1200" height="800" loading="lazy" decoding="async">
        </picture>
      <?php endif; ?>

      <div class="salon-modal-trigger__content">
        <a href="https://beauty.hotpepper.jp/kr/<?php echo esc_attr($hotpepper_id); ?>/?utm_source=site&utm_medium=card&utm_campaign=reserve" class="salon-modal-trigger__hotpepper-logo" target="_blank" rel="noopener noreferrer">
          <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/ビューティーロゴ2.png" alt="ホットペッパービューティーで予約" width="479" height="479" loading="lazy" decoding="async">
        </a>

        <?php if (!empty($atts['subtitle'])): ?>
          <div class="salon-modal-trigger__subtitle"><?php echo esc_html($atts['subtitle']); ?></div>
        <?php endif; ?>

        <?php if (!empty($atts['concept'])): ?>
          <div class="salon-modal-trigger__concept"><?php echo esc_html($atts['concept']); ?></div>
        <?php endif; ?>

        <div class="salon-modal-trigger__address"><?php echo $address_en; ?></div>

        <p class="salon-click-hint">Click for details</p>

        <?php if (!empty($atts['name'])): ?>
          <h3 class="salon-modal-trigger__name"><?php echo esc_html($atts['name']); ?></h3>
        <?php endif; ?>
      </div>
    </div>
  </div>

  <div id="salon-modal-<?php echo esc_attr($atts['id']); ?>" class="js-modal_wrap p-salon" role="dialog" aria-modal="true" aria-label="<?php echo esc_attr($atts['name']); ?>">
    <div class="js-modal_cont">
      <button class="js-modal_close p-ico">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>

      <div class="l-modal_area">
        <div class="c-name"><?php echo esc_html($atts['name']); ?></div>

        <?php if (!empty($atts['subtitle'])): ?>
          <div class="c-copy_ja"><?php echo esc_html($atts['subtitle']); ?></div>
        <?php endif; ?>

        <?php if (!empty($atts['concept'])): ?>
          <div class="c-copy_en"><?php echo esc_html($atts['concept']); ?></div>
        <?php endif; ?>

        <div class="l-2col">
          <div>
            <?php if (!empty($atts['description'])): ?>
              <div class="c-text p-main"><?php echo wp_kses_post($atts['description']); ?></div>
            <?php endif; ?>

            <?php if (!empty($atts['address'])): ?>
              <div class="c-text"><?php echo wp_kses_post($atts['address']); ?></div>
            <?php endif; ?>

            <?php if (!empty($atts['tel'])): ?>
              <div class="c-text">TEL: <?php echo esc_html($atts['tel']); ?></div>
            <?php endif; ?>

            <?php if (!empty($atts['hours'])): ?>
              <div class="c-text"><?php echo esc_html($atts['hours']); ?></div>
            <?php endif; ?>

            <?php if (!empty($atts['access'])): ?>
              <div class="c-text"><?php echo esc_html($atts['access']); ?></div>
            <?php endif; ?>

            <?php if (!empty($atts['maps_url'])): ?>
              <div class="c-text p-map">
                <a href="<?php echo esc_url($atts['maps_url']); ?>" target="_blank" rel="noopener">Google Maps</a>
              </div>
            <?php endif; ?>

            <a href="https://beauty.hotpepper.jp/kr/<?php echo esc_attr($hotpepper_id); ?>/?utm_source=site&utm_medium=modal&utm_campaign=reserve" class="salon-modal__hotpepper-logo" target="_blank" rel="noopener noreferrer">
              <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/ビューティーロゴ2.png" alt="ホットペッパービューティーで予約" width="479" height="479" loading="lazy" decoding="async">
            </a>

            <?php if (!empty($atts['access_route'])): ?>
              <div class="salon-modal-route">
                <p class="salon-modal-route__title">駅からの道順</p>
                <p class="salon-modal-route__text"><?php echo nl2br(esc_html($atts['access_route'])); ?></p>
              </div>
            <?php endif; ?>
          </div>

          <?php if (!empty($atts['modal_image'])): ?>
            <div class="js-modal_slider l-modal_slider swiper-fade">
              <div class="swiper-wrapper">
                <div class="c-item swiper-slide">
                  <picture class="c-img">
                    <img src="<?php echo esc_url($atts['modal_image']); ?>" alt="<?php echo esc_attr($atts['name']); ?>" width="1200" height="800" loading="lazy" decoding="async">
                  </picture>
                </div>
              </div>
            </div>
          <?php endif; ?>

          <div class="modal-contact-section">
            <a href="https://patolaqshe.com/contact/" target="_blank" rel="noopener" class="modal-contact-btn">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
<?php
  return ob_get_clean();
}
add_shortcode('salon_modal', 'pato_salon_modal_shortcode');

/**
 * ========================================
 * カスタムタクソノミー: 記事種別
 * ========================================
 * ブロックエディタで絞り込み可能にするため、
 * カスタムフィールド _post_category を
 * カスタムタクソノミー article_type としても登録
 */
function ptl_register_article_type_taxonomy()
{
  $labels = array(
    'name' => '記事種別',
    'singular_name' => '記事種別',
    'search_items' => '記事種別を検索',
    'all_items' => '全ての記事種別',
    'edit_item' => '記事種別を編集',
    'update_item' => '記事種別を更新',
    'add_new_item' => '新しい記事種別を追加',
    'new_item_name' => '新しい記事種別名',
    'menu_name' => '記事種別',
  );

  $args = array(
    'hierarchical' => false,
    'labels' => $labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'query_var' => true,
    'rewrite' => array('slug' => 'article-type'),
    'show_in_rest' => true, // ブロックエディタで使用可能にする
    'public' => true,
  );

  register_taxonomy('article_type', array('post'), $args);

  // デフォルトのタームを登録
  if (!term_exists('ニュース', 'article_type')) {
    wp_insert_term('ニュース', 'article_type', array('slug' => 'news'));
  }
  if (!term_exists('お客様の声', 'article_type')) {
    wp_insert_term('お客様の声', 'article_type', array('slug' => 'uservoice'));
  }
  if (!term_exists('ブログ記事', 'article_type')) {
    wp_insert_term('ブログ記事', 'article_type', array('slug' => 'blog'));
  }
}
add_action('init', 'ptl_register_article_type_taxonomy');

/**
 * 投稿保存時にカスタムフィールドとタクソノミーを同期
 */
function ptl_sync_post_category_to_taxonomy($post_id)
{
  // 自動保存時は何もしない
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
  }

  // 投稿タイプが post でない場合は何もしない
  if (get_post_type($post_id) !== 'post') {
    return;
  }

  // カスタムフィールド _post_category の値を取得
  $post_category = get_post_meta($post_id, '_post_category', true);

  if (!$post_category) {
    return;
  }

  // カスタムフィールドの値に応じてタクソノミーを設定
  $term_slug = '';
  switch ($post_category) {
    case 'news':
      $term_slug = 'news';
      break;
    case 'uservoice':
      $term_slug = 'uservoice';
      break;
    case 'blog':
      $term_slug = 'blog';
      break;
  }

  if ($term_slug) {
    // タクソノミーを設定（既存のタームを上書き）
    wp_set_object_terms($post_id, $term_slug, 'article_type', false);
  }
}
add_action('save_post', 'ptl_sync_post_category_to_taxonomy', 20);

/**
 * 既存の全投稿のカスタムフィールドをタクソノミーに移行
 * 管理画面でのみ実行（初回のみ）
 */
function ptl_migrate_post_category_to_taxonomy()
{
  // 移行済みフラグをチェック
  if (get_option('ptl_article_type_migrated')) {
    return;
  }

  // 管理画面でのみ実行
  if (!is_admin()) {
    return;
  }

  // 全ての投稿を取得
  $posts = get_posts(array(
    'post_type' => 'post',
    'posts_per_page' => -1,
    'post_status' => 'any',
  ));

  $count = 0;
  foreach ($posts as $post) {
    $post_category = get_post_meta($post->ID, '_post_category', true);

    if (!$post_category) {
      continue;
    }

    $term_slug = '';
    switch ($post_category) {
      case 'news':
        $term_slug = 'news';
        break;
      case 'uservoice':
        $term_slug = 'uservoice';
        break;
      case 'blog':
        $term_slug = 'blog';
        break;
    }

    if ($term_slug) {
      wp_set_object_terms($post->ID, $term_slug, 'article_type', false);
      $count++;
    }
  }

  // 移行完了フラグを保存
  update_option('ptl_article_type_migrated', true);

  // 管理画面に通知（オプション）
  if ($count > 0) {
    add_action('admin_notices', function () use ($count) {
      echo '<div class="notice notice-success is-dismissible">';
      echo '<p>記事種別の移行が完了しました。' . $count . '件の投稿を処理しました。</p>';
      echo '</div>';
    });
  }
}
add_action('admin_init', 'ptl_migrate_post_category_to_taxonomy');

/**
 * ========================================
 * カスタムタクソノミー: 店舗選択
 * ========================================
 * ブロックエディタで絞り込み可能にするため、
 * カスタムフィールド _store_locations を
 * カスタムタクソノミー store_location としても登録
 */
function ptl_register_store_location_taxonomy()
{
  $labels = array(
    'name' => '店舗選択',
    'singular_name' => '店舗',
    'search_items' => '店舗を検索',
    'all_items' => '全ての店舗',
    'edit_item' => '店舗を編集',
    'update_item' => '店舗を更新',
    'add_new_item' => '新しい店舗を追加',
    'new_item_name' => '新しい店舗名',
    'menu_name' => '店舗選択',
  );

  $args = array(
    'hierarchical' => false,
    'labels' => $labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'query_var' => true,
    'rewrite' => array('slug' => 'store'),
    'show_in_rest' => true, // ブロックエディタで使用可能にする
    'public' => true,
  );

  register_taxonomy('store_location', array('post'), $args);

  // デフォルトのタームを登録
  if (!term_exists('グランド', 'store_location')) {
    wp_insert_term('グランド', 'store_location', array('slug' => 'grand'));
  }
  if (!term_exists('銀座店', 'store_location')) {
    wp_insert_term('銀座店', 'store_location', array('slug' => 'ginza'));
  }
  if (!term_exists('代官山店', 'store_location')) {
    wp_insert_term('代官山店', 'store_location', array('slug' => 'daikanyama'));
  }
}
add_action('init', 'ptl_register_store_location_taxonomy');

/**
 * 投稿保存時にカスタムフィールドとタクソノミーを同期
 */
function ptl_sync_store_locations_to_taxonomy($post_id)
{
  // 自動保存時は何もしない
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
  }

  // 投稿タイプが post でない場合は何もしない
  if (get_post_type($post_id) !== 'post') {
    return;
  }

  // カスタムフィールド _store_locations の値を取得（配列）
  $store_locations = get_post_meta($post_id, '_store_locations', true);

  if (empty($store_locations) || !is_array($store_locations)) {
    return;
  }

  // タクソノミーのタームスラッグに変換
  $term_slugs = array();

  foreach ($store_locations as $location) {
    switch ($location) {
      case 'grand':
        $term_slugs[] = 'grand';
        break;
      case 'ginza':
        $term_slugs[] = 'ginza';
        break;
      case 'daikanyama':
        $term_slugs[] = 'daikanyama';
        break;
    }
  }

  if (!empty($term_slugs)) {
    // タクソノミーを設定（既存のタームを上書き）
    wp_set_object_terms($post_id, $term_slugs, 'store_location', false);
  }
}
add_action('save_post', 'ptl_sync_store_locations_to_taxonomy', 20);

/**
 * 既存の全投稿のカスタムフィールドをタクソノミーに移行
 * 管理画面でのみ実行（初回のみ）
 */
function ptl_migrate_store_locations_to_taxonomy()
{
  // 移行済みフラグをチェック
  if (get_option('ptl_store_location_migrated')) {
    return;
  }

  // 管理画面でのみ実行
  if (!is_admin()) {
    return;
  }

  // 全ての投稿を取得
  $posts = get_posts(array(
    'post_type' => 'post',
    'posts_per_page' => -1,
    'post_status' => 'any',
  ));

  $count = 0;
  foreach ($posts as $post) {
    $store_locations = get_post_meta($post->ID, '_store_locations', true);

    if (empty($store_locations) || !is_array($store_locations)) {
      continue;
    }

    $term_slugs = array();

    foreach ($store_locations as $location) {
      switch ($location) {
        case 'grand':
          $term_slugs[] = 'grand';
          break;
        case 'ginza':
          $term_slugs[] = 'ginza';
          break;
        case 'daikanyama':
          $term_slugs[] = 'daikanyama';
          break;
      }
    }

    if (!empty($term_slugs)) {
      wp_set_object_terms($post->ID, $term_slugs, 'store_location', false);
      $count++;
    }
  }

  // 移行完了フラグを保存
  update_option('ptl_store_location_migrated', true);

  // 管理画面に通知（オプション）
  if ($count > 0) {
    add_action('admin_notices', function () use ($count) {
      echo '<div class="notice notice-success is-dismissible">';
      echo '<p>店舗選択の移行が完了しました。' . $count . '件の投稿を処理しました。</p>';
      echo '</div>';
    });
  }
}
add_action('admin_init', 'ptl_migrate_store_locations_to_taxonomy');

/**
 * ========================================
 * ブログモーダルウィンドウ
 * ========================================
 * 使い方: 
 * グランド用: [blog_list_modal]
 * 銀座用: [blog_list_modal store="ginza"]
 * 代官山用: [blog_list_modal store="daikanyama"]
 */
function ptl_blog_list_modal_shortcode($atts)
{
  $atts = shortcode_atts(array(
    'store' => 'all',
  ), $atts);

  $store = sanitize_text_field($atts['store']);

  // ブログ記事を取得
  $args = array(
    'post_type' => 'post',
    'posts_per_page' => -1,
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC',
    'meta_query' => array(
      array(
        'key' => '_post_category',
        'value' => 'blog',
        'compare' => '='
      )
    )
  );

  // 店舗指定がある場合
  if ($store !== 'all') {
    $args['tax_query'] = array(
      array(
        'taxonomy' => 'store_location',
        'field' => 'slug',
        'terms' => $store,
      )
    );
  }

  $blog_posts = get_posts($args);

  // モーダルID生成
  $modal_id = 'blog-modal-' . $store;

  ob_start();
?>

  <!-- ブログモーダル本体 -->
  <div id="<?php echo esc_attr($modal_id); ?>" class="js-modal_wrap blog-modal" role="dialog" aria-modal="true" aria-label="ブログ一覧">
    <div class="js-modal_cont">
      <button class="js-modal_close blog-modal__close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>

      <div class="blog-modal__content">
        <!-- バナー画像 -->
        <div class="blog-modal__hero">
          <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/blog-modal-hero.jpg" alt="BLOG" width="1280" height="960" loading="lazy" decoding="async">
          <div class="blog-modal__hero-text">BLOG</div>
        </div>

        <!-- ブログリスト -->
        <div class="blog-modal__list">
          <?php if (!empty($blog_posts)): ?>
            <?php foreach ($blog_posts as $post): ?>
              <a href="<?php echo get_permalink($post->ID); ?>" class="blog-modal__item">
                <span class="blog-modal__date"><?php echo get_the_date('Y.m.d', $post->ID); ?></span>
                <span class="blog-modal__title"><?php echo esc_html(get_the_title($post->ID)); ?></span>
              </a>
            <?php endforeach; ?>
          <?php else: ?>
            <p class="blog-modal__empty">まだブログ記事がありません。</p>
          <?php endif; ?>
        </div>
      </div>
    </div>
    <div class="js-modal_bg js-modal_close"></div>
  </div>

<?php
  return ob_get_clean();
}
add_shortcode('blog_list_modal', 'ptl_blog_list_modal_shortcode');

/**
 * ========================================
 * ニュースモーダルウィンドウ
 * ========================================
 * 使い方:
 * [news_list_modal]
 */
function ptl_news_list_modal_shortcode($atts)
{
  $atts = shortcode_atts(array(
    'store' => 'all',
  ), $atts);

  $store = sanitize_text_field($atts['store']);

  // ニュース記事を取得
  $args = array(
    'post_type' => 'post',
    'posts_per_page' => -1,
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC',
    'meta_query' => array(
      array(
        'key' => '_post_category',
        'value' => 'news',
        'compare' => '='
      )
    )
  );

  // 店舗指定がある場合
  if ($store !== 'all') {
    $args['tax_query'] = array(
      array(
        'taxonomy' => 'store_location',
        'field' => 'slug',
        'terms' => $store,
      )
    );
  }

  $news_posts = get_posts($args);

  // モーダルID生成
  $modal_id = 'news-modal-' . $store;

  ob_start();
?>

  <!-- ニュースモーダル本体 -->
  <div id="<?php echo esc_attr($modal_id); ?>" class="js-modal_wrap news-modal" role="dialog" aria-modal="true" aria-label="ニュース一覧">
    <div class="js-modal_cont">
      <button class="js-modal_close news-modal__close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>

      <div class="news-modal__content">
        <!-- バナー画像 -->
        <div class="news-modal__hero">
          <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/news-modal.jpg" alt="NEWS" width="1600" height="800" loading="lazy" decoding="async">
          <div class="news-modal__hero-text">NEWS</div>
        </div>

        <!-- ニュースリスト -->
        <div class="news-modal__list">
          <?php if (!empty($news_posts)): ?>
            <?php foreach ($news_posts as $post): ?>
              <a href="<?php echo get_permalink($post->ID); ?>" class="news-modal__item">
                <span class="news-modal__date"><?php echo get_the_date('Y.m.d', $post->ID); ?></span>
                <span class="news-modal__title"><?php echo esc_html(get_the_title($post->ID)); ?></span>
              </a>
            <?php endforeach; ?>
          <?php else: ?>
            <p class="news-modal__empty">まだニュース記事がありません。</p>
          <?php endif; ?>
        </div>
      </div>
    </div>
    <div class="js-modal_bg js-modal_close"></div>
  </div>

<?php
  return ob_get_clean();
}
add_shortcode('news_list_modal', 'ptl_news_list_modal_shortcode');
/**
 * ニュースモーダル用CSS enqueue（JSはptl-modal.jsに統合済み）
 */
function pato_enqueue_news_modal_assets()
{
  // CSS PC
  $css_pc_path = get_stylesheet_directory() . '/css/pc/news-modal-pc.css';
  if (file_exists($css_pc_path)) {
    wp_enqueue_style(
      'pato-news-modal-pc',
      get_stylesheet_directory_uri() . '/css/pc/news-modal-pc.css',
      array(),
      filemtime($css_pc_path),
      'screen and (min-width: 768px)'
    );
  }

  // CSS SP
  $css_sp_path = get_stylesheet_directory() . '/css/sp/news-modal-sp.css';
  if (file_exists($css_sp_path)) {
    wp_enqueue_style(
      'pato-news-modal-sp',
      get_stylesheet_directory_uri() . '/css/sp/news-modal-sp.css',
      array(),
      filemtime($css_sp_path),
      'screen and (max-width: 767px)'
    );
  }
}
add_action('wp_enqueue_scripts', 'pato_enqueue_news_modal_assets');

/**
 * ニュースセクションMOREボタンモーダルトリガー用JS
 */
function pato_enqueue_modal_triggers()
{
  // 統合トリガーファイル
  $js_path = get_stylesheet_directory() . '/js/modal-triggers.js';
  if (file_exists($js_path)) {
    wp_enqueue_script(
      'pato-modal-triggers',
      get_stylesheet_directory_uri() . '/js/modal-triggers.js',
      array('ptl-modal'),
      filemtime($js_path),
      true
    );
  }
}
add_action('wp_enqueue_scripts', 'pato_enqueue_modal_triggers');

/**
 * ========================================
 * FAQモーダル
 * ========================================
 */
function ptl_faq_modal_shortcode()
{
  ob_start();
?>
  <div id="faq-modal" class="js-modal_wrap faq-modal" role="dialog" aria-modal="true" aria-label="よくあるご質問">
    <div class="js-modal_bg"></div>
    <div class="js-modal_cont">
      <button class="js-modal_close" aria-label="モーダルを閉じる">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>

      <div class="modal-hero">
        <img src="https://patolaqshe.com/wp-content/uploads/2026/02/FAQバナー用.jpg" alt="FAQ" width="1200" height="800" loading="lazy" decoding="async" />
        <h2 class="modal-hero-title">FAQ</h2>
      </div>

      <div class="modal-content">
        <div class="faq-list">
          <!-- Q1 -->
          <div class="faq-item">
            <div class="faq-question">Q: 予約方法を教えてください</div>
            <div class="faq-answer">A: お電話（営業時間内）、LINE、またはホットペッパービューティーから24時間ご予約いただけます。</div>
          </div>

          <!-- Q2 -->
          <div class="faq-item">
            <div class="faq-question">Q: 予約の変更・キャンセルはできますか？</div>
            <div class="faq-answer">A: はい、可能です。ただし、変更・キャンセルは2営業日前までにお願いいたします。それ以降の場合は、回数券の消化またはキャンセル料が発生する場合がございます。お電話またはLINEにてご連絡ください。</div>
          </div>

          <!-- Q3 -->
          <div class="faq-item">
            <div class="faq-question">Q: 支払い方法を教えてください</div>
            <div class="faq-answer">A: 現金、クレジットカード、電子マネーがご利用いただけます。</div>
          </div>

          <!-- Q4 -->
          <div class="faq-item">
            <div class="faq-question">Q: どんな施術をしますか？</div>
            <div class="faq-answer">A: パトラクシェでは、フラッシュバスト（光バストアップ）2000ショット・乳腺マッサージ・ナノカレント（微弱電流）・背面/二の腕/デコルテマッサージ・フットマッサージなど複数の施術を、お客様一人一人の状態に合わせて掛け合わせる「オーダーメイド複合施術」が最大の特徴です。銀座店では骨盤底筋ケア、代官山店ではハプロ社製コラーゲンマシンもご利用いただけます。</div>
          </div>

          <!-- Q5 -->
          <div class="faq-item">
            <div class="faq-question">Q: 何回通えば良いですか？通う頻度は？</div>
            <div class="faq-answer">A: バストアップなどの効果実感には、6回以上、2～3ヶ月以上をおすすめしております。お客様お一人おひとりの状態に合わせて、最適なペースをカウンセリング時にお伝えいたします。最初は2週間に1回がベースとなり、徐々にペースは減っていきます。</div>
          </div>

          <!-- Q6 -->
          <div class="faq-item">
            <div class="faq-question">Q: 年齢制限はありますか？</div>
            <div class="faq-answer">A: 18歳以上の方からご利用いただけます。未成年の方は保護者の同意が必要です。</div>
          </div>

          <!-- Q7 -->
          <div class="faq-item">
            <div class="faq-question">Q: 無料カウンセリングだけでも良いですか？</div>
            <div class="faq-answer">A: はい、もちろんです。無料カウンセリングのみも大歓迎です。施術内容やお悩みについて、じっくりお話を伺い、不安や疑問を解消してからご判断いただけますので、お気軽にご相談ください。</div>
          </div>

          <!-- Q8 -->
          <div class="faq-item">
            <div class="faq-question">Q: バストの下垂や左右差は改善できますか？</div>
            <div class="faq-answer">A: はい、可能です。バストを支える筋肉を整えることで下垂の改善が期待でき、左右のバランスを整える施術も行います。お一人おひとりの状態に合わせてケアいたします。</div>
          </div>

          <!-- Q9 -->
          <div class="faq-item">
            <div class="faq-question">Q: 体調不良や生理中でも施術できますか？</div>
            <div class="faq-answer">A: 生理中の施術は可能ですが、体調がすぐれない場合は無理をせずご相談ください。婦人科系で通院もしくは治療を継続されている方は、お身体の状態によってお控えいただく場合がございます。事前にお気軽にご相談ください。</div>
          </div>

          <!-- Q10 -->
          <div class="faq-item">
            <div class="faq-question">Q: 妊娠中・産後・授乳中でも施術できますか？</div>
            <div class="faq-answer">A: 妊娠中および授乳中の方はお控えいただいております。産後は卒乳後、6ヶ月以降で体調が安定してからご利用いただけます。</div>
          </div>

          <div class="faq-section-label" style="margin: 2em 0 1em; padding: 0.5em 0; border-top: 1px solid rgba(0,0,0,0.08); font-size: 0.85em; color: #999; letter-spacing: 0.05em;">施術・技術について</div>

          <!-- Q11 -->
          <div class="faq-item">
            <div class="faq-question">Q: フラッシュバスト（光バストアップ）とは何ですか？なぜ2000ショットが重要なのですか？</div>
            <div class="faq-answer">A: フラッシュバストは光エネルギーを照射して乳腺や脂肪細胞を深部から活性化する施術です。パトラクシェでは都内随一の1回2000ショットを照射しますが、重要なのはショット数だけではありません。当サロンのバストアップ専用マシンには、ドイツ・Heraeus（ヘレウス）社製の高品質フラッシュランプとサファイアクリスタルを搭載。Heraeus社は1851年創業の光源技術の世界的リーダーです。脱毛機や複合美容機の転用ではなく、光のパルス幅をバストアップ施術専用に最適化した専用設計で、コストを度外視した高品質部品により2000ショットの最後の1発まで安定した光質を維持します。</div>
          </div>

          <!-- Q12 -->
          <div class="faq-item">
            <div class="faq-question">Q: オーダーメイド複合施術とは何ですか？なぜ単体施術より効果が高いのですか？</div>
            <div class="faq-answer">A: オーダーメイド複合施術とは、フラッシュバスト（光療法）・乳腺マッサージ（オールハンド）・ナノカレント（微弱電流）・背面/二の腕/デコルテマッサージ・骨盤底筋ケアなど複数の施術を、お客様一人一人の状態に合わせて組み合わせるパトラクシェ独自のアプローチです。光療法でコラーゲン生成を促進しながら、同時にハンドマッサージで血流・リンパ循環を促進することで、単体施術では得られない相乗効果が生まれます。</div>
          </div>

          <!-- Q13 -->
          <div class="faq-item">
            <div class="faq-question">Q: 乳腺マッサージにはどのような効果がありますか？</div>
            <div class="faq-answer">A: 乳腺マッサージはパトラクシェの主力施術です。熟練のオールハンド技術で乳腺を丁寧にほぐし、血流・リンパ循環を促進します。乳腺への直接的な刺激がバストのハリ・ボリューム・形の改善をサポートし、フラッシュバストやナノカレントとの複合施術で相乗効果を発揮します。</div>
          </div>

          <!-- Q14 -->
          <div class="faq-item">
            <div class="faq-question">Q: 骨盤底筋ケアがバストアップに効果的な理由は？（銀座店限定）</div>
            <div class="faq-answer">A: 骨盤底筋と胸部は筋膜・横隔膜を介して全身で連動しています。骨盤底筋を整えることで骨盤が安定し、脊椎のアライメントが改善され、自然と胸部が開いてバストが上向きになります。パトラクシェ銀座店では、足裏の反射区刺激と骨盤底筋へのアプローチを組み合わせた専門メニューを提供しています。</div>
          </div>

          <!-- Q15 -->
          <div class="faq-item">
            <div class="faq-question">Q: コラーゲンマシンとバストアップの関係は？（代官山店限定）</div>
            <div class="faq-answer">A: パトラクシェ代官山店ではオランダ・ハプロ社製のコラーゲンマシンを導入しています。633nm赤色可視光線が真皮層の線維芽細胞を活性化し、コラーゲン・エラスチンの生成を促進します。バストを支えるクーパー靭帯はコラーゲンで構成されており、コラーゲン増加により靭帯が強化され、バストのハリ・弾力が向上します。</div>
          </div>

          <!-- Q16 -->
          <div class="faq-item">
            <div class="faq-question">Q: クーパー靭帯とバストの関係を教えてください</div>
            <div class="faq-answer">A: クーパー靭帯は乳房内部にある束状の組織で、バストと大胸筋を連結してバストの形とハリを維持する重要な支持組織です。主にコラーゲンタンパク質で構成されており、加齢や重力により伸びると下垂の原因になります。パトラクシェでは、コラーゲンマシン（光療法）やナノカレント（微弱電流）によるコラーゲン生成促進と、オールハンドによる乳腺マッサージを複合的に行い、クーパー靭帯のケアとバスト全体の改善を目指しています。</div>
          </div>

          <!-- Q17 -->
          <div class="faq-item">
            <div class="faq-question">Q: ナノカレント（微弱電流）とは何ですか？</div>
            <div class="faq-answer">A: ナノカレントは人体の生体電流に近い微弱電流を流す施術です。線維芽細胞を直接刺激してコラーゲン・エラスチンの生成を促進し、バストのハリと弾力を内側から向上させます。フラッシュバスト（光療法）との併用により、光と電流の両方から細胞を活性化する相乗効果が得られます。痛みがなくリラックスしながら受けられるのも特徴です。</div>
          </div>

          <!-- Q18 -->
          <div class="faq-item">
            <div class="faq-question">Q: 他のバストアップサロンとの違いは何ですか？</div>
            <div class="faq-answer">A: パトラクシェが他店と一線を画す理由は大きく3つあります。<strong>第一に、マシンの品質</strong>です。当サロンのフラッシュバストマシンは、脱毛機や複合美容機の転用ではなく、バストアップのためだけに設計された専用マシンです。光源にはドイツ・Heraeus（ヘレウス）社製の高品質フラッシュランプとサファイアクリスタルを搭載し、光のパルス幅もバスト施術専用に最適化。コストを度外視した部品選定により、都内随一の2000ショットの最後の1発まで安定した光質を維持します。<strong>第二に、オーダーメイド複合施術</strong>です。フラッシュバスト・乳腺マッサージ・ナノカレント・背面/デコルテマッサージなどを一人一人の状態に合わせて組み合わせ、単一施術では得られない相乗効果を引き出します。<strong>第三に、施術の丁寧さ</strong>です。背面・二の腕・デコルテなどお身体全体を触る施術時間がバストアップ専門サロンの中でも長いとお客様から評価いただいています。創業13年・延べ7万人以上の実績に基づく経験が、この品質を支えています。</div>
          </div>

          <div class="faq-section-label" style="margin: 2em 0 1em; padding: 0.5em 0; border-top: 1px solid rgba(0,0,0,0.08); font-size: 0.85em; color: #999; letter-spacing: 0.05em;">アクセス・ご来店について</div>

          <!-- Q19 -->
          <div class="faq-item">
            <div class="faq-question">Q: 銀座店へのアクセス方法を教えてください</div>
            <div class="faq-answer">A: パトラクシェ銀座店は、東京メトロ有楽町線「銀座一丁目駅」10番出口から徒歩約1分です。東京メトロ「銀座駅」A13番出口からは徒歩約4分、JR「有楽町駅」京橋口からも徒歩約4分です。1Fにムーンフェイズ（時計店）が入ったGINZA ARROWSビルの6Fです。ビル側面入口のインターホンで[6]を押してお入りください。銀座エリアの中心部に位置しており、お仕事帰りやお買い物のついでにも通いやすい立地です。住所：東京都中央区銀座1-6-6 GINZA ARROWS 6F</div>
          </div>

          <!-- Q20 -->
          <div class="faq-item">
            <div class="faq-question">Q: 代官山店（恵比寿・代官山）へのアクセス方法を教えてください</div>
            <div class="faq-answer">A: パトラクシェ代官山店は、東急東横線「代官山駅」から徒歩2分、JR山手線「恵比寿駅」西口から徒歩約6分です。恵比寿駅西口を出て恵比寿銀座商店街を抜け、恵比寿西一丁目の五差路を斜め左（坂道方面）へ進みます。タイムズ駐車場のある角を左折するとすぐ左手の堀井代官山ビル3Fです。住所：東京都渋谷区代官山町18-8 堀井代官山ビル3F</div>
          </div>

          <!-- Q21 -->
          <div class="faq-item">
            <div class="faq-question">Q: 施術は痛くないですか？</div>
            <div class="faq-answer">A: フラッシュバスト（光バストアップ）はほんのり温かさを感じる程度で、痛みはほとんどありません。乳腺マッサージは乳腺の状態によって初回は少し張る感覚がある場合もございますが、回を重ねるごとに楽になります。ナノカレントは人体の生体電流に近い微弱電流のため、刺激を感じることなくリラックスしてお受けいただけます。施術中に寝てしまうお客様も多くいらっしゃいます。</div>
          </div>

          <!-- Q22 -->
          <div class="faq-item">
            <div class="faq-question">Q: 男性も利用できますか？</div>
            <div class="faq-answer">A: 申し訳ございませんが、パトラクシェは女性専用サロンです。スタッフも全員女性ですので、女性のお客様に安心してお過ごしいただける空間を大切にしております。</div>
          </div>

          <!-- Q23 -->
          <div class="faq-item">
            <div class="faq-question">Q: 1回の施術時間はどのくらいですか？</div>
            <div class="faq-answer">A: 施術内容によって異なりますが、カウンセリング込みで約60分〜90分が目安です。初回はカウンセリングに丁寧にお時間をいただくため、90分〜120分程度を見ていただければ余裕を持ってご来店いただけます。2回目以降はスムーズに施術に入れますので60分〜90分程度となります。</div>
          </div>

          <!-- Q24 -->
          <div class="faq-item">
            <div class="faq-question">Q: バストアップの効果はどのくらい持続しますか？</div>
            <div class="faq-answer">A: 施術直後から効果を実感いただけますが、持続期間はお客様の体質や生活習慣により異なります。初回は数日〜1週間ほどで徐々に落ち着く場合がございますが、回数を重ねるごとに定着しやすくなります。継続的な施術（6回以上推奨）と正しいセルフケア・下着選びを組み合わせることで、長期的な維持が期待できます。カウンセリング時に最適な通院プランをご提案いたします。</div>
          </div>

          <!-- Q25 -->
          <div class="faq-item">
            <div class="faq-question">Q: 豊胸手術とバストアップエステの違いは何ですか？</div>
            <div class="faq-answer">A: 豊胸手術はメスや注射器を使用する外科的処置で、シリコンバッグ挿入やヒアルロン酸注入などがあります。一方、パトラクシェのバストアップエステは完全に非侵襲（メスや針を一切使わない）です。光エネルギー・乳腺マッサージ・微弱電流などの施術で、お身体本来の機能を活性化させてバストアップを目指します。手術のようなダウンタイムや傷跡がなく、施術直後から通常の生活が可能です。「自然にバストアップしたい」「手術には抵抗がある」という方に選ばれています。</div>
          </div>
        </div>
      </div>
    </div>
  </div>
<?php
  return ob_get_clean();
}
add_shortcode('faq_modal', 'ptl_faq_modal_shortcode');

/**
 * ========================================
 * プライバシーポリシーモーダル
 * ========================================
 */
function ptl_privacy_modal_shortcode()
{
  ob_start();
  get_template_part('template-parts/section', 'privacy');
  return ob_get_clean();
}
add_shortcode('privacy_modal', 'ptl_privacy_modal_shortcode');
// =====================================================
// お客様の声ショートコード
// =====================================================
add_shortcode('voice_list', 'display_voice_list');
function display_voice_list() {
    $stores = [
        'daikanyama' => '恵比寿・代官山店',
        'ginza'      => '銀座店',
    ];

    $output = '<div class="voice-list-custom">';

    foreach ($stores as $store_key => $store_label) {
        $args = [
            'post_type'      => 'post',
            'posts_per_page' => 10,
            'meta_query'     => [
                [
                    'key'     => '_store_locations',
                    'value'   => $store_key,
                    'compare' => 'LIKE',
                ],
            ],
            'tax_query'      => [
                [
                    'taxonomy' => 'article_type',
                    'field'    => 'name',
                    'terms'    => 'お客様の声',
                ],
            ],
        ];

        $query = new WP_Query($args);

        if ($query->have_posts()) {
            $output .= '<h2 class="voice-store-heading">' . esc_html($store_label) . '</h2>';

            while ($query->have_posts()) {
                $query->the_post();

                $customer_name = get_post_meta(get_the_ID(), '_customer_name', true);
                $rating    = get_post_meta(get_the_ID(), '_rating', true);
                $output .= '<div class="voice-card-item">';

                // コンテンツ
                $output .= '<div class="voice-card-content">';

                if (get_the_title()) {
                    $output .= '<h3 class="voice-card-title">' . esc_html(get_the_title()) . '</h3>';
                }

                if ($rating) {
                    $stars = str_repeat('☆', intval($rating));
                    $output .= '<div class="voice-card-rating">' . $stars . '</div>';
                }

                if ($customer_name) {
                    $output .= '<div class="voice-card-name">' . esc_html($customer_name) . '</div>';
                }

                $output .= '<div class="voice-card-text">' . get_the_content() . '</div>';
                $output .= '</div>';

                $output .= '</div>';
            }
        }
        wp_reset_postdata();
    }

    $output .= '</div>';

    return $output;
}

// ============================================================
// メニューカテゴリータクソノミー（サービスページのスワイパースライダー用）
// ============================================================
function ptl_register_menu_category_taxonomy()
{
  $labels = array(
    'name' => 'メニューカテゴリー',
    'singular_name' => 'メニューカテゴリー',
    'search_items' => 'メニューカテゴリーを検索',
    'all_items' => 'すべてのメニューカテゴリー',
    'edit_item' => 'メニューカテゴリーを編集',
    'update_item' => 'メニューカテゴリーを更新',
    'add_new_item' => '新規メニューカテゴリーを追加',
    'new_item_name' => '新しいメニューカテゴリー名',
    'menu_name' => 'メニューカテゴリー',
  );

  $args = array(
    'hierarchical' => true,
    'labels' => $labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'show_in_quick_edit' => true,
    'show_in_rest' => true,
    'query_var' => true,
    'rewrite' => array('slug' => 'menu-category'),
    'public' => true,
  );

  register_taxonomy('menu_category', array('post'), $args);

  // デフォルトタームの登録
  if (!term_exists('バスト', 'menu_category')) {
    wp_insert_term('バスト', 'menu_category', array('slug' => 'bust'));
  }
  if (!term_exists('フェイシャル', 'menu_category')) {
    wp_insert_term('フェイシャル', 'menu_category', array('slug' => 'facial'));
  }
  if (!term_exists('ボディ', 'menu_category')) {
    wp_insert_term('ボディ', 'menu_category', array('slug' => 'body'));
  }

  // 不要タームの削除（過去の誤登録分）
  $remove_terms = array('美容コラム', 'サロン情報');
  foreach ($remove_terms as $term_name) {
    $term = term_exists($term_name, 'menu_category');
    if ($term) {
      wp_delete_term($term['term_id'], 'menu_category');
    }
  }
}
add_action('init', 'ptl_register_menu_category_taxonomy');

// ============================================================
// ブログカテゴリータクソノミー（ブログ記事の分類用）
// ============================================================
function ptl_register_blog_category_taxonomy()
{
  $labels = array(
    'name' => 'ブログカテゴリー',
    'singular_name' => 'ブログカテゴリー',
    'search_items' => 'ブログカテゴリーを検索',
    'all_items' => 'すべてのブログカテゴリー',
    'edit_item' => 'ブログカテゴリーを編集',
    'update_item' => 'ブログカテゴリーを更新',
    'add_new_item' => '新規ブログカテゴリーを追加',
    'new_item_name' => '新しいブログカテゴリー名',
    'menu_name' => 'ブログカテゴリー',
  );

  $args = array(
    'hierarchical' => true,
    'labels' => $labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'show_in_quick_edit' => true,
    'show_in_rest' => true,
    'query_var' => true,
    'rewrite' => array('slug' => 'blog-category'),
    'public' => true,
  );

  register_taxonomy('blog_category', array('post'), $args);

  // デフォルトタームの登録
  if (!term_exists('バスト', 'blog_category')) {
    wp_insert_term('バスト', 'blog_category', array('slug' => 'blog-bust'));
  }
  if (!term_exists('フェイシャル', 'blog_category')) {
    wp_insert_term('フェイシャル', 'blog_category', array('slug' => 'blog-facial'));
  }
  if (!term_exists('ボディ', 'blog_category')) {
    wp_insert_term('ボディ', 'blog_category', array('slug' => 'blog-body'));
  }
  if (!term_exists('美容コラム', 'blog_category')) {
    wp_insert_term('美容コラム', 'blog_category', array('slug' => 'beauty-column'));
  }
  if (!term_exists('サロン情報', 'blog_category')) {
    wp_insert_term('サロン情報', 'blog_category', array('slug' => 'salon-info'));
  }
}
add_action('init', 'ptl_register_blog_category_taxonomy');

/**
 * 店舗選択モーダルウィンドウ
 * フェイシャル・ボディの予約ボタンから呼び出される
 */
function add_store_select_modal() {
  ?>
  <!-- 店舗選択モーダルウィンドウ -->
  <div id="store-select-modal" class="pato-modal" style="display:none;" role="dialog" aria-modal="true" aria-label="店舗選択">
    <div class="pato-modal-overlay"></div>
    <div class="pato-modal-content">
      <button class="pato-modal-close" aria-label="閉じる">&times;</button>
      <div class="pato-modal-banner">
        <img src="https://patolaqshe.com/wp-content/uploads/2025/12/shop-banner.jpg" alt="予約" width="1200" height="800" loading="lazy" decoding="async">
      </div>
      <h3 class="pato-modal-title">どちらの店舗で予約しますか？</h3>
      <div class="pato-modal-buttons">
        <a href="#" class="pato-modal-btn pato-modal-btn-daikanyama" data-store="daikanyama">
          <span class="store-name">代官山店</span>
          <span class="store-subtitle">恵比寿・代官山</span>
        </a>
        <a href="#" class="pato-modal-btn pato-modal-btn-ginza" data-store="ginza">
          <span class="store-name">銀座店</span>
          <span class="store-subtitle">GINZA</span>
        </a>
      </div>
    </div>
  </div>

  <?php
}
add_action('wp_footer', 'add_store_select_modal');

/**
 * 店舗選択モーダル JavaScript 読み込み
 */
function pato_enqueue_store_modal_assets()
{
  $js_path = get_stylesheet_directory() . '/js/store-modal.js';
  if (file_exists($js_path)) {
    wp_enqueue_script(
      'pato-store-modal',
      get_stylesheet_directory_uri() . '/js/store-modal.js',
      array(),
      filemtime($js_path),
      true
    );
  }
}
add_action('wp_enqueue_scripts', 'pato_enqueue_store_modal_assets');

/**
 * 店舗選択モーダル CSS（外部ファイル読み込み）
 */
function pato_store_modal_css()
{
  $css_path = get_stylesheet_directory() . '/css/store-modal.css';
  if (file_exists($css_path)) {
    wp_enqueue_style('pato-store-modal', get_stylesheet_directory_uri() . '/css/store-modal.css', [], filemtime($css_path));
  }
}
add_action('wp_enqueue_scripts', 'pato_store_modal_css');

// 画像保護（右クリック禁止・ドラッグ禁止）は削除済み
// 理由: MutationObserver+contextmenu/dragstartがパフォーマンスに影響、アクセシビリティに反する

/**
 * 前後の記事ナビゲーションを同じ記事種別に限定
 */
function ptl_adjacent_post_where($where, $in_same_term, $excluded_terms, $taxonomy, $post)
{
  if (get_post_type($post) !== 'post') return $where;

  $terms = wp_get_post_terms($post->ID, 'article_type', array('fields' => 'ids'));
  if (empty($terms)) return $where;

  global $wpdb;
  $term_ids = implode(',', array_map('intval', $terms));

  $where .= " AND p.ID IN (
    SELECT tr.object_id FROM {$wpdb->term_relationships} tr
    INNER JOIN {$wpdb->term_taxonomy} tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
    WHERE tt.taxonomy = 'article_type' AND tt.term_id IN ({$term_ids})
  )";

  return $where;
}
add_filter('get_previous_post_where', 'ptl_adjacent_post_where', 10, 5);
add_filter('get_next_post_where', 'ptl_adjacent_post_where', 10, 5);

/**
 * 商品モーダルウィンドウ
 * グランドトップのコレクションバナーから呼び出される
 */
function add_product_modal() {
  ?>
  <!-- 商品モーダルウィンドウ -->
  <div id="product-modal" class="js-modal_wrap product-modal" role="dialog" aria-modal="true" aria-label="商品紹介">
    <div class="js-modal_cont">
      <button class="js-modal_close product-modal__close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>

      <div class="product-modal__content">
        <!-- バナー画像 -->
        <div class="product-modal__hero">
          <img src="https://patolaqshe.com/wp-content/uploads/2026/02/モーダルウィンドウバナー.jpg" alt="PRODUCT" width="1200" height="800" loading="lazy" decoding="async">
          <div class="product-modal__hero-text">PRODUCT</div>
        </div>

        <!-- 商品コンテンツ -->
        <div class="product-modal__body">

          <!-- 化粧品セクション -->
          <div class="product-section">
            <h3 class="product-section-title">化粧品</h3>
            <div class="product-image">
              <img src="https://patolaqshe.com/wp-content/uploads/2026/02/リアボーテ.jpg" alt="化粧品" width="1200" height="800" loading="lazy" decoding="async">
            </div>
            <div class="product-text">
              <p>最高品質の美容成分を配合した、バストケア専用化粧品。肌に優しく、効果的なケアを実現します。</p>
            </div>
          </div>

          <!-- 下着セクション -->
          <div class="product-section">
            <h3 class="product-section-title">下着</h3>
            <div class="product-image">
              <img src="https://patolaqshe.com/wp-content/uploads/2026/02/ラヴィエール.jpg" alt="下着" width="1200" height="800" loading="lazy" decoding="async">
            </div>
            <div class="product-text">
              <p>美しいバストラインをサポートする補正下着。快適な着け心地と優れた補正力を兼ね備えています。</p>
            </div>
          </div>

          <!-- お問い合わせボタン -->
          <div class="product-contact">
            <button class="product-contact-btn" type="button">
              商品についてお問い合わせ
            </button>
          </div>

        </div>
      </div>
    </div>
    <div class="js-modal_bg js-modal_close"></div>
  </div>
  <?php
}
add_action('wp_footer', 'add_product_modal');

/**
 * 商品モーダル用CSS読み込み（JSはptl-modal.jsに統合済み）
 */
function pato_enqueue_product_modal_assets()
{
  // CSS PC
  $css_pc_path = get_stylesheet_directory() . '/css/pc/product-modal-pc.css';
  if (file_exists($css_pc_path)) {
    wp_enqueue_style(
      'pato-product-modal-pc',
      get_stylesheet_directory_uri() . '/css/pc/product-modal-pc.css',
      array(),
      filemtime($css_pc_path),
      'screen and (min-width: 768px)'
    );
  }

  // CSS SP
  $css_sp_path = get_stylesheet_directory() . '/css/sp/product-modal-sp.css';
  if (file_exists($css_sp_path)) {
    wp_enqueue_style(
      'pato-product-modal-sp',
      get_stylesheet_directory_uri() . '/css/sp/product-modal-sp.css',
      array(),
      filemtime($css_sp_path),
      'screen and (max-width: 767px)'
    );
  }
}
add_action('wp_enqueue_scripts', 'pato_enqueue_product_modal_assets');

/**
 * トップページ title タグ最適化
 * デフォルト「パトラクシェ公式サイト」→ キーワード入りに変更
 */
add_filter('pre_get_document_title', function ($title) {
    if (is_front_page()) {
        return '恵比寿・代官山・銀座のバストアップ専門サロン｜パトラクシェ';
    }
    if (is_page('information')) {
        return 'エステティシャン求人｜銀座・恵比寿 バストアップ専門パトラクシェ';
    }
    return $title;
});

/**
 * 構造化データ（JSON-LD）- SEO/GEO対策
 * トップページのみ出力
 */
add_action('wp_head', function () {
    if (!is_front_page()) return;

    $logo_url = 'https://patolaqshe.com/wp-content/themes/swell_child/img/intrologo.png';

    $structured_data = [
        '@context' => 'https://schema.org',
        '@graph'   => [
            // 1. 恵比寿・代官山店
            [
                '@type'       => 'BeautySalon',
                '@id'         => 'https://patolaqshe.com/#daikanyama',
                'name'        => 'バストアップ専門パトラクシェ恵比寿・代官山店',
                'description' => '恵比寿エリアのバストアップ専門パトラクシェ恵比寿・代官山店。都内最大級フラッシュバスト2000ショット・乳腺マッサージ・ナノカレント・背面マッサージ・コラーゲンマシンなど複数の施術を一人一人の状態に合わせて組み合わせるオーダーメイド複合施術が最大の特徴。背面・二の腕・デコルテなどお身体全体を触る施術時間がバストアップサロンの中でも長いと好評。創業13年・累計3万人超の実績。JR恵比寿駅徒歩6分、代官山駅徒歩2分。初回体験9,500円。',
                'image'       => 'https://patolaqshe.com/wp-content/themes/swell_child/img/daikanyama.jpg',
                'url'         => 'https://patolaqshe.com/ebisu-daikanyama/',
                'telephone'   => '03-5489-7118',
                'priceRange'  => '¥¥',
                'currenciesAccepted' => 'JPY',
                'paymentAccepted'    => '現金, クレジットカード, 電子マネー',
                'address'     => [
                    '@type'           => 'PostalAddress',
                    'streetAddress'   => '代官山町18-8 堀井代官山ビル3F',
                    'addressLocality' => '渋谷区',
                    'addressRegion'   => '東京都',
                    'postalCode'      => '150-0034',
                    'addressCountry'  => 'JP',
                ],
                'geo' => [
                    '@type'     => 'GeoCoordinates',
                    'latitude'  => 35.649642,
                    'longitude' => 139.701838,
                ],
                'openingHoursSpecification' => [
                    [
                        '@type'     => 'OpeningHoursSpecification',
                        'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                        'opens'     => '12:00',
                        'closes'    => '20:00',
                    ],
                    [
                        '@type'     => 'OpeningHoursSpecification',
                        'dayOfWeek' => ['Saturday', 'Sunday'],
                        'opens'     => '11:00',
                        'closes'    => '19:00',
                    ],
                ],
                'hasMap'      => 'https://maps.google.com/?q=東京都渋谷区代官山町18-8+堀井代官山ビル3F',
                'parentOrganization' => ['@id' => 'https://patolaqshe.com/#organization'],
                'sameAs' => [
                    'https://beauty.hotpepper.jp/kr/slnH000263216/',
                    'https://beauty.rakuten.co.jp/s6000025008/',
                    'https://minimodel.jp/r/W1skc0C',
                    'https://www.ekiten.jp/shop_31025095/',
                    'https://www.google.com/maps?cid=3885199838792015163',
                    'https://www.instagram.com/patolaqshe_daikanyama/',
                    'https://www.threads.com/@patolaqshe_daikanyama',
                    'https://www.facebook.com/profile.php?id=61560845258498',
                    'https://x.com/patolaqshe',
                    'https://www.youtube.com/@patolaqshe',
                    'https://www.tiktok.com/@patolaqshe',
                ],
                'potentialAction' => [
                    [
                        '@type'  => 'ReserveAction',
                        'name'   => 'ホットペッパーで予約',
                        'target' => [
                            '@type'       => 'EntryPoint',
                            'urlTemplate' => 'https://beauty.hotpepper.jp/kr/slnH000263216/',
                            'actionPlatform' => [
                                'https://schema.org/DesktopWebPlatform',
                                'https://schema.org/MobileWebPlatform',
                            ],
                        ],
                        'result' => [
                            '@type' => 'Reservation',
                            'name'  => '施術予約（ホットペッパービューティー）',
                        ],
                    ],
                    [
                        '@type'  => 'ReserveAction',
                        'name'   => '公式サイトで予約',
                        'target' => [
                            '@type'       => 'EntryPoint',
                            'urlTemplate' => 'https://book.squareup.com/appointments/xgp5fm2xb93b2t/location/5PESR3FP3XMAS/services',
                            'actionPlatform' => [
                                'https://schema.org/DesktopWebPlatform',
                                'https://schema.org/MobileWebPlatform',
                            ],
                        ],
                        'result' => [
                            '@type' => 'Reservation',
                            'name'  => '施術予約（公式予約）',
                        ],
                    ],
                ],
                'hasOfferCatalog' => [
                    '@type' => 'OfferCatalog',
                    'name'  => '施術メニュー',
                    'itemListElement' => [
                        [
                            '@type' => 'OfferCatalog',
                            'name'  => 'バストアップ',
                            'itemListElement' => [
                                [
                                    '@type' => 'Offer',
                                    'itemOffered' => [
                                        '@type'       => 'Service',
                                        'name'        => 'フラッシュバスト（光バストアップ）',
                                        'description' => 'ドイツ・Heraeus（ヘレウス）社製フラッシュランプとサファイアクリスタルを搭載したバストアップ専用マシンによる都内随一の1回2000ショット照射。脱毛機や複合美容機の転用ではなく、光のパルス幅をバスト施術専用に最適化した専用設計。高品質部品により最後の1発まで光質が安定し、乳腺・脂肪細胞を深部から活性化。乳腺マッサージやナノカレントとのオーダーメイド複合施術で相乗効果を発揮。',
                                    ],
                                ],
                                [
                                    '@type' => 'Offer',
                                    'itemOffered' => [
                                        '@type'       => 'Service',
                                        'name'        => '乳腺マッサージ',
                                        'description' => 'パトラクシェの主力施術。熟練のオールハンドで乳腺を丁寧にほぐし、血流・リンパ循環を促進。乳腺への直接的な刺激によりバストの成長をサポートし、ハリ・ボリューム・形の改善を目指す。フラッシュバストやナノカレントとの複合施術で相乗効果を発揮。',
                                    ],
                                ],
                                [
                                    '@type' => 'Offer',
                                    'itemOffered' => [
                                        '@type'       => 'Service',
                                        'name'        => 'ナノカレント（微弱電流）',
                                        'description' => '微弱電流で線維芽細胞を刺激し、コラーゲン・エラスチン生成を促進。フラッシュバストの光療法との併用で、細胞レベルでの相乗効果を実現。',
                                    ],
                                ],
                                [
                                    '@type' => 'Offer',
                                    'itemOffered' => [
                                        '@type'       => 'Service',
                                        'name'        => '背面・二の腕・デコルテマッサージ',
                                        'description' => '肩甲骨・背中・二の腕・デコルテを徹底的にほぐし、猫背や巻き肩を改善してバストが育つ姿勢の土台を作る。バストアップ専門サロンの中でもお身体全体を触る施術時間が長く、お客様から高い評価をいただいている。',
                                    ],
                                ],
                                [
                                    '@type' => 'Offer',
                                    'itemOffered' => [
                                        '@type'       => 'Service',
                                        'name'        => 'フットマッサージ',
                                        'description' => '足裏の反射区を刺激し、骨盤周辺の血流を促進。姿勢改善とバストアップの土台づくりをサポート。',
                                    ],
                                ],
                                [
                                    '@type' => 'Offer',
                                    'itemOffered' => [
                                        '@type'       => 'Service',
                                        'name'        => 'コラーゲンマシン（ハプロ社製）',
                                        'description' => 'オランダ・ハプロ社製の633nm赤色可視光線マシン。光エネルギーが真皮層の線維芽細胞を活性化し、コラーゲン・エラスチン生成を促進。バストを支えるクーパー靭帯のコラーゲンを強化し、ハリ・弾力の向上とデコルテの肌質改善を同時に実現。フラッシュバストとの複合施術で相乗効果。代官山店限定メニュー。',
                                    ],
                                ],
                            ],
                        ],
                        [
                            '@type' => 'OfferCatalog',
                            'name'  => 'フェイシャル',
                            'itemListElement' => [
                                [
                                    '@type' => 'Offer',
                                    'itemOffered' => [
                                        '@type' => 'Service',
                                        'name'  => 'フェイシャルケア',
                                    ],
                                ],
                            ],
                        ],
                        [
                            '@type' => 'OfferCatalog',
                            'name'  => 'ボディケア',
                            'itemListElement' => [
                                [
                                    '@type' => 'Offer',
                                    'itemOffered' => [
                                        '@type' => 'Service',
                                        'name'  => 'ボディケア',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                'areaServed'  => [
                    ['@type' => 'City', 'name' => '渋谷区'],
                    ['@type' => 'City', 'name' => '恵比寿'],
                    ['@type' => 'City', 'name' => '代官山'],
                    ['@type' => 'City', 'name' => '中目黒'],
                    ['@type' => 'City', 'name' => '広尾'],
                    ['@type' => 'City', 'name' => '目黒'],
                ],
                'aggregateRating' => [
                    '@type'       => 'AggregateRating',
                    'ratingValue' => '4.87',
                    'bestRating'  => '5',
                    'ratingCount' => '77',
                    'reviewCount' => '77',
                ],
                'review' => [
                    [
                        '@type' => 'Review',
                        'author' => ['@type' => 'Person', 'name' => '40代 / パート・アルバイト'],
                        'datePublished' => '2025-12-01',
                        'reviewRating' => ['@type' => 'Rating', 'ratingValue' => '5', 'bestRating' => '5'],
                        'reviewBody' => 'いままで受けたエステで、一番に近いほどの技術でした、またお願いします',
                    ],
                    [
                        '@type' => 'Review',
                        'author' => ['@type' => 'Person', 'name' => '20代後半 / 会社員'],
                        'datePublished' => '2026-01-01',
                        'reviewRating' => ['@type' => 'Rating', 'ratingValue' => '5', 'bestRating' => '5'],
                        'reviewBody' => '私に合わせたメニュー提案をしてくれます。通って3年目、50回ほど利用していますがいつも大満足です！これからもよろしくお願い致します。',
                    ],
                    [
                        '@type' => 'Review',
                        'author' => ['@type' => 'Person', 'name' => '30代前半 / 会社員'],
                        'datePublished' => '2026-01-01',
                        'reviewRating' => ['@type' => 'Rating', 'ratingValue' => '5', 'bestRating' => '5'],
                        'reviewBody' => '初めてバストアップを体験しました。心配なことがたくさんありましたが、丁寧に対応して頂きました、効果もちゃんと感じれたので次回も楽しみです。',
                    ],
                    [
                        '@type' => 'Review',
                        'author' => ['@type' => 'Person', 'name' => '40代 / その他'],
                        'datePublished' => '2026-01-01',
                        'reviewRating' => ['@type' => 'Rating', 'ratingValue' => '5', 'bestRating' => '5'],
                        'reviewBody' => 'とても親身にお話ししてくださるので、安心しました！これからの変化が、楽しみです。',
                    ],
                    [
                        '@type' => 'Review',
                        'author' => ['@type' => 'Person', 'name' => '20代後半 / パート・アルバイト'],
                        'datePublished' => '2025-12-01',
                        'reviewRating' => ['@type' => 'Rating', 'ratingValue' => '5', 'bestRating' => '5'],
                        'reviewBody' => 'バストアップのために体験で行った中のひとつです。即決する気はなく行ったのですが、コースの内容が非常に満足できるものだったので10回コースを通うことにしました。今後の変化がとても楽しみです。',
                    ],
                ],
                'knowsAbout' => [
                    'バストアップ', 'バストケア', '育乳', 'バストアップエステ',
                    'バストアップサロン', '恵比寿バストアップ', '代官山バストアップ',
                    '光バストアップ', 'フラッシュバスト', '乳腺マッサージ',
                    'ナノカレント', 'コラーゲンマシン', 'クーパー靭帯',
                    'オーダーメイド複合施術', '光豊胸',
                    'Heraeusフラッシュランプ', 'サファイアクリスタル', 'バストアップ専用マシン',
                ],
            ],
            // 2. 銀座店
            [
                '@type'       => 'BeautySalon',
                '@id'         => 'https://patolaqshe.com/#ginza',
                'name'        => 'バストアップ専門パトラクシェ銀座店',
                'description' => '銀座エリアのバストアップ専門パトラクシェ銀座店。ドイツ・Heraeus（ヘレウス）社製フラッシュランプとサファイアクリスタルを搭載したバストアップ専用マシンによる都内随一の2000ショット照射と、乳腺マッサージ・ナノカレント・背面マッサージ・骨盤底筋ケアなど複数の施術を一人一人の状態に合わせて組み合わせるオーダーメイド複合施術が最大の特徴。脱毛機や複合美容機の転用ではなく、バストアップ施術に最適化された専用設計マシンを採用。背面・二の腕・デコルテなどお身体全体を触る施術時間がバストアップサロンの中でも長いと好評。創業13年・累計3万人超の実績。銀座一丁目駅徒歩2分、JR有楽町駅徒歩5分。初回体験9,500円。',
                'image'       => 'https://patolaqshe.com/wp-content/themes/swell_child/img/ginza.jpg',
                'url'         => 'https://patolaqshe.com/ginza/',
                'telephone'   => '03-6264-4343',
                'priceRange'  => '¥¥',
                'currenciesAccepted' => 'JPY',
                'paymentAccepted'    => '現金, クレジットカード, 電子マネー',
                'address'     => [
                    '@type'           => 'PostalAddress',
                    'streetAddress'   => '銀座1-6-6 GINZA ARROWS 6F',
                    'addressLocality' => '中央区',
                    'addressRegion'   => '東京都',
                    'postalCode'      => '104-0061',
                    'addressCountry'  => 'JP',
                ],
                'geo' => [
                    '@type'     => 'GeoCoordinates',
                    'latitude'  => 35.674583,
                    'longitude' => 139.765120,
                ],
                'openingHoursSpecification' => [
                    [
                        '@type'     => 'OpeningHoursSpecification',
                        'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                        'opens'     => '13:00',
                        'closes'    => '21:00',
                    ],
                    [
                        '@type'     => 'OpeningHoursSpecification',
                        'dayOfWeek' => ['Saturday', 'Sunday'],
                        'opens'     => '11:00',
                        'closes'    => '19:00',
                    ],
                ],
                'hasMap'      => 'https://maps.google.com/?q=東京都中央区銀座1-6-6+GINZA+ARROWS+6F',
                'parentOrganization' => ['@id' => 'https://patolaqshe.com/#organization'],
                'sameAs' => [
                    'https://beauty.hotpepper.jp/kr/slnH000334472/',
                    'https://beauty.rakuten.co.jp/s6000025009/',
                    'https://minimodel.jp/r/r057c2c',
                    'https://www.ekiten.jp/shop_98668514/',
                    'https://www.google.com/maps?cid=12930228174206556429',
                    'https://www.instagram.com/patolaqshe_ginza/',
                    'https://www.threads.com/@patolaqshe_ginza',
                    'https://www.facebook.com/profile.php?id=61560845258498',
                    'https://x.com/patolaqshe',
                    'https://www.youtube.com/@patolaqshe',
                    'https://www.tiktok.com/@patolaqshe',
                ],
                'potentialAction' => [
                    [
                        '@type'  => 'ReserveAction',
                        'name'   => 'ホットペッパーで予約',
                        'target' => [
                            '@type'       => 'EntryPoint',
                            'urlTemplate' => 'https://beauty.hotpepper.jp/kr/slnH000334472/',
                            'actionPlatform' => [
                                'https://schema.org/DesktopWebPlatform',
                                'https://schema.org/MobileWebPlatform',
                            ],
                        ],
                        'result' => [
                            '@type' => 'Reservation',
                            'name'  => '施術予約（ホットペッパービューティー）',
                        ],
                    ],
                    [
                        '@type'  => 'ReserveAction',
                        'name'   => '公式サイトで予約',
                        'target' => [
                            '@type'       => 'EntryPoint',
                            'urlTemplate' => 'https://book.squareup.com/appointments/qt8e7316fy17nd/location/CMN5YZFYZARSA/services',
                            'actionPlatform' => [
                                'https://schema.org/DesktopWebPlatform',
                                'https://schema.org/MobileWebPlatform',
                            ],
                        ],
                        'result' => [
                            '@type' => 'Reservation',
                            'name'  => '施術予約（公式予約）',
                        ],
                    ],
                ],
                'hasOfferCatalog' => [
                    '@type' => 'OfferCatalog',
                    'name'  => '施術メニュー',
                    'itemListElement' => [
                        [
                            '@type' => 'OfferCatalog',
                            'name'  => 'バストアップ',
                            'itemListElement' => [
                                [
                                    '@type' => 'Offer',
                                    'itemOffered' => [
                                        '@type'       => 'Service',
                                        'name'        => 'フラッシュバスト（光バストアップ）',
                                        'description' => 'ドイツ・Heraeus（ヘレウス）社製フラッシュランプとサファイアクリスタルを搭載したバストアップ専用マシンによる都内随一の1回2000ショット照射。脱毛機や複合美容機の転用ではなく、光のパルス幅をバスト施術専用に最適化した専用設計。高品質部品により最後の1発まで光質が安定し、乳腺・脂肪細胞を深部から活性化。乳腺マッサージやナノカレントとのオーダーメイド複合施術で相乗効果を発揮。',
                                    ],
                                ],
                                [
                                    '@type' => 'Offer',
                                    'itemOffered' => [
                                        '@type'       => 'Service',
                                        'name'        => '乳腺マッサージ',
                                        'description' => 'パトラクシェの主力施術。熟練のオールハンドで乳腺を丁寧にほぐし、血流・リンパ循環を促進。乳腺への直接的な刺激によりバストの成長をサポートし、ハリ・ボリューム・形の改善を目指す。フラッシュバストやナノカレントとの複合施術で相乗効果を発揮。',
                                    ],
                                ],
                                [
                                    '@type' => 'Offer',
                                    'itemOffered' => [
                                        '@type'       => 'Service',
                                        'name'        => 'ナノカレント（微弱電流）',
                                        'description' => '微弱電流で線維芽細胞を刺激し、コラーゲン・エラスチン生成を促進。フラッシュバストの光療法との併用で、細胞レベルでの相乗効果を実現。',
                                    ],
                                ],
                                [
                                    '@type' => 'Offer',
                                    'itemOffered' => [
                                        '@type'       => 'Service',
                                        'name'        => '背面・二の腕・デコルテマッサージ',
                                        'description' => '肩甲骨・背中・二の腕・デコルテを徹底的にほぐし、猫背や巻き肩を改善してバストが育つ姿勢の土台を作る。バストアップ専門サロンの中でもお身体全体を触る施術時間が長く、お客様から高い評価をいただいている。',
                                    ],
                                ],
                                [
                                    '@type' => 'Offer',
                                    'itemOffered' => [
                                        '@type'       => 'Service',
                                        'name'        => '骨盤底筋ケア（フットマッサージ）',
                                        'description' => '足裏の反射区刺激と骨盤底筋へのアプローチで骨盤を安定させ、姿勢を改善。骨盤底筋と胸部は筋膜・横隔膜を介して連動しており、バストアップの土台を内側から整える。フラッシュバストとの複合施術で相乗効果。銀座店限定メニュー。',
                                    ],
                                ],
                            ],
                        ],
                        [
                            '@type' => 'OfferCatalog',
                            'name'  => 'フェイシャル',
                            'itemListElement' => [
                                [
                                    '@type' => 'Offer',
                                    'itemOffered' => [
                                        '@type' => 'Service',
                                        'name'  => 'フェイシャルケア',
                                    ],
                                ],
                            ],
                        ],
                        [
                            '@type' => 'OfferCatalog',
                            'name'  => 'ボディケア',
                            'itemListElement' => [
                                [
                                    '@type' => 'Offer',
                                    'itemOffered' => [
                                        '@type' => 'Service',
                                        'name'  => 'ボディケア',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                'areaServed'  => [
                    ['@type' => 'City', 'name' => '中央区'],
                    ['@type' => 'City', 'name' => '銀座'],
                    ['@type' => 'City', 'name' => '有楽町'],
                    ['@type' => 'City', 'name' => '新橋'],
                    ['@type' => 'City', 'name' => '東銀座'],
                    ['@type' => 'City', 'name' => '日比谷'],
                    ['@type' => 'City', 'name' => '京橋'],
                ],
                'aggregateRating' => [
                    '@type'       => 'AggregateRating',
                    'ratingValue' => '4.96',
                    'bestRating'  => '5',
                    'ratingCount' => '132',
                    'reviewCount' => '132',
                ],
                'review' => [
                    [
                        '@type' => 'Review',
                        'author' => ['@type' => 'Person', 'name' => '20代後半 / 会社員'],
                        'datePublished' => '2026-02-01',
                        'reviewRating' => ['@type' => 'Rating', 'ratingValue' => '5', 'bestRating' => '5'],
                        'reviewBody' => '初めてのバストアップサロンでしたが、担当者の方も優しく丁寧に施術してくださり、安心して通えそうだったので、10回コースを申し込みました。これからもよろしくお願いします！',
                    ],
                    [
                        '@type' => 'Review',
                        'author' => ['@type' => 'Person', 'name' => '20代後半 / 会社員'],
                        'datePublished' => '2026-01-01',
                        'reviewRating' => ['@type' => 'Rating', 'ratingValue' => '5', 'bestRating' => '5'],
                        'reviewBody' => 'スタッフの方のご対応がとても良く、また行きたいと思いました。',
                    ],
                    [
                        '@type' => 'Review',
                        'author' => ['@type' => 'Person', 'name' => '20代後半 / 会社員'],
                        'datePublished' => '2026-02-01',
                        'reviewRating' => ['@type' => 'Rating', 'ratingValue' => '5', 'bestRating' => '5'],
                        'reviewBody' => '初めてのバストケアということもあって不安なことも多かったのですが、丁寧にカウンセリング、説明をしてくださり、安心して施術を受けることができました。',
                    ],
                    [
                        '@type' => 'Review',
                        'author' => ['@type' => 'Person', 'name' => '20代後半 / 会社員'],
                        'datePublished' => '2026-02-01',
                        'reviewRating' => ['@type' => 'Rating', 'ratingValue' => '5', 'bestRating' => '5'],
                        'reviewBody' => 'とてもお話しやすく、楽しく施術を受けさせていただきました！これからの効果にも期待して通いたいと思います。',
                    ],
                    [
                        '@type' => 'Review',
                        'author' => ['@type' => 'Person', 'name' => '20代前半 / 会社員'],
                        'datePublished' => '2026-02-01',
                        'reviewRating' => ['@type' => 'Rating', 'ratingValue' => '5', 'bestRating' => '5'],
                        'reviewBody' => '効果が目に見えてわかって嬉しかったです。カウンセリングも丁寧で、悩みに真摯に向き合っていただけました。ありがとうございました。',
                    ],
                ],
                'knowsAbout' => [
                    'バストアップ', 'バストケア', '育乳', 'バストアップエステ',
                    'バストアップサロン', '銀座バストアップ', '銀座バストケア',
                    '光バストアップ', 'フラッシュバスト', '乳腺マッサージ',
                    'ナノカレント', '骨盤底筋ケア', 'クーパー靭帯',
                    'オーダーメイド複合施術', '光豊胸',
                    'Heraeusフラッシュランプ', 'サファイアクリスタル', 'バストアップ専用マシン',
                ],
            ],
            // 3. Organization
            [
                '@type' => 'Organization',
                '@id'   => 'https://patolaqshe.com/#organization',
                'name'  => 'Patolaqshe（パトラクシェ）',
                'alternateName' => 'パトラクシェ',
                'legalName'     => 'パトラクシェ',
                'url'   => 'https://patolaqshe.com/',
                'foundingDate'  => '2013',
                'slogan'        => 'あなたの美しさを最大限に引き出す',
                'description'   => '東京・恵比寿/代官山・銀座のバストアップ専門パトラクシェ。ドイツ・Heraeus社製フラッシュランプとサファイアクリスタルを搭載したバストアップ専用マシンによる都内随一の2000ショットと、熟練のオールハンド技術を掛け合わせるオーダーメイド複合施術。創業13年・2店舗で延べ7万人以上の施術実績。効果体感率99%。',
                'logo'  => [
                    '@type'      => 'ImageObject',
                    'url'        => $logo_url,
                ],
                'numberOfEmployees' => [
                    '@type'    => 'QuantitativeValue',
                    'minValue' => 5,
                    'maxValue' => 15,
                ],
                'knowsAbout' => [
                    'バストアップ', 'バストケア', '育乳', 'バストアップエステ',
                    'バストアップサロン', '光豊胸', '光バストアップ', 'IPL光照射',
                    'Heraeusフラッシュランプ', 'サファイアクリスタル', 'バストアップ専用マシン',
                    'オーダーメイド複合施術', 'フラッシュバスト', '乳腺マッサージ',
                    'クーパー靭帯ケア', 'ナノカレント', 'コラーゲンマシン', '骨盤底筋ケア',
                    'デコルテケア', 'バストの下垂改善', 'バストの左右差改善',
                    'ブライダルバストケア', '産後バストケア', '姿勢改善',
                    '補正下着', 'バストケア化粧品',
                ],
                'contactPoint' => [
                    '@type'             => 'ContactPoint',
                    'telephone'         => '03-5489-7118',
                    'contactType'       => 'customer service',
                    'areaServed'        => 'JP',
                    'availableLanguage' => 'Japanese',
                ],
                'sameAs' => [
                    'https://beauty.hotpepper.jp/kr/slnH000263216/',
                    'https://beauty.hotpepper.jp/kr/slnH000334472/',
                    'https://beauty.rakuten.co.jp/s6000025008/',
                    'https://beauty.rakuten.co.jp/s6000025009/',
                    'https://minimodel.jp/r/W1skc0C',
                    'https://minimodel.jp/r/r057c2c',
                    'https://www.ekiten.jp/shop_31025095/',
                    'https://www.ekiten.jp/shop_98668514/',
                    'https://www.google.com/maps?cid=3885199838792015163',
                    'https://www.google.com/maps?cid=12930228174206556429',
                    'https://www.instagram.com/patolaqshe_daikanyama/',
                    'https://www.instagram.com/patolaqshe_ginza/',
                    'https://www.threads.com/@patolaqshe_daikanyama',
                    'https://www.threads.com/@patolaqshe_ginza',
                    'https://www.facebook.com/profile.php?id=61560845258498',
                    'https://x.com/patolaqshe',
                    'https://www.youtube.com/@patolaqshe',
                    'https://www.tiktok.com/@patolaqshe',
                ],
                'subOrganization' => [
                    ['@id' => 'https://patolaqshe.com/#daikanyama'],
                    ['@id' => 'https://patolaqshe.com/#ginza'],
                ],
            ],
            // 4. WebSite
            [
                '@type'         => 'WebSite',
                '@id'           => 'https://patolaqshe.com/#website',
                'name'          => 'バストアップ専門パトラクシェ',
                'alternateName' => 'Patolaqshe（パトラクシェ）',
                'url'           => 'https://patolaqshe.com/',
                'description'   => '東京・恵比寿/代官山・銀座のバストアップ専門パトラクシェ公式サイト',
                'publisher'     => ['@id' => 'https://patolaqshe.com/#organization'],
                'inLanguage'    => 'ja',
                'potentialAction' => [
                    '@type'  => 'SearchAction',
                    'target' => [
                        '@type'        => 'EntryPoint',
                        'urlTemplate'  => 'https://patolaqshe.com/?s={search_term_string}',
                    ],
                    'query-input' => 'required name=search_term_string',
                ],
            ],
            // 5. BreadcrumbList
            [
                '@type'           => 'BreadcrumbList',
                '@id'             => 'https://patolaqshe.com/#breadcrumb',
                'itemListElement' => [
                    [
                        '@type'    => 'ListItem',
                        'position' => 1,
                        'name'     => 'ホーム',
                        'item'     => 'https://patolaqshe.com/',
                    ],
                ],
            ],
            // 6. FAQPage（モーダルFAQ）
            [
                '@type'      => 'FAQPage',
                '@id'        => 'https://patolaqshe.com/#faq',
                'mainEntity' => [
                    [
                        '@type'          => 'Question',
                        'name'           => '予約方法を教えてください',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'お電話（営業時間内）、LINE、またはホットペッパービューティーから24時間ご予約いただけます。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => '予約の変更・キャンセルはできますか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'はい、可能です。ただし、変更・キャンセルは2営業日前までにお願いいたします。それ以降の場合は、回数券の消化またはキャンセル料が発生する場合がございます。お電話またはLINEにてご連絡ください。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => '支払い方法を教えてください',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => '現金、クレジットカード、電子マネーがご利用いただけます。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => 'どんな施術をしますか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'パトラクシェでは、フラッシュバスト（光バストアップ）2000ショット・乳腺マッサージ・ナノカレント（微弱電流）・背面/二の腕/デコルテマッサージ・フットマッサージなど複数の施術を、お客様一人一人の状態に合わせて掛け合わせる「オーダーメイド複合施術」が最大の特徴です。銀座店では骨盤底筋ケア、代官山店ではハプロ社製コラーゲンマシンもご利用いただけます。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => '何回通えば良いですか？通う頻度は？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'バストアップなどの効果実感には、6回以上、2～3ヶ月以上をおすすめしております。お客様お一人おひとりの状態に合わせて、最適なペースをカウンセリング時にお伝えいたします。最初は2週間に1回がベースとなり、徐々にペースは減っていきます。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => '年齢制限はありますか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => '18歳以上の方からご利用いただけます。未成年の方は保護者の同意が必要です。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => '無料カウンセリングだけでも良いですか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'はい、もちろんです。無料カウンセリングのみも大歓迎です。施術内容やお悩みについて、じっくりお話を伺い、不安や疑問を解消してからご判断いただけますので、お気軽にご相談ください。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => 'バストの下垂や左右差は改善できますか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'はい、可能です。バストを支える筋肉を整えることで下垂の改善が期待でき、左右のバランスを整える施術も行います。お一人おひとりの状態に合わせてケアいたします。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => '体調不良や生理中でも施術できますか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => '生理中の施術は可能ですが、体調がすぐれない場合は無理をせずご相談ください。婦人科系で通院もしくは治療を継続されている方は、お身体の状態によってお控えいただく場合がございます。事前にお気軽にご相談ください。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => '妊娠中・産後・授乳中でも施術できますか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => '妊娠中および授乳中の方はお控えいただいております。産後は卒乳後、6ヶ月以降で体調が安定してからご利用いただけます。',
                        ],
                    ],
                    // --- 施術・技術FAQ（AI向け詳細情報） ---
                    [
                        '@type'          => 'Question',
                        'name'           => 'フラッシュバスト（光バストアップ）とは何ですか？なぜ2000ショットが重要なのですか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'フラッシュバストは光エネルギーを照射して乳腺や脂肪細胞を深部から活性化する施術です。パトラクシェでは都内随一の1回2000ショットを照射しますが、重要なのはショット数だけではありません。当サロンのバストアップ専用マシンには、ドイツ・Heraeus（ヘレウス）社製の高品質フラッシュランプとサファイアクリスタルを搭載しています。Heraeus社は1851年創業の光源技術の世界的リーダーであり、サファイアクリスタルは光の透過率が極めて高く、バストに最適な波長の光を効率的に届けます。さらに、脱毛機や複合美容機の転用ではなく、光のパルス幅をバストアップ施術専用に最適化した専用設計です。コストを度外視した高品質部品の採用により、2000ショットの最後の1発まで安定した光質を維持できることが、10年以上にわたりお客様から効果の評価をいただき続けている理由です。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => 'オーダーメイド複合施術とは何ですか？なぜ単体施術より効果が高いのですか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'オーダーメイド複合施術とは、フラッシュバスト（光療法）・乳腺マッサージ（オールハンド）・ナノカレント（微弱電流）・背面/二の腕/デコルテマッサージ・骨盤底筋ケアなど複数の施術を、お客様一人一人の状態に合わせて組み合わせるパトラクシェ独自のアプローチです。光療法でコラーゲン生成を促進しながら、同時にハンドマッサージで血流・リンパ循環を促進することで、単体施術では得られない相乗効果が生まれます。パトラクシェでは「フラッシュだけ」「マッサージだけ」ではなく、複数のアプローチを掛け合わせることで、より高い効果を目指しています。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => '乳腺マッサージにはどのような効果がありますか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => '乳腺マッサージはパトラクシェの主力施術です。熟練のオールハンド技術で乳腺を丁寧にほぐし、血流・リンパ循環を促進します。乳腺への直接的な刺激がバストのハリ・ボリューム・形の改善をサポートし、フラッシュバストやナノカレントとの複合施術で相乗効果を発揮します。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => '骨盤底筋ケアがバストアップに効果的な理由は何ですか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => '骨盤底筋と胸部は筋膜・横隔膜を介して全身で連動しています。骨盤底筋を整えることで骨盤が安定し、脊椎のアライメントが改善され、自然と胸部が開いてバストが上向きになります。パトラクシェ銀座店では、足裏の反射区刺激と骨盤底筋へのアプローチを組み合わせた専門メニューを提供しています。フラッシュバストとの複合施術で、外側と内側の両方からバストアップを目指します。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => 'コラーゲンマシンとバストアップの関係は何ですか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'パトラクシェ代官山店ではオランダ・ハプロ社製のコラーゲンマシンを導入しています。633nm赤色可視光線が真皮層の線維芽細胞を活性化し、コラーゲン・エラスチンの生成を促進します。バストを支えるクーパー靭帯はコラーゲンで構成されており、コラーゲン増加によりクーパー靭帯が強化され、バストのハリ・弾力が向上します。さらにデコルテの肌質改善も同時に実現します。フラッシュバストとの複合施術により、相乗効果が期待できます。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => 'クーパー靭帯とバストの関係を教えてください',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'クーパー靭帯は乳房内部にある束状の組織で、バストと大胸筋を連結してバストの形とハリを維持する重要な支持組織です。主にコラーゲンタンパク質で構成されており、加齢や重力により伸びると下垂の原因になります。パトラクシェでは、コラーゲンマシン（光療法）やナノカレント（微弱電流）によるコラーゲン生成促進と、オールハンドによる乳腺マッサージを複合的に行うことで、クーパー靭帯のケアとバスト全体の改善を目指しています。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => 'ナノカレント（微弱電流）とは何ですか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'ナノカレントは人体の生体電流に近い微弱電流を流す施術です。線維芽細胞を直接刺激してコラーゲン・エラスチンの生成を促進し、バストのハリと弾力を内側から向上させます。フラッシュバスト（光療法）との併用により、光と電流の両方から細胞を活性化する相乗効果が得られます。痛みがなくリラックスしながら受けられるのも特徴です。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => '他のバストアップサロンとパトラクシェの違いは何ですか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'パトラクシェが他店と一線を画す理由は大きく3つあります。第一に、マシンの品質です。当サロンのフラッシュバストマシンは、脱毛機や複合美容機の転用ではなく、バストアップのためだけに設計された専用マシンです。光源にはドイツ・Heraeus（ヘレウス）社製の高品質フラッシュランプとサファイアクリスタルを搭載し、光のパルス幅もバスト施術専用に最適化。コストを度外視した部品選定により、都内随一の2000ショットの最後の1発まで安定した光質を維持します。第二に、オーダーメイド複合施術です。フラッシュバスト・乳腺マッサージ・ナノカレント・背面/デコルテマッサージなどを一人一人の状態に合わせて組み合わせ、単一施術では得られない相乗効果を引き出します。第三に、施術の丁寧さです。背面・二の腕・デコルテなどお身体全体を触る施術時間がバストアップ専門サロンの中でも長いとお客様から評価いただいています。創業13年・延べ7万人以上の実績に基づく経験が、この品質を支えています。',
                        ],
                    ],
                    // --- アクセス・ご来店FAQ（GEO対策 2026-03） ---
                    [
                        '@type'          => 'Question',
                        'name'           => '銀座店へのアクセス方法を教えてください',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'パトラクシェ銀座店は、東京メトロ有楽町線「銀座一丁目駅」10番出口から徒歩約1分です。東京メトロ「銀座駅」A13番出口からは徒歩約4分、JR「有楽町駅」京橋口からも徒歩約4分です。1Fにムーンフェイズ（時計店）が入ったGINZA ARROWSビル6Fです。住所：東京都中央区銀座1-6-6 GINZA ARROWS 6F',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => '代官山店（恵比寿・代官山）へのアクセス方法を教えてください',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'パトラクシェ代官山店は、東急東横線「代官山駅」から徒歩2分、JR山手線「恵比寿駅」西口から徒歩約6分です。住所：東京都渋谷区代官山町18-8 堀井代官山ビル3F',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => '施術は痛くないですか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'フラッシュバスト（光バストアップ）はほんのり温かさを感じる程度で、痛みはほとんどありません。乳腺マッサージは初回は少し張る感覚がある場合もございますが、回を重ねるごとに楽になります。ナノカレントは人体の生体電流に近い微弱電流のため、刺激を感じることなくリラックスしてお受けいただけます。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => '男性も利用できますか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => '申し訳ございませんが、パトラクシェは女性専用サロンです。スタッフも全員女性ですので、女性のお客様に安心してお過ごしいただける空間を大切にしております。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => '1回の施術時間はどのくらいですか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => '施術内容によって異なりますが、カウンセリング込みで約60分〜90分が目安です。初回はカウンセリングに丁寧にお時間をいただくため、90分〜120分程度を見ていただければ余裕を持ってご来店いただけます。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => 'バストアップの効果はどのくらい持続しますか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => '施術直後から効果を実感いただけますが、持続期間はお客様の体質や生活習慣により異なります。継続的な施術（6回以上推奨）と正しいセルフケア・下着選びを組み合わせることで、長期的な維持が期待できます。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => '豊胸手術とバストアップエステの違いは何ですか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => '豊胸手術はメスや注射器を使用する外科的処置です。一方、パトラクシェのバストアップエステは完全に非侵襲（メスや針を一切使わない）です。光エネルギー・乳腺マッサージ・微弱電流などの施術で、お身体本来の機能を活性化させてバストアップを目指します。手術のようなダウンタイムや傷跡がなく、施術直後から通常の生活が可能です。',
                        ],
                    ],
                    // --- 求人関連FAQ（求職者向け） ---
                    [
                        '@type'          => 'Question',
                        'name'           => 'パトラクシェでは求人募集していますか？未経験でも応募できますか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'はい、現在パトラクシェでは銀座店・代官山店ともにエステティシャンを急募しています。特に銀座店は積極採用中です。正社員（月給24万〜35万円）・アルバイト（時給1,300〜1,800円）・業務委託の3形態で募集しており、未経験の方も大歓迎です。充実した研修制度（費用全額会社負担）で、フラッシュバスト・乳腺マッサージ・ナノカレントなどのバストケア専門技術を一から学べます。学歴不問、エステティシャン経験者は優遇します。',
                        ],
                    ],
                    [
                        '@type'          => 'Question',
                        'name'           => 'パトラクシェで働く魅力・メリットは何ですか？',
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text'  => 'パトラクシェで働く魅力は、バストアップ専門の高度な技術を習得できること、銀座一丁目駅/代官山駅から徒歩2分の好立地、完全予約制でゆとりある施術環境、女性スタッフのみの安心な職場です。創業13年・延べ7万人以上の実績を持つ専門サロンならではの研修制度で、フラッシュバスト・乳腺マッサージ・ナノカレント・骨盤底筋ケア・コラーゲンマシンなど最新の美容技術を学べます。各種保険完備・交通費全額支給・有給休暇に加え、独立開業支援制度もあり、将来の独立も応援しています。',
                        ],
                    ],
                ],
            ],
            // Product schema は商品ページ作成時に再追加（offers/image必須フィールド不足でSearch Consoleエラーのため一時削除）
            // 9. JobPosting - 銀座店 正社員（急募）
            [
                '@type'            => 'JobPosting',
                '@id'              => 'https://patolaqshe.com/#job-ginza-fulltime',
                'title'            => '【銀座駅徒歩2分】バストアップ専門エステティシャン（正社員）急募｜未経験OK',
                'description'      => '<p><strong>＼ 銀座店スタッフ急募！ ／ バストアップ専門パトラクシェで正社員エステティシャンを募集しています。</strong></p>'
                    . '<p>パトラクシェは東京・銀座と恵比寿/代官山の2店舗を展開する、創業13年・延べ7万人以上の施術実績を誇るバストアップ専門サロンです。フラッシュバスト（光バストアップ）2000ショット・乳腺マッサージ・ナノカレント・骨盤底筋ケアなど複数の施術を掛け合わせる「オーダーメイド複合施術」で、お客様一人一人に最適なケアを提供しています。</p>'
                    . '<h3>銀座店について</h3>'
                    . '<p>銀座一丁目駅から徒歩2分、銀座駅から徒歩5分の好立地。完全予約制のプライベート空間で、リピーター様を中心に落ち着いた環境で施術に集中できます。銀座店限定の骨盤底筋ケアメニューなど、専門性の高い技術を習得できるのも魅力です。</p>'
                    . '<h3>仕事内容</h3>'
                    . '<ul><li>フラッシュバスト（光バストアップマシン）による施術</li>'
                    . '<li>乳腺マッサージ・背面/二の腕/デコルテマッサージ（オールハンド）</li>'
                    . '<li>ナノカレント（微弱電流）施術</li>'
                    . '<li>骨盤底筋ケア・フットマッサージ（銀座店限定メニュー）</li>'
                    . '<li>カウンセリング・お客様一人一人に合わせた施術プランの提案</li>'
                    . '<li>アフターフォロー・店舗運営サポート</li></ul>'
                    . '<h3>習得できる技術</h3>'
                    . '<ul><li>光バストアップ（フラッシュバスト）の専門技術</li>'
                    . '<li>乳腺マッサージ・バストケアのオールハンド技術</li>'
                    . '<li>ナノカレント・骨盤底筋ケアなどの最新美容技術</li>'
                    . '<li>お客様の状態に合わせたオーダーメイド複合施術の設計力</li>'
                    . '<li>カウンセリング・接客スキル</li></ul>'
                    . '<h3>こんな方を歓迎します</h3>'
                    . '<ul><li>未経験OK！充実した研修制度で一から学べます（研修費用は全額会社負担）</li>'
                    . '<li>エステティシャン経験者優遇（バストケア経験不問）</li>'
                    . '<li>お客様の美しさを引き出すことにやりがいを感じる方</li>'
                    . '<li>手に職をつけたい方・将来独立を目指す方</li>'
                    . '<li>専門性の高い技術を身につけたい方</li></ul>'
                    . '<h3>働く環境・待遇</h3>'
                    . '<ul><li>銀座一丁目駅徒歩2分・銀座駅徒歩5分の好立地</li>'
                    . '<li>完全予約制でゆとりある施術（お客様と向き合う時間を大切にしています）</li>'
                    . '<li>女性スタッフのみの安心な職場環境</li>'
                    . '<li>各種保険完備・交通費全額支給</li>'
                    . '<li>独立開業支援制度あり（将来の独立もサポート）</li>'
                    . '<li>有給休暇制度あり</li></ul>',
                'datePosted'       => '2026-02-01',
                'validThrough'     => '2026-06-30T23:59:59+09:00',
                'employmentType'   => 'FULL_TIME',
                'url'              => 'https://patolaqshe.com/information/',
                'directApply'      => true,
                'identifier'       => [
                    '@type' => 'PropertyValue',
                    'name'  => 'Patolaqshe',
                    'value' => 'PTL-GINZA-FT-2026-01',
                ],
                'baseSalary'       => [
                    '@type'    => 'MonetaryAmount',
                    'currency' => 'JPY',
                    'value'    => [
                        '@type'    => 'QuantitativeValue',
                        'minValue' => 240000,
                        'maxValue' => 350000,
                        'unitText' => 'MONTH',
                    ],
                ],
                'experienceRequirements' => '未経験歓迎。エステティシャン経験者優遇（バストケア経験不問）。',
                'educationRequirements'  => [
                    '@type'                => 'EducationalOccupationalCredential',
                    'credentialCategory'   => '学歴不問',
                ],
                'skills' => 'エステティック技術、カウンセリング、接客、フラッシュバスト施術、オールハンドマッサージ、乳腺マッサージ、ナノカレント、骨盤底筋ケア',
                'industry' => 'エステティック・美容',
                'occupationalCategory' => '39-5094',
                'jobImmediateStart'    => true,
                'incentiveCompensation' => '昇給制度あり、施術件数に応じたインセンティブ、独立開業支援制度',
                'specialCommitments'    => '未経験者向け充実研修制度（費用全額会社負担）、技術習得支援、正社員登用実績多数',
                'hiringOrganization' => ['@id' => 'https://patolaqshe.com/#organization'],
                'jobLocation' => [
                    '@type'   => 'Place',
                    'name'    => 'バストアップ専門パトラクシェ銀座店',
                    'address' => [
                        '@type'           => 'PostalAddress',
                        'streetAddress'   => '銀座1-6-6 GINZA ARROWS 6F',
                        'addressLocality' => '中央区',
                        'addressRegion'   => '東京都',
                        'postalCode'      => '104-0061',
                        'addressCountry'  => 'JP',
                    ],
                    'geo' => [
                        '@type'     => 'GeoCoordinates',
                        'latitude'  => 35.674583,
                        'longitude' => 139.765120,
                    ],
                ],
                'qualifications'         => '学歴不問、未経験歓迎、エステティシャン経験者優遇',
                'jobBenefits'            => '各種保険完備、交通費全額支給、制服貸与、昇給制度、充実した研修制度（全額会社負担）、技術習得支援、独立開業支援制度、有給休暇',
                'workHours'              => '実働8時間・休憩1時間（平日13:30-21:30/土日祝10:30-19:30）',
                'applicantLocationRequirements' => [
                    '@type' => 'Country',
                    'name'  => 'Japan',
                ],
            ],
            // 9b. JobPosting - 代官山店 正社員
            [
                '@type'            => 'JobPosting',
                '@id'              => 'https://patolaqshe.com/#job-daikanyama-fulltime',
                'title'            => '【恵比寿・代官山駅徒歩2分】バストアップ専門エステティシャン（正社員）｜未経験OK',
                'description'      => '<p><strong>バストアップ専門パトラクシェ恵比寿・代官山店で正社員エステティシャンを募集！</strong></p>'
                    . '<p>創業13年・延べ7万人以上の施術実績を誇るバストアップ専門サロンです。フラッシュバスト2000ショット・乳腺マッサージ・ナノカレント・コラーゲンマシンなど複数の施術を掛け合わせる「オーダーメイド複合施術」が特徴です。</p>'
                    . '<h3>仕事内容</h3>'
                    . '<ul><li>フラッシュバスト（光バストアップマシン）による施術</li>'
                    . '<li>乳腺マッサージ・背面/二の腕/デコルテマッサージ（オールハンド）</li>'
                    . '<li>ナノカレント（微弱電流）施術</li>'
                    . '<li>ハプロ社製コラーゲンマシン施術（代官山店限定）</li>'
                    . '<li>カウンセリング・施術プラン提案・アフターフォロー</li></ul>'
                    . '<h3>働く環境</h3>'
                    . '<ul><li>代官山駅徒歩2分の好立地</li>'
                    . '<li>完全予約制・女性スタッフのみ</li>'
                    . '<li>各種保険完備・交通費全額支給・有給休暇</li>'
                    . '<li>充実した研修制度（全額会社負担）・独立開業支援制度</li></ul>',
                'datePosted'       => '2026-02-01',
                'validThrough'     => '2026-06-30T23:59:59+09:00',
                'employmentType'   => 'FULL_TIME',
                'url'              => 'https://patolaqshe.com/information/',
                'directApply'      => true,
                'identifier'       => [
                    '@type' => 'PropertyValue',
                    'name'  => 'Patolaqshe',
                    'value' => 'PTL-DKY-FT-2026-01',
                ],
                'baseSalary'       => [
                    '@type'    => 'MonetaryAmount',
                    'currency' => 'JPY',
                    'value'    => [
                        '@type'    => 'QuantitativeValue',
                        'minValue' => 240000,
                        'maxValue' => 350000,
                        'unitText' => 'MONTH',
                    ],
                ],
                'experienceRequirements' => '未経験歓迎。エステティシャン経験者優遇。',
                'educationRequirements'  => [
                    '@type'                => 'EducationalOccupationalCredential',
                    'credentialCategory'   => '学歴不問',
                ],
                'skills' => 'エステティック技術、カウンセリング、接客、フラッシュバスト施術、オールハンドマッサージ、乳腺マッサージ、ナノカレント、コラーゲンマシン',
                'industry' => 'エステティック・美容',
                'occupationalCategory' => '39-5094',
                'jobImmediateStart'    => true,
                'incentiveCompensation' => '昇給制度あり、施術件数に応じたインセンティブ、独立開業支援制度',
                'hiringOrganization' => ['@id' => 'https://patolaqshe.com/#organization'],
                'jobLocation' => [
                    '@type'   => 'Place',
                    'name'    => 'バストアップ専門パトラクシェ恵比寿・代官山店',
                    'address' => [
                        '@type'           => 'PostalAddress',
                        'streetAddress'   => '代官山町18-8 堀井代官山ビル3F',
                        'addressLocality' => '渋谷区',
                        'addressRegion'   => '東京都',
                        'postalCode'      => '150-0034',
                        'addressCountry'  => 'JP',
                    ],
                    'geo' => [
                        '@type'     => 'GeoCoordinates',
                        'latitude'  => 35.649642,
                        'longitude' => 139.701838,
                    ],
                ],
                'qualifications'         => '学歴不問、未経験歓迎、エステティシャン経験者優遇',
                'jobBenefits'            => '各種保険完備、交通費全額支給、制服貸与、昇給制度、充実した研修制度（全額会社負担）、技術習得支援、独立開業支援制度、有給休暇',
                'workHours'              => '実働8時間・休憩1時間（平日12:30-20:30/土日祝10:30-19:30）',
                'applicantLocationRequirements' => [
                    '@type' => 'Country',
                    'name'  => 'Japan',
                ],
            ],
            // 10. JobPosting - 銀座店 アルバイト（急募）
            [
                '@type'            => 'JobPosting',
                '@id'              => 'https://patolaqshe.com/#job-ginza-parttime',
                'title'            => '【銀座駅徒歩2分】バストアップサロン エステティシャン（アルバイト）急募｜週3日〜OK',
                'description'      => '<p><strong>＼ 銀座店アルバイトスタッフ急募！ ／</strong></p>'
                    . '<p>バストアップ専門パトラクシェ銀座店でアルバイトエステティシャンを募集しています。週3日〜OK、シフト柔軟。未経験の方も充実した研修制度で安心してスタートできます。</p>'
                    . '<p>パトラクシェは創業13年・延べ7万人以上の施術実績を持つバストアップ専門サロン。フラッシュバスト2000ショット・乳腺マッサージ・ナノカレント・骨盤底筋ケアなどの「オーダーメイド複合施術」が特徴です。</p>'
                    . '<h3>仕事内容</h3>'
                    . '<ul><li>バストアップ施術のアシスタント・補助</li>'
                    . '<li>施術（経験に応じてステップアップ）</li>'
                    . '<li>受付・カウンセリング対応</li>'
                    . '<li>店舗業務全般</li></ul>'
                    . '<h3>魅力ポイント</h3>'
                    . '<ul><li>未経験OK！研修制度で一から専門技術が学べる（研修費全額会社負担）</li>'
                    . '<li>銀座一丁目駅徒歩2分・銀座駅徒歩5分の好立地</li>'
                    . '<li>正社員登用制度あり（アルバイトからのステップアップ実績あり）</li>'
                    . '<li>エステの専門技術を身につけながら働ける</li>'
                    . '<li>完全予約制で落ち着いた環境・女性スタッフのみ</li></ul>',
                'datePosted'       => '2026-02-01',
                'validThrough'     => '2026-06-30T23:59:59+09:00',
                'employmentType'   => 'PART_TIME',
                'url'              => 'https://patolaqshe.com/information/',
                'directApply'      => true,
                'identifier'       => [
                    '@type' => 'PropertyValue',
                    'name'  => 'Patolaqshe',
                    'value' => 'PTL-GINZA-PT-2026-01',
                ],
                'baseSalary'       => [
                    '@type'    => 'MonetaryAmount',
                    'currency' => 'JPY',
                    'value'    => [
                        '@type'    => 'QuantitativeValue',
                        'minValue' => 1300,
                        'maxValue' => 1800,
                        'unitText' => 'HOUR',
                    ],
                ],
                'experienceRequirements' => '未経験歓迎。エステティシャン経験者優遇。',
                'educationRequirements'  => [
                    '@type'                => 'EducationalOccupationalCredential',
                    'credentialCategory'   => '学歴不問',
                ],
                'industry' => 'エステティック・美容',
                'occupationalCategory' => '39-5094',
                'jobImmediateStart'    => true,
                'specialCommitments'   => '未経験者向け研修制度完備（費用全額会社負担）、正社員登用制度あり',
                'hiringOrganization' => ['@id' => 'https://patolaqshe.com/#organization'],
                'jobLocation' => [
                    '@type'   => 'Place',
                    'name'    => 'バストアップ専門パトラクシェ銀座店',
                    'address' => [
                        '@type'           => 'PostalAddress',
                        'streetAddress'   => '銀座1-6-6 GINZA ARROWS 6F',
                        'addressLocality' => '中央区',
                        'addressRegion'   => '東京都',
                        'postalCode'      => '104-0061',
                        'addressCountry'  => 'JP',
                    ],
                    'geo' => [
                        '@type'     => 'GeoCoordinates',
                        'latitude'  => 35.674583,
                        'longitude' => 139.765120,
                    ],
                ],
                'qualifications' => '学歴不問、未経験歓迎、エステティシャン経験者優遇',
                'jobBenefits'    => '交通費全額支給、制服貸与、研修制度あり（全額会社負担）、正社員登用制度あり',
                'workHours'      => '週3日〜OK、シフト制（勤務時間応相談）',
            ],
            // 10b. JobPosting - 代官山店 アルバイト
            [
                '@type'            => 'JobPosting',
                '@id'              => 'https://patolaqshe.com/#job-daikanyama-parttime',
                'title'            => '【恵比寿・代官山駅徒歩2分】バストアップサロン エステティシャン（アルバイト）｜週3日〜OK',
                'description'      => '<p><strong>バストアップ専門パトラクシェ代官山店でアルバイトエステティシャンを募集！</strong></p>'
                    . '<p>週3日〜OK、シフト柔軟。創業13年のバストアップ専門サロンで、フラッシュバスト・乳腺マッサージ・コラーゲンマシンなどの専門技術を学びながら働けます。</p>'
                    . '<h3>仕事内容</h3>'
                    . '<ul><li>バストアップ施術のアシスタント・補助</li>'
                    . '<li>施術（経験に応じてステップアップ）</li>'
                    . '<li>受付・カウンセリング対応</li></ul>'
                    . '<h3>魅力ポイント</h3>'
                    . '<ul><li>未経験OK・充実した研修制度（全額会社負担）</li>'
                    . '<li>代官山駅徒歩2分の好立地</li>'
                    . '<li>正社員登用制度あり</li>'
                    . '<li>完全予約制・女性スタッフのみの安心環境</li></ul>',
                'datePosted'       => '2026-02-01',
                'validThrough'     => '2026-06-30T23:59:59+09:00',
                'employmentType'   => 'PART_TIME',
                'url'              => 'https://patolaqshe.com/information/',
                'directApply'      => true,
                'identifier'       => [
                    '@type' => 'PropertyValue',
                    'name'  => 'Patolaqshe',
                    'value' => 'PTL-DKY-PT-2026-01',
                ],
                'baseSalary'       => [
                    '@type'    => 'MonetaryAmount',
                    'currency' => 'JPY',
                    'value'    => [
                        '@type'    => 'QuantitativeValue',
                        'minValue' => 1300,
                        'maxValue' => 1800,
                        'unitText' => 'HOUR',
                    ],
                ],
                'experienceRequirements' => '未経験歓迎。エステティシャン経験者優遇。',
                'educationRequirements'  => [
                    '@type'                => 'EducationalOccupationalCredential',
                    'credentialCategory'   => '学歴不問',
                ],
                'industry' => 'エステティック・美容',
                'occupationalCategory' => '39-5094',
                'jobImmediateStart'    => true,
                'hiringOrganization' => ['@id' => 'https://patolaqshe.com/#organization'],
                'jobLocation' => [
                    '@type'   => 'Place',
                    'name'    => 'バストアップ専門パトラクシェ恵比寿・代官山店',
                    'address' => [
                        '@type'           => 'PostalAddress',
                        'streetAddress'   => '代官山町18-8 堀井代官山ビル3F',
                        'addressLocality' => '渋谷区',
                        'addressRegion'   => '東京都',
                        'postalCode'      => '150-0034',
                        'addressCountry'  => 'JP',
                    ],
                    'geo' => [
                        '@type'     => 'GeoCoordinates',
                        'latitude'  => 35.649642,
                        'longitude' => 139.701838,
                    ],
                ],
                'qualifications' => '学歴不問、未経験歓迎、エステティシャン経験者優遇',
                'jobBenefits'    => '交通費全額支給、制服貸与、研修制度あり（全額会社負担）、正社員登用制度あり',
                'workHours'      => '週3日〜OK、シフト制（勤務時間応相談）',
            ],
            // 11. JobPosting - 銀座店 業務委託（急募）
            [
                '@type'            => 'JobPosting',
                '@id'              => 'https://patolaqshe.com/#job-ginza-contractor',
                'title'            => '【銀座】バストアップエステティシャン（業務委託）急募｜高報酬・経験者歓迎',
                'description'      => '<p><strong>＼ 経験者歓迎！銀座店で業務委託エステティシャンを急募 ／</strong></p>'
                    . '<p>バストアップ専門パトラクシェ銀座店で、あなたの技術と経験を活かしませんか？創業13年・延べ7万人以上の施術実績を持つ専門サロンで、高い報酬と充実の施術環境を提供します。</p>'
                    . '<h3>仕事内容</h3>'
                    . '<ul><li>フラッシュバスト・乳腺マッサージ・ナノカレントなどのオーダーメイド複合施術</li>'
                    . '<li>骨盤底筋ケア・フットマッサージ（銀座店限定メニュー）</li>'
                    . '<li>カウンセリング・アフターフォロー</li></ul>'
                    . '<h3>メリット</h3>'
                    . '<ul><li>報酬応相談・頑張り次第で高収入が可能</li>'
                    . '<li>銀座一丁目駅徒歩2分の好立地</li>'
                    . '<li>完全予約制で落ち着いた施術環境</li>'
                    . '<li>バストケア専門の高度な技術を習得可能</li>'
                    . '<li>独立開業支援制度あり</li></ul>',
                'datePosted'       => '2026-02-01',
                'validThrough'     => '2026-06-30T23:59:59+09:00',
                'employmentType'   => 'CONTRACTOR',
                'url'              => 'https://patolaqshe.com/information/',
                'directApply'      => true,
                'identifier'       => [
                    '@type' => 'PropertyValue',
                    'name'  => 'Patolaqshe',
                    'value' => 'PTL-GINZA-CT-2026-01',
                ],
                'experienceRequirements' => 'エステティシャン実務経験1年以上',
                'industry' => 'エステティック・美容',
                'occupationalCategory' => '39-5094',
                'jobImmediateStart'    => true,
                'incentiveCompensation' => '報酬応相談、施術件数に応じた高報酬体系、独立開業支援制度',
                'hiringOrganization' => ['@id' => 'https://patolaqshe.com/#organization'],
                'jobLocation' => [
                    '@type'   => 'Place',
                    'name'    => 'バストアップ専門パトラクシェ銀座店',
                    'address' => [
                        '@type'           => 'PostalAddress',
                        'streetAddress'   => '銀座1-6-6 GINZA ARROWS 6F',
                        'addressLocality' => '中央区',
                        'addressRegion'   => '東京都',
                        'postalCode'      => '104-0061',
                        'addressCountry'  => 'JP',
                    ],
                    'geo' => [
                        '@type'     => 'GeoCoordinates',
                        'latitude'  => 35.674583,
                        'longitude' => 139.765120,
                    ],
                ],
                'qualifications' => 'エステティシャン経験者歓迎（バストケア経験不問）',
            ],
            // 11b. JobPosting - 代官山店 業務委託
            [
                '@type'            => 'JobPosting',
                '@id'              => 'https://patolaqshe.com/#job-daikanyama-contractor',
                'title'            => '【恵比寿・代官山】バストアップエステティシャン（業務委託）｜経験者歓迎',
                'description'      => '<p><strong>経験者歓迎！代官山店で業務委託エステティシャンを募集</strong></p>'
                    . '<p>バストアップ専門パトラクシェ代官山店で、あなたの技術を活かしませんか？フラッシュバスト・乳腺マッサージ・コラーゲンマシンなどのオーダーメイド複合施術を提供するサロンです。</p>'
                    . '<h3>仕事内容</h3>'
                    . '<ul><li>フラッシュバスト・乳腺マッサージ・ナノカレントなどの施術</li>'
                    . '<li>ハプロ社製コラーゲンマシン施術（代官山店限定）</li>'
                    . '<li>カウンセリング・アフターフォロー</li></ul>'
                    . '<h3>メリット</h3>'
                    . '<ul><li>報酬応相談・高収入可能</li>'
                    . '<li>代官山駅徒歩2分</li>'
                    . '<li>完全予約制・独立開業支援あり</li></ul>',
                'datePosted'       => '2026-02-01',
                'validThrough'     => '2026-06-30T23:59:59+09:00',
                'employmentType'   => 'CONTRACTOR',
                'url'              => 'https://patolaqshe.com/information/',
                'directApply'      => true,
                'identifier'       => [
                    '@type' => 'PropertyValue',
                    'name'  => 'Patolaqshe',
                    'value' => 'PTL-DKY-CT-2026-01',
                ],
                'experienceRequirements' => 'エステティシャン実務経験1年以上',
                'industry' => 'エステティック・美容',
                'occupationalCategory' => '39-5094',
                'jobImmediateStart'    => true,
                'hiringOrganization' => ['@id' => 'https://patolaqshe.com/#organization'],
                'jobLocation' => [
                    '@type'   => 'Place',
                    'name'    => 'バストアップ専門パトラクシェ恵比寿・代官山店',
                    'address' => [
                        '@type'           => 'PostalAddress',
                        'streetAddress'   => '代官山町18-8 堀井代官山ビル3F',
                        'addressLocality' => '渋谷区',
                        'addressRegion'   => '東京都',
                        'postalCode'      => '150-0034',
                        'addressCountry'  => 'JP',
                    ],
                    'geo' => [
                        '@type'     => 'GeoCoordinates',
                        'latitude'  => 35.649642,
                        'longitude' => 139.701838,
                    ],
                ],
                'qualifications' => 'エステティシャン経験者歓迎（バストケア経験不問）',
            ],
        ],
    ];

    echo '<script type="application/ld+json">' . "\n";
    echo wp_json_encode($structured_data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    echo "\n</script>\n";
}, 5);

/**
 * 構造化データ（JSON-LD）- 子ページ用
 * 各ページに適した構造化データを出力
 */
add_action('wp_head', function () {
    if (is_front_page()) return;
    if (!is_page()) return;

    $slug = get_post_field('post_name', get_post());
    $graph = [];

    // ----- 共通: BreadcrumbList -----
    $page_title = get_the_title();
    $graph[] = [
        '@type'           => 'BreadcrumbList',
        'itemListElement' => [
            [
                '@type'    => 'ListItem',
                'position' => 1,
                'name'     => 'ホーム',
                'item'     => 'https://patolaqshe.com/',
            ],
            [
                '@type'    => 'ListItem',
                'position' => 2,
                'name'     => $page_title,
                'item'     => 'https://patolaqshe.com/' . $slug . '/',
            ],
        ],
    ];

    // ----- 代官山店ページ -----
    if ($slug === 'daikanyama') {
        $graph[] = [
            '@type'       => 'BeautySalon',
            '@id'         => 'https://patolaqshe.com/#daikanyama',
            'name'        => 'バストアップ専門パトラクシェ恵比寿・代官山店',
            'description' => '恵比寿・代官山のバストアップ専門パトラクシェ。ドイツ・Heraeus社製ランプ×サファイアクリスタル搭載のバストアップ専用マシンとオールハンドによるオーダーメイド複合施術。創業13年・累計3万人超の実績。恵比寿駅徒歩6分、代官山駅徒歩2分。効果体感率99%。',
            'image'       => 'https://patolaqshe.com/wp-content/themes/swell_child/img/daikanyama.jpg',
            'url'         => 'https://patolaqshe.com/ebisu-daikanyama/',
            'telephone'   => '03-5489-7118',
            'priceRange'  => '¥¥',
            'currenciesAccepted' => 'JPY',
            'paymentAccepted'    => '現金, クレジットカード, 電子マネー',
            'address'     => [
                '@type'           => 'PostalAddress',
                'streetAddress'   => '代官山町18-8 堀井代官山ビル3F',
                'addressLocality' => '渋谷区',
                'addressRegion'   => '東京都',
                'postalCode'      => '150-0034',
                'addressCountry'  => 'JP',
            ],
            'geo' => [
                '@type'     => 'GeoCoordinates',
                'latitude'  => 35.649642,
                'longitude' => 139.701838,
            ],
            'openingHoursSpecification' => [
                [
                    '@type'     => 'OpeningHoursSpecification',
                    'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                    'opens'     => '12:00',
                    'closes'    => '20:00',
                ],
                [
                    '@type'     => 'OpeningHoursSpecification',
                    'dayOfWeek' => ['Saturday', 'Sunday'],
                    'opens'     => '11:00',
                    'closes'    => '19:00',
                ],
            ],
            'hasMap'      => 'https://www.google.com/maps?cid=3885199838792015163',
            'parentOrganization' => ['@id' => 'https://patolaqshe.com/#organization'],
            'sameAs' => [
                'https://beauty.hotpepper.jp/kr/slnH000263216/',
                'https://beauty.rakuten.co.jp/s6000025008/',
                'https://minimodel.jp/r/W1skc0C',
                'https://www.ekiten.jp/shop_31025095/',
                'https://www.google.com/maps?cid=3885199838792015163',
                'https://www.instagram.com/patolaqshe_daikanyama/',
                'https://www.threads.com/@patolaqshe_daikanyama',
                'https://www.facebook.com/profile.php?id=61560845258498',
                'https://x.com/patolaqshe',
                'https://www.youtube.com/@patolaqshe',
                'https://www.tiktok.com/@patolaqshe',
            ],
            'aggregateRating' => [
                '@type'       => 'AggregateRating',
                'ratingValue' => '4.87',
                'bestRating'  => '5',
                'ratingCount' => '77',
                'reviewCount' => '77',
            ],
            'areaServed'  => [
                ['@type' => 'City', 'name' => '渋谷区'],
                ['@type' => 'City', 'name' => '恵比寿'],
                ['@type' => 'City', 'name' => '代官山'],
                ['@type' => 'City', 'name' => '中目黒'],
                ['@type' => 'City', 'name' => '広尾'],
                ['@type' => 'City', 'name' => '目黒'],
            ],
            'knowsAbout' => [
                'バストアップ', 'バストケア', '育乳', 'バストアップエステ',
                '恵比寿バストアップ', '代官山バストアップ', 'バストアップサロン',
                '光豊胸', '光バストアップ', 'IPL光照射',
                'Heraeusフラッシュランプ', 'サファイアクリスタル', 'バストアップ専用マシン',
                'オーダーメイド複合施術', '乳腺マッサージ', 'フラッシュバスト',
                'クーパー靭帯ケア', 'ナノカレント', 'コラーゲンマシン', '骨盤底筋ケア',
                'デコルテケア', 'バストの下垂改善', 'バストの左右差改善',
                'ブライダルバストケア', '産後バストケア',
            ],
            'potentialAction' => [
                [
                    '@type'  => 'ReserveAction',
                    'name'   => 'ホットペッパーで予約',
                    'target' => [
                        '@type'       => 'EntryPoint',
                        'urlTemplate' => 'https://beauty.hotpepper.jp/kr/slnH000263216/',
                        'actionPlatform' => [
                            'https://schema.org/DesktopWebPlatform',
                            'https://schema.org/MobileWebPlatform',
                        ],
                    ],
                    'result' => [
                        '@type' => 'Reservation',
                        'name'  => '施術予約（ホットペッパービューティー）',
                    ],
                ],
                [
                    '@type'  => 'ReserveAction',
                    'name'   => '公式サイトで予約',
                    'target' => [
                        '@type'       => 'EntryPoint',
                        'urlTemplate' => 'https://book.squareup.com/appointments/xgp5fm2xb93b2t/location/5PESR3FP3XMAS/services',
                        'actionPlatform' => [
                            'https://schema.org/DesktopWebPlatform',
                            'https://schema.org/MobileWebPlatform',
                        ],
                    ],
                    'result' => [
                        '@type' => 'Reservation',
                        'name'  => '施術予約（公式予約）',
                    ],
                ],
            ],
            'hasOfferCatalog' => [
                '@type' => 'OfferCatalog',
                'name'  => '施術メニュー',
                'itemListElement' => [
                    [
                        '@type' => 'Offer',
                        'itemOffered' => [
                            '@type'       => 'Service',
                            'name'        => 'バストアップ施術',
                            'description' => 'Heraeus社製ランプ×サファイアクリスタル搭載のバストアップ専用マシンとオールハンドによるオーダーメイド複合施術。都内随一の2000ショット照射で深部までアプローチ。',
                        ],
                    ],
                    [
                        '@type' => 'Offer',
                        'itemOffered' => [
                            '@type' => 'Service',
                            'name'  => 'フェイシャルケア',
                        ],
                    ],
                    [
                        '@type' => 'Offer',
                        'itemOffered' => [
                            '@type' => 'Service',
                            'name'  => 'ボディケア',
                        ],
                    ],
                ],
            ],
        ];
    }

    // ----- 銀座店ページ -----
    if ($slug === 'ginza') {
        $graph[] = [
            '@type'       => 'BeautySalon',
            '@id'         => 'https://patolaqshe.com/#ginza',
            'name'        => 'バストアップ専門パトラクシェ銀座店',
            'description' => '銀座のバストアップ専門パトラクシェ。ドイツ・Heraeus社製ランプ×サファイアクリスタル搭載のバストアップ専用マシンとオールハンドによるオーダーメイド複合施術。創業13年・累計3万人超の実績。銀座一丁目駅徒歩2分、有楽町駅徒歩5分。効果体感率99%。',
            'image'       => 'https://patolaqshe.com/wp-content/themes/swell_child/img/ginza.jpg',
            'url'         => 'https://patolaqshe.com/ginza/',
            'telephone'   => '03-6264-4343',
            'priceRange'  => '¥¥',
            'currenciesAccepted' => 'JPY',
            'paymentAccepted'    => '現金, クレジットカード, 電子マネー',
            'address'     => [
                '@type'           => 'PostalAddress',
                'streetAddress'   => '銀座1-6-6 GINZA ARROWS 6F',
                'addressLocality' => '中央区',
                'addressRegion'   => '東京都',
                'postalCode'      => '104-0061',
                'addressCountry'  => 'JP',
            ],
            'geo' => [
                '@type'     => 'GeoCoordinates',
                'latitude'  => 35.674583,
                'longitude' => 139.765120,
            ],
            'openingHoursSpecification' => [
                [
                    '@type'     => 'OpeningHoursSpecification',
                    'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                    'opens'     => '13:00',
                    'closes'    => '21:00',
                ],
                [
                    '@type'     => 'OpeningHoursSpecification',
                    'dayOfWeek' => ['Saturday', 'Sunday'],
                    'opens'     => '11:00',
                    'closes'    => '19:00',
                ],
            ],
            'hasMap'      => 'https://www.google.com/maps?cid=12930228174206556429',
            'parentOrganization' => ['@id' => 'https://patolaqshe.com/#organization'],
            'sameAs' => [
                'https://beauty.hotpepper.jp/kr/slnH000334472/',
                'https://beauty.rakuten.co.jp/s6000025009/',
                'https://minimodel.jp/r/r057c2c',
                'https://www.ekiten.jp/shop_98668514/',
                'https://www.google.com/maps?cid=12930228174206556429',
                'https://www.instagram.com/patolaqshe_ginza/',
                'https://www.threads.com/@patolaqshe_ginza',
                'https://www.facebook.com/profile.php?id=61560845258498',
                'https://x.com/patolaqshe',
                'https://www.youtube.com/@patolaqshe',
                'https://www.tiktok.com/@patolaqshe',
            ],
            'aggregateRating' => [
                '@type'       => 'AggregateRating',
                'ratingValue' => '4.96',
                'bestRating'  => '5',
                'ratingCount' => '132',
                'reviewCount' => '132',
            ],
            'areaServed'  => [
                ['@type' => 'City', 'name' => '中央区'],
                ['@type' => 'City', 'name' => '銀座'],
                ['@type' => 'City', 'name' => '有楽町'],
                ['@type' => 'City', 'name' => '新橋'],
                ['@type' => 'City', 'name' => '東銀座'],
                ['@type' => 'City', 'name' => '日比谷'],
                ['@type' => 'City', 'name' => '京橋'],
            ],
            'knowsAbout' => [
                'バストアップ', 'バストケア', '育乳', 'バストアップエステ',
                '銀座バストアップ', '銀座バストケア', 'バストアップサロン',
                '光豊胸', '光バストアップ', 'IPL光照射',
                'Heraeusフラッシュランプ', 'サファイアクリスタル', 'バストアップ専用マシン',
                'オーダーメイド複合施術', '乳腺マッサージ', 'フラッシュバスト',
                'クーパー靭帯ケア', 'ナノカレント', 'コラーゲンマシン', '骨盤底筋ケア',
                'デコルテケア', 'バストの下垂改善', 'バストの左右差改善',
                'ブライダルバストケア', '産後バストケア',
            ],
            'potentialAction' => [
                [
                    '@type'  => 'ReserveAction',
                    'name'   => 'ホットペッパーで予約',
                    'target' => [
                        '@type'       => 'EntryPoint',
                        'urlTemplate' => 'https://beauty.hotpepper.jp/kr/slnH000334472/',
                        'actionPlatform' => [
                            'https://schema.org/DesktopWebPlatform',
                            'https://schema.org/MobileWebPlatform',
                        ],
                    ],
                    'result' => [
                        '@type' => 'Reservation',
                        'name'  => '施術予約（ホットペッパービューティー）',
                    ],
                ],
                [
                    '@type'  => 'ReserveAction',
                    'name'   => '公式サイトで予約',
                    'target' => [
                        '@type'       => 'EntryPoint',
                        'urlTemplate' => 'https://book.squareup.com/appointments/qt8e7316fy17nd/location/CMN5YZFYZARSA/services',
                        'actionPlatform' => [
                            'https://schema.org/DesktopWebPlatform',
                            'https://schema.org/MobileWebPlatform',
                        ],
                    ],
                    'result' => [
                        '@type' => 'Reservation',
                        'name'  => '施術予約（公式予約）',
                    ],
                ],
            ],
            'hasOfferCatalog' => [
                '@type' => 'OfferCatalog',
                'name'  => '施術メニュー',
                'itemListElement' => [
                    [
                        '@type' => 'Offer',
                        'itemOffered' => [
                            '@type'       => 'Service',
                            'name'        => 'バストアップ施術',
                            'description' => 'Heraeus社製ランプ×サファイアクリスタル搭載のバストアップ専用マシンとオールハンドによるオーダーメイド複合施術。都内随一の2000ショット照射で深部までアプローチ。',
                        ],
                    ],
                    [
                        '@type' => 'Offer',
                        'itemOffered' => [
                            '@type' => 'Service',
                            'name'  => 'フェイシャルケア',
                        ],
                    ],
                    [
                        '@type' => 'Offer',
                        'itemOffered' => [
                            '@type' => 'Service',
                            'name'  => 'ボディケア',
                        ],
                    ],
                ],
            ],
        ];
    }

    // ----- 採用ページ -----
    if ($slug === 'information') {
        $job_locations = [
            [
                '@type'   => 'Place',
                'name'    => 'バストアップ専門パトラクシェ恵比寿・代官山店',
                'address' => [
                    '@type'           => 'PostalAddress',
                    'streetAddress'   => '代官山町18-8 堀井代官山ビル3F',
                    'addressLocality' => '渋谷区',
                    'addressRegion'   => '東京都',
                    'postalCode'      => '150-0034',
                    'addressCountry'  => 'JP',
                ],
                'geo' => [
                    '@type'     => 'GeoCoordinates',
                    'latitude'  => 35.649642,
                    'longitude' => 139.701838,
                ],
            ],
            [
                '@type'   => 'Place',
                'name'    => 'バストアップ専門パトラクシェ銀座店',
                'address' => [
                    '@type'           => 'PostalAddress',
                    'streetAddress'   => '銀座1-6-6 GINZA ARROWS 6F',
                    'addressLocality' => '中央区',
                    'addressRegion'   => '東京都',
                    'postalCode'      => '104-0061',
                    'addressCountry'  => 'JP',
                ],
                'geo' => [
                    '@type'     => 'GeoCoordinates',
                    'latitude'  => 35.674583,
                    'longitude' => 139.765120,
                ],
            ],
        ];
        $hiring_org = [
            '@type'         => 'Organization',
            'name'          => 'Patolaqshe（パトラクシェ）',
            'alternateName' => 'パトラクシェ',
            'url'           => 'https://patolaqshe.com/',
            'logo'          => 'https://patolaqshe.com/wp-content/themes/swell_child/img/intrologo.png',
            'sameAs'        => [
                'https://www.instagram.com/patolaqshe_daikanyama/',
                'https://www.instagram.com/patolaqshe_ginza/',
            ],
        ];

        // 正社員
        $graph[] = [
            '@type'            => 'JobPosting',
            'title'            => '【銀座・恵比寿】バストアップ専門エステティシャン（正社員）急募',
            'description'      => '<p><strong>バストアップ専門パトラクシェで正社員エステティシャンを急募！</strong></p>'
                . '<p>東京・銀座と恵比寿/代官山の2店舗を展開する、バストアップ専門サロンです。創業13年、延べ7万人以上の施術実績。</p>'
                . '<h3>仕事内容</h3><ul><li>バストアップ施術（マシン施術＋オールハンドマッサージ）</li><li>カウンセリング・アフターフォロー</li><li>フェイシャル・ボディケア施術</li></ul>'
                . '<h3>待遇</h3><ul><li>月給24万〜35万円</li><li>各種保険完備・交通費全額支給</li><li>充実した研修制度（会社負担）</li><li>独立開業支援制度あり</li><li>駅徒歩2分の好立地</li></ul>',
            'datePosted'       => '2026-02-01',
            'validThrough'     => '2026-06-30T23:59:59+09:00',
            'employmentType'   => 'FULL_TIME',
            'url'              => 'https://patolaqshe.com/information/',
            'directApply'      => true,
            'jobImmediateStart' => true,
            'industry'         => 'エステティック・美容',
            'baseSalary'       => [
                '@type'    => 'MonetaryAmount',
                'currency' => 'JPY',
                'value'    => [
                    '@type'    => 'QuantitativeValue',
                    'minValue' => 240000,
                    'maxValue' => 350000,
                    'unitText' => 'MONTH',
                ],
            ],
            'experienceRequirements' => '未経験歓迎。エステティシャン経験者優遇。',
            'qualifications'         => '学歴不問、未経験歓迎、エステティシャン経験者優遇',
            'jobBenefits'            => '各種保険完備、交通費全額支給、制服貸与、昇給制度、充実した研修制度、独立開業支援制度、有給休暇',
            'workHours'              => '実働8時間・休憩1時間',
            'hiringOrganization'     => $hiring_org,
            'jobLocation'            => $job_locations,
        ];

        // アルバイト
        $graph[] = [
            '@type'            => 'JobPosting',
            'title'            => '【銀座・恵比寿】バストアップサロン エステティシャン（アルバイト）急募',
            'description'      => '<p><strong>未経験OK！バストアップ専門パトラクシェでアルバイト急募</strong></p>'
                . '<p>週3日〜OK、シフト柔軟。研修制度充実で未経験でも安心。正社員登用制度あり。</p>'
                . '<h3>待遇</h3><ul><li>時給1,300〜1,800円</li><li>交通費全額支給</li><li>研修制度あり</li><li>正社員登用あり</li></ul>',
            'datePosted'       => '2026-02-01',
            'validThrough'     => '2026-06-30T23:59:59+09:00',
            'employmentType'   => 'PART_TIME',
            'url'              => 'https://patolaqshe.com/information/',
            'directApply'      => true,
            'jobImmediateStart' => true,
            'industry'         => 'エステティック・美容',
            'baseSalary'       => [
                '@type'    => 'MonetaryAmount',
                'currency' => 'JPY',
                'value'    => [
                    '@type'    => 'QuantitativeValue',
                    'minValue' => 1300,
                    'maxValue' => 1800,
                    'unitText' => 'HOUR',
                ],
            ],
            'experienceRequirements' => '未経験歓迎',
            'qualifications'         => '学歴不問、未経験歓迎',
            'jobBenefits'            => '交通費全額支給、制服貸与、研修制度あり、正社員登用あり',
            'workHours'              => '週3日〜OK、シフト制',
            'hiringOrganization'     => $hiring_org,
            'jobLocation'            => $job_locations,
        ];

        // 業務委託
        $graph[] = [
            '@type'            => 'JobPosting',
            'title'            => '【銀座・恵比寿】バストアップエステティシャン（業務委託）急募',
            'description'      => '<p><strong>経験者歓迎！業務委託エステティシャン急募</strong></p>'
                . '<p>あなたの技術を活かせる環境です。報酬応相談・完全予約制。独立開業支援制度あり。</p>',
            'datePosted'       => '2026-02-01',
            'validThrough'     => '2026-06-30T23:59:59+09:00',
            'employmentType'   => 'CONTRACTOR',
            'url'              => 'https://patolaqshe.com/information/',
            'directApply'      => true,
            'jobImmediateStart' => true,
            'industry'         => 'エステティック・美容',
            'experienceRequirements' => 'エステティシャン実務経験1年以上',
            'qualifications'         => 'エステティシャン経験者歓迎',
            'hiringOrganization'     => $hiring_org,
            'jobLocation'            => $job_locations,
        ];
    }

    // ----- サービスページ -----
    if ($slug === 'service') {
        $graph[] = [
            '@type'       => 'Service',
            'name'        => 'バストアップ施術',
            'description' => 'Heraeus社製ランプ×サファイアクリスタル搭載のバストアップ専用マシンとオールハンドによるオーダーメイド複合施術。都内随一の2000ショット照射で深部までアプローチ。',
            'provider'    => ['@id' => 'https://patolaqshe.com/#organization'],
            'serviceType' => 'バストアップエステ',
            'areaServed'  => [
                ['@type' => 'City', 'name' => '渋谷区'],
                ['@type' => 'City', 'name' => '中央区'],
            ],
            'url' => 'https://patolaqshe.com/service/',
        ];
        $graph[] = [
            '@type'       => 'Service',
            'name'        => 'フェイシャルケア',
            'description' => 'お顔のリフトアップ・小顔・毛穴ケアなど、お悩みに合わせたフェイシャル美容トリートメント施術。',
            'provider'    => ['@id' => 'https://patolaqshe.com/#organization'],
            'serviceType' => 'フェイシャルエステ',
            'areaServed'  => [
                ['@type' => 'City', 'name' => '渋谷区'],
                ['@type' => 'City', 'name' => '中央区'],
            ],
            'url'         => 'https://patolaqshe.com/service/',
        ];
        $graph[] = [
            '@type'       => 'Service',
            'name'        => 'ボディケア',
            'description' => '痩身・セルライトケア・引き締めなど、全身の美容トリートメント施術。',
            'provider'    => ['@id' => 'https://patolaqshe.com/#organization'],
            'serviceType' => 'ボディエステ',
            'areaServed'  => [
                ['@type' => 'City', 'name' => '渋谷区'],
                ['@type' => 'City', 'name' => '中央区'],
            ],
            'url'         => 'https://patolaqshe.com/service/',
        ];
        // VideoObject — サービスページ埋め込みYouTube
        $graph[] = [
            '@type'        => 'VideoObject',
            'name'         => '【バストアップ】フラッシュバスト（光豊胸）の施術紹介',
            'description'  => 'バストアップ専門パトラクシェのフラッシュバスト（光豊胸）施術の流れをご紹介。都内随一の2000ショット照射で深部までアプローチ。',
            'thumbnailUrl' => 'https://i.ytimg.com/vi/L5K1yJkRVh8/hqdefault.jpg',
            'uploadDate'   => '2024-01-01T00:00:00+09:00',
            'contentUrl'   => 'https://www.youtube.com/watch?v=L5K1yJkRVh8',
            'embedUrl'     => 'https://www.youtube.com/embed/L5K1yJkRVh8',
        ];
        $graph[] = [
            '@type'        => 'VideoObject',
            'name'         => '『10回のエステより1回のハーブ』ハーブトリートメントご紹介（リアボーテ）',
            'description'  => 'パトラクシェのハーブトリートメント（リアボーテ）の施術紹介。肌再生・美肌効果で内側から美しく。',
            'thumbnailUrl' => 'https://i.ytimg.com/vi/pd6n5qwLDKo/hqdefault.jpg',
            'uploadDate'   => '2024-01-01T00:00:00+09:00',
            'contentUrl'   => 'https://www.youtube.com/watch?v=pd6n5qwLDKo',
            'embedUrl'     => 'https://www.youtube.com/embed/pd6n5qwLDKo',
        ];
        $graph[] = [
            '@type'        => 'VideoObject',
            'name'         => '【ホットストーンセラピー】バストアップサロン パトラクシェの施術紹介',
            'description'  => 'パトラクシェのホットストーンセラピー施術の流れ。温熱効果で血行促進し、バストアップ効果を高めます。',
            'thumbnailUrl' => 'https://i.ytimg.com/vi/Uk6k-3y5Cos/hqdefault.jpg',
            'uploadDate'   => '2024-01-01T00:00:00+09:00',
            'contentUrl'   => 'https://www.youtube.com/watch?v=Uk6k-3y5Cos',
            'embedUrl'     => 'https://www.youtube.com/embed/Uk6k-3y5Cos',
        ];
    }

    // ----- コースページ -----
    if ($slug === 'course') {
        $graph[] = [
            '@type'       => 'Service',
            'name'        => 'バストアップコース（90分）',
            'description' => 'フラッシュ×オールハンド施術による人気No.1メニュー。左右差補正、ハリ・弾力回復、ボリュームアップ、谷間形成に対応。',
            'provider'    => ['@id' => 'https://patolaqshe.com/#organization'],
            'serviceType' => 'バストアップエステ',
            'areaServed'  => [
                ['@type' => 'City', 'name' => '渋谷区'],
                ['@type' => 'City', 'name' => '中央区'],
            ],
            'url'         => 'https://patolaqshe.com/course/',
            'offers'      => [
                '@type'         => 'Offer',
                'price'         => '9500',
                'priceCurrency' => 'JPY',
                'name'          => '初回限定価格',
                'availability'  => 'https://schema.org/InStock',
                'url'           => 'https://patolaqshe.com/course/',
                'priceValidUntil' => '2026-12-31',
            ],
        ];
    }

    // ----- 結婚相談所ページ（最大充実版） -----
    if ($slug === 'mariage') {
        $graph[] = [
            '@type'       => ['LocalBusiness', 'ProfessionalService'],
            '@id'         => 'https://patolaqshe.com/#mariage',
            'name'        => '結婚相談所パトラクシェ マリアージュ',
            'alternateName' => ['パトラクシェマリアージュ', 'Patolaqshe Mariage', '銀座 結婚相談所 パトラクシェ'],
            'description' => '銀座駅徒歩1分の結婚相談所。エステサロン13年の実績を持つパトラクシェが運営する、美容×婚活の新しい結婚相談所です。専任カウンセラーによる1対1のお相手紹介・お見合いセッティングに加え、ブライダルエステ・自分磨きプログラムで外見と内面の両面からトータルサポート。成婚までの伴走型サービスで、30代・40代の婚活を全力で応援します。無料カウンセリング実施中。',
            'image'       => [
                'https://patolaqshe.com/wp-content/themes/swell_child/img/mariage.jpg',
            ],
            'logo'        => 'https://patolaqshe.com/wp-content/themes/swell_child/img/intrologo.png',
            'url'         => 'https://patolaqshe.com/mariage/',
            'telephone'   => '03-6264-4343',
            'priceRange'  => '¥¥〜¥¥¥',
            'currenciesAccepted' => 'JPY',
            'paymentAccepted'    => '現金, クレジットカード, 銀行振込',
            'address'     => [
                '@type'           => 'PostalAddress',
                'streetAddress'   => '銀座1-6-6 GINZA ARROWS 6F',
                'addressLocality' => '中央区',
                'addressRegion'   => '東京都',
                'postalCode'      => '104-0061',
                'addressCountry'  => 'JP',
            ],
            'geo' => [
                '@type'     => 'GeoCoordinates',
                'latitude'  => 35.674583,
                'longitude' => 139.765120,
            ],
            'hasMap' => 'https://www.google.com/maps?cid=12930228174206556429',
            'openingHoursSpecification' => [
                [
                    '@type'     => 'OpeningHoursSpecification',
                    'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                    'opens'     => '13:00',
                    'closes'    => '21:00',
                ],
                [
                    '@type'     => 'OpeningHoursSpecification',
                    'dayOfWeek' => ['Saturday', 'Sunday'],
                    'opens'     => '11:00',
                    'closes'    => '19:00',
                ],
            ],
            'areaServed' => [
                ['@type' => 'City', 'name' => '銀座'],
                ['@type' => 'City', 'name' => '中央区'],
                ['@type' => 'City', 'name' => '千代田区'],
                ['@type' => 'City', 'name' => '港区'],
                ['@type' => 'City', 'name' => '渋谷区'],
                ['@type' => 'City', 'name' => '新宿区'],
                ['@type' => 'City', 'name' => '品川区'],
                ['@type' => 'City', 'name' => '有楽町'],
                ['@type' => 'City', 'name' => '東京駅周辺'],
                ['@type' => 'State', 'name' => '東京都'],
                ['@type' => 'State', 'name' => '神奈川県'],
                ['@type' => 'State', 'name' => '埼玉県'],
            ],
            'knowsAbout' => [
                '結婚相談所', '婚活', 'お見合い', '成婚', '婚活カウンセリング',
                '30代婚活', '40代婚活', '銀座婚活', '東京婚活',
                'ブライダルエステ', '結婚準備', 'お相手紹介',
                '婚活プロフィール写真', '自分磨き', '婚活セミナー',
                '再婚活', 'シングルマザー婚活', '仲人型結婚相談所',
            ],
            'sameAs' => [
                'https://www.google.com/maps?cid=12930228174206556429',
                'https://www.instagram.com/patolaqshe_ginza/',
                'https://www.youtube.com/@patolaqshe',
            ],
            'parentOrganization' => ['@id' => 'https://patolaqshe.com/#organization'],
            'founder' => [
                '@type' => 'Person',
                'name'  => '北野美帆',
                'jobTitle' => '代表カウンセラー',
            ],
            'potentialAction' => [
                [
                    '@type'  => 'ReserveAction',
                    'name'   => '無料カウンセリング予約',
                    'target' => [
                        '@type'       => 'EntryPoint',
                        'urlTemplate' => 'https://tayori.com/form/6d4a08aa86803c6ad6212ff3118789ea2f0b1e61/',
                        'actionPlatform' => [
                            'https://schema.org/DesktopWebPlatform',
                            'https://schema.org/MobileWebPlatform',
                        ],
                    ],
                    'result' => [
                        '@type' => 'Reservation',
                        'name'  => '無料カウンセリング',
                    ],
                ],
            ],
            'hasOfferCatalog' => [
                '@type' => 'OfferCatalog',
                'name'  => '結婚相談所・ブライダルサービス',
                'itemListElement' => [
                    [
                        '@type' => 'Offer',
                        'itemOffered' => [
                            '@type'       => 'Service',
                            'name'        => '結婚相談所サービス（仲人型）',
                            'description' => '専任カウンセラーによる1対1のお相手紹介・お見合いセッティング・交際サポート・成婚までの伴走型サービス。プロフィール作成支援、デートプランのアドバイス、お断り代行まで手厚くサポート。',
                            'serviceType' => '結婚相談',
                        ],
                    ],
                    [
                        '@type' => 'Offer',
                        'itemOffered' => [
                            '@type'       => 'Service',
                            'name'        => 'ブライダルエステ',
                            'description' => '結婚式を最高の思い出にするための特別エステプラン。バストアップ・フェイシャル・ボディケアを組み合わせ、ドレス姿を最も美しく引き立てる花嫁専用の施術コース。',
                            'serviceType' => 'ブライダルエステ',
                        ],
                    ],
                    [
                        '@type' => 'Offer',
                        'itemOffered' => [
                            '@type'       => 'Service',
                            'name'        => '自分磨きプログラム',
                            'description' => '婚活成功のための外見・内面トータル自分磨き。美容施術（バストケア・フェイシャル・ボディケア）とカウンセリングを組み合わせ、自信を持ってお見合いに臨める状態を作ります。',
                            'serviceType' => '婚活サポート',
                        ],
                    ],
                    [
                        '@type' => 'Offer',
                        'itemOffered' => [
                            '@type'       => 'Service',
                            'name'        => '無料カウンセリング',
                            'description' => '婚活のお悩みをお聞きし、最適な婚活プランをご提案。結婚相談所の仕組みや料金体系も丁寧にご説明します。銀座サロンでリラックスしながらご相談いただけます。',
                            'serviceType' => '婚活カウンセリング',
                            'offers' => [
                                '@type' => 'Offer',
                                'price' => '0',
                                'priceCurrency' => 'JPY',
                                'name'  => '無料',
                            ],
                        ],
                    ],
                    [
                        '@type' => 'Offer',
                        'itemOffered' => [
                            '@type'       => 'Service',
                            'name'        => 'プロフィール写真撮影サポート',
                            'description' => '婚活プロフィール写真の第一印象を最大限に高める美容施術とスタイリングアドバイス。撮影前のフェイシャルケアで肌の状態を整え、最高の一枚を撮影するサポートを行います。',
                            'serviceType' => '婚活写真サポート',
                        ],
                    ],
                ],
            ],
        ];

        // FAQPage — 結婚相談所FAQ（AI検索・リッチリザルト対応）
        $graph[] = [
            '@type'      => 'FAQPage',
            'mainEntity' => [
                [
                    '@type'          => 'Question',
                    'name'           => 'パトラクシェ マリアージュはどんな結婚相談所ですか？',
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text'  => 'エステサロン13年の実績を持つパトラクシェが運営する、美容×婚活をコンセプトにした結婚相談所です。銀座一丁目駅から徒歩1分のサロンで、専任カウンセラーによるお相手紹介・お見合いセッティングに加え、ブライダルエステや自分磨きプログラムで婚活を外見と内面の両面からサポートします。',
                    ],
                ],
                [
                    '@type'          => 'Question',
                    'name'           => '結婚相談所の無料カウンセリングでは何を相談できますか？',
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text'  => '婚活の現状やお悩み、理想のお相手像、結婚相談所の仕組み・料金体系など、何でもご相談いただけます。銀座の落ち着いたサロン空間でリラックスしながら、専任カウンセラーがあなたに最適な婚活プランをご提案します。無理な勧誘は一切ございません。',
                    ],
                ],
                [
                    '@type'          => 'Question',
                    'name'           => '30代後半・40代からの婚活でも大丈夫ですか？',
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text'  => 'もちろんです。30代後半〜40代の方こそ結婚相談所のメリットが大きく、当所でも多くの方が活動されています。年齢を重ねた大人の魅力を最大限に引き出す美容サポートと、経験豊富なカウンセラーの伴走で、焦らず着実に成婚を目指せます。',
                    ],
                ],
                [
                    '@type'          => 'Question',
                    'name'           => 'エステサロンの結婚相談所ならではの特徴は何ですか？',
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text'  => '美容のプロフェッショナルがバックアップする点が最大の特徴です。お見合い前のフェイシャルケアやバストアップ施術で第一印象を高め、プロフィール写真撮影前の美容サポートも実施。結婚式に向けたブライダルエステまで一貫して対応できるのは、エステサロン発の結婚相談所ならではです。',
                    ],
                ],
                [
                    '@type'          => 'Question',
                    'name'           => 'ブライダルエステはどのような内容ですか？',
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text'  => 'ウェディングドレスを最も美しく着こなすための花嫁専用エステプランです。バストアップ施術でデコルテラインを整え、フェイシャルケアで肌を透明感のある状態に、ボディケアで全身を引き締めます。挙式の3〜6ヶ月前からの計画的なケアをおすすめしています。',
                    ],
                ],
                [
                    '@type'          => 'Question',
                    'name'           => '銀座のサロンへのアクセス方法を教えてください',
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text'  => '東京メトロ有楽町線「銀座一丁目駅」6番出口から徒歩1分、JR「有楽町駅」中央口から徒歩5分です。銀座1-6-6 GINZA ARROWS 6Fにございます。お仕事帰りにも立ち寄りやすい立地です。',
                    ],
                ],
                [
                    '@type'          => 'Question',
                    'name'           => '婚活中に自分磨きをするメリットは何ですか？',
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text'  => '外見に自信が持てると、お見合いやデートでの印象が格段に変わります。当所では美容施術で外見を整えるだけでなく、自信を取り戻すことで会話も自然に弾み、交際成立率・成婚率の向上につながっています。美容投資は婚活における最もコスパの良い自己投資です。',
                    ],
                ],
                [
                    '@type'          => 'Question',
                    'name'           => '再婚やシングルマザーの婚活にも対応していますか？',
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text'  => 'はい、再婚活やシングルマザーの方の婚活も全力でサポートいたします。お一人おひとりの状況に合わせた丁寧なカウンセリングと、理解のあるお相手のご紹介を心がけています。まずは無料カウンセリングでお気軽にご相談ください。',
                    ],
                ],
            ],
        ];

        // VideoObject — マリアージュページ埋め込みYouTube
        $graph[] = [
            '@type'        => 'VideoObject',
            'name'         => '【結婚相談所】パトラクシェマリアージュのご紹介',
            'description'  => '銀座の結婚相談所パトラクシェ マリアージュ。エステサロン発の結婚相談所として、外見・内面の両面からトータルサポート。美容×婚活の新しいカタチをご紹介します。',
            'thumbnailUrl' => 'https://i.ytimg.com/vi/SjJVlQskK4c/hqdefault.jpg',
            'uploadDate'   => '2024-01-01T00:00:00+09:00',
            'contentUrl'   => 'https://www.youtube.com/watch?v=SjJVlQskK4c',
            'embedUrl'     => 'https://www.youtube.com/embed/SjJVlQskK4c',
        ];
    }

    // ----- お客様の声ページ -----
    if ($slug === 'voice') {
        $graph[] = [
            '@type'  => 'WebPage',
            'name'   => 'お客様の声',
            'url'    => 'https://patolaqshe.com/voice/',
            'about'  => ['@id' => 'https://patolaqshe.com/#organization'],
            'description' => 'パトラクシェをご利用いただいたお客様の体験談・Before/After。',
        ];
        // 代官山店の口コミ評価
        $graph[] = [
            '@type'       => 'BeautySalon',
            '@id'         => 'https://patolaqshe.com/#daikanyama',
            'name'        => 'バストアップ専門パトラクシェ恵比寿・代官山店',
            'url'         => 'https://patolaqshe.com/ebisu-daikanyama/',
            'aggregateRating' => [
                '@type'       => 'AggregateRating',
                'ratingValue' => '5.0',
                'bestRating'  => '5',
                'worstRating' => '1',
                'ratingCount' => '5',
                'reviewCount' => '5',
            ],
        ];
        // 銀座店の口コミ評価
        $graph[] = [
            '@type'       => 'BeautySalon',
            '@id'         => 'https://patolaqshe.com/#ginza',
            'name'        => 'バストアップ専門パトラクシェ銀座店',
            'url'         => 'https://patolaqshe.com/ginza/',
            'aggregateRating' => [
                '@type'       => 'AggregateRating',
                'ratingValue' => '5.0',
                'bestRating'  => '5',
                'worstRating' => '1',
                'ratingCount' => '5',
                'reviewCount' => '5',
            ],
        ];
    }

    // ----- パトラクシェについてページ -----
    if ($slug === 'about') {
        $graph[] = [
            '@type'       => 'AboutPage',
            'name'        => 'パトラクシェについて',
            'url'         => 'https://patolaqshe.com/about/',
            'description' => 'バストアップ専門パトラクシェの理念・こだわり・歴史。創業13年、延べ7万人以上の施術実績。',
            'mainEntity'  => [
                '@type'          => 'Organization',
                '@id'            => 'https://patolaqshe.com/#organization',
                'name'           => 'パトラクシェ（Patolaqshe）',
                'description'    => 'バストアップ専門パトラクシェ。フラッシュバスト・乳腺マッサージ・ナノカレントなど複数施術を掛け合わせるオーダーメイド複合施術。創業13年・延べ7万人以上の施術実績。恵比寿・代官山、銀座の2店舗展開。',
                'url'            => 'https://patolaqshe.com/',
                'logo'           => 'https://patolaqshe.com/wp-content/themes/swell_child/img/intrologo.png',
                'foundingDate'   => '2012',
                'numberOfEmployees' => [
                    '@type'    => 'QuantitativeValue',
                    'minValue' => 5,
                    'maxValue' => 15,
                ],
                'areaServed' => [
                    ['@type' => 'City', 'name' => '渋谷区'],
                    ['@type' => 'City', 'name' => '中央区'],
                    ['@type' => 'State', 'name' => '東京都'],
                ],
                'subOrganization' => [
                    ['@id' => 'https://patolaqshe.com/#daikanyama'],
                    ['@id' => 'https://patolaqshe.com/#ginza'],
                    ['@id' => 'https://patolaqshe.com/#mariage'],
                ],
                'sameAs' => [
                    'https://www.instagram.com/patolaqshe_daikanyama/',
                    'https://www.instagram.com/patolaqshe_ginza/',
                    'https://www.threads.com/@patolaqshe_daikanyama',
                    'https://www.threads.com/@patolaqshe_ginza',
                    'https://www.facebook.com/profile.php?id=61560845258498',
                    'https://x.com/patolaqshe',
                    'https://www.youtube.com/@patolaqshe',
                    'https://www.tiktok.com/@patolaqshe',
                ],
            ],
        ];
    }

    if (empty($graph)) return;

    $structured_data = [
        '@context' => 'https://schema.org',
        '@graph'   => $graph,
    ];

    echo '<script type="application/ld+json">' . "\n";
    echo wp_json_encode($structured_data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    echo "\n</script>\n";
}, 5);

/**
 * SWELL親テーマのデフォルトJSON-LD出力を無効化
 * 子テーマ側で包括的な構造化データを出力しているため、
 * 親テーマの Organization/WebSite が重複するのを防止
 */
add_filter('swell_json_ld', '__return_empty_array');

/**
 * 関連記事を同じ article_type（ブログ記事/お客様の声/ニュース）のみに絞る
 */
add_filter('swell_related_post_args', function($args) {
    $post_id = get_the_ID();
    $article_types = wp_get_post_terms($post_id, 'article_type', ['fields' => 'slugs']);
    if (!empty($article_types) && !is_wp_error($article_types)) {
        $args['tax_query'] = [
            [
                'taxonomy' => 'article_type',
                'field'    => 'slug',
                'terms'    => $article_types,
            ],
        ];
    }
    return $args;
});

/**
 * 投稿詳細ページ用ガラス調背景CSSを読み込み
 */
add_action('wp_enqueue_scripts', function() {
    if (is_single()) {
        wp_enqueue_style(
            'single-post-bg',
            get_stylesheet_directory_uri() . '/css/single-post-bg.css',
            array(),
            filemtime(get_stylesheet_directory() . '/css/single-post-bg.css')
        );
    }
}, 20);

/**
 * OGPタグ・Twitterカード出力
 */
add_action('wp_head', function () {
    // Google Analytics 4
    ?>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZLB7ZC2RF8"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-ZLB7ZC2RF8');
    </script>
    <?php

    $og_type = 'website';
    $og_site_name = 'バストアップ専門パトラクシェ';
    $og_image = 'https://patolaqshe.com/wp-content/uploads/2026/02/body_banner_ogp.jpg';

    if (is_front_page() || is_home()) {
        $og_title = '恵比寿・代官山・銀座のバストアップ専門サロン｜パトラクシェ';
        $og_description = 'バストアップ専門パトラクシェ｜銀座・恵比寿・代官山。ドイツHeraeus社製ランプ×サファイアクリスタル搭載のバストアップ専用マシンで都内随一の2000ショット。創業13年・延べ7万人以上。オーダーメイド複合施術で効果体感率99%。無料カウンセリング受付中。';
        $og_url = home_url('/');
    } elseif (is_page()) {
        $slug = get_post_field('post_name', get_post());
        $og_title = get_the_title() . ' | パトラクシェ';
        $og_url = get_permalink();
        $page_descriptions = [
            'daikanyama'    => 'バストアップ専門パトラクシェ恵比寿・代官山店。代官山駅徒歩2分、恵比寿駅徒歩6分。平日12:00-20:00、土日祝11:00-19:00。初回体験9,500円。',
            'ginza'         => 'バストアップ専門パトラクシェ銀座店。銀座一丁目駅徒歩2分、有楽町駅徒歩5分。平日13:00-21:00、土日祝11:00-19:00。初回体験9,500円。',
            'service'       => 'パトラクシェの施術メニュー｜Heraeus社製ランプ×サファイアクリスタル搭載の専用マシンで2000ショット・乳腺マッサージ・ナノカレント・骨盤底筋ケアなど複数施術を掛け合わせるオーダーメイド複合施術。銀座・代官山。',
            'course'        => 'バストアップコース（90分）｜パトラクシェ人気No.1メニュー。初回限定9,500円（税込）。フラッシュ×オールハンド施術で左右差補正・下垂改善・ボリュームアップ。',
            'mariage'       => '銀座の結婚相談所パトラクシェ マリアージュ｜30代40代の婚活を美容×カウンセリングでトータルサポート。無料カウンセリング実施中。ブライダルエステ・自分磨きプログラムで成婚まで伴走。銀座一丁目駅徒歩1分。',
            'voice'         => 'お客様の声・体験談｜パトラクシェ。バストアップ施術を受けたお客様のリアルなBefore/Afterと感想をご紹介。効果体感率99%の実績。',
            'about'         => 'パトラクシェについて｜バストアップ専門パトラクシェ。創業13年、延べ7万人以上の施術実績。恵比寿・代官山、銀座の2店舗。',
            'information'   => 'エステティシャン急募｜銀座・恵比寿のバストアップ専門パトラクシェ。正社員月給24万〜35万円・アルバイト時給1,300〜1,800円。未経験歓迎、充実した研修制度、独立開業支援あり。駅徒歩2分の好立地。',
        ];
        $og_description = isset($page_descriptions[$slug]) ? $page_descriptions[$slug] : 'バストアップ専門パトラクシェ';
        if (has_post_thumbnail()) {
            $og_image = get_the_post_thumbnail_url(null, 'large');
        }
    } elseif (is_single()) {
        $og_title = get_the_title() . ' | パトラクシェ';
        $og_description = get_the_excerpt() ?: 'バストアップ専門パトラクシェ';
        $og_url = get_permalink();
        $og_type = 'article';
        if (has_post_thumbnail()) {
            $og_image = get_the_post_thumbnail_url(null, 'large');
        }
    } else {
        $og_title = wp_get_document_title();
        $og_description = 'バストアップ専門パトラクシェ';
        $og_url = home_url('/');
    }

    echo '<meta property="og:title" content="' . esc_attr($og_title) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($og_description) . '">' . "\n";
    echo '<meta property="og:url" content="' . esc_url($og_url) . '">' . "\n";
    echo '<meta property="og:image" content="' . esc_url($og_image) . '">' . "\n";
    echo '<meta property="og:type" content="' . esc_attr($og_type) . '">' . "\n";
    echo '<meta property="og:site_name" content="' . esc_attr($og_site_name) . '">' . "\n";
    echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($og_title) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($og_description) . '">' . "\n";
    echo '<meta name="twitter:image" content="' . esc_url($og_image) . '">' . "\n";
}, 2);

/**
 * WordPress標準サイトマップを有効化（SWELLのデフォルト無効化を上書き）
 */
add_filter('wp_sitemaps_enabled', '__return_true', 20);

/**
 * ページ別カスタムCSS/JS 外部ファイル読み込み
 * swell_meta_css / swell_meta_js のインライン出力を外部ファイル化
 */
add_action('wp_enqueue_scripts', function () {
  if (!is_page()) return;
  $page_id = get_queried_object_id();

  // ページ別CSS定義: page_id => ファイル名
  $page_css = [
    181  => 'page-daikanyama',  // 代官山
    752  => 'page-ginza',       // 銀座
    1558 => 'page-service',     // サービス
    912  => 'page-about',       // About
    1682 => 'page-course',      // コース
    1155 => 'page-info',        // 採用情報
    1105 => 'page-voice',       // お客様の声
    1346 => 'page-mariage',     // マリアージュ
  ];

  // ページ別JS定義: page_id => ファイル名
  $page_js = [
    181  => 'page-daikanyama',  // 代官山
    752  => 'page-ginza',       // 銀座
    1558 => 'page-service',     // サービス
    912  => 'page-about',       // About
    1682 => 'page-course',      // コース
    1155 => 'page-info',        // 採用情報
    1105 => 'page-voice',       // お客様の声
    1346 => 'page-mariage',     // マリアージュ
  ];

  // CSS読み込み
  if (isset($page_css[$page_id])) {
    $file = $page_css[$page_id];
    $css_path = get_stylesheet_directory() . "/css/{$file}.css";
    if (file_exists($css_path)) {
      wp_enqueue_style("ptl-{$file}", get_stylesheet_directory_uri() . "/css/{$file}.css", ['child_style'], filemtime($css_path));
    }
  }

  // JS読み込み
  if (isset($page_js[$page_id])) {
    $file = $page_js[$page_id];
    $js_path = get_stylesheet_directory() . "/js/{$file}.js";
    if (file_exists($js_path)) {
      wp_enqueue_script("ptl-{$file}", get_stylesheet_directory_uri() . "/js/{$file}.js", [], filemtime($js_path), true);
    }
  }
}, 20);
