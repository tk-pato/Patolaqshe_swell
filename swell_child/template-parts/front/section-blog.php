<?php

/**
 * BLOG セクション（自動横スクロール）
 */

// ========== デバッグ出力開始 ==========
error_log('========== BLOG SECTION DEBUG START ==========');
error_log('📍 section-blog.php が読み込まれました');
error_log('🕐 タイムスタンプ: ' . date('Y-m-d H:i:s'));

// 最新のブログ記事を10件取得
$blog_posts = get_posts([
    'post_type' => 'post',
    'posts_per_page' => 10,
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC',
]);

// デバッグ: 取得した投稿の情報
error_log('📊 取得した投稿数: ' . count($blog_posts));
error_log('🔍 投稿配列が空か: ' . (empty($blog_posts) ? 'YES (空)' : 'NO (データあり)'));

if (!empty($blog_posts)) {
    error_log('--- 投稿リスト ---');
    foreach ($blog_posts as $index => $post) {
        error_log(sprintf(
            '[%d] ID=%d, タイトル=%s, ステータス=%s, 日付=%s',
            $index + 1,
            $post->ID,
            $post->post_title,
            $post->post_status,
            $post->post_date
        ));
    }
} else {
    error_log('⚠️ 警告: 投稿が1件も取得できませんでした');
    
    // 全ステータスを含めて再取得
    $all_posts = get_posts([
        'post_type' => 'post',
        'posts_per_page' => -1,
        'post_status' => 'any',
    ]);
    error_log('📊 全ステータス含めた投稿数: ' . count($all_posts));
    
    if (!empty($all_posts)) {
        error_log('--- 全投稿のステータス ---');
        foreach ($all_posts as $post) {
            error_log(sprintf(
                'ID=%d, タイトル=%s, ステータス=%s',
                $post->ID,
                $post->post_title,
                $post->post_status
            ));
        }
    }
}

error_log('========== BLOG SECTION DEBUG END ==========');

// デフォルト画像のパス
$default_image = get_stylesheet_directory_uri() . '/img/spa.jpg';
?>
<?php error_log('🎨 HTML出力開始: <section id="section-blog"> を出力します'); ?>

<section id="section-blog" class="ptl-section ptlBlog">
    <div class="ptl-section__inner">

        <!-- ヘッダー（SALONと完全統一：タイトル、サブタイトル、オーナメント） -->
        <div class="ptlBlog__header">
            <h2 class="ptl-section__title">BLOG</h2>
            <div class="ptl-section__subtitle" style="text-align:center;margin-top:8px;">美容コラム</div>
            <div class="ptl-section__ornament" style="text-align:center;margin:12px 0 40px;">
                <img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/img/bg_1.png'); ?>" alt="ornament" style="width:240px;max-width:100%;height:auto;" />
            </div>
        </div>

        <?php 
        error_log('🔀 条件分岐: empty($blog_posts) = ' . (empty($blog_posts) ? 'true' : 'false'));
        if (!empty($blog_posts)): 
            error_log('✅ 投稿あり: カードコンテナを出力します');
        ?>
            <!-- カードコンテナ -->
            <div class="ptlBlog__container">
                <div class="ptlBlog__track">
                    <?php foreach ($blog_posts as $post): setup_postdata($post); ?>
                        <div class="ptlBlog__item">
                            <a href="<?php echo esc_url(get_permalink($post->ID)); ?>" class="ptlBlog__card">
                                <div class="ptlBlog__media">
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
                            <h3 class="ptlBlog__title">
                                <a href="<?php echo esc_url(get_permalink($post->ID)); ?>">
                                    <?php echo esc_html(get_the_title($post)); ?>
                                </a>
                            </h3>
                        </div>
                    <?php endforeach;
                    wp_reset_postdata(); ?>
                </div>
            </div>
        <?php 
        else: 
            error_log('⚠️ 投稿なし: 空メッセージを出力します');
        ?>
            <!-- 投稿がない場合 -->
            <div class="ptlBlog__empty">
                <p>ブログ記事は現在準備中です。<br>近日中に公開予定ですので、今しばらくお待ちください。</p>
            </div>
        <?php endif; ?>

        <!-- MOREボタン（常に表示） -->
        <div class="ptlBlog__more">
            <a class="ptlNews__moreBtn" href="/blog/">
                <span class="ptlNews__moreLabel">MORE</span>
                <span class="ptlNews__moreArrow" aria-hidden="true">→</span>
            </a>
        </div>

    </div>
</section>
<?php error_log('🏁 HTML出力完了: </section> を出力しました'); ?>