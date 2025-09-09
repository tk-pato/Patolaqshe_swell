<?php
if (! defined('ABSPATH')) exit;

// NAVと同じマークアップ（グリッド/ボタン）を使用して幅とサイズを完全一致させる
// 背景・パララックスは無効化（純粋にボタン構造の比較用）

// 4ボタン（サブテキスト追加）
$default_items = [
    ['label' => 'HAIR STYLING', 'slug' => 'hair', 'url' => home_url('/reason/'), 'subtext' => 'Beautiful, healthy hair and a great style is a trademark for Hairdresser.'],
    ['label' => 'MAKE UP',     'slug' => 'makup',  'url' => home_url('/treatment/'), 'subtext' => 'Affordable professional make up will certainly put you in the spot.'],
    ['label' => 'NAIL ART',    'slug' => 'nail',   'url' => home_url('/collection/'), 'subtext' => 'Professional nail art with the newest all organic material practices.'],
    ['label' => 'SPA',         'slug' => 'spa',    'url' => home_url('/salon/'), 'subtext' => 'Our weekly blog posts will bring you fresh tips and trick on how to keep you style perfect.'],
];
$items = apply_filters('ptl_reasons_navstyle_items', $default_items);

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

// アイコン・画像パスの設定
$icon_dir_rel  = '/img/nav';
$icon_dir_abs  = trailingslashit(get_stylesheet_directory() . $icon_dir_rel);
$icon_dir_uri  = trailingslashit(get_stylesheet_directory_uri() . $icon_dir_rel);

// 写真優先フォルダ
$photo_dir_rel = '/img/nav-photo';
$photo_dir_abs = trailingslashit(get_stylesheet_directory() . $photo_dir_rel);
$photo_dir_uri = trailingslashit(get_stylesheet_directory_uri() . $photo_dir_rel);

// MOREリンク（暫定）
$more_url = apply_filters('ptl_reasons_more_url', home_url('/reason/'));
?>

<section id="reasons" class="ptl-pageNavHero">
    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">COMMITMENT</h2>
        <div class="ptl-section__subtitle">パトラクシェの魅力</div>
        <div class="ptl-section__subtitleLine" aria-hidden="true"></div>
        <div class="ptl-pageNavHero__grid">
            <?php
            // 子テーマ内のアイコン格納場所（PNG想定）と写真格納場所
            $icon_dir_rel  = '/img/nav';
            $icon_dir_abs  = trailingslashit(get_stylesheet_directory() . $icon_dir_rel);
            $icon_dir_uri  = trailingslashit(get_stylesheet_directory_uri() . $icon_dir_rel);
            $photo_dir_rel = '/img/nav-photo';
            $photo_dir_abs = trailingslashit(get_stylesheet_directory() . $photo_dir_rel);
            $photo_dir_uri = trailingslashit(get_stylesheet_directory_uri() . $photo_dir_rel);

            foreach ($items as $it): if (empty($it['label'])) continue;
                $href = $it['url'] ?? '#';
                $label = (string) $it['label'];
                $slug  = !empty($it['slug']) ? (string) $it['slug'] : strtolower(preg_replace('/[^a-z0-9\-]+/i', '-', $label));
                $icon_html = $it['icon_html'] ?? '';
                // 写真があれば写真を優先
                $photo_src = '';
                if ($slug) {
                    foreach (['.jpg', '.jpeg', '.png', '.webp'] as $ext) {
                        $candidate = $photo_dir_abs . $slug . $ext;
                        if (file_exists($candidate)) {
                            $photo_src = $photo_dir_uri . $slug . $ext;
                            break;
                        }
                    }
                }
                if (!$photo_src) {
                    // 写真が無い場合は従来どおりアイコンを探す
                    if (!$icon_html && $slug) {
                        $png = $icon_dir_abs . $slug . '.png';
                        if (file_exists($png)) {
                            $icon_html = '<img src="' . esc_url($icon_dir_uri . $slug . '.png') . '" alt="" loading="lazy" decoding="async">';
                        }
                    }
                    if (!$icon_html) {
                        $icon_html = ptl_nav_placeholder_svg($label);
                    }
                }
            ?>
                <a class="ptl-pageNavHero__btn<?php echo $photo_src ? ' is-photo' : ''; ?>" href="<?php echo esc_url($href); ?>">
                    <?php if ($photo_src): ?>
                        <span class="ptl-pageNavHero__photo"><img src="<?php echo esc_url($photo_src); ?>" alt="" loading="lazy" decoding="async"></span>
                    <?php else: ?>
                        <span class="ptl-pageNavHero__icon"><?php echo $icon_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
                                                            ?></span>
                    <?php endif; ?>
                    <span class="ptl-pageNavHero__label"><?php echo esc_html($label); ?></span>
                </a>
            <?php endforeach; ?>
        </div>

        <div class="ptl-news__more">
            <a class="ptl-news__moreBtn" href="<?php echo esc_url($more_url); ?>">
                <span class="ptl-news__moreLabel">MORE</span>
                <span class="ptl-news__moreArrow" aria-hidden="true">→</span>
            </a>
        </div>
    </div>
</section>