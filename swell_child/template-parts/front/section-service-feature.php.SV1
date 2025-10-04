<?php
if (! defined('ABSPATH')) exit;

// 専用CSSを後読みで確実に読み込む
echo '<link rel="stylesheet" href="' . esc_url( get_stylesheet_directory_uri() . '/css/section-service-feature.css' ) . '" media="all">';

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

<section id="section-services" class="ptl-reasonsHero is-translucent<?php echo $has_bg ? ' has-bg' : ''; ?>">
    <div class="ptl-section__inner">
        <h2 class="ptl-section__title is-onImage" style="color:#222; text-shadow:none;">MENU</h2>
        <div class="ptl-section__subtitle" style="text-align:center;margin-top:8px;">各種メニュー</div>
        <div class="ptl-section__ornament" style="text-align:center;margin:12px 0;">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/bg_1.png" alt="ornament" style="width:240px;max-width:100%;height:auto;" />
        </div>

        <!-- MENU Content (Rococo Style) -->
        <div class="ptl-menu__content">
            <!-- メインコンテンツ -->
            <div class="ptl-menu__main">
                <div class="ptl-menu__mainContent">
                    <a href="<?php echo esc_url(home_url('/lp03/')); ?>" class="ptl-menu__mainLink">
                        <div class="ptl-menu__mainImage">
                            <img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/img/仮バナーPC.png'); ?>" alt="Rococo式 バストアップ施術" loading="lazy" decoding="async">
                        </div>
                        <div class="ptl-menu__mainText">
                            <h3 class="ptl-menu__mainTitle">テキストテキストテキスト</h3>
                            <p class="ptl-menu__mainDesc">テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト。テキストテキストテキストテキストテキストテキスト。</p>
                            <span class="ptl-menu__mainCta">View all</span>
                        </div>
                    </a>
                </div>
            </div>

            <!-- サブメニュー -->
            <div class="ptl-menu__sub">
                <div class="ptl-menu__subGrid">
                    <div class="ptl-menu__subItem">
                        <a href="<?php echo esc_url(home_url('/menu/sizeup/')); ?>" class="ptl-menu__subLink">
                            <div class="ptl-menu__subImage">
                                <img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/img/仮バナーPC.png'); ?>" alt="サイズアップ" loading="lazy" decoding="async">
                            </div>
                            <h4 class="ptl-menu__subTitle">サイズアップ</h4>
                        </a>
                    </div>

                    <div class="ptl-menu__subItem">
                        <a href="<?php echo esc_url(home_url('/menu/down/')); ?>" class="ptl-menu__subLink">
                            <div class="ptl-menu__subImage">
                                <img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/img/仮バナーPC.png'); ?>" alt="下垂ケア" loading="lazy" decoding="async">
                            </div>
                            <h4 class="ptl-menu__subTitle">下垂ケア</h4>
                        </a>
                    </div>

                    <div class="ptl-menu__subItem">
                        <a href="<?php echo esc_url(home_url('/menu/distance/')); ?>" class="ptl-menu__subLink">
                            <div class="ptl-menu__subImage">
                                <img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/img/仮バナーPC.png'); ?>" alt="離れバストケア" loading="lazy" decoding="async">
                            </div>
                            <h4 class="ptl-menu__subTitle">離れバストケア</h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- MORE ボタン -->
        <div class="ptl-section__more" style="text-align:center;margin:24px 0;">
            <div class="ptl-news__more">
                <a class="ptl-news__moreBtn" href="<?php echo esc_url(home_url('/menu/')); ?>">
                    <span class="ptl-news__moreLabel">More</span>
                    <span class="ptl-news__moreArrow" aria-hidden="true">→</span>
                </a>
            </div>
        </div>
    </div>
</section>
