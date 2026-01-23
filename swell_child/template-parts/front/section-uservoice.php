<?php
if (!defined('ABSPATH')) exit;
?>

<section id="uservoice" class="ptl-section ptlVoice">
    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">お客様の声</h2>
        <div class="ptl-section__subtitle" style="text-align:center;margin-top:8px;">体験レビュー</div>
        <div class="ptl-section__ornament" style="text-align:center;margin:12px 0 40px;">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/bg_1.png" alt="ornament" style="width:240px;max-width:100%;height:auto;" />
        </div>

        <div class="uservoice-slider swiper">
            <div class="swiper-wrapper">
                <?php
                // 新旧統合のお客様の声を取得
                $uservoice_posts = ptl_get_all_uservoice_posts(12);
                if (!empty($uservoice_posts)):
                    foreach ($uservoice_posts as $post):
                        setup_postdata($post);
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
                    endforeach;
                    wp_reset_postdata();
                else:
                    ?>
                    <!-- ダミーデータ（投稿がない場合） -->
                    <div class="swiper-slide">
                        <div class="feedback-card">
                            <div class="feedback-image">
                                <img src="<?php echo get_stylesheet_directory_uri() . '/img/nav/salon.png'; ?>" alt="お客様1" class="customer-img" />
                            </div>
                            <h3 class="feedback-title">自分に自信が持てるようになった</h3>
                            <div class="feedback-content">
                                <p>施術を受けてから姿勢が良くなり、バストのラインが綺麗になりました。鏡を見るのが楽しみです。</p>
                            </div>
                            <div class="feedback-author">30代女性</div>
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
                            <h3 class="feedback-title">諦めていたけど変化を実感</h3>
                            <div class="feedback-content">
                                <p>年齢的に無理だと思っていましたが、3ヶ月でサイズアップ！スタッフの方々も親切で通いやすいです。</p>
                            </div>
                            <div class="feedback-author">40代女性</div>
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
                            <h3 class="feedback-title">体質改善にも効果あり</h3>
                            <div class="feedback-content">
                                <p>バストケアだけでなく、冷え性も改善されて驚きです。身体全体が軽くなった感じがします。</p>
                            </div>
                            <div class="feedback-author">20代女性</div>
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
            <div class="ptlVoice__more">
                <a class="ptlNews__moreBtn" href="https://patolaqshe.com/media/voice/">
                    <span class="ptlNews__moreLabel">MORE</span>
                    <span class="ptlNews__moreArrow" aria-hidden="true">→</span>
                </a>
            </div>
        </div>
    </div>
</section>