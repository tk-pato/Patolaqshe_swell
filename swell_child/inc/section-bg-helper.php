<?php
if (! defined('ABSPATH')) exit;

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
