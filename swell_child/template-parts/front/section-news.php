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

// ニュース記事のみを取得（_post_category = 'news'）
$query_args = [
    'post_type'           => 'post',
    'posts_per_page'      => $per_page,
    'ignore_sticky_posts' => true,
    'meta_query' => [
        [
            'key' => '_post_category',
            'value' => 'news',
            'compare' => '='
        ]
    ]
];
if (!empty($category)) $query_args['category_name'] = $category;

$news_q = $force_fallback ? null : new WP_Query($query_args);
?>
<section id="news" class="ptl-section ptlNews">
    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">ニュース</h2>
        <div class="ptl-section__subtitle" style="text-align:center;margin-top:8px;">最新情報</div>
        <div class="ptl-section__ornament" style="text-align:center;margin:12px 0 40px;">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/bg_1.png" alt="ornament" width="494" height="39" style="width:240px;max-width:100%;height:auto;" loading="lazy" decoding="async" />
        </div>

        <ul class="ptlNews__list is-titleOnly">
            <?php
            $count = 0;
            if (!$force_fallback && $news_q && $news_q->have_posts()):
                while ($news_q->have_posts()): $news_q->the_post();
                    if ($count >= 5) break;
            ?>
                    <li class="ptlNews__item">
                        <span class="ptlNews__date"><?php echo esc_html(get_the_date('Y/m/d')); ?></span>
                        <span class="ptlNews__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></span>
                    </li>
                <?php $count++;
                endwhile;
            else:
                $fallback = apply_filters('ptl_news_fallback_items', ['○○○○', '××××', '△△△△']);
                foreach ($fallback as $title): ?>
                    <li class="ptlNews__item is-placeholder">
                        <span class="ptlNews__date">2025/10/07</span>
                        <span class="ptlNews__title"><a href="<?php echo esc_url($more_url); ?>"><?php echo esc_html($title); ?></a></span>
                    </li>
            <?php endforeach;
            endif;
            if ($news_q) wp_reset_postdata(); ?>
        </ul>

        <div class="ptlNews__more">
            <a class="ptlNews__moreBtn news-modal-trigger" href="<?php echo esc_url($more_url); ?>">
                <span class="ptlNews__moreLabel">MORE</span>
                <span class="ptlNews__moreArrow" aria-hidden="true">→</span>
            </a>
        </div>
    </div>
    <?php echo do_shortcode('[news_list_modal]'); ?>
</section>