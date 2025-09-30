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

// 店舗データ（実データに置換可能）
$salons = [
  [
    'name' => '恵比寿・代官山本店',
    'page_url' => '/salon/ebisu-daikanyama/',
    'image' => 'img/daikanyama.jpg',
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
    'image' => 'img/ginza.jpg',
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
      <?php foreach ($salons as $index => $shop):
        $name = (string)($shop['name'] ?? '');
        $img_rel = (string)($shop['image'] ?? '');
        $img_url = $img_rel ? (trailingslashit(get_stylesheet_directory_uri()) . ltrim($img_rel, '/')) : '';
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
      ?>
        <div class="ptl-salonHero__btn">
          <!-- 店舗画像 -->
          <div class="salon-image">
            <?php if ($img_url): ?>
              <?php if ($page_url): ?><a class="salon-image-link" href="<?php echo esc_url($page_url); ?>"><?php endif; ?>
                <img src="<?php echo esc_url($img_url); ?>" alt="<?php echo esc_attr($name); ?> 店内写真" loading="lazy" />
                <?php if ($page_url): ?></a><?php endif; ?>
            <?php else: ?>
              <span class="ptl-salonHero__icon"><?php echo ptl_nav_placeholder_svg($name); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
                                                ?></span>
            <?php endif; ?>
          </div>

          <!-- 店舗名 + LINEアイコン -->
          <div class="salon-nameRow">
            <h3 class="salon-name">
              <?php if ($page_url): ?><a class="salon-name-link" href="<?php echo esc_url($page_url); ?>"><?php endif; ?>
                <?php echo esc_html($name); ?>
                <?php if ($page_url): ?></a><?php endif; ?>
            </h3>
            <?php if ($line): ?>
              <a class="salon-line" href="<?php echo esc_url($line); ?>" target="_blank" rel="noopener" aria-label="<?php echo esc_attr($name . 'のLINEを開く'); ?>">
                <img class="salon-line-img" src="<?php echo esc_url(get_stylesheet_directory_uri() . '/img/line.png'); ?>" alt="LINE" loading="lazy" />
              </a>
            <?php endif; ?>
          </div>

          <!-- 住所 -->
          <?php if ($addr): ?><p class="salon-address"><?php echo esc_html($addr); ?></p><?php endif; ?>

          <!-- 営業時間 -->
          <?php if (!empty($biz)): ?>
            <dl class="salon-hours" aria-label="営業時間">
              <?php foreach ($biz as $label => $time): ?>
                <div class="salon-hours__row">
                  <dt><?php echo esc_html($label); ?></dt>
                  <dd><?php echo esc_html($time); ?></dd>
                </div>
              <?php endforeach; ?>
            </dl>
          <?php endif; ?>

          <!-- 定休日 -->
          <?php if ($closed): ?>
            <p class="salon-closed"><span class="meta-label">定休日</span><span class="meta-value"><?php echo esc_html($closed); ?></span></p>
          <?php endif; ?>

          <!-- アクセス -->
          <?php if ($access): ?>
            <p class="salon-access"><span class="meta-label">アクセス</span><span class="meta-value"><?php echo esc_html($access); ?></span></p>
          <?php endif; ?>

          <!-- 電話番号 -->
          <?php if ($tel_href): ?>
            <div class="salon-contact">
              <a class="salon-tel" href="<?php echo esc_attr($tel_href); ?>">
                <span class="tel-label">TEL</span>
                <span class="tel-number"><?php echo esc_html($tel); ?></span>
              </a>
            </div>
          <?php endif; ?>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>