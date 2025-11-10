<?php
if (! defined('ABSPATH')) exit;

// ========== デバッグ: home.php 読み込み確認 ==========
error_log('========================================');
error_log('🏠 home.php が読み込まれました');
error_log('🕐 タイムスタンプ: ' . date('Y-m-d H:i:s'));
error_log('📍 リクエストURI: ' . $_SERVER['REQUEST_URI']);
error_log('🎯 is_front_page(): ' . (is_front_page() ? 'TRUE ✅' : 'FALSE ❌'));
error_log('🎯 is_home(): ' . (is_home() ? 'TRUE' : 'FALSE'));
error_log('========================================');

if (is_front_page()) {
    // フロントページの場合は front-page.php を include
    error_log('✅ is_front_page() = TRUE: front-page.php を include します');
    error_log('📂 include パス: ' . get_stylesheet_directory() . '/front-page.php');
    
    include get_stylesheet_directory() . '/front-page.php';
    
    error_log('✅ front-page.php の include 完了');
    return;
}

// フロントページでない場合は親テーマの home.php を使用
error_log('❌ is_front_page() = FALSE: 親テーマの home.php を使用します');
error_log('📂 include パス: ' . get_template_directory() . '/home.php');

include get_template_directory() . '/home.php';

error_log('✅ 親テーマの home.php の include 完了');
?>
