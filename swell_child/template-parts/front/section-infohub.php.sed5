<?php
/**
 * INFO HUB セクション
 * 3つのバナーカード（BRIDAL / INFORMATION / FAQ）を表示
 */

// カスタマイザー設定取得
$show_section = get_theme_mod('ptl_infohub_show', true);
if (!$show_section) {
    return;
}

$main_title = get_theme_mod('ptl_infohub_title', 'INFO HUB');
$use_video = get_theme_mod('ptl_infohub_use_video', false);
$bg_video = get_theme_mod('ptl_infohub_bg_video', '');
$bg_pc = get_theme_mod('ptl_infohub_bg_pc', '');
$bg_sp = get_theme_mod('ptl_infohub_bg_sp', '');
$overlay = get_theme_mod('ptl_infohub_overlay', 0.25);
$parallax_speed = get_theme_mod('ptl_infohub_parallax_speed', 0.6);

// 動画URLの解決
$video_url = '';
if ($use_video && !empty($bg_video)) {
    if (is_numeric($bg_video)) {
        $video_url = wp_get_attachment_url((int) $bg_video);
    } else {
        $video_url = esc_url($bg_video);
    }
}

// カード情報
$card1_img = get_theme_mod('ptl_infohub_card1_image', '');
$card2_img = get_theme_mod('ptl_infohub_card2_image', '');
$card3_img = get_theme_mod('ptl_infohub_card3_image', '');

// 画像URLの解決（メディアIDまたはURL）
$resolve_image = function($value, $default) {
    if (empty($value)) {
        return $default;
    }
    if (is_numeric($value)) {
        $url = wp_get_attachment_url((int) $value);
        return $url ?: $default;
    }
    return esc_url($value);
};

$default_img = get_stylesheet_directory_uri() . '/img/makup.jpg';
$cards = [
    [
        'title' => 'BRIDAL',
        'desc' => '結婚式を最高の思い出にするための特別なプランをご用意しています。',
        'url' => home_url('/bridal/'),
        'image' => $resolve_image($card1_img, $default_img),
    ],
    [
        'title' => 'INFORMATION',
        'desc' => '最新のキャンペーン情報やお得なプランをいち早くお届けします。',
        'url' => home_url('/info/'),
        'image' => $resolve_image($card2_img, $default_img),
    ],
    [
        'title' => 'FAQ',
        'desc' => 'よくあるご質問にお答えします。お気軽にお問い合わせください。',
        'url' => home_url('/faq/'),
        'image' => $resolve_image($card3_img, $default_img),
    ],
];
?>

<section 
    id="section-infohub" 
    class="ptl-infohub has-bg"
    data-parallax="bg"
    data-parallax-speed="0.92"
    data-parallax-clamp="0.18"
    data-parallax-distance="240"
    data-parallax-scale="1.55">

    <!-- パララックス背景 -->
    <div class="ptl-infohub__bg">
        <?php if ($use_video && !empty($video_url)) : ?>
            <video class="ptl-infohub__video" autoplay muted loop playsinline>
                <source src="<?php echo esc_url($video_url); ?>" type="video/mp4">
            </video>
        <?php elseif (!empty($bg_pc) || !empty($bg_sp)) : ?>
            <picture class="ptl-infohub__image">
                <?php if (!empty($bg_sp)) : ?>
                    <source media="(max-width: 767px)" srcset="<?php echo esc_url($bg_sp); ?>">
                <?php endif; ?>
                <img src="<?php echo esc_url($bg_pc ?: $bg_sp); ?>" alt="<?php echo esc_attr($main_title); ?>">
            </picture>
        <?php endif; ?>
        <div class="ptl-infohub__overlay" style="--overlay: <?php echo esc_attr($overlay); ?>"></div>
    </div>

    <!-- コンテンツ -->
    <div class="ptl-section__inner">
        <!-- ヘッダー -->
        <div class="ptl-infohub__header">
            <?php if (!empty($main_title)) : ?>
                <h2 class="ptl-section__title"><?php echo esc_html($main_title); ?></h2>
            <?php endif; ?>
        </div>

        <!-- カードグリッド -->
        <div class="ptl-infohub__grid">
            <?php foreach ($cards as $index => $card) : ?>
                <a href="<?php echo esc_url($card['url']); ?>" class="ptl-infohub__card">
                    <div class="ptl-infohub__media">
                        <img src="<?php echo esc_url($card['image']); ?>" alt="<?php echo esc_attr($card['title']); ?>">
                    </div>
                    <div class="ptl-infohub__content">
                        <h3 class="ptl-infohub__title">
                            <?php echo esc_html($card['title']); ?>
                        </h3>
                        <p class="ptl-infohub__desc"><?php echo esc_html($card['desc']); ?></p>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
    </div>

</section>
