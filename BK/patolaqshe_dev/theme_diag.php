<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

define('BASE', __DIR__ . '/wp-load.php');
if (!file_exists(BASE)) {
    echo "NG: wp-load.php not found\n";
    exit;
}
require BASE;

echo "ABSPATH=" . ABSPATH . "\n";
echo "TEMPLATE_DIR=" . get_template_directory() . "\n";    // parent
echo "STYLESHEET_DIR=" . get_stylesheet_directory() . "\n"; // child
echo "TEMPLATE=" . get_template() . "\n";
echo "STYLESHEET=" . get_stylesheet() . "\n";

// Check child files existence
$child = get_stylesheet_directory();
$targets = [
    "$child/header.php",
    "$child/parts/header/header_contents.php",
    "$child/parts/header/head_bar.php",
    "$child/parts/header/sp_head_nav.php",
];
foreach ($targets as $t) {
    echo (file_exists($t) ? "EXISTS: " : "MISSING: ") . $t . "\n";
}

// Try resolve which header is used
$resolved = locate_template(['header.php'], false, false);
echo "LOCATE_TEMPLATE(header.php)=" . $resolved . "\n";

// Try include child header_contents directly to detect fatals
$hc = "$child/parts/header/header_contents.php";
echo "INCLUDE_TEST(header_contents.php)=";
if (file_exists($hc)) {
    try {
        include $hc;
        echo "OK\n";
    } catch (Throwable $e) {
        echo "FATAL: " . $e->getMessage() . "\n";
    }
} else {
    echo "NOFILE\n";
}
