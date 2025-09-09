<?php
if (! defined('ABSPATH')) exit;

// カスタマイザーの設定を取得
$video_mod = get_theme_mod('ptl_nav_video');
$bg_pc     = get_theme_mod('ptl_nav_bg_pc', get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg');
$bg_sp     = get_theme_mod('ptl_nav_bg_sp', get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg');
$overlay   = floatval(get_theme_mod('ptl_nav_overlay', 0.25));
if ($overlay < 0) $overlay = 0;
if ($overlay > 0.8) $overlay = 0.8;

// パララックス速度を取得 (0.95はカスタマイザーの値に合わせる)
$p_speed   = floatval(get_theme_mod('ptl_nav_parallax_speed', 0.95));
if ($p_speed < 0) $p_speed = 0;
if ($p_speed > 1) $p_speed = 1;

// 動画URL解決（添付ID/URLどちらも対応）
$video_url = '';
if (! empty($video_mod)) {
    if (is_numeric($video_mod)) {
        $u = wp_get_attachment_url((int) $video_mod);
        if ($u) $video_url = $u;
    } else {
        $video_url = esc_url_raw($video_mod);
    }
}

// 8ボタン（リンクは後から差し替え想定。フィルターで上書き可）
$default_items = [
    ['label' => 'COMMITMENT', 'slug' => 'commitment', 'url' => home_url('/reason/')],
    ['label' => 'TREATMENT',  'slug' => 'treatment',  'url' => home_url('/treatment/')],
    ['label' => 'COLLECTION', 'slug' => 'collection', 'url' => home_url('/collection/')],
    ['label' => 'SALON',      'slug' => 'salon',      'url' => home_url('/salon/')],
    ['label' => 'BRIDAL',     'slug' => 'bridal',     'url' => home_url('/bridal/')],
    ['label' => 'INFO',       'slug' => 'info',       'url' => home_url('/info/')],
    // COLUM → BLOG に名称変更
    ['label' => 'BLOG',       'slug' => 'blog',       'url' => (function(){ $pid = (int) get_option('page_for_posts'); return $pid ? get_permalink($pid) : home_url('/blog/'); })()],
    ['label' => 'CONTACT',    'slug' => 'contact',    'url' => home_url('/contact/')],
];
$items = apply_filters('ptl_page_nav_items', $default_items);
$has_bg = !empty($video_url) || !empty($bg_pc) || !empty($bg_sp);

if (!function_exists('ptl_nav_placeholder_svg')) {
        function ptl_nav_placeholder_svg($label) {
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
?>

<!-- パララックス効果のための属性を追加 -->
<section id="page-navigation" class="ptl-pageNavHero is-translucent<?php echo $has_bg ? ' has-bg' : ''; ?>" data-parallax="bg" data-parallax-target=".ptl-pageNavHero__bg" data-parallax-speed="<?php echo esc_attr($p_speed); ?>" data-parallax-clamp="0.18" data-parallax-distance="240" data-parallax-scale="1.55">
    <?php if ($has_bg): ?>
        <div class="ptl-pageNavHero__bg" aria-hidden="true">
            <?php if ($video_url): ?>
                <video class="ptl-pageNavHero__video" src="<?php echo esc_url($video_url); ?>" autoplay muted loop playsinline></video>
            <?php else: ?>
                <picture class="ptl-pageNavHero__image">
                    <?php if (! empty($bg_sp)): ?>
                        <source media="(max-width: 767px)" srcset="<?php echo esc_url($bg_sp); ?>">
                    <?php endif; ?>
                    <img src="<?php echo esc_url($bg_pc ?: $bg_sp); ?>" alt="" loading="lazy" decoding="async">
                </picture>
            <?php endif; ?>
            <div class="ptl-pageNavHero__overlay" style="--overlay: <?php echo esc_attr($overlay); ?>"></div>
        </div>
    <?php endif; ?>

    <div class="ptl-section__inner">
        <h2 class="ptl-section__title is-onImage">NAVIGATION</h2>

        <!-- SPの場合のみ表示するハンバーガーUI -->
        <div class="ptl-nav-toggle-wrap">
            <button id="ptlNavHamburger" class="ptl-nav-hamburger" aria-expanded="false" aria-controls="ptlNavMenu">
                <span class="ptl-nav-hamburger__icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <span class="sr-only">メニュー</span>
            </button>
            <span id="ptlNavMenuText" class="ptl-nav-menu-text">menu</span>
        </div>

        <!-- メニュー本体（SP時は非表示→ハンバーガークリックで表示） -->
        <div id="ptlNavMenu" class="ptl-pageNavHero__grid-wrap">
            <div class="ptl-pageNavHero__grid">
                <?php
                // 子テーマ内のアイコン格納場所（PNG想定）
                $icon_dir_rel = '/img/nav';
                $icon_dir_abs = trailingslashit(get_stylesheet_directory() . $icon_dir_rel);
                $icon_dir_uri = trailingslashit(get_stylesheet_directory_uri() . $icon_dir_rel);

                foreach ($items as $it): if (empty($it['label'])) continue;
                    $href = $it['url'] ?? '#';
                    $label = (string) $it['label'];
                    $slug  = !empty($it['slug']) ? (string) $it['slug'] : strtolower(preg_replace('/[^a-z0-9\-]+/i', '-', $label));
                    $icon_html = $it['icon_html'] ?? '';
                    if (!$icon_html && $slug) {
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
        </div>
    </div>
</section>
