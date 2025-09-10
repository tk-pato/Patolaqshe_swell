<?php
if (! defined('ABSPATH')) exit;

// 件数・カテゴリ・MOREリンク先をフィルターで調整可能に
$per_page  = (int) apply_filters('ptl_news_per_page', 3);
$category  = apply_filters('ptl_news_category', ''); // 例: 'news'（空なら全件）
$more_url  = apply_filters('ptl_news_more_url', (function () {
    $blog_id = (int) get_option('page_for_posts');
    if ($blog_id) return get_permalink($blog_id);
    return home_url('/news/');
})());
// 一時的にダミー3件を強制表示したい場合は、このフィルターを true に
$force_fallback = (bool) apply_filters('ptl_news_force_fallback', false);

$query_args = [
    'post_type'           => 'post',
    'posts_per_page'      => $per_page,
    'ignore_sticky_posts' => true,
];
if (!empty($category)) $query_args['category_name'] = $category;

$news_q = $force_fallback ? null : new WP_Query($query_args);
?>
<section id="news" class="ptl-section ptl-news">
    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">NEWS</h2>
        <div class="ptl-section__subtitle">お知らせ</div>
        <div class="ptl-section__subtitleLine" aria-hidden="true"></div>

        <ul class="ptl-news__list is-titleOnly">
            <?php if (!$force_fallback && $news_q && $news_q->have_posts()): while ($news_q->have_posts()): $news_q->the_post(); ?>
                    <li class="ptl-news__item">
                        <a class="ptl-news__title" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                    </li>
                <?php endwhile;
            else: ?>
                <?php
                // 投稿が無いときは仮の3件を表示（プレビュー用）
                $fallback = apply_filters('ptl_news_fallback_items', ['○○○○', '××××', '△△△△']);
                foreach ($fallback as $title): ?>
                    <li class="ptl-news__item is-placeholder">
                        <a class="ptl-news__title" href="<?php echo esc_url($more_url); ?>"><?php echo esc_html($title); ?></a>
                    </li>
                <?php endforeach; ?>
            <?php endif;
            if ($news_q) wp_reset_postdata(); ?>
        </ul>

        <div class="ptl-news__more">
            <a class="ptl-news__moreBtn" href="<?php echo esc_url($more_url); ?>">
                <span class="ptl-news__moreLabel">MORE</span>
                <span class="ptl-news__moreArrow" aria-hidden="true">→</span>
            </a>
        </div>
    </div>
</section>