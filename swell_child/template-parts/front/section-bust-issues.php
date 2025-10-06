<?php
if (! defined('ABSPATH')) exit;

// BUST-ISSUES専用背景（Customizer）を取得
$bg = ptl_get_bust_issues_background();
$video_url = isset($bg['video_url']) ? $bg['video_url'] : '';
$bg_pc     = $bg['bg_pc'];
$bg_sp     = $bg['bg_sp'];
$overlay   = $bg['overlay_opacity'];
$p_speed   = $bg['parallax_speed'];

// 8つの悩み（バックアップの$itemsを移植）
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

// チェックアイコン（img/check.png が無ければSVG）
if (!function_exists('ptl_check_svg_fallback')) {
    function ptl_check_svg_fallback()
    {
        return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
}
$check_rel = 'img/check.png';
$check_path = trailingslashit(get_stylesheet_directory()) . $check_rel;
$check_uri  = trailingslashit(get_stylesheet_directory_uri()) . $check_rel;
$has_check_img = file_exists($check_path);

$has_bg = !empty($video_url) || !empty($bg_pc) || !empty($bg_sp);
?>

<section id="bust-issues" class="ptl-bustIssues is-translucent<?php echo $has_bg ? ' has-bg' : ''; ?>" data-parallax="bg" data-parallax-target=".ptl-bustIssues__bg" data-parallax-speed="0.92" data-parallax-clamp="0.18" data-parallax-distance="240" data-parallax-scale="1.55">
    <?php if ($has_bg): ?>
        <div class="ptl-bustIssues__bg" aria-hidden="true">
            <?php if ($video_url): ?>
                <video class="ptl-bustIssues__video" src="<?php echo esc_url($video_url); ?>" autoplay muted loop playsinline></video>
            <?php else: ?>
                <picture class="ptl-bustIssues__image">
                    <?php if (! empty($bg_sp)): ?>
                        <source media="(max-width: 767px)" srcset="<?php echo esc_url($bg_sp); ?>">
                    <?php endif; ?>
                    <img src="<?php echo esc_url($bg_pc ?: $bg_sp); ?>" alt="" decoding="async">
                </picture>
            <?php endif; ?>
            <div class="ptl-bustIssues__overlay" style="--overlay: <?php echo esc_attr($overlay); ?>"></div>
        </div>
    <?php endif; ?>

    <div class="ptl-section__inner">
        <h2 class="ptl-section__title is-onImage">BUST-ISSUES</h2>

        <!-- 新：8つの悩みチェックリスト -->
        <div class="ptl-bustIssues__card">
            <ul class="ptl-bustIssues__list" role="list">
                <?php foreach ($items as $text): if (!is_string($text) || $text === '') continue; ?>
                    <li class="ptl-bustIssues__item">
                        <span class="ptl-bustIssues__icon" aria-hidden="true">
                            <?php echo $has_check_img ? '<img src="' . esc_url($check_uri) . '" alt="" loading="lazy" decoding="async">' : ptl_check_svg_fallback(); ?>
                        </span>
                        <span class="ptl-bustIssues__text"><?php echo esc_html($text); ?></span>
                    </li>
                <?php endforeach; ?>
            </ul>
            <!-- MORE: NEWSセクションと同意匠 -->
            <div class="ptl-news__more">
              <a class="ptl-news__moreBtn" href="<?php echo esc_url( home_url( '/reason/' ) ); ?>">
                <span class="ptl-news__moreLabel">MORE</span>
                <span class="ptl-news__moreArrow" aria-hidden="true">→</span>
              </a>
            </div>
        </div>
    </div>
</section>