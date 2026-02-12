<?php
if (! defined('ABSPATH')) exit;

// ========== デバッグ: home.php 読み込み確認 ==========

if (is_front_page()) {
    // フロントページの場合は front-page.php を include

    include get_stylesheet_directory() . '/front-page.php';

    return;
}

// フロントページでない場合は親テーマの home.php を使用

include get_template_directory() . '/home.php';

