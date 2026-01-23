<?php
if (! defined('ABSPATH')) exit;

// 専用CSSはfunctions.phpで読み込み済み（重複削除 2025-01-XX）
// echo '<link rel="stylesheet" href="' . esc_url(get_stylesheet_directory_uri() . '/css/section-commitment.css') . '" media="all">';

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
    ['label' => 'COMMITMENT', 'slug' => 'commitment', 'url' => 'https://patolaqshe.com/media/about/'],
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

<section id="section-commitment" class="ptlCommitHero is-translucent<?php echo $has_bg ? ' has-bg' : ''; ?>">
    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">パトラクシェの魅力</h2>
        <div class="ptl-section__subtitle" style="text-align:center;margin-top:8px;">選ばれる理由</div>
        <div class="ptl-section__ornament" style="text-align:center;margin:12px 0 40px;">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/bg_1.png" alt="ornament" style="width:240px;max-width:100%;height:auto;" />
        </div>
        <div class="ptlCommitHero__grid">
            <?php
            // 子テーマ内のアイコン格納場所（PNG想定）
            $icon_dir_rel = '/img/nav';
            $icon_dir_abs = trailingslashit(get_stylesheet_directory() . $icon_dir_rel);
            $icon_dir_uri = trailingslashit(get_stylesheet_directory_uri() . $icon_dir_rel);

            foreach ($items as $it): if (empty($it['label'])) continue;
                $href = $it['url'] ?? '#';
                $label = (string) $it['label'];
                $image_src = '';

                // 各メニューアイテムに対応する画像パス・タイトル・ディスクリプションを設定
                switch ($label) {
                    case 'COMMITMENT':
                        $image_src = get_stylesheet_directory_uri() . '/img/hair.jpg';
                        $box_title = '創業13年・累計3万人超の実績';
                        $box_desc = '2012年の開業以来、延べ30,000人以上の施術実績。長年の経験と信頼で、初めての方も安心してお任せいただけます。';
                        break;
                    case 'TREATMENT':
                        $image_src = get_stylesheet_directory_uri() . '/img/makup.jpg';
                        $box_title = '都内随一の2000ショット照射';
                        $box_desc = 'バストアップ専用機による驚愕の高密度2000ショット照射で、深部までしっかりアプローチ。熟練のハンドマッサージ（乳腰ケア）、ナノカレント（生体電流）を使用した育乳メソッドなど、豊富な施術メニューから最適な組み合わせをご提案します。';
                        break;
                    case 'COLLECTION':
                        $image_src = get_stylesheet_directory_uri() . '/img/nail.jpg';
                        $box_title = '熟練スタッフによる丁寧なカウンセリング';
                        $box_desc = 'エステティシャン歴14年のオーナーをはじめ、経験豊富なスタッフがお一人おひとりのお悩みに寄り添います。カウンセリングから施術まで、完全オーダーメイドでご提案いたします。';
                        break;
                    case 'SALON':
                        $image_src = get_stylesheet_directory_uri() . '/img/spa.jpg';
                        $box_title = 'モデル等も通う効果実感率99%';
                        $box_desc = '芸能人・モデル・インフルエンサーもお忍びで通う実績。効果体感率99%、平均2カップアップの結果にこだわります。銀座駅や恵比寿駅からも駅近の好立地で、お仕事帰りにも通いやすい環境です。';
                        break;
                    default:
                        // デフォルトのSVGアイコン
                        $icon_html = ptl_nav_placeholder_svg($label);
                        $box_title = '';
                        $box_desc = '';
                }

                // 画像パスがある場合はimg要素を生成
                if (!empty($image_src)) {
                    $icon_html = '<img src="' . esc_url($image_src) . '" alt="' . esc_attr($label) . '" style="width:100%;display:block;aspect-ratio:4/3;object-fit:cover;border-radius:8px;" loading="lazy" decoding="async">';
                }
            ?>
                <div class="ptlCommitHero__btn">
                    <span class="ptlCommitHero__icon"><?php echo $icon_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
                                                        ?></span>
                    <div class="ptlCommitHero__boxTitle"><?php echo esc_html($box_title); ?></div>
                    <div class="ptlCommitHero__boxDesc"><?php echo esc_html($box_desc); ?></div>
                </div>
            <?php endforeach; ?>
        </div>
        <div class="ptl-section__more" style="text-align:center;margin:24px 0;">
            <a class="ptlCommit__more" href="<?php echo esc_url(home_url('/reason/')); ?>">
                <span class="ptlNews__moreLabel">MORE</span>
                <span class="ptlNews__moreArrow" aria-hidden="true">&rarr;</span>
            </a>
        </div>
    </div>
</section>