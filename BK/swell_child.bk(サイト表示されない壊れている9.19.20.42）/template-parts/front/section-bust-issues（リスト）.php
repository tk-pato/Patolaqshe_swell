<?php
if (! defined('ABSPATH')) exit;

// 画像ディレクトリのパス/URIを定義（子テーマ内）
$img_dir = trailingslashit(get_stylesheet_directory()) . 'img';
$img_uri = trailingslashit(get_stylesheet_directory_uri()) . 'img';

// チェックアイコン: 子テーマ img/check.png があれば使用、無ければSVGで代替
$check_rel = 'check.png';
$check_path = trailingslashit($img_dir) . $check_rel;
$check_uri  = file_exists($check_path) ? (trailingslashit($img_uri) . $check_rel) : '';

function ptl_check_svg_fallback()
{
    return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" height="24"><circle cx="12" cy="12" r="11" fill="#E9A7BE"/><path d="M7 12.5l3 3 7-7" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

$items = [
    'バストが小さい',
    '左右で大きさが違う',
    'ハリや弾力不足',
    '乳輪の黒ずみ',
    '形のバランスが悪い',
    'バストが離れている',
    '谷間を作りたい',
    '加齢や授乳による下垂など',
];
?>

<section id="bust-issues" class="ptl-section ptl-bustIssues is-translucent">
    <div class="ptl-section__inner">
        <div class="ptl-bustIssues__head">
            <!-- タイトル・サブタイトル削除済み -->
        </div>
        // ここが8つのリスト部分
        <div class="ptl-bustIssues__card">
            <ul class="ptl-bustIssues__list">
                <?php foreach ($items as $text): ?>
                    <li class="ptl-bustIssues__item">
                        <span class="ptl-bustIssues__check" aria-hidden="true">
                            <?php if ($check_uri): ?>
                                <img src="<?php echo esc_url($check_uri); ?>" alt="" loading="lazy" decoding="async">
                            <?php else: echo ptl_check_svg_fallback(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
                            ?>
                            <?php endif; ?>
                        </span>
                        <span class="ptl-bustIssues__text"><?php echo esc_html($text); ?></span>
                    </li>
                <?php endforeach; ?>
            </ul>
        // ここまで
        </div>
    </div>
</section>