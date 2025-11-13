<?php /* CHILD front-page.php LOADED */ ?>
<?php
if (! defined('ABSPATH')) exit;

// ========== デバッグ: front-page.php 読み込み確認 ==========
error_log('========================================');
error_log('🏠 front-page.php が読み込まれました');
error_log('🕐 タイムスタンプ: ' . date('Y-m-d H:i:s'));
error_log('📄 リクエストURI: ' . $_SERVER['REQUEST_URI']);
error_log('🌐 ホームURL: ' . home_url());
error_log('========================================');

// 最強対策: 出力バッファリングでSWELLの投稿リスト出力を完全制御
ob_start();

// SWELLフィルターを最高優先度で無効化
function ptl_disable_all_posts($content)
{
	// 投稿リスト関連の出力を全て空にする
	return '';
}

// 複数のフィルターで完全ブロック
add_filter('swell_show_home_posts', '__return_false', 9999);
add_filter('swell_show_post_list', '__return_false', 9999);
add_filter('theme_mod_show_new_tab', '__return_false', 9999);
add_filter('theme_mod_show_ranking_tab', '__return_false', 9999);

// 投稿リスト系の出力を強制的に無効化
add_action('wp_head', function () {
	echo '<style>
        /* 投稿リスト関連 */
        .p-postList, .c-postList, .wp-block-query, .wp-block-latest-posts,
        /* ページネーション関連 */
        .wp-block-query-pagination, .c-pagination, .p-pagination,
        .pagination, .page-numbers, nav.navigation, .nav-links,
        /* SWELL固有のページネーション */
        .p-paginationNav, .p-pageNav, .c-paginationNav,
        /* WordPress標準ページネーション */
        .posts-navigation, .post-navigation, .paging-navigation,
        /* 広範囲でページネーション要素をキャッチ */
        *[class*="paginat"], *[class*="page-num"], *[class*="nav-link"] {
            display: none !important; 
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
        }
    </style>';
}, 999);

get_header();

// ヘッダー出力後に不要な出力をクリア
$header_output = ob_get_clean();
echo $header_output;
?>

<main id="main_content" class="l-mainContent l-article">

	<div class="l-mainContent__inner">

		<?php
		// 1) ヒーロー：親テーマSWELLのメインビジュアルに任せる（ここでは何もしない）
		?>

	</div>

	<?php
	// 1.5) NEWS（ニュースセクション - PC用）: フルブリード - PC表示のみヒーロー直下
	?>
	<div class="ptl-news-pc-only">
		<?php get_template_part('template-parts/front/section', 'news'); ?>
	</div>

	<?php
	// 2) INTRO（ブランド紹介セクション）: フルブリード
	get_template_part('template-parts/front/section', 'intro');
	?>

	<div class="l-mainContent__inner">
		<?php
		// 3) バストのお悩み（バナー＋チェックリスト）
		get_template_part('template-parts/front/section', 'bust-issues');

		// 3.5) 選ばれる理由（PHP）
		get_template_part('template-parts/front/section', 'commitment');
		?>
	</div>

	<?php
	// 4) NAVIGATION（背景動画/画像＋8ボタン）: フルブリード
	get_template_part('template-parts/front/section', 'page-navigation');
	?>

	<div class="l-mainContent__inner">

		<?php
		// 4.5) メニューセクション（バストアップ大 + 下段3つ）
		get_template_part('template-parts/front/section', 'menu');
		?>

		<?php
		// 5) お客様の声（カスタム投稿タイプから動的取得）
		get_template_part('template-parts/front/section', 'uservoice');
		?>

	</div>

	<?php
	// 5.5) SALON（2店舗横並びセクション）: フルブリード
	get_template_part('template-parts/front/section', 'salon');
	?>

	<?php
	// 5.8) INFO HUB（3カードレイアウト：BRIDAL / INFORMATION / FAQ）: フルブリード
	get_template_part('template-parts/front/section', 'infohub');
	?>

	<?php
	// 5.9) NEWS（ニュースセクション - SP用）: フルブリード - SP表示のみここに配置
	?>
	<div class="ptl-news-sp-only">
		<?php get_template_part('template-parts/front/section', 'news'); ?>
	</div>

	<?php /* BLOGセクション: INFOHUB の直後に配置（再表示） */ ?>
	<?php
	error_log('----------------------------------------');
	error_log('📍 get_template_part("blog") を呼び出します');
	error_log('🔍 呼び出し位置: front-page.php 120行目付近');

	get_template_part('template-parts/front/section', 'blog');

	error_log('✅ get_template_part("blog") の呼び出し完了');
	error_log('ℹ️ section-blog.php のデバッグ出力を確認してください');
	error_log('----------------------------------------');
	?>

	<?php /* ページコンテンツのブロック出力は無効化（投稿リストが含まれるため） */ ?>
	<?php /* お問合せセクションは別途専用テンプレートで実装予定 */ ?>
</main>

<?php
error_log('========================================');
error_log('🏁 front-page.php の処理完了');
error_log('🕐 タイムスタンプ: ' . date('Y-m-d H:i:s'));
error_log('========================================');
?>

<?php get_footer(); ?>