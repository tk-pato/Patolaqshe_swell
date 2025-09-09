<?php
$img_daikanyama = 'https://patolaqshe.com/media/salon_ebisu_1.jpg';
$img_ginza      = 'https://patolaqshe.com/media/salon_ginza_1.1.jpg';
get_header();
?>
<main id="main" class="front-page">
    <section id="news">
        <!-- ニュース（空骨組み） -->
    </section>
    <section id="brand">
        <!-- ブランド紹介（空骨組み） -->
    </section>
    <section id="nav-pages">
        <!-- 各ページナビ（空骨組み） -->
    </section>
    <section id="services">
        <!-- サービス概要 -->
        <h2>サービス概要</h2>
        <ul class="service-list">
            <li><a href="#flow">施術の流れ</a></li>
            <li><a href="#price">料金表</a></li>
        </ul>
    </section>
    <section id="shops">
        <!-- 各店ナビ（店舗カード・簡易） -->
        <article class="shop-row shop-daikanyama">
            <figure class="shop-photo">
                <img src="<?php echo esc_url($img_daikanyama); ?>" alt="代官山店 店内写真" loading="lazy" decoding="async">
            </figure>
            <div class="shop-detail">
                <h3>代官山店</h3>
            </div>
        </article>
        <article class="shop-row shop-ginza">
            <figure class="shop-photo">
                <img src="<?php echo esc_url($img_ginza); ?>" alt="銀座店 店内写真" loading="lazy" decoding="async">
            </figure>
            <div class="shop-detail">
                <h3>銀座店</h3>
            </div>
        </article>
    </section>
    <section id="info">
        <!-- インフォメーション（空骨組み） -->
    </section>
    <section id="blog">
        <!-- ブログ -->
        <h2>最新ブログ</h2>
        <ul class="blog-list">
            <?php
            $args = array(
                'post_type' => 'post',
                'posts_per_page' => 6,
                'post_status' => 'publish',
            );
            $latest_query = new WP_Query($args);
            if ($latest_query->have_posts()) :
                while ($latest_query->have_posts()) : $latest_query->the_post(); ?>
                    <li>
                        <a href="<?php echo esc_url(get_permalink()); ?>">
                            <?php echo esc_html(get_the_title()); ?>
                        </a>
                        <span class="date"><?php echo esc_html(get_the_date('Y.m.d')); ?></span>
                        <p class="excerpt"><?php echo esc_html(get_the_excerpt()); ?></p>
                    </li>
            <?php endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </ul>
    </section>
    <section id="sns">
        <!-- SNSリンク（空骨組み） -->
    </section>
    <section id="contact-faq">
        <!-- お問い合わせ・FAQ（空骨組み） -->
    </section>
    <section id="access-detail">
        <!-- アクセス詳細（住所・TEL・地図） -->
        <article class="shop-row shop-daikanyama">
            <figure class="shop-photo">
                <img src="<?php echo esc_url($img_daikanyama); ?>" alt="代官山店 店内写真" loading="lazy" decoding="async">
            </figure>
            <div class="shop-detail">
                <h3>代官山店</h3>
                <table class="shop-table">
                    <tr>
                        <th>営業時間</th>
                        <td><?php echo esc_html($ph['HOURS_DAIKANYAMA']); ?></td>
                    </tr>
                    <tr>
                        <th>所在地</th>
                        <td><?php echo esc_html($ph['ADDRESS_DAIKANYAMA']); ?></td>
                    </tr>
                    <tr>
                        <th>定休日</th>
                        <td><?php echo esc_html($ph['CLOSED_DAIKANYAMA']); ?></td>
                    </tr>
                    <tr>
                        <th>ご予約</th>
                        <td><a href="<?php echo esc_url($ph['RESERVE_URL_DAIKANYAMA']); ?>" role="button">WEB予約</a>　<a href="tel:<?php echo esc_attr($ph['TEL_DAIKANYAMA']); ?>"><?php echo esc_html($ph['TEL_DAIKANYAMA']); ?></a></td>
                    </tr>
                </table>
                <div class="shop-map">
                    <iframe src="<?php echo esc_url($ph['MAP_IFRAME_DAIKANYAMA']); ?>" title="代官山店 地図" loading="lazy" width="100%" height="300" style="border:0;" allowfullscreen></iframe>
                </div>
            </div>
        </article>
        <article class="shop-row shop-ginza">
            <figure class="shop-photo">
                <img src="<?php echo esc_url($img_ginza); ?>" alt="銀座店 店内写真" loading="lazy" decoding="async">
            </figure>
            <div class="shop-detail">
                <h3>銀座店</h3>
                <table class="shop-table">
                    <tr>
                        <th>営業時間</th>
                        <td><?php echo esc_html($ph['HOURS_GINZA']); ?></td>
                    </tr>
                    <tr>
                        <th>所在地</th>
                        <td><?php echo esc_html($ph['ADDRESS_GINZA']); ?></td>
                    </tr>
                    <tr>
                        <th>定休日</th>
                        <td><?php echo esc_html($ph['CLOSED_GINZA']); ?></td>
                    </tr>
                    <tr>
                        <th>ご予約</th>
                        <td><a href="<?php echo esc_url($ph['RESERVE_URL_GINZA']); ?>" role="button">WEB予約</a>　<a href="tel:<?php echo esc_attr($ph['TEL_GINZA']); ?>"><?php echo esc_html($ph['TEL_GINZA']); ?></a></td>
                    </tr>
                </table>
                <div class="shop-map">
                    <iframe src="<?php echo esc_url($ph['MAP_IFRAME_GINZA']); ?>" title="銀座店 地図" loading="lazy" width="100%" height="300" style="border:0;" allowfullscreen></iframe>
                </div>
            </div>
        </article>
    </section>
    <section id="policy-sitemap">
        <!-- 会社ポリシー／サイトマップ（空骨組み） -->
    </section>
</main>

<?php
get_footer();
#history: step36 images fixed to WP media URLs (salon_ebisu_1.jpg, salon_ginza_1.1.jpg)
