<?php
if (! defined('ABSPATH')) exit;

// 専用CSSを後読みで確実に読み込む
echo '<link rel="stylesheet" href="' . esc_url(get_stylesheet_directory_uri() . '/css/section-reasons.css') . '" media="all">';

// 共通セクション背景（Customizer）を取得
$bg = function_exists('ptl_get_common_section_bg') ? ptl_get_common_section_bg() : [
    'video_url' => '',
    'bg_pc'     => get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg',
    'bg_sp'     => get_stylesheet_directory_uri() . '/img/ourprices-bg-placeholder-1920x1080.svg',
    'overlay'   => 0.25,
];
$video_url = (string) ($bg['video_url'] ?? '');
$bg_pc     = (string) ($bg['bg_pc'] ?? '');
$bg_sp     = (string) ($bg['bg_sp'] ?? '');
$overlay   = (float)   ($bg['overlay'] ?? 0.25);
$p_speed   = (float)   ($bg['parallax_speed'] ?? 0.6);

// 8ボタン（リンクは後から差し替え想定。フィルターで上書き可）
$default_items = [
    ['label' => 'COMMITMENT', 'slug' => 'commitment', 'url' => home_url('/reason/')],
    ['label' => 'TREATMENT',  'slug' => 'treatment',  'url' => home_url('/treatment/')],
    ['label' => 'COLLECTION', 'slug' => 'collection', 'url' => home_url('/collection/')],
    ['label' => 'SALON',      'slug' => 'salon',      'url' => home_url('/salon/')],
];
$items = apply_filters('ptl_page_nav_items', $default_items);
$has_bg = !empty($video_url) || !empty($bg_pc) || !empty($bg_sp);

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
?>

<section id="section-reasons" class="ptl-reasonsHero is-translucent<?php echo $has_bg ? ' has-bg' : ''; ?>">

    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">COMMITMENT</h2>
        <div class="ptl-section__subtitle" style="text-align:center;margin-top:8px;">パトラクシェの魅力</div>
        <div class="ptl-section__ornament" style="text-align:center;margin:12px 0 40px;">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/bg_1.png" alt="ornament" style="width:240px;max-width:100%;height:auto;" />
        </div>
        <div class="ptl-reasonsHero__grid">
            <?php
            // 子テーマ内のアイコン格納場所（PNG想定）
            $icon_dir_rel = '/img/nav';
            $icon_dir_abs = trailingslashit(get_stylesheet_directory() . $icon_dir_rel);
            $icon_dir_uri = trailingslashit(get_stylesheet_directory_uri() . $icon_dir_rel);

            foreach ($items as $it): if (empty($it['label'])) continue;
                $href = $it['url'] ?? '#';
                $label = (string) $it['label'];
                $image_src = '';

                // 各メニューアイテムに対応する画像パスを設定
                switch ($label) {
                    case 'COMMITMENT':
                        $image_src = get_stylesheet_directory_uri() . '/img/hair.jpg';
                        break;
                    case 'TREATMENT':
                        $image_src = get_stylesheet_directory_uri() . '/img/makup.jpg';
                        break;
                    case 'COLLECTION':
                        $image_src = get_stylesheet_directory_uri() . '/img/nail.jpg';
                        break;
                    case 'SALON':
                        $image_src = get_stylesheet_directory_uri() . '/img/spa.jpg';
                        break;
                    default:
                        // デフォルトのSVGアイコン
                        $icon_html = ptl_nav_placeholder_svg($label);
                }

                // 画像パスがある場合はimg要素を生成
                if (!empty($image_src)) {
                    $icon_html = '<img src="' . esc_url($image_src) . '" alt="' . esc_attr($label) . '" style="width:100%;display:block;aspect-ratio:4/3;object-fit:cover;border-radius:8px;" loading="lazy" decoding="async">';
                }
            ?>
                <div class="ptl-reasonsHero__btn">
                    <span class="ptl-reasonsHero__icon"><?php echo $icon_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
                                                        ?></span>
                    <div class="ptl-reasonsHero__boxTitle">HAIR STYLING</div>
                    <div class="ptl-reasonsHero__boxDesc">Beautiful, healthy hair and a great style is a trademark for Hairdresser. Professional care and awesome attention to details and your needs defines us.</div>
                </div>
            <?php endforeach; ?>
        </div>
        <div class="ptl-section__more" style="text-align:center;margin:24px 0;">
            <div class="ptl-news__more">
                <a class="ptl-news__moreBtn" href="<?php echo esc_url(home_url('/reason/')); ?>">
                    <span class="ptl-news__moreLabel">MORE</span>
                    <span class="ptl-news__moreArrow" aria-hidden="true">&rarr;</span>
                </a>
            </div>
        </div>
    </div>
</section>