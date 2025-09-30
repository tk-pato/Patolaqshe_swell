<?php
if (! defined('ABSPATH')) exit;
get_header();
?>

<main id="main_content" class="l-mainContent l-article">
	<div class="l-mainContent__inner">

		<?php
		// 1) ヒーロー：親テーマSWELLのメインビジュアルに任せる（ここでは何もしない）
		?>

	</div>

	<?php
	// 2) ニュース（PHP）: フルブリードで表示するため内側ラッパーの外に出す
	get_template_part('template-parts/front/section', 'news');
	?>

	<div class="l-mainContent__inner">
		<?php
		// 3) バストのお悩み（バナー＋チェックリスト）
		get_template_part('template-parts/front/section', 'bust-issues');

		// 3.5) 選ばれる理由（PHP）
		get_template_part('template-parts/front/section', 'reasons');
		?>
	</div>

	<?php
	// 4) NAVIGATION（背景動画/画像＋8ボタン）: フルブリード
	get_template_part('template-parts/front/section', 'page-navigation');
	?>

	<div class="l-mainContent__inner">

		<?php
		// 4.5) サービス特集（バストアップ大 + 下段3つ）
		get_template_part('template-parts/front/section', 'service-feature');
		?>

		<?php
		// 5) お客様の声（カスタム投稿タイプから動的取得）
		get_template_part('template-parts/front/section', 'uservoice');
		?>

		<?php
		// 6) 店舗ナビ（PHP）
		get_template_part('template-parts/front/section', 'store-nav');
		?>

		<?php
		// 7) ブライダルナビ（ブロック・アンカー: bridal-nav）
		ptl_render_block_slot('bridal-nav');
		?>

		<?php
		// 8) FAQ（ブロック・アンカー: faq）
		ptl_render_block_slot('faq');
		?>

		<?php
		// 9) お問合せ（ブロック・アンカー: contact）
		ptl_render_block_slot('contact');
		?>

	</div>
</main>

<?php get_footer(); ?>