<?php
if (!defined('ABSPATH')) exit;

/* BUST-ISSUES: 統合CSSを最終読込＋動作マーカー */
add_action('wp_enqueue_scripts', function () {
  $rel  = '/css/issues-navigation.css';
  $path = get_stylesheet_directory() . $rel;
  if (file_exists($path)) {
    wp_enqueue_style('ptl-issues-bundle', get_stylesheet_directory_uri() . $rel, [], filemtime($path));
  }
}, 999);

add_action('wp_head', function () {
  echo "<!-- ptl-issues inline armed -->\n";
  echo '<style>#bust-issues .ptl-bustIssues__list{list-style:none;margin:0;padding:0}#bust-issues .ptl-bustIssues__list .ptl-bustIssues__item{border-bottom:1px dashed rgba(0,0,0,.18) !important;border-top:0;border-left:0;border-right:0;}</style>' . "\n";
}, 9999);

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
  $p_speed   = (float) get_theme_mod('ptl_bust_issues_parallax_speed', 0.92);

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

  // ptl-layout.css（commitment/navigation幅・カードレイアウト同期用）
  wp_enqueue_style('ptl_layout', get_stylesheet_directory_uri() . '/css/ptl-layout.css', ['child_style'], wp_get_theme()->get('Version'));

  // reasons - 統合CSS（ptl-reasons 1ハンドルに集約）
  add_action('wp_enqueue_scripts', function () {
    // 旧ハンドルクリーンアップ
    foreach (['ptl_reasons_styles', 'ptl-section-reasons'] as $handle) {
      wp_dequeue_style($handle);
      wp_deregister_style($handle);
    }
    // 統合ハンドル
    $rel = '/css/section-reasons.css';
    $abs = get_stylesheet_directory() . $rel;
    if (file_exists($abs)) {
      wp_enqueue_style('ptl-reasons', get_stylesheet_directory_uri() . $rel, [], filemtime($abs));
    }
  }, 99);

  // section-service-feature.css（サービス特徴セクション用）
  wp_enqueue_style('ptl_section_service_feature', get_stylesheet_directory_uri() . '/css/section-service-feature.css', ['child_style'], time());

  // section-service-feature.css（サービス特徴セクション用）
  $ssf_path = get_stylesheet_directory() . '/css/section-service-feature.css';
  if (file_exists($ssf_path)) {
    wp_enqueue_style(
      'ptl_section_service_feature',
      get_stylesheet_directory_uri() . '/css/section-service-feature.css',
      ['child_style'],
      filemtime($ssf_path)
    );
  }


  // commitment-grid.css - 一時無効化
  // wp_enqueue_style('ptl_commitment_grid', get_stylesheet_directory_uri() . '/css/commitment-grid.css', ['child_style'], wp_get_theme()->get('Version'));

  // head-toggle.js
  $head_js_path = get_stylesheet_directory() . '/js/head-toggle.js';
  $head_js_ver  = file_exists($head_js_path) ? date('Ymdgis', filemtime($head_js_path)) : ($style_ver ?: '1.0');
  wp_enqueue_script('child_head_toggle', get_stylesheet_directory_uri() . '/js/head-toggle.js', [], $head_js_ver, true);

  // section-parallax.js（NAV背景パララックス用）: セレクタ存在チェックで早期returnするため全ページ読込でも軽量
  $parallax_js_path = get_stylesheet_directory() . '/js/section-parallax.js';
  if (file_exists($parallax_js_path)) {
    $parallax_js_ver = date('Ymdgis', filemtime($parallax_js_path));
    wp_enqueue_script('child_section_parallax', get_stylesheet_directory_uri() . '/js/section-parallax.js', [], $parallax_js_ver, true);
  }

  // SALON セクション用CSS/JS（REASONSベース再構築）
  $salon_css = get_stylesheet_directory() . '/css/section-salon.css';
  if (file_exists($salon_css)) {
    wp_enqueue_style('ptl_section_salon', get_stylesheet_directory_uri() . '/css/section-salon.css', ['child_style'], filemtime($salon_css));
  }
  $salon_js = get_stylesheet_directory() . '/js/section-salon.js';
  if (file_exists($salon_js)) {
    wp_enqueue_script('ptl_section_salon', get_stylesheet_directory_uri() . '/js/section-salon.js', [], filemtime($salon_js), true);
  }
}, 20);
/* （削除）グローバル背景のDOM/CSS/JS出力とホットフィックス、専用bodyクラスは撤去しました */

