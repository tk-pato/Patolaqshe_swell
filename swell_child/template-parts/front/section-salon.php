<?php

if (! defined('ABSPATH')) exit;

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
        'name' => '恵比寿・代官山店',
        'page_url' => 'https://patolaqshe.com/daikanyama/',
        'image' => get_stylesheet_directory_uri() . '/img/daikanyama.jpg',
        'address' => '〒150-0034 東京都渋谷区代官山町18-8 堀井代官山ビル3F',
        'tel' => '03-5489-7118',
        'line_url' => 'https://lin.ee/JrpP6nV',
        'instagram_url' => 'https://www.instagram.com/patolaqshe_daikanyama/',
        'business_hours' => [
            '平日' => '12:00-20:00',
            '土日祝' => '11:00-19:00',
        ],
        'closed' => '金曜日（その他不定休アリ）',
        'access' => 'JR恵比寿駅 徒歩6分 / 東急東横線代官山駅 徒歩2分',
        'map_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.110945411052!2d139.7044134!3d35.6496381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b445709a3c1%3A0x35eb00ab309a5d3b!2z44OQ44K544OI44Ki44OD44OX5bCC6ZaA44OR44OI44Op44Kv44K344Kn5oG15q-U5a-_44O75Luj5a6Y5bGx5bqX!5e0!3m2!1sja!2sjp!4v1771945538143!5m2!1sja!2sjp',
        'maps_url' => 'https://maps.google.com/?cid=3885199838792015163',
        'access_detail' => [
            '🚃 東急東横線「代官山駅」徒歩2分',
            '🚃 JR山手線「恵比寿駅」徒歩6分',
        ],
    ],
    [
        'name' => '銀座店',
        'page_url' => 'https://patolaqshe.com/ginza/',
        'image' => get_stylesheet_directory_uri() . '/img/ginza.jpg',
        'address' => '〒104-0061 東京都中央区銀座1-6-6 GINZA ARROWS 6F',
        'tel' => '03-6264-4343',
        'line_url' => 'https://lin.ee/0Fye4Ev',
        'instagram_url' => 'https://www.instagram.com/patolaqshe_ginza/',
        'business_hours' => [
            '平日' => '13:00-21:00',
            '土日祝' => '11:00-19:00',
        ],
        'closed' => '金曜日（その他不定休アリ）',
        'access' => 'JR有楽町駅 徒歩5分 / 東京メトロ有楽町線銀座一丁目駅 徒歩1分',
        'map_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.098396752434!2d139.7676948!3d35.6745791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188be478257ced%3A0xb37166046454590d!2z44OQ44K544OI44Ki44OD44OX5bCC6ZaA44OR44OI44Op44Kv44K344Kn6YqA5bqn5bqX!5e0!3m2!1sja!2sjp!4v1771945409869!5m2!1sja!2sjp',
        'maps_url' => 'https://maps.google.com/?cid=12930228174206556429',
        'access_detail' => [
            '🚃 有楽町線「銀座一丁目駅」徒歩2分',
            '🚃 JR山手線「有楽町駅」徒歩5分',
        ],
    ],
];
$default_items = $salons;
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

