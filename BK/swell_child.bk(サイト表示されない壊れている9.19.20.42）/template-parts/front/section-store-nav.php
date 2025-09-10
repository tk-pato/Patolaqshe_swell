<?php
if (! defined('ABSPATH')) exit;

$stores = apply_filters('ptl_store_nav_items', [
    // anchor を指定すると同一ページ内の #anchor へスクロール（未指定時は url を使用）
    ['label' => 'Daikanyama', 'url' => home_url('/salon/daikanyama/'), 'address' => '東京都渋谷区〇〇 …', 'tel' => '03-xxxx-xxxx', 'anchor' => 'store-daikanyama'],
    ['label' => 'Ginza',      'url' => home_url('/salon/ginza/'),      'address' => '東京都中央区〇〇 …', 'tel' => '03-xxxx-xxxx', 'anchor' => 'store-ginza'],
]);
?>
<section id="store-nav" class="ptl-section ptl-storeNav">
    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">SALON</h2>
        <div class="ptl-storeNav__grid">
            <?php foreach ($stores as $s): $href = (!empty($s['anchor'])) ? '#' . preg_replace('/[^a-z0-9\-_.]/i', '', $s['anchor']) : ($s['url'] ?? '#'); ?>
                <a class="ptl-storeNav__card" href="<?php echo esc_url($href); ?>">
                    <span class="ptl-storeNav__label"><?php echo esc_html($s['label']); ?></span>
                    <span class="ptl-storeNav__meta"><?php echo esc_html($s['address']); ?> / <?php echo esc_html($s['tel']); ?></span>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>