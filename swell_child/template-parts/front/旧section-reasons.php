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

<section id="reasons" class="ptl-section ptl-reasons is-navstyle">
    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">COMMITMENT</h2>
        <div class="ptl-section__subtitle">選ばれる理由</div>
        <div class="ptl-section__subtitleLine" aria-hidden="true"></div>
            <?php
            // NAVボタン構造（アイコン + ラベル）をそのまま流用。内容は後で差替OK。
            if (!function_exists('ptl_nav_placeholder_svg')) {
                function ptl_nav_placeholder_svg($label)
                {
                    $ch = strtoupper(substr(trim((string)$label), 0, 1));
                    if (!preg_match('/[A-Z]/', $ch)) $ch = 'A';
                    $ch = esc_html($ch);
                    ob_start(); ?>
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <circle cx="50" cy="50" r="46" fill="#111" />
                        <text x="50" y="57" text-anchor="middle" font-family="'Georgia', 'Times New Roman', serif" font-size="56" fill="#fff" letter-spacing="1"><?php echo $ch; ?></text>
                    </svg>
            <?php return ob_get_clean();
                }
            }

            $default_items = [
                ['label' => 'COMMITMENT', 'slug' => 'commitment', 'url' => home_url('/reason/')],
                ['label' => 'TREATMENT',  'slug' => 'treatment',  'url' => home_url('/treatment/')],
                ['label' => 'COLLECTION', 'slug' => 'collection', 'url' => home_url('/collection/')],
                ['label' => 'SALON',      'slug' => 'salon',      'url' => home_url('/salon/')],
            ];
            $items = apply_filters('ptl_reasons_navstyle_items', $default_items);

            $icon_dir_rel  = '/img/nav';
            $icon_dir_abs  = trailingslashit(get_stylesheet_directory() . $icon_dir_rel);
            $icon_dir_uri  = trailingslashit(get_stylesheet_directory_uri() . $icon_dir_rel);
            ?>
        <div class="ptl-pageNavHero ptl-pageNavHero--reasons">
        <div class="ptl-section__inner">
        <div class="ptl-pageNavHero__grid">
                <?php foreach ($items as $it): if (empty($it['label'])) continue;
                    $href = $it['url'] ?? $more_url;
                    $label = (string) $it['label'];
                    $slug  = !empty($it['slug']) ? (string) $it['slug'] : strtolower(preg_replace('/[^a-z0-9\-]+/i', '-', $label));
                    $icon_html = '';
                    if ($slug) {
                        $png = $icon_dir_abs . $slug . '.png';
                        if (file_exists($png)) {
                            $icon_html = '<img src="' . esc_url($icon_dir_uri . $slug . '.png') . '" alt="" loading="lazy" decoding="async">';
                        }
                    }
                    if (!$icon_html) { $icon_html = ptl_nav_placeholder_svg($label); }
                ?>
                    <a class="ptl-pageNavHero__btn" href="<?php echo esc_url($href); ?>">
                        <span class="ptl-pageNavHero__icon"><?php echo $icon_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
                        <span class="ptl-pageNavHero__label"><?php echo esc_html($label); ?></span>
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
    </div>
    </div>
</section>