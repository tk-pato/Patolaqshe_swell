<?php
if (! defined('ABSPATH')) exit;

// 「最新の投稿」をホームにしている場合でも子テーマのフロント用出力を使う
// 同一子テーマ内の front-page.php を優先、なければ親の index.php
$child_front = get_stylesheet_directory() . '/front-page.php';
if (file_exists($child_front)) {
    include $child_front;
} else {
    include get_template_directory() . '/index.php';
}
