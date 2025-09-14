<?php
/**
 * MENU Section (Rococo-style)
 * メニューセクション - rococoサイト完全再現版
 */
?>
<section id="menu" class="ptl-section ptl-menu">
    <div class="ptl-section__inner">
        <!-- セクションタイトル -->
        <div class="ptl-menu__header">
            <h2 class="ptl-menu__title">MENU</h2>
        </div>

        <div class="ptl-menu__content">
            <!-- メインコンテンツ -->
            <div class="ptl-menu__main">
                <div class="ptl-menu__mainContent">
                    <a href="<?php echo esc_url(home_url('/lp03/')); ?>" class="ptl-menu__mainLink">
                        <div class="ptl-menu__mainImage">
                            <img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/img/仮バナーPC.png'); ?>" alt="Rococo式 バストアップ施術" loading="lazy" decoding="async">
                        </div>
                        <div class="ptl-menu__mainText">
                            <h3 class="ptl-menu__mainTitle">Rococo式 バストアップ施術</h3>
                            <p class="ptl-menu__mainDesc">一度でバストアップが実感できる驚きの豊胸メソッド！特別価格の初回限定キャンペーン。</p>
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

                    <div class="ptl-menu__subItem">
                        <a href="<?php echo esc_url(home_url('/menu/gap/')); ?>" class="ptl-menu__subLink">
                            <div class="ptl-menu__subImage">
                                <img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/img/仮バナーPC.png'); ?>" alt="左右差ケア" loading="lazy" decoding="async">
                            </div>
                            <h4 class="ptl-menu__subTitle">左右差ケア</h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- MORE ボタン -->
        <div class="ptl-menu__more">
            <a class="ptl-menu__moreBtn" href="<?php echo esc_url(home_url('/menu/')); ?>">
                <span class="ptl-menu__moreLabel">More</span>
                <span class="ptl-menu__moreArrow" aria-hidden="true">→</span>
            </a>
        </div>
    </div>
</section>