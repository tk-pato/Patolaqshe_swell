<?php

/**
 * BLOG セクション（自動横スクロール）
 */

// 最新のブログ記事を10件取得
$blog_posts = get_posts([
    'post_type' => 'post',
    'posts_per_page' => 10,
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC',
]);

// デフォルト画像のパス
$default_image = get_stylesheet_directory_uri() . '/img/spa.jpg';
?>

<section id="section-blog" class="ptl-blog">
    <div class="ptl-section__inner">

        <!-- ヘッダー（SALONと完全統一：タイトル、サブタイトル、オーナメント） -->
        <div class="ptl-blog__header">
            <h2 class="ptl-section__title">BLOG</h2>
            <div class="ptl-section__subtitle" style="text-align:center;margin-top:8px;">美容コラム</div>
            <div class="ptl-section__ornament" style="text-align:center;margin:12px 0 40px;">
                <img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/img/bg_1.png'); ?>" alt="ornament" style="width:240px;max-width:100%;height:auto;" />
            </div>
        </div>

        <?php if (!empty($blog_posts)): ?>
            <!-- カードコンテナ -->
            <div class="ptl-blog__container">
                <div class="ptl-blog__track">
                    <?php foreach ($blog_posts as $post): setup_postdata($post); ?>
                        <div class="ptl-blog__item">
                            <a href="<?php echo esc_url(get_permalink($post->ID)); ?>" class="ptl-blog__card">
                                <div class="ptl-blog__media">
                                    <?php
                                    $thumbnail_id = get_post_thumbnail_id($post->ID);
                                    if ($thumbnail_id) {
                                        echo wp_get_attachment_image($thumbnail_id, 'medium', false, [
                                            'alt' => esc_attr(get_the_title($post)),
                                            'loading' => 'lazy',
                                        ]);
                                    } else {
                                        echo '<img src="' . esc_url($default_image) . '" alt="' . esc_attr(get_the_title($post)) . '" loading="lazy">';
                                    }
                                    ?>
                                </div>
                            </a>
                            <h3 class="ptl-blog__title">
                                <a href="<?php echo esc_url(get_permalink($post->ID)); ?>">
                                    <?php echo esc_html(get_the_title($post)); ?>
                                </a>
                            </h3>
                        </div>
                    <?php endforeach;
                    wp_reset_postdata(); ?>
                </div>
            </div>
        <?php else: ?>
            <!-- 投稿がない場合 -->
            <div class="ptl-blog__empty">
                <p>ブログ記事は現在準備中です。<br>近日中に公開予定ですので、今しばらくお待ちください。</p>
            </div>
        <?php endif; ?>

        <!-- MOREボタン（常に表示） -->
        <div class="ptl-blog__more">
            <a class="ptl-news__moreBtn" href="/blog/">
                <span class="ptl-news__moreLabel">MORE</span>
                <span class="ptl-news__moreArrow" aria-hidden="true">→</span>
            </a>
        </div>

    </div>
</section>