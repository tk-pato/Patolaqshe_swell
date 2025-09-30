<?php
/**
 * INTRO Section Template
 * 
 * Left image, right text layout with customizer integration
 * Supports both image and video backgrounds
 * 
 * @package SWELL_CHILD
 * @since 1.0.0
 */

// カスタマイザー設定値を取得
$use_video = get_theme_mod('ptl_intro_use_video', false);
$bg_image = get_theme_mod('ptl_intro_bg_image', '');
$bg_video = get_theme_mod('ptl_intro_bg_video', '');

// デフォルト背景画像を設定（カスタマイザーで未設定の場合）
if (empty($bg_image) && !$use_video) {
    $bg_image = get_stylesheet_directory_uri() . '/img/intro-default-bg.jpg';
}
$brand_text = get_theme_mod('ptl_intro_brand_text', 'Patolaqshe');
$subtitle = get_theme_mod('ptl_intro_subtitle', 'BEAUTY & WELLNESS');
$title = get_theme_mod('ptl_intro_title', 'あなたの美しさを<br>最大限に引き出す');
$description = get_theme_mod('ptl_intro_description', '私たちは一人ひとりのお客様に寄り添い、個別のニーズに合わせた最高の美容体験をご提供いたします。最新の技術と豊富な経験により、あなたの理想を現実に変えるお手伝いをさせていただきます。');
$cta_text = get_theme_mod('ptl_intro_cta_text', '詳しく見る');
$cta_url = get_theme_mod('ptl_intro_cta_url', '#');
$overlay_opacity = get_theme_mod('ptl_intro_overlay_opacity', 30) / 100;
$margin_top = get_theme_mod('ptl_intro_margin_top', 80);
$margin_bottom = get_theme_mod('ptl_intro_margin_bottom', 120);

// セクション表示制御
$show_section = get_theme_mod('ptl_intro_show', true);
if (!$show_section) {
    return;
}

// 背景メディアの決定
$has_media = false;
$media_style = '';
if ($use_video && !empty($bg_video)) {
    $has_media = true;
} elseif (!empty($bg_image)) {
    $has_media = true;
    $media_style = sprintf('background-image: url(%s);', esc_url($bg_image));
}

// セクションスタイル
$section_style = sprintf(
    'margin-top: %dpx; margin-bottom: %dpx;',
    absint($margin_top),
    absint($margin_bottom)
);

// オーバーレイスタイル
$overlay_style = sprintf('background: rgba(0, 0, 0, %.2f);', $overlay_opacity);
?>

<section id="intro" class="ptl-intro-section" style="<?php echo esc_attr($section_style); ?>">
    
    <!-- Left: Media Area -->
    <div class="ptl-intro__media" <?php if ($media_style) echo 'style="' . esc_attr($media_style) . '"'; ?>>
        <?php if ($use_video && !empty($bg_video)) : ?>
            <video class="ptl-intro__video" autoplay muted loop playsinline>
                <source src="<?php echo esc_url($bg_video); ?>" type="video/mp4">
            </video>
        <?php endif; ?>
        
        <?php if ($has_media) : ?>
            <div class="ptl-intro__overlay" style="<?php echo esc_attr($overlay_style); ?>"></div>
        <?php endif; ?>
    </div>
    
    <!-- Right: Content Area -->
    <div class="ptl-intro__content">
        <div class="ptl-intro__content-inner">
            
            <?php if (!empty($brand_text)) : ?>
                <div class="ptl-intro__brand">
                    <div class="ptl-intro__brand-text"><?php echo esc_html($brand_text); ?></div>
                    <div class="ptl-intro__brand-ornament"></div>
                </div>
            <?php endif; ?>
            
            <?php if (!empty($subtitle)) : ?>
                <div class="ptl-intro__subtitle"><?php echo esc_html($subtitle); ?></div>
            <?php endif; ?>
            
            <?php if (!empty($title)) : ?>
                <h2 class="ptl-intro__title"><?php echo wp_kses_post($title); ?></h2>
            <?php endif; ?>
            
            <?php if (!empty($description)) : ?>
                <div class="ptl-intro__desc">
                    <?php echo wp_kses_post(wpautop($description)); ?>
                </div>
            <?php endif; ?>
            
            <?php if (!empty($cta_text) && !empty($cta_url)) : ?>
                <a href="<?php echo esc_url($cta_url); ?>" class="ptl-intro__cta-button">
                    <?php echo esc_html($cta_text); ?>
                </a>
            <?php endif; ?>
            
        </div>
    </div>
    
</section>