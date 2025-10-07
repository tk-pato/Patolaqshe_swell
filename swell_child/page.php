<?php
if (! defined('ABSPATH')) exit;

if (is_front_page()) {
    // フロントページは専用テンプレートfront-page.phpで処理
    include get_stylesheet_directory() . '/front-page.php';
    return;
}

// 通常の固定ページは親テーマに任せる
include get_template_directory() . '/page.php';
