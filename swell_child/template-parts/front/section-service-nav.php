<?php
if (! defined('ABSPATH')) exit;

// 設定：背景動画と各サービスボタン（必要に応じて管理画面オプション化可）
$video_rel_path = '/video/service-nav.mp4'; // 子テーマ直下に video/service-nav.mp4 を置く想定
$video_abs = get_theme_file_path($video_rel_path);
$bg_video_mp4 = (file_exists($video_abs)) ? get_theme_file_uri($video_rel_path) : '';
$items = apply_filters('ptl_service_nav_items', [
    ['icon' => 'fa-scissors', 'label' => 'Hair Cut',     'url' => home_url('/service/hair-cut/')],
    ['icon' => 'fa-wind',     'label' => 'Blow',         'url' => home_url('/service/blow/')],
    ['icon' => 'fa-palette',  'label' => 'Color',        'url' => home_url('/service/color/')],
    ['icon' => 'fa-water',    'label' => 'Perm',         'url' => home_url('/service/perm/')],
    ['icon' => 'fa-seedling', 'label' => 'Spa',          'url' => home_url('/service/spa/')],
    ['icon' => 'fa-camera',   'label' => 'Photography',  'url' => home_url('/service/photography/')],
    ['icon' => 'fa-pencil',   'label' => 'Make Up',      'url' => home_url('/service/makeup/')],
    ['icon' => 'fa-hand-paper', 'label' => 'Nail',         'url' => home_url('/service/nail/')],
]);
?>
<section id="service-nav" class="ptl-section ptl-serviceNav">
    <div class="ptl-serviceNav__bg" aria-hidden="true">
        <?php if ($bg_video_mp4): ?>
            <video class="ptl-serviceNav__video" src="<?php echo esc_url($bg_video_mp4); ?>" autoplay muted loop playsinline></video>
            <div class="ptl-serviceNav__overlay"></div>
        <?php endif; ?>
    </div>
    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">OUR PRICES</h2>
        <div class="ptl-serviceNav__grid">
            <?php foreach ($items as $it): ?>
                <a class="ptl-serviceNav__card" href="<?php echo esc_url($it['url']); ?>">
                    <span class="ptl-serviceNav__icon"><i class="fa <?php echo esc_attr($it['icon']); ?>" aria-hidden="true"></i></span>
                    <span class="ptl-serviceNav__label"><?php echo esc_html($it['label']); ?></span>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>