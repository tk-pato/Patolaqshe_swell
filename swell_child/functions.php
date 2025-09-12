<?php
if (! defined('ABSPATH')) exit;

/* 子テーマのfunctions.phpは、親テーマのfunctions.phpより先に読み込まれることに注意してください。 */

/* （削除）グローバル動画背景の強制OFFスイッチと関連機能は撤去しました */

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

  // reasons-styles.css（コミットメントセクション用）
  wp_enqueue_style('ptl_reasons_styles', get_stylesheet_directory_uri() . '/css/reasons-styles.css', ['child_style'], time());

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
  <div class="wp-block-buttons"><div class="wp-block-button"><a class="wp-block-button__link ptl-reasons__more" href="' . esc_url($reason_url) . '">More</a></div></div>
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
    var toggle = document.querySelector('.ptl-nav-toggle');
    var menu = document.getElementById('ptl-nav-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', function() {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      menu.classList.toggle('is-open');
      
      // 開いた直後にmax-heightを再計算
      if (!expanded) {
        setTimeout(recalc, 50);
      }
    });
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
