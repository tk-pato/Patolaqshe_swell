<?php
if (! defined('ABSPATH')) exit;

/* 子テーマのfunctions.phpは、親テーマのfunctions.phpより先に読み込まれることに注意してください。 */

/* （削除）グローバル動画背景の強制OFFスイッチと関連機能は撤去しました */

// カスタマイザー設定を読み込み
require_once get_stylesheet_directory() . '/inc/customizer-nav-bg.php';
require_once get_stylesheet_directory() . '/inc/section-bg-helper.php';

// bodyクラスにフラグを追加（ホームとランディングテンプレで有効）


/**
 * 子テーマでのファイルの読み込み
 */
add_action('wp_enqueue_scripts', function () {
  // style.css
  $style_path = get_stylesheet_directory() . '/style.css';
  $style_ver  = file_exists($style_path) ? date('Ymdgis', filemtime($style_path)) : null;
  // 親テーマ main.css のハンドルは 'main_style'（SWELL）
  wp_enqueue_style('child_style', get_stylesheet_directory_uri() . '/style.css', ['main_style'], $style_ver);

  // nav-adjustments.css（SPナビCSS）- キャッシュバスティング追加
  $nav_css_path = get_stylesheet_directory() . '/css/nav-adjustments.css';
  $nav_css_ver = file_exists($nav_css_path) ? date('YmdHis', filemtime($nav_css_path)) : time();
  wp_enqueue_style('patolaqshe-nav-adjust', get_stylesheet_directory_uri() . '/css/nav-adjustments.css', ['child_style'], $nav_css_ver);

  // SP用メニューのCSS
  $sp_menu_css_path = get_stylesheet_directory() . '/css/sp-menu.css';
  $sp_menu_css_ver = file_exists($sp_menu_css_path) ? date('YmdHis', filemtime($sp_menu_css_path)) : time();
  wp_enqueue_style('patolaqshe-sp-menu', get_stylesheet_directory_uri() . '/css/sp-menu.css', ['child_style'], $sp_menu_css_ver);

  // ヘッダー表示/非表示制御用CSS
  $header_css_path = get_stylesheet_directory() . '/css/header-visibility.css';
  $header_css_ver = file_exists($header_css_path) ? date('YmdHis', filemtime($header_css_path)) : time();
  wp_enqueue_style('patolaqshe-header-visibility', get_stylesheet_directory_uri() . '/css/header-visibility.css', ['child_style'], $header_css_ver);

  // head-toggle.js
  $head_js_path = get_stylesheet_directory() . '/js/head-toggle.js';
  $head_js_ver  = file_exists($head_js_path) ? date('Ymdgis', filemtime($head_js_path)) : ($style_ver ?: '1.0');
  wp_enqueue_script('child_head_toggle', get_stylesheet_directory_uri() . '/js/head-toggle.js', [], $head_js_ver, true);

  // section-parallax.js（NAV背景パララックス用）: セレクタ存在チェックで早期returnするため全ページ読込でも軽量
  $parallax_js_path = get_stylesheet_directory() . '/js/section-parallax.js';
  if (file_exists($parallax_js_path)) {
    $parallax_js_ver = date('Ymdgis', filemtime($parallax_js_path));
    wp_enqueue_script('child_section_parallax', get_stylesheet_directory_uri() . '/js/section-parallax.js', [], $parallax_js_ver, true);
    
    // パララックス強制初期化スクリプト（section-parallax.jsの後に読み込む）
    $parallax_init_path = get_stylesheet_directory() . '/js/parallax-initializer.js';
    if (file_exists($parallax_init_path)) {
      $parallax_init_ver = date('Ymdgis', filemtime($parallax_init_path));
      wp_enqueue_script('child_parallax_initializer', get_stylesheet_directory_uri() . '/js/parallax-initializer.js', ['child_section_parallax'], $parallax_init_ver, true);
    }
  }

  // nav-toggle.js（SPナビJS）
  $nav_js_path = get_stylesheet_directory() . '/js/nav-toggle.js';
  $nav_js_ver = file_exists($nav_js_path) ? date('YmdHis', filemtime($nav_js_path)) : time();
  wp_enqueue_script('patolaqshe-nav-toggle', get_stylesheet_directory_uri() . '/js/nav-toggle.js', [], $nav_js_ver, true);
}, 20);
