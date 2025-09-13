<?php
if (!defined('ABSPATH')) exit;

$img_base = get_stylesheet_directory_uri() . '/img/';
$cards = [
    ['img' => $img_base . 'hair.jpg',  'title' => 'HAIR STYLING', 'desc' => 'Beautiful, healthy hair with professional care and attention to details.'],
    ['img' => $img_base . 'makup.jpg', 'title' => 'MAKE UP',       'desc' => 'Professional make-up to bring out your best look for any occasion.'],
    ['img' => $img_base . 'nail.jpg',  'title' => 'NAIL ART',      'desc' => 'Trendy and elegant nail designs with careful treatment.'],
    ['img' => $img_base . 'spa.jpg',   'title' => 'SPA',           'desc' => 'Relaxing spa time to refresh your body and mind.'],
];
// REASONS（COMMITMENT）のMOREリンク先はフィルターで差し替え可能に（既定: /reason/）
$more_url = apply_filters('ptl_reasons_more_url', home_url('/reason/'));
?>

<section id="reasons" class="ptl-section ptl-reasons">
    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">COMMITMENT</h2>
        <div class="ptl-section__subtitle">選ばれる理由</div>
        <div class="ptl-section__subtitleLine" aria-hidden="true"></div>
        <div class="ptl-pageNavHero__grid">
            <?php foreach ($cards as $c): ?>
                <a class="ptl-pageNavHero__btn" href="#">
                    <span class="ptl-pageNavHero__icon"><img src="<?php echo esc_url($c['img']); ?>" alt="" loading="lazy" decoding="async" style="width:80px;height:80px;object-fit:contain;" /></span>
                    <span class="ptl-pageNavHero__label"><?php echo esc_html($c['title']); ?></span>
                </a>
            <?php endforeach; ?>
        </div>
        <!-- NEWSと共通のオーナメントMOREボタンを使用 -->
        <div class="ptl-news__more">
            <a class="ptl-news__moreBtn" href="<?php echo esc_url($more_url); ?>">
                <span class="ptl-news__moreLabel">MORE</span>
                <span class="ptl-news__moreArrow" aria-hidden="true">→</span>
            </a>
        </div>
    </div>
</section>