<?php
if ( ! defined( 'ABSPATH' ) ) exit;

if ( SWELL_Theme::is_show_sidebar() ) {
	get_sidebar();
}
?>
</div>
<?php
	$SETTING = SWELL_Theme::get_setting();

	if ( SWELL_Theme::is_use( 'pjax' ) ) echo '</div>'; // End : Barba[data-barba="container"]

	// フッター前ウィジェット
	if ( is_active_sidebar( 'before_footer' ) ) :
		echo '<div id="before_footer_widget" class="w-beforeFooter">';
		if ( ! SWELL_Theme::is_use( 'ajax_footer' ) ) :
			SWELL_Theme::get_parts( 'parts/footer/before_footer' );
		endif;
		echo '</div>';
	endif;

	// ぱんくず
	if ( 'top' !== $SETTING['pos_breadcrumb'] ) :
		SWELL_Theme::get_parts( 'parts/breadcrumb' );
	endif;
?>
<footer id="footer" class="l-footer">
	<?php 
	// ========================================
	// ★ カスタムフッター追加箇所（開始）
	// ========================================
	?>
	<div class="ptl-footer">
		<div class="ptl-footer-inner">
			
		<!-- ロゴセクション -->
		<div class="ptl-footer__logo">
			<img src="<?php echo get_stylesheet_directory_uri(); ?>/img/intrologo.png" alt="Patolaqshe" width="600" height="161" loading="lazy" decoding="async">
		</div>			<!-- SALONセクション -->
			<div class="ptl-footer__salon">
				<p class="ptl-footer__salon-label">SALON</p>
				<div class="ptl-footer__salon-divider"></div>
				<div class="ptl-footer__salon-links">
					<a href="<?php echo esc_url(home_url('/ebisu-daikanyama/')); ?>" class="ptl-footer__salon-link">代官山</a>
					<a href="<?php echo esc_url(home_url('/ginza/')); ?>" class="ptl-footer__salon-link">銀座</a>
				</div>
			</div>
			
		</div>

		<!-- 下段グレー背景（ナビ＋コピーライト） -->
		<div class="ptl-footer__lower">
			<div class="ptl-footer__lower-inner">
				<!-- ナビゲーション -->
				<nav class="ptl-footer__nav" aria-label="フッターナビゲーション">
					<ul class="ptl-footer__nav-list">
						<li class="ptl-footer__nav-item">
							<a href="<?php echo esc_url(home_url('/')); ?>" class="ptl-footer__nav-link">TOP</a>
						</li>
						<li class="ptl-footer__nav-item">
							<a href="#news-modal-all" class="ptl-footer__nav-link news-modal-trigger" data-modal-id="news-modal-all" aria-label="ニュース一覧を開く">NEWS</a>
						</li>
						<li class="ptl-footer__nav-item">
							<a href="<?php echo esc_url(home_url('/information/')); ?>" class="ptl-footer__nav-link">INFO</a>
						</li>
						<li class="ptl-footer__nav-item">
							<a href="<?php echo esc_url(home_url('/service/')); ?>" class="ptl-footer__nav-link">MENU</a>
						</li>
						<li class="ptl-footer__nav-item">
							<a href="<?php echo esc_url(home_url('/voice/')); ?>" class="ptl-footer__nav-link">VOICE</a>
						</li>
					<li class="ptl-footer__nav-item">
						<a href="#faq-modal" class="ptl-footer__nav-link faq-modal-trigger" data-modal-id="faq-modal" aria-label="よくあるご質問を開く">FAQ</a>
					</li>
					<li class="ptl-footer__nav-item">
						<?php
						// 現在のページを判定してモーダルIDを切り替え
						$modal_id = 'blog-modal-all'; // デフォルト：グランドトップ
						if (is_page('daikanyama')) {
							$modal_id = 'blog-modal-daikanyama';
						} elseif (is_page('ginza')) {
							$modal_id = 'blog-modal-ginza';
						}
						?>
						<a href="#<?php echo esc_attr($modal_id); ?>" class="ptl-footer__nav-link blog-modal-trigger" data-modal-id="<?php echo esc_attr($modal_id); ?>" aria-label="ブログ一覧を開く">BLOG</a>
					</li>
					<li class="ptl-footer__nav-item">
						<a href="#privacy-modal" class="ptl-footer__nav-link privacy-modal-trigger" aria-label="プライバシーポリシーを開く">PRIV</a>
					</li>
					</ul>
				</nav>				<!-- コピーライト -->
				<div class="ptl-footer__copyright">
					<p>&copy; <?php echo date('Y'); ?> Patolaqshe. All rights reserved.</p>
				</div>
			</div>
		</div>
	</div>
	<?php 
	// ========================================
	// ★ カスタムフッター追加箇所（終了）
	// ========================================
	?>
</footer>
<?php
	// プライバシーポリシーモーダルを出力
	echo do_shortcode('[privacy_modal]');
?>
<?php
	// ブログモーダルを出力（ページごとに店舗別）
	if (is_page('daikanyama')) {
		// 代官山ページ：グランドのみ + 代官山
		echo do_shortcode('[blog_list_modal store="daikanyama"]');
	} elseif (is_page('ginza')) {
		// 銀座ページ：グランドのみ + 銀座
		echo do_shortcode('[blog_list_modal store="ginza"]');
	} else {
		// グランドトップ：すべて
		echo do_shortcode('[blog_list_modal]');
	}
?>
<?php
	// ニュースモーダルを出力（フロントページ以外のページ用）
	if (!is_front_page()) {
		echo do_shortcode('[news_list_modal]');
	}
?>
<?php
	// FAQモーダルを出力
	echo do_shortcode('[faq_modal]');
?>
<?php
	// 固定フッターメニュー
	if ( has_nav_menu( 'fix_bottom_menu' ) ) :
		$cache_key = $SETTING['cache_bottom_menu'] ? 'fix_bottom_menu' : '';
		SWELL_Theme::get_parts( 'parts/footer/fix_menu', null, $cache_key );
	endif;

	// 固定ボタン
	SWELL_Theme::get_parts( 'parts/footer/fix_btns' );

	// モーダル
	SWELL_Theme::get_parts( 'parts/footer/modals' );
?>
</div><!--/ #all_wrapp-->
<?php
wp_footer();
echo $SETTING['foot_code']; // phpcs:ignore
?>
</body></html>