// add_theme_support( 'post-thumbnails' );
// JSON-LDやフック追加は、サイト固有要件が固まってから実装します。

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

  $content = '<!-- wp:group {"tagName":"section","className":"ptl-reasons","anchor":"brand-reason"} -->
  <section class="wp-block-group ptl-reasons" id="brand-reason"><div class="wp-block-group__inner-container">
  <!-- wp:heading {"textAlign":"center"} -->
  <h2 class="has-text-align-center">選ばれる理由</h2>
  <!-- /wp:heading -->

  <!-- wp:columns {"className":"ptl-reasons__grid"} -->
  <div class="wp-block-columns ptl-reasons__grid">

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
  <div class="wp-block-buttons"><div class="wp-block-button"><a class="wp-block-button__link ptl-reasons__more" href="' . esc_url($reason_url) . '">MORE</a></div></div>
  <!-- /wp:buttons -->

  </div></section>
  <!-- /wp:group -->';

  register_block_pattern('patolaqshe/reasons-4', [
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
    'default'           => 0.92,
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
      'label'     => 'セクション背景動画（MP4推奨）',
      'section'   => 'ptl_navigation',
      'mime_type' => 'video',
    ]));
  }

  // PC画像
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

  // SP画像
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

  // オーバーレイ濃度（0〜0.8）
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
    'label'       => 'セクション背景のオーバーレイ濃度（0〜0.8）',
    'section'     => 'ptl_navigation',
    'type'        => 'number',
    'input_attrs' => ['min' => 0, 'max' => 0.8, 'step' => 0.05],
  ]);

  // パララックス速度（0〜1、1で追従なし）
  $wp_customize->add_setting('ptl_nav_parallax_speed', [
    'type'              => 'theme_mod',
    'transport'         => 'refresh',
    'sanitize_callback' => function ($v) {
      $f = floatval($v);
      if ($f < 0) $f = 0;
      if ($f > 1) $f = 1;
      return $f;
    },
    'default'           => 0.6,
  ]);
  $wp_customize->add_control('ptl_nav_parallax_speed', [
    'label'       => 'セクション背景のパララックス速度（0〜1、1で追従なし）',
    'section'     => 'ptl_navigation',
    'type'        => 'number',
    'input_attrs' => ['min' => 0, 'max' => 1, 'step' => 0.05],
  ]);
});

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
 * カスタマイザー: フロント共通の縦並び動画背景（最大4本）
 */
/* （削除）グローバル動画背景のカスタマイザー（ptl_global_bg）は撤去しました */

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

  // JS（jQuery依存、フッター）
  $nav_js_path = get_stylesheet_directory() . '/js/navigation.js';
  $nav_js_ver  = file_exists($nav_js_path) ? date('Ymdgis', filemtime($nav_js_path)) : null;
  wp_enqueue_script('ptl-navigation', get_stylesheet_directory_uri() . '/js/navigation.js', ['jquery'], $nav_js_ver, true);
  wp_enqueue_script('ptl-nav-fix', get_stylesheet_directory_uri() . '/js/ptl-nav-fix.js', [], date('YmdHis'), true);
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

  /* 子要素に video / image を持つ .ptl-pageNavHero 用（既存DOMに追従） */
  .ptl-pageNavHero { --ptl-parallax: 0px; }
  .ptl-pageNavHero.ptl-has-video .ptl-pageNavHero__video,
  .ptl-pageNavHero.ptl-has-image .ptl-pageNavHero__image img {
    transform: translateY(var(--ptl-parallax)) scale(1.12);
    transform-origin: center;
    will-change: transform;
  }
}

