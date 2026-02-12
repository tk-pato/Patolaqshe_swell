<?php
if (! defined('ABSPATH')) exit;

// 専用CSSを後読みで確実に読み込む


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

$has_bg = !empty($video_url) || !empty($bg_pc) || !empty($bg_sp);
?>

<section id="menu" class="ptlMenuHero is-translucent<?php echo $has_bg ? ' has-bg' : ''; ?>">
    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">サービス</h2>
        <div class="ptl-section__subtitle" style="text-align:center;margin-top:8px;">各種メニュー</div>
        <div class="ptl-section__ornament" style="text-align:center;margin:12px 0 40px;">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/bg_1.png" alt="ornament" style="width:240px;max-width:100%;height:auto;" />
        </div>

        <!-- MENU Content (Rococo Style) -->
        <div class="ptlMenu__content">
            <!-- メインコンテンツ -->
            <div class="ptlMenu__main">
                <div class="ptlMenu__mainContent">
                    <a href="<?php echo esc_url(home_url('/service/#bust-content')); ?>" class="ptlMenu__mainLink">
                        <div class="ptlMenu__mainImage">
                            <img src="https://patolaqshe.com/media/wp-content/uploads/2025/11/0H9A1096.jpg" alt="Rococo式 バストアップ施術" loading="lazy" decoding="async">
                        </div>
                        <div class="ptlMenu__mainText">
                            <h3 class="ptlMenu__mainTitle">バストアップ施術</h3>
                            <p class="ptlMenu__mainDesc">✦ フラッシュバストアップ<br>✦ 乳腺マッサージ<br>✦ ナノカレント<br><br>※サイズアップ、下垂ケア、離れバストケアなどお悩みに合わせてオーダーメイドでご提案します。</p>
                        </div>
                    </a>
                </div>
            </div>

            <!-- サブメニュー -->
            <div class="ptlMenu__sub">
                <div class="ptlMenu__subGrid">
                    <div class="ptlMenu__subItem">
                        <a href="<?php echo esc_url(home_url('/service/#facial-content')); ?>" class="ptlMenu__subLink">
                            <div class="ptlMenu__subImage">
                                <img src="https://patolaqshe.com/media/wp-content/uploads/2026/02/フェイシャルバナー.jpg" alt="フェイシャル" loading="lazy" decoding="async">
                            </div>
                            <h4 class="ptlMenu__subTitle">フェイシャル</h4>
                        </a>
                    </div>

                    <div class="ptlMenu__subItem">
                        <a href="<?php echo esc_url(home_url('/service/#body-content')); ?>" class="ptlMenu__subLink">
                            <div class="ptlMenu__subImage">
                                <img src="https://patolaqshe.com/media/wp-content/uploads/2026/02/ボディバナー2.jpg" alt="ボディケア" loading="lazy" decoding="async">
                            </div>
                            <h4 class="ptlMenu__subTitle">ボディケア</h4>
                        </a>
                    </div>

                    <div class="ptlMenu__subItem">
                        <a href="<?php echo esc_url(home_url('/service/#bust-content')); ?>" class="ptlMenu__subLink">
                            <div class="ptlMenu__subImage">
                                <img src="https://patolaqshe.com/media/wp-content/uploads/2026/02/モーダルウィンドウバナー.jpg" alt="バストケアグッズ" loading="lazy" decoding="async">
                            </div>
                            <h4 class="ptlMenu__subTitle">バストケアグッズ</h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- MORE ボタン -->
        <div class="ptl-section__more" style="text-align:center;margin:24px 0;">
            <a class="ptlNews__moreBtn" href="<?php echo esc_url(home_url('/service/')); ?>">
                <span class="ptlNews__moreLabel">MORE</span>
                <span class="ptlNews__moreArrow" aria-hidden="true">→</span>
            </a>
        </div>
    </div>
</section>