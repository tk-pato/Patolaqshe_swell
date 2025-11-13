<?php
if (! defined('ABSPATH')) exit;

// ========== デバッグ: page.php 読み込み確認 ==========
error_log('========================================');
error_log('📄 page.php が読み込まれました');
error_log('🕐 タイムスタンプ: ' . date('Y-m-d H:i:s'));
error_log('📍 リクエストURI: ' . $_SERVER['REQUEST_URI']);
error_log('🔍 get_queried_object_id(): ' . get_queried_object_id());
error_log('🏠 get_option("page_on_front"): ' . get_option('page_on_front'));
error_log('🎯 is_front_page(): ' . (is_front_page() ? 'TRUE ✅' : 'FALSE ❌'));
error_log('🎯 is_home(): ' . (is_home() ? 'TRUE' : 'FALSE'));
error_log('🎯 is_page(): ' . (is_page() ? 'TRUE' : 'FALSE'));
if (is_page()) {
    error_log('🎯 現在のページID: ' . get_the_ID());
}
error_log('========================================');

if (is_front_page()) {
    // フロントページは専用テンプレートfront-page.phpで処理
    error_log('✅ is_front_page() = TRUE: front-page.php を include します');
    error_log('📂 include パス: ' . get_stylesheet_directory() . '/front-page.php');
    error_log('📁 ファイル存在確認: ' . (file_exists(get_stylesheet_directory() . '/front-page.php') ? '存在する ✅' : '存在しない ❌'));

    include get_stylesheet_directory() . '/front-page.php';

    error_log('✅ front-page.php の include 完了');
    return;
}

// 通常の固定ページは親テーマに任せる
error_log('❌ is_front_page() = FALSE: 親テーマの page.php を使用します');
error_log('📂 include パス: ' . get_template_directory() . '/page.php');
error_log('📁 ファイル存在確認: ' . (file_exists(get_template_directory() . '/page.php') ? '存在する ✅' : '存在しない ❌'));

include get_template_directory() . '/page.php';

error_log('✅ 親テーマの page.php の include 完了');
