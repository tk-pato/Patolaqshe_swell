<?php
if (! defined('ABSPATH')) exit;

// 専用CSSを後読みで確実に読み込む
echo '<link rel="stylesheet" href="' . esc_url(get_stylesheet_directory_uri() . '/css/section-salon.css') . '" media="all">';

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

// サロン店舗データ（バックアップから復元）
$salons = [
    [
        'name' => '恵比寿・代官山本店',
        'page_url' => '/salon/ebisu-daikanyama/',
        'image' => get_stylesheet_directory_uri() . '/img/daikanyama.jpg',
        'address' => '〒150-0034 東京都渋谷区代官山町18-8 堀井代官山ビル3F',
        'tel' => '03-5489-7118',
        'line_url' => 'https://line.me/R/ti/p/@xxx',
        'business_hours' => [
            '平日' => '12:00-20:00',
            '土日祝' => '11:00-19:00',
        ],
        'closed' => '金曜日（その他不定休アリ）',
        'access' => 'JR恵比寿駅 徒歩6分 / 東急東横線代官山駅 徒歩2分',
    ],
    [
        'name' => '銀座店',
        'page_url' => '/salon/ginza/',
        'image' => get_stylesheet_directory_uri() . '/img/ginza.jpg',
        'address' => '〒104-0061 東京都中央区銀座1-6-6 GINZA ARROWS 6F',
        'tel' => '03-6264-4343',
        'line_url' => 'https://line.me/R/ti/p/@yyy',
        'business_hours' => [
            '平日' => '13:00-21:00',
            '土日祝' => '11:00-19:00',
        ],
        'closed' => '金曜日（その他不定休アリ）',
        'access' => 'JR有楽町駅 徒歩5分 / 東京メトロ有楽町線銀座一丁目駅 徒歩1分',
    ],
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

<section id="salon" class="ptl-salonHero is-translucent<?php echo $has_bg ? ' has-bg' : ''; ?>">

    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">SALON</h2>
        <div class="ptl-section__subtitle" style="text-align:center;margin-top:8px;">サロン</div>
        <div class="ptl-section__ornament" style="text-align:center;margin:12px 0 40px;">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/bg_1.png" alt="ornament" style="width:240px;max-width:100%;height:auto;" />
        </div>
        <div class="ptl-salonHero__grid">
            <?php foreach ($salons as $index => $shop):
                $name = (string)($shop['name'] ?? '');
                $img_url = (string)($shop['image'] ?? '');
                $addr = (string)($shop['address'] ?? '');
                $tel  = (string)($shop['tel'] ?? '');
                $tel_href = $tel ? ('tel:' . preg_replace('/[^0-9+]/', '', $tel)) : '';
                $line = (string)($shop['line_url'] ?? '');
                $page = (string)($shop['page_url'] ?? '');
                $page_url = '';
                if ($page !== '') {
                    $page_url = preg_match('#^https?://#', $page) ? $page : home_url($page);
                }
                $biz  = (array)($shop['business_hours'] ?? []);
                $closed = (string)($shop['closed'] ?? '');
                $access = (string)($shop['access'] ?? '');
                
                // COMMITMENTベースの構造で店舗情報を表示、④各店舗ページリンク設定
                if ($img_url) {
                    $icon_html = '<div class="salon-image-wrapper">';
                    if ($page_url) {
                        $icon_html .= '<a href="' . esc_url($page_url) . '" class="salon-image-link">';
                    }
                    $icon_html .= '<img src="' . esc_url($img_url) . '" alt="' . esc_attr($name) . '" class="salon-image" loading="lazy" decoding="async">';
                    if ($page_url) {
                        $icon_html .= '</a>';
                    }
                    $icon_html .= '</div>';
                } else {
                    $icon_html = ptl_nav_placeholder_svg($name);
                }
            ?>
                <div class="ptl-salonHero__btn">
                    <span class="ptl-salonHero__icon"><?php echo $icon_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
                    <div class="ptl-salonHero__boxTitle">
                        <?php if ($page_url): ?><a href="<?php echo esc_url($page_url); ?>" style="color:inherit;text-decoration:none;"><?php endif; ?>
                        <?php echo esc_html($name); ?>
                        <?php if ($page_url): ?></a><?php endif; ?>
                        <?php if ($line): ?>
                            <a href="<?php echo esc_url($line); ?>" target="_blank" rel="noopener" style="margin-left:10px;display:inline-block;width:1.8em;height:1.8em;">
                                <img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/img/line.png'); ?>" alt="LINE" style="width:100%;height:100%;border-radius:4px;" loading="lazy" />
                            </a>
                        <?php endif; ?>
                    </div>
                    <div class="ptl-salonHero__boxDesc">
                        <?php if ($addr): ?><p style="margin:4px 0;"><?php echo esc_html($addr); ?></p><?php endif; ?>
                        <?php if (!empty($biz)): ?>
                            <?php foreach ($biz as $label => $time): ?>
                                <p style="margin:2px 0;font-size:0.9em;"><?php echo esc_html($label); ?>: <?php echo esc_html($time); ?></p>
                            <?php endforeach; ?>
                        <?php endif; ?>
                        <?php if ($closed): ?><p style="margin:2px 0;font-size:0.9em;">定休日: <?php echo esc_html($closed); ?></p><?php endif; ?>
                        <?php if ($tel_href): ?>
                            <p style="margin:4px 0;"><a href="<?php echo esc_attr($tel_href); ?>" style="color:#06C755;text-decoration:none;font-weight:600;">TEL: <?php echo esc_html($tel); ?></a></p>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <!-- ③MOREボタン削除 -->
    </div>
</section>