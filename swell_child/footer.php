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
			<img src="<?php echo get_stylesheet_directory_uri(); ?>/img/intrologo.png" alt="Patolaqshe">
		</div>			<!-- SALONセクション -->
			<div class="ptl-footer__salon">
				<p class="ptl-footer__salon-label">SALON</p>
				<div class="ptl-footer__salon-divider"></div>
				<div class="ptl-footer__salon-links">
					<a href="<?php echo esc_url(home_url('/salon/daikanyama/')); ?>" class="ptl-footer__salon-link">代官山</a>
					<a href="<?php echo esc_url(home_url('/salon/ginza/')); ?>" class="ptl-footer__salon-link">銀座</a>
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
							<a href="<?php echo esc_url(home_url('/news/')); ?>" class="ptl-footer__nav-link">NEWS</a>
						</li>
						<li class="ptl-footer__nav-item">
							<a href="<?php echo esc_url(home_url('/info/')); ?>" class="ptl-footer__nav-link">INFO</a>
						</li>
						<li class="ptl-footer__nav-item">
							<a href="<?php echo esc_url(home_url('/menu/')); ?>" class="ptl-footer__nav-link">MENU</a>
						</li>
						<li class="ptl-footer__nav-item">
							<a href="<?php echo esc_url(home_url('/voice/')); ?>" class="ptl-footer__nav-link">VOICE</a>
						</li>
						<li class="ptl-footer__nav-item">
							<a href="<?php echo esc_url(home_url('/faq/')); ?>" class="ptl-footer__nav-link">FAQ</a>
						</li>
						<li class="ptl-footer__nav-item">
							<a href="<?php echo esc_url(home_url('/blog/')); ?>" class="ptl-footer__nav-link">BLOG</a>
						</li>
					</ul>
				</nav>
				
				<!-- コピーライト -->
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
