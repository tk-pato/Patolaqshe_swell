<?php
if (!defined('ABSPATH')) exit;

/* BUST-ISSUES: 統合CSSを最終読込（親テーマより後に読み込み） */
add_action('wp_enqueue_scripts', function () {
  $rel  = '/css/issues-navigation.css';
  $path = get_stylesheet_directory() . $rel;
  if (file_exists($path)) {
    wp_enqueue_style('ptl-issues-bundle', get_stylesheet_directory_uri() . $rel, ['main_style'], filemtime($path));
  }
}, 999);

// BUST-ISSUESスタイルはissues-navigation.cssで完全管理

// NAV背景メディアを取得
function ptl_get_nav_background(): array
{
  // テーマ設定より取得
  $video_mod = get_theme_mod('ptl_nav_video');
  $bg_pc     = (string) get_theme_mod('ptl_nav_bg_pc', get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg');
  $bg_sp     = (string) get_theme_mod('ptl_nav_bg_sp', get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg');
  $overlay   = (float) get_theme_mod('ptl_nav_overlay', 0.25);
  $p_speed   = (float) get_theme_mod('ptl_nav_parallax_speed', 0.6);

  // 結果を組み立て
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

// BUST-ISSUES背景メディアを取得
function ptl_get_bust_issues_background(): array
{
  // テーマ設定より取得
  $video_mod = get_theme_mod('ptl_bust_issues_video');
  $bg_pc     = (string) get_theme_mod('ptl_bust_issues_bg_pc', get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg');
  $bg_sp     = (string) get_theme_mod('ptl_bust_issues_bg_sp', get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg');
  $overlay   = (float) get_theme_mod('ptl_bust_issues_overlay', 0.25);
  $p_speed   = (float) get_theme_mod('ptl_bust_issues_parallax_speed', 0.6);

  // 結果を組み立て
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

// bodyクラスにフラグを追加（ホームとランディングテンプレで有効）
add_filter('body_class', function ($classes) {
  if (is_front_page() || is_page_template('page-landing.php')) {
    $classes[] = 'has-head-toggle';
  }
  return $classes;
});
/* === PTL Header Visibility Guard (Plan B) | 非表示だけ無効化。見た目は変更しない === */
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
      setInterval(forceShow, 1500);
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
  // COMMITMENT - CSS読み込み（PC/SP分離対応）
  // ========================================
  
  // COMMITMENT - ベースCSS
  $commitment_css = get_stylesheet_directory() . '/css/section-commitment.css';
  if (file_exists($commitment_css)) {
    // 旧ハンドルクリーンアップ
    foreach (['ptl_commitment_styles', 'ptl-section-commitment'] as $handle) {
      if (wp_style_is($handle, 'enqueued')) {
        wp_dequeue_style($handle);
        wp_deregister_style($handle);
      }
    }
    // child_style依存で読み込み
    wp_enqueue_style('ptlCommit', get_stylesheet_directory_uri() . '/css/section-commitment.css', ['child_style'], filemtime($commitment_css));
  }
  
  // COMMITMENT - PC専用CSS
  $commitment_pc = get_stylesheet_directory() . '/css/pc/section-commitment.css';
  if (file_exists($commitment_pc)) {
    wp_enqueue_style(
      'ptlCommit-pc',
      get_stylesheet_directory_uri() . '/css/pc/section-commitment.css',
      ['ptlCommit'],
      filemtime($commitment_pc),
      'screen and (min-width: 960px)'
    );
  }
  
  // COMMITMENT - SP専用CSS
  $commitment_sp = get_stylesheet_directory() . '/css/sp/section-commitment.css';
  if (file_exists($commitment_sp)) {
    wp_enqueue_style(
      'ptlCommit-sp',
      get_stylesheet_directory_uri() . '/css/sp/section-commitment.css',
      ['ptlCommit'],
      filemtime($commitment_sp),
      'screen and (max-width: 959px)'
    );
  }

  // section-menu.css（メニューセクション用）
  $sm_path = get_stylesheet_directory() . '/css/section-menu.css';
  if (file_exists($sm_path)) {
    wp_enqueue_style(
      'ptl_section_menu',
      get_stylesheet_directory_uri() . '/css/section-menu.css',
      ['child_style'],
      filemtime($sm_path)
    );
  }

  // head-toggle.js
  $head_js_path = get_stylesheet_directory() . '/js/head-toggle.js';
  $head_js_ver  = file_exists($head_js_path) ? date('Ymdgis', filemtime($head_js_path)) : ($style_ver ?: '1.0');
  wp_enqueue_script('child_head_toggle', get_stylesheet_directory_uri() . '/js/head-toggle.js', [], $head_js_ver, true);

  // Hero Scroll Button - SP専用スムーススクロール
  $hero_scroll_path = get_stylesheet_directory() . '/js/hero-scroll.js';
  if (file_exists($hero_scroll_path)) {
    $hero_scroll_ver = date('Ymdgis', filemtime($hero_scroll_path));
    wp_enqueue_script('ptl-hero-scroll', get_stylesheet_directory_uri() . '/js/hero-scroll.js', [], $hero_scroll_ver, true);
  }

  // section-parallax.js（NAV背景パララックス用）: セレクタ存在チェックで早期returnするため全ページ読込でも軽量
  $parallax_js_path = get_stylesheet_directory() . '/js/section-parallax.js';
  if (file_exists($parallax_js_path)) {
    $parallax_js_ver = date('Ymdgis', filemtime($parallax_js_path));
    wp_enqueue_script('child_section_parallax', get_stylesheet_directory_uri() . '/js/section-parallax.js', [], $parallax_js_ver, true);
  }

  // SALON セクション用CSS/JS（COMMITMENTベース再構築）
  $salon_css = get_stylesheet_directory() . '/css/section-salon.css';
  if (file_exists($salon_css)) {
    wp_enqueue_style('ptl_section_salon', get_stylesheet_directory_uri() . '/css/section-salon.css', ['child_style'], filemtime($salon_css));
  }
}, 20);

// Hero Scroll Button - SP専用: ホットペッパーリンクを強制的に #intro に変更
add_filter('swell_mv_scroll_btn_url', function($url) {
  if (wp_is_mobile()) {
    return '#intro';
  }
  return $url;
}, 9999);

// Hero Scroll Button - HTML出力を強制的に書き換え
add_filter('swell_output_main_visual', function($html) {
  if (wp_is_mobile()) {
    // ホットペッパーのURLを #intro に置換
    $html = preg_replace(
      '/(href=["\']https:\/\/beauty\.hotpepper\.jp[^"\']*["\'])/i',
      'href="#intro"',
      $html
    );
  }
  return $html;
}, 9999);

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

  // 動画（メディア）
  $wp_customize->add_setting('ptl_nav_video', [
    'type'              => 'theme_mod',
    'transport'         => 'refresh',
    'sanitize_callback' => function ($v) {
      return is_numeric($v) ? (int)$v : esc_url_raw($v);
    },
  ]);
  if (class_exists('WP_Customize_Media_Control')) {
    $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'ptl_nav_video', [
      'label'     => '背景動画（推奨: MP4）',
      'section'   => 'ptl_navigation',
      'mime_type' => 'video',
    ]));
  }
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
          <div class="ptl-marquee__item"><img src="<?php echo esc_url($u); ?>" alt="" loading="lazy" decoding="async"></div>
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

  // JS（統合版：navigation.js に ptl-nav-fix.js を統合済み）
  $nav_js_path = get_stylesheet_directory() . '/js/navigation.js';
  $nav_js_ver  = file_exists($nav_js_path) ? date('Ymdgis', filemtime($nav_js_path)) : null;
  wp_enqueue_script('ptl-navigation', get_stylesheet_directory_uri() . '/js/navigation.js', ['jquery'], $nav_js_ver, true);

  // INFO HUB セクション用CSS/JS（PC/SP分離対応）
  $infohub_css = get_stylesheet_directory() . '/css/section-infohub.css';
  if (file_exists($infohub_css)) {
    wp_enqueue_style('ptlHub', get_stylesheet_directory_uri() . '/css/section-infohub.css', ['child_style'], filemtime($infohub_css));
  }

  // INFO HUB - PC専用CSS
  $infohub_pc = get_stylesheet_directory() . '/css/pc/section-infohub.css';
  if (file_exists($infohub_pc)) {
    wp_enqueue_style('ptlHub-pc', get_stylesheet_directory_uri() . '/css/pc/section-infohub.css', ['ptlHub'], filemtime($infohub_pc), 'screen and (min-width: 960px)');
  }

  // INFO HUB - SP専用CSS
  $infohub_sp = get_stylesheet_directory() . '/css/sp/section-infohub.css';
  if (file_exists($infohub_sp)) {
    wp_enqueue_style('ptlHub-sp', get_stylesheet_directory_uri() . '/css/sp/section-infohub.css', ['ptlHub'], filemtime($infohub_sp), 'screen and (max-width: 959px)');
  }

  $infohub_js = get_stylesheet_directory() . '/js/section-infohub.js';
  if (file_exists($infohub_js)) {
    wp_enqueue_script('ptlHub', get_stylesheet_directory_uri() . '/js/section-infohub.js', [], filemtime($infohub_js), true);
  }

  // NEWS セクション用CSS（PC/SP分離対応）
  $news_css = get_stylesheet_directory() . '/css/section-news.css';
  if (file_exists($news_css)) {
    wp_enqueue_style('ptlNews', get_stylesheet_directory_uri() . '/css/section-news.css', ['child_style'], filemtime($news_css));
  }

  // NEWS - PC専用CSS
  $news_pc = get_stylesheet_directory() . '/css/pc/section-news.css';
  if (file_exists($news_pc)) {
    wp_enqueue_style('ptlNews-pc', get_stylesheet_directory_uri() . '/css/pc/section-news.css', ['ptlNews'], filemtime($news_pc), 'screen and (min-width: 960px)');
  }

  // NEWS - SP専用CSS
  $news_sp = get_stylesheet_directory() . '/css/sp/section-news.css';
  if (file_exists($news_sp)) {
    wp_enqueue_style('ptlNews-sp', get_stylesheet_directory_uri() . '/css/sp/section-news.css', ['ptlNews'], filemtime($news_sp), 'screen and (max-width: 959px)');
  }

  // ========================================
  // FOOTER - CSS読み込み（PC/SP分離対応）
  // ========================================
  
  // フッター - ベースCSS
  $footer_css = get_stylesheet_directory() . '/css/footer.css';
  if (file_exists($footer_css)) {
    wp_enqueue_style(
      'ptl-footer',
      get_stylesheet_directory_uri() . '/css/footer.css',
      ['child_style'],
      filemtime($footer_css)
    );
  }
  
  // フッター - PC専用CSS
  $footer_pc = get_stylesheet_directory() . '/css/pc/footer-pc.css';
  if (file_exists($footer_pc)) {
    wp_enqueue_style(
      'ptl-footer-pc',
      get_stylesheet_directory_uri() . '/css/pc/footer-pc.css',
      ['ptl-footer'],
      filemtime($footer_pc),
      'screen and (min-width: 960px)'
    );
  }
  
  // フッター - SP専用CSS
  $footer_sp = get_stylesheet_directory() . '/css/sp/footer-sp.css';
  if (file_exists($footer_sp)) {
    wp_enqueue_style(
      'ptl-footer-sp',
      get_stylesheet_directory_uri() . '/css/sp/footer-sp.css',
      ['ptl-footer'],
      filemtime($footer_sp),
      'screen and (max-width: 959px)'
    );
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

@media (min-width: 769px) {
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

@media (max-width: 768px) {
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
(function(){
  var els = document.querySelectorAll('.ptl-navigation, .ptlNavHero');
  if (!els.length) return;

  var isPC = window.matchMedia('(min-width: 769px)');
  var FACTOR = 0.35; // 値を上げるほど移動量が増える
  var ticking = false;

  // 初期化: 各要素に動画/画像の有無でクラスを付与
  els.forEach(function(el){
    var vid = el.querySelector('video, .ptlNavHero__video');
    var img = el.querySelector('.ptlNavHero__image img');
    if (vid) el.classList.add('ptl-has-video');
    if (img) el.classList.add('ptl-has-image');
  });

  function update(){
    if (!isPC.matches) {
      els.forEach(function(el){ el.style.removeProperty('--ptl-parallax'); });
      return;
    }
    els.forEach(function(el){
      var rect = el.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var center = rect.top + rect.height/2 - vh/2;   // ビューポート中心基準
      var move = -center * FACTOR;
      el.style.setProperty('--ptl-parallax', move.toFixed(2) + 'px');
    });
  }

  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      update();
      ticking = false;
    });
  }

  ['scroll','resize'].forEach(function(ev){
    window.addEventListener(ev, onScroll, {passive:true});
  });
  update();
})();

// ③ SP向け：ナビ折り畳みの max-height 再計測（<=768pxのみ）
(function(){
  var mqSP = window.matchMedia('(max-width: 768px)');
  
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

  function recalc(){
    if (!mqSP.matches) return;
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
  }

  // イベントフック：開閉・回転・リサイズ・フォント読み込み後
  window.addEventListener('resize', recalc);
  window.addEventListener('orientationchange', recalc);
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

  // お客様の声 - SP専用CSS
  $uservoice_sp = get_stylesheet_directory() . '/css/sp/section-uservoice.css';
  if (file_exists($uservoice_sp)) {
    wp_enqueue_style('ptl-uservoice-sp', get_stylesheet_directory_uri() . '/css/sp/section-uservoice.css', ['ptl-uservoice'], filemtime($uservoice_sp), 'screen and (max-width: 959px)');
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
    wp_enqueue_style('ptlIntro-pc', get_stylesheet_directory_uri() . '/css/pc/section-intro.css', ['ptl_section_intro'], filemtime($intro_pc), 'screen and (min-width: 960px)');
  }

  // INTRO - SP専用CSS
  $intro_sp = get_stylesheet_directory() . '/css/sp/section-intro.css';
  if (file_exists($intro_sp)) {
    wp_enqueue_style('ptlIntro-sp', get_stylesheet_directory_uri() . '/css/sp/section-intro.css', ['ptl_section_intro'], filemtime($intro_sp), 'screen and (max-width: 959px)');
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

  // BLOG - SP専用CSS
  $blog_sp = get_stylesheet_directory() . '/css/sp/section-blog.css';
  if (file_exists($blog_sp)) {
    wp_enqueue_style('ptlBlog-sp', get_stylesheet_directory_uri() . '/css/sp/section-blog.css', ['ptl-blog'], filemtime($blog_sp), 'screen and (max-width: 959px)');
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
 * WordPress標準のwp_get_attachment_imageにloading="lazy"を自動付与
 */
add_filter('wp_get_attachment_image_attributes', 'ptl_perf_add_lazy_loading', 10, 3);
function ptl_perf_add_lazy_loading($attr, $attachment, $size)
{
  // data-no-lazy属性がある場合は除外
  if (isset($attr['data-no-lazy'])) {
    unset($attr['data-no-lazy']);
    return $attr;
  }

  // 既にloading属性がある場合はスキップ
  if (!isset($attr['loading'])) {
    $attr['loading'] = 'lazy';
  }

  // デコード最適化
  if (!isset($attr['decoding'])) {
    $attr['decoding'] = 'async';
  }

  return $attr;
}

/**
 * コンテンツ内の画像にloading="lazy"を自動付与
 */
add_filter('the_content', 'ptl_perf_add_lazy_to_content_images', 20);
add_filter('widget_text', 'ptl_perf_add_lazy_to_content_images', 20);
function ptl_perf_add_lazy_to_content_images($content)
{
  if (is_admin() || is_feed()) return $content;

  // data-no-lazy属性がある画像は除外
  $content = preg_replace_callback(
    '/<img([^>]+?)(?:\/?)>/i',
    function ($matches) {
      $img_tag = $matches[0];
      $attributes = $matches[1];

      // data-no-lazy がある場合はスキップ
      if (strpos($attributes, 'data-no-lazy') !== false) {
        return str_replace('data-no-lazy', '', $img_tag);
      }

      // 既にloading属性がある場合はスキップ
      if (strpos($attributes, 'loading=') !== false) {
        return $img_tag;
      }

      // loading="lazy" と decoding="async" を追加
      $new_attributes = $attributes . ' loading="lazy" decoding="async"';
      return '<img' . $new_attributes . '>';
    },
    $content
  );

  return $content;
}

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
 * wp-embed.min.jsの無効化
 */
add_action('wp_footer', 'ptl_perf_dequeue_embed_script');
function ptl_perf_dequeue_embed_script()
{
  wp_dequeue_script('wp-embed');
}

/**
 * jQuery Migrateの無効化（互換性問題がなければ）
 */
add_action('wp_default_scripts', 'ptl_perf_remove_jquery_migrate');
function ptl_perf_remove_jquery_migrate($scripts)
{
  if (!is_admin() && isset($scripts->registered['jquery'])) {
    $script = $scripts->registered['jquery'];

    if ($script->deps) {
      $script->deps = array_diff($script->deps, ['jquery-migrate']);
    }
  }
}

/**
 * フロントエンドでのDashicons無効化
 */
add_action('wp_enqueue_scripts', 'ptl_perf_dequeue_dashicons', 999);
function ptl_perf_dequeue_dashicons()
{
  if (!is_admin() && !is_user_logged_in()) {
    wp_dequeue_style('dashicons');
    wp_deregister_style('dashicons');
  }
}

/**
 * Block Editor用CSS/JSの無効化（フロントエンド）
 */
add_action('wp_enqueue_scripts', 'ptl_perf_dequeue_block_library', 100);
function ptl_perf_dequeue_block_library()
{
  // ブロックエディタを使用しない場合のみ無効化
  if (!has_blocks()) {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('wc-block-style'); // WooCommerce
    wp_dequeue_style('global-styles');
  }
}

/**
 * 不要なREST APIエンドポイントの無効化
 */
add_filter('rest_endpoints', 'ptl_perf_disable_unused_rest_endpoints');
function ptl_perf_disable_unused_rest_endpoints($endpoints)
{
  // oembed（埋め込み）を使わない場合
  if (isset($endpoints['/oembed/1.0/embed'])) {
    unset($endpoints['/oembed/1.0/embed']);
  }

  // ユーザー一覧を外部公開しない
  if (isset($endpoints['/wp/v2/users'])) {
    unset($endpoints['/wp/v2/users']);
  }

  return $endpoints;
}

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
 * クリティカルCSS用のフックポイント予約
 */
add_action('wp_head', 'ptl_perf_critical_css_placeholder', 2);
function ptl_perf_critical_css_placeholder()
{
  // 将来のクリティカルCSS実装用（今は何もしない）
  // 完成後にここでクリティカルCSSをインライン出力
  echo "\n<!-- Critical CSS Placeholder (Priority 2) -->\n";
}

/**
 * パフォーマンス最適化用のグローバルフラグ
 */
if (!defined('PTL_PERF_OPTIMIZATION_READY')) {
  define('PTL_PERF_OPTIMIZATION_READY', false); // 完成後にtrueに変更
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
 * トップに戻るボタンの矢印を上向きに修正（修正3）
 */
add_action('wp_head', function () {
  echo '<style id="ptl-pagetop-arrow-fix">
  /* トップに戻るボタンの矢印を上向きに */
  .c-pagetop__arrow,
  .p-pagetop__arrow,
  #page_top .arrow,
  #page_top::before,
  #page_top::after,
  #page-top .arrow,
  .pagetop-btn::before,
  .to-top::before,
  .swell-block-button__arrow,
  .c-pagetop::before,
  .p-pagetop::before,
  .c-btn__arrow {
    transform: rotate(-90deg) !important;
  }
  
  /* FontAwesome使用時 */
  #page_top .fa-chevron-right,
  #page_top .fa-angle-right,
  #page-top .fa-chevron-right,
  #page-top .fa-angle-right,
  .c-pagetop .fa-chevron-right,
  .p-pagetop .fa-chevron-right,
  .fa-chevron-right,
  .fa-angle-right {
    transform: rotate(-90deg) !important;
  }
  
  /* SWELL標準のトップボタン位置確保 */
  #page_top,
  #page-top,
  .c-pagetop,
  .p-pagetop {
    z-index: 9999 !important;
  }
  </style>';
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
