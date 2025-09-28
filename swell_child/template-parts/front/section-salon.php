<?php
if (! defined('ABSPATH')) exit;

// 共通セクション背景（Customizer）を取得（REASONSと同様の仕組みを利用）
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

// 初期はREASONSの構造を流用し、2カード構成（Step2で2枚固定／詳細カードは後続Stepで実装）
$items = [
  ['label' => 'SALON A', 'slug' => 'salon-a', 'url' => home_url('/salon/daikanyama/')],
  ['label' => 'SALON B', 'slug' => 'salon-b', 'url' => home_url('/salon/ginza/')],
];
$has_bg = !empty($video_url) || !empty($bg_pc) || !empty($bg_sp);

// プレースホルダー（画像が無い場合の簡易SVG）
if (!function_exists('ptl_nav_placeholder_svg')) {
    function ptl_nav_placeholder_svg($label)
    {
        $ch = strtoupper(substr(trim((string)$label), 0, 1));
        if (!preg_match('/[A-Z]/', $ch)) $ch = 'S';
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

<section id="salon" class="ptl-salonHero is-translucent<?php echo $has_bg ? ' has-bg' : ''; ?>">
    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">SALON</h2>
        <div class="ptl-section__subtitle" style="text-align:center;margin-top:8px;">サロン</div>
        <div class="ptl-section__ornament" style="text-align:center;margin:12px 0 40px;">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/bg_1.png" alt="ornament" style="width:240px;max-width:100%;height:auto;" />
        </div>
        <div class="ptl-salonHero__grid">
            <?php foreach ($items as $it): if (empty($it['label'])) continue;
                $href = !empty($it['url']) ? (string)$it['url'] : '#';
                $label = (string) $it['label'];
                $image_src = '';

                // 仮の代表画像（必要に応じて差し替え）
                switch ($label) {
                    case 'SALON A':
                        $image_src = get_stylesheet_directory_uri() . '/img/daikanyama.jpg';
                        break;
                    case 'SALON B':
                        $image_src = get_stylesheet_directory_uri() . '/img/ginza.jpg';
                        break;
                    default:
                        $icon_html = ptl_nav_placeholder_svg($label);
                }

                if (!empty($image_src)) {
                    $icon_html = '<img src="' . esc_url($image_src) . '" alt="' . esc_attr($label) . '" style="width:100%;display:block;aspect-ratio:4/3;object-fit:cover;border-radius:8px;" loading="lazy" decoding="async">';
                }
            ?>
                <a class="ptl-salonHero__btn" href="<?php echo esc_url($href); ?>">
                    <span class="ptl-salonHero__icon"><?php echo $icon_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
                    <div class="ptl-salonHero__boxTitle">SALON</div>
                    <div class="ptl-salonHero__boxDesc">サロン情報はこちらから。営業時間、アクセス、電話など詳細をご覧いただけます。</div>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>