<section id="salon" class="ptlSalonHero is-translucent<?php echo $has_bg ? ' has-bg' : ''; ?>">

    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">店舗案内</h2>
        <div class="ptl-section__subtitle">アクセス・営業時間</div>
        <div class="ptl-section__ornament" style="text-align:center;margin:12px 0 40px;">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/bg_1.png" alt="ornament" width="494" height="39" style="width:240px;max-width:100%;height:auto;" loading="lazy" decoding="async" />
        </div>
        <div class="ptlSalonHero__grid">
            <?php foreach ($salons as $index => $shop):
                $name = (string)($shop['name'] ?? '');
                // SP表示用の店名に置き換え（indexで2店舗を判定）
                $name_sp = $name;
                if ($index === 0) {
                    $name_sp = '恵比寿・代官山';
                } elseif ($index === 1) {
                    $name_sp = 'GINZA';
                }
                $img_url = (string)($shop['image'] ?? '');
                $addr = (string)($shop['address'] ?? '');
                $tel  = (string)($shop['tel'] ?? '');
                $tel_href = $tel ? ('tel:' . preg_replace('/[^0-9+]/', '', $tel)) : '';
                $line = (string)($shop['line_url'] ?? '');
                $instagram = (string)($shop['instagram_url'] ?? '');
                $page = (string)($shop['page_url'] ?? '');
                $page_url = '';
                if ($page !== '') {
                    $page_url = preg_match('#^https?://#', $page) ? $page : home_url($page);
                }
                $biz  = (array)($shop['business_hours'] ?? []);
                $closed = (string)($shop['closed'] ?? '');
                $access = (string)($shop['access'] ?? '');
                $map_embed = (string)($shop['map_embed'] ?? '');
                // Googleマップリンク（CID URL優先 → 住所検索にフォールバック）
                $maps_link = !empty($shop['maps_url'])
                    ? (string)$shop['maps_url']
                    : ($addr !== ''
                        ? ('https://www.google.com/maps/search/?api=1&query=' . rawurlencode($addr))
                        : $map_embed);
                $access_detail = (array)($shop['access_detail'] ?? []);

                // COMMITMENTベースの構造で店舗情報を表示、④各店舗ページリンク設定
                if ($img_url) {
                    $icon_html = '<div class="ptlSalon-image-wrapper">';
                    if ($page_url) {
                        $icon_html .= '<a href="' . esc_url($page_url) . '" class="ptlSalon-image-link">';
                    }
                    $icon_html .= '<img src="' . esc_url($img_url) . '" alt="' . esc_attr($name) . '" class="ptlSalon-image" width="1920" height="1280" loading="lazy" decoding="async">';
                    if ($page_url) {
                        $icon_html .= '</a>';
                    }
                    $icon_html .= '</div>';
                } else {
                    $icon_html = ptl_nav_placeholder_svg($name);
                }
            ?>
                <div class="ptlSalonHero__btn">
                    <span class="ptlSalonHero__icon"><?php echo $icon_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
                                                        ?></span>
                    <div class="ptlSalonHero__boxTitle">
                        <?php if ($page_url): ?><a href="<?php echo esc_url($page_url); ?>" style="color:inherit;text-decoration:none;"><?php endif; ?>
                            <span class="shop-name shop-name--pc"><?php echo esc_html($name); ?></span>
                            <span class="shop-name shop-name--sp"><?php echo esc_html($name_sp); ?></span>
                            <?php if ($page_url): ?></a><?php endif; ?>
                        <?php if ($line): ?>
                            <a href="<?php echo esc_url($line); ?>" target="_blank" rel="noopener" class="ptlSalon-line-link" style="margin-left:10px;display:inline-block;width:1.8em;height:1.8em;">
                                <img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/img/line.png'); ?>" alt="LINE" width="512" height="512" style="width:100%;height:100%;border-radius:4px;" loading="lazy" decoding="async" />
                            </a>
                        <?php endif; ?>
                        <?php if ($instagram): ?>
                            <a href="<?php echo esc_url($instagram); ?>" target="_blank" rel="noopener" class="ptlSalon-ig-link" style="margin-left:6px;display:inline-block;width:1.8em;height:1.8em;" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:block;">
                                    <defs><linearGradient id="ig-grad-<?php echo esc_attr($idx); ?>" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#FFDC80"/><stop offset="25%" stop-color="#F77737"/><stop offset="50%" stop-color="#E1306C"/><stop offset="75%" stop-color="#C13584"/><stop offset="100%" stop-color="#833AB4"/></linearGradient></defs>
                                    <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#ig-grad-<?php echo esc_attr($idx); ?>)" stroke-width="1.8" fill="none"/>
                                    <circle cx="12" cy="12" r="4.5" stroke="url(#ig-grad-<?php echo esc_attr($idx); ?>)" stroke-width="1.8" fill="none"/>
                                    <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-grad-<?php echo esc_attr($idx); ?>)"/>
                                </svg>
                            </a>
                        <?php endif; ?>
                    </div>
                    <div class="ptlSalonHero__boxDesc">
                        <?php if ($addr): ?><p style="margin:4px 0;"><?php echo esc_html($addr); ?></p><?php endif; ?>
                        <?php if (!empty($biz)): ?>
                            <?php foreach ($biz as $label => $time): ?>
                                <p style="margin:2px 0;font-size:0.9em;"><?php echo esc_html($label); ?>: <?php echo esc_html($time); ?></p>
                            <?php endforeach; ?>
                        <?php endif; ?>
                        <?php if ($closed): ?><p style="margin:2px 0;font-size:0.9em;">定休日: <?php echo esc_html($closed); ?></p><?php endif; ?>

                        <?php if ($map_embed): ?>
                            <!-- PC時: 埋め込み地図 -->
                            <div class="ptlSalon-map">
                                <iframe
                                    src="<?php echo esc_url($map_embed); ?>"
                                    width="600"
                                    height="400"
                                    style="border:0;"
                                    allowfullscreen=""
                                    loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                            <!-- SP時: Googleマップリンクバナー（アイコン画像＋テキスト） -->
                            <a href="<?php echo esc_url($maps_link); ?>"
                                class="ptlSalon-map-link"
                                target="_blank"
                                rel="noopener noreferrer">
                                <svg class="ptlSalon-map-link__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                <span class="ptlSalon-map-link__text">Googleマップで開く</span>
                            </a>
                        <?php endif; ?>
                        <?php if (!empty($access_detail)): ?>
                            <div class="ptlSalon-access">
                                <?php foreach ($access_detail as $access_line): ?>
                                    <p><?php echo esc_html($access_line); ?></p>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <!-- ③MOREボタン削除 -->
    </div>
</section>