@media (max-width: 768px) {
  /* ③ SPカード縮小（.ptl-nav-collapsible 配下のみ） */
  .ptl-navigation .ptl-nav-collapsible,
  .ptl-pageNavHero .ptl-nav-collapsible {
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
  .ptl-nav-collapsible .ptl-pageNavHero__btn,
  .ptl-nav-collapsible .ptl-navCard {
    /* 縦パディング40-50%縮小＆タップ最小確保 */
    padding-block: 10px;
    min-height: 44px;
  }

  /* アイコン縮小（35-45%） */
  .ptl-nav-collapsible .ptl-pageNavHero__icon,
  .ptl-nav-collapsible .ptl-navCard__icon {
    width: 26px;
    height: 26px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .ptl-nav-collapsible .ptl-pageNavHero__icon img,
  .ptl-nav-collapsible .ptl-pageNavHero__icon svg,
  .ptl-nav-collapsible .ptl-navCard__icon img,
  .ptl-nav-collapsible .ptl-navCard__icon svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* テキスト可読性（12-14px, 行高1.25-1.35） */
  .ptl-nav-collapsible .ptl-pageNavHero__label,
  .ptl-nav-collapsible .ptl-navCard__label {
    font-size: 13px;
    line-height: 1.3;
  }
}
CSS;

  // JS（インライン）
  $js = <<<JS
(function(){
  var els = document.querySelectorAll('.ptl-navigation, .ptl-pageNavHero');
  if (!els.length) return;

  var isPC = window.matchMedia('(min-width: 769px)');
  var FACTOR = 0.35; // 値を上げるほど移動量が増える
  var ticking = false;

  // 初期化: 各要素に動画/画像の有無でクラスを付与
  els.forEach(function(el){
    var vid = el.querySelector('video, .ptl-pageNavHero__video');
    var img = el.querySelector('.ptl-pageNavHero__image img');
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

  // 星評価
  echo '<tr>';
  echo '<th><label for="rating">星評価</label></th>';
  echo '<td>';
  echo '<select id="rating" name="rating">';
  for ($i = 1; $i <= 5; $i++) {
    $selected = ($rating == $i) ? 'selected' : '';
    echo '<option value="' . $i . '" ' . $selected . '>' . $i . '個 (' . str_repeat('★', $i) . ')</option>';
  }
  echo '</select>';
  echo '</td>';
  echo '</tr>';

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

// お客様の声カスタム投稿タイプを登録
add_action('init', function () {
  register_post_type('uservoice', [
    'label' => 'お客様の声',
    'labels' => [
      'name' => 'お客様の声',
      'singular_name' => 'お客様の声',
      'menu_name' => 'お客様の声',
      'add_new' => '新規追加',
      'add_new_item' => '新しいお客様の声を追加',
      'edit_item' => 'お客様の声を編集',
      'new_item' => '新しいお客様の声',
      'view_item' => 'お客様の声を表示',
      'search_items' => 'お客様の声を検索',
      'not_found' => 'お客様の声が見つかりませんでした',
      'not_found_in_trash' => 'ゴミ箱にお客様の声が見つかりませんでした',
    ],
    'public' => true,
    'show_ui' => true,
    'show_in_menu' => true,
    'show_in_admin_bar' => true,
    'show_in_nav_menus' => false,
    'show_in_rest' => true,
    'has_archive' => false,
    'hierarchical' => false,
    'menu_position' => 5,
    'menu_icon' => 'dashicons-star-filled',
    'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    'capability_type' => 'post',
  ]);
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

  // 星評価
  echo '<tr>';
  echo '<th><label for="rating">星評価</label></th>';
  echo '<td>';
  echo '<select id="rating" name="rating">';
  for ($i = 1; $i <= 5; $i++) {
    $selected = ($rating == $i) ? 'selected' : '';
    echo '<option value="' . $i . '" ' . $selected . '>' . $i . '個 (' . str_repeat('★', $i) . ')</option>';
  }
  echo '</select>';
  echo '</td>';
  echo '</tr>';

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

  // お客様の声 CSS
  $css = get_stylesheet_directory() . '/css/section-uservoice.css';
  if (file_exists($css) && ! wp_style_is('ptl-uservoice', 'enqueued')) {
    wp_enqueue_style('ptl-uservoice', get_stylesheet_directory_uri() . '/css/section-uservoice.css', ['child_style', 'swiper'], filemtime($css));
  }

  // お客様の声 JS（Swiperに依存）
  $js = get_stylesheet_directory() . '/js/uservoice-slider.js';
  if (file_exists($js) && ! wp_script_is('ptl-uservoice', 'enqueued')) {
    wp_enqueue_script('ptl-uservoice', get_stylesheet_directory_uri() . '/js/uservoice-slider.js', ['swiper'], filemtime($js), true);
  }

  // INTRO Section CSS
  $intro_css = get_stylesheet_directory() . '/css/section-intro.css';
  if (file_exists($intro_css)) {
    wp_enqueue_style(
      'ptl_section_intro',
      get_stylesheet_directory_uri() . '/css/section-intro.css',
      ['child_style'],
      filemtime($intro_css)
    );
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
    'panel' => 'patolaqshe_panel',
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

  // CTA Text
  $wp_customize->add_setting('ptl_intro_cta_text', [
    'default' => '詳しく見る',
    'sanitize_callback' => 'sanitize_text_field',
  ]);
  $wp_customize->add_control('ptl_intro_cta_text', [
    'type' => 'text',
    'section' => 'ptl_intro_section',
    'label' => 'ボタンテキスト',
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

  // Overlay Opacity
  $wp_customize->add_setting('ptl_intro_overlay_opacity', [
    'default' => 30,
    'sanitize_callback' => function($value) {
      return max(0, min(100, intval($value)));
    },
  ]);
  $wp_customize->add_control('ptl_intro_overlay_opacity', [
    'type' => 'range',
    'section' => 'ptl_intro_section',
    'label' => 'オーバーレイの透明度（%）',
    'input_attrs' => [
      'min' => 0,
      'max' => 100,
    ],
  ]);

  // Margin Top
  $wp_customize->add_setting('ptl_intro_margin_top', [
    'default' => 80,
    'sanitize_callback' => function($value) {
      return max(0, min(300, intval($value)));
    },
  ]);
  $wp_customize->add_control('ptl_intro_margin_top', [
    'type' => 'number',
    'section' => 'ptl_intro_section',
    'label' => '上部余白（px）',
    'input_attrs' => [
      'min' => 0,
      'max' => 300,
    ],
  ]);

  // Margin Bottom
  $wp_customize->add_setting('ptl_intro_margin_bottom', [
    'default' => 120,
    'sanitize_callback' => function($value) {
      return max(0, min(300, intval($value)));
    },
  ]);
  $wp_customize->add_control('ptl_intro_margin_bottom', [
    'type' => 'number',
    'section' => 'ptl_intro_section',
    'label' => '下部余白（px）',
    'input_attrs' => [
      'min' => 0,
      'max' => 300,
    ],
  ]);
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
