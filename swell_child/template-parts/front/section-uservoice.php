<?php
if (!defined('ABSPATH')) exit;
?>

<section id="uservoice" class="ptl-section ptl-uservoice">
    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">USER'S VOICE</h2>
        <div class="ptl-section__subtitle" style="text-align:center;margin-top:8px;">お客様の声</div>
        <div class="ptl-section__ornament" style="text-align:center;margin:12px 0 40px;">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/bg_1.png" alt="ornament" style="width:240px;max-width:100%;height:auto;" />
        </div>

        <div class="uservoice-slider swiper">
            <div class="swiper-wrapper">
                <?php
                $args = array(
                    'post_type' => 'uservoice',
                    'posts_per_page' => 12,
                    'post_status' => 'publish',
                );
                $uservoice_query = new WP_Query($args);
                if ($uservoice_query->have_posts()):
                    while ($uservoice_query->have_posts()): $uservoice_query->the_post();
                        $customer_name = get_post_meta(get_the_ID(), '_customer_name', true);
                        $rating = (int)get_post_meta(get_the_ID(), '_rating', true);
                        $customer_image = get_post_meta(get_the_ID(), '_customer_image', true);
                        $uservoice_title = get_post_meta(get_the_ID(), '_uservoice_title', true);
                ?>
                        <div class="swiper-slide">
                            <div class="feedback-card">
                                <div class="feedback-image">
                                    <?php if ($customer_image):
                                        $image_url = is_numeric($customer_image) ? wp_get_attachment_url($customer_image) : $customer_image;
                                        if ($image_url): ?>
                                            <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($customer_name); ?>" class="customer-img" />
                                        <?php else: ?>
                                            <img src="<?php echo get_stylesheet_directory_uri() . '/img/nav/salon.png'; ?>" alt="<?php echo esc_attr($customer_name ? $customer_name : 'お客様'); ?>" class="customer-img" />
                                        <?php endif; ?>
                                    <?php else: ?>
                                        <img src="<?php echo get_stylesheet_directory_uri() . '/img/nav/salon.png'; ?>" alt="<?php echo esc_attr($customer_name ? $customer_name : 'お客様'); ?>" class="customer-img" />
                                    <?php endif; ?>
                                </div>

                                <h3 class="feedback-title"><?php echo esc_html($uservoice_title ? $uservoice_title : get_the_title()); ?></h3>

                                <div class="feedback-content">
                                    <p><?php the_content(); ?></p>
                                </div>

                                <div class="feedback-author"><?php echo esc_html($customer_name ? $customer_name : '匿名のお客様'); ?></div>

                                <div class="feedback-rating">
                                    <?php for ($i = 1; $i <= 5; $i++): ?>
                                        <i class="fa fa-star<?php echo ($i <= $rating) ? '' : '-o'; ?>"></i>
                                    <?php endfor; ?>
                                </div>
                            </div>
                        </div>
                    <?php
                    endwhile;
                    wp_reset_postdata();
                else:
                    ?>
                    <!-- ダミーデータ（投稿がない場合） -->
                    <div class="swiper-slide">
                        <div class="feedback-card">
                            <div class="feedback-image">
                                <img src="<?php echo get_stylesheet_directory_uri() . '/img/nav/salon.png'; ?>" alt="お客様1" class="customer-img" />
                            </div>
                            <h3 class="feedback-title">クラスマー楽になった</h3>
                            <div class="feedback-content">
                                <p>テストの成績がアップしました。次のテストも高得点狙いたいです。</p>
                            </div>
                            <div class="feedback-author">小学3年生</div>
                            <div class="feedback-rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="feedback-card">
                            <div class="feedback-image">
                                <img src="<?php echo get_stylesheet_directory_uri() . '/img/nav/salon.png'; ?>" alt="お客様2" class="customer-img" />
                            </div>
                            <h3 class="feedback-title">苦手だった数学が得意になった！</h3>
                            <div class="feedback-content">
                                <p>SWELL授業は面白いですよ。すごく苦手だった数学が得意になった。テストの点数も上がったです。</p>
                            </div>
                            <div class="feedback-author">小学5年生</div>
                            <div class="feedback-rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star-o"></i>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="feedback-card">
                            <div class="feedback-image">
                                <img src="<?php echo get_stylesheet_directory_uri() . '/img/nav/salon.png'; ?>" alt="お客様3" class="customer-img" />
                            </div>
                            <h3 class="feedback-title">全国順位で一位になった</h3>
                            <div class="feedback-content">
                                <p>日記にはいつものことですが、全国順位で一位になった。SWELLは素晴らしいおかげです。</p>
                            </div>
                            <div class="feedback-author">小学5年生</div>
                            <div class="feedback-rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            </div>

            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev" aria-label="Previous"></div>
            <div class="swiper-button-next" aria-label="Next"></div>
        </div>

        <div class="ptl-section__more" style="text-align:center;margin:24px 0;">
            <div class="ptl-news__more">
                <a class="ptl-news__moreBtn" href="<?php echo esc_url(home_url('/uservoice/')); ?>">
                    <span class="ptl-news__moreLabel">MORE</span>
                    <span class="ptl-news__moreArrow" aria-hidden="true">→</span>
                </a>
            </div>
        </div>
    </div>
</section>