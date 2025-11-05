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
	<div class="w__inn">
		<div class="footer-head">
			<p>代官山と銀座のバストアップ専門サロン Patolaqshe</p>
			<aside>
				<ul class="clearfix">
					<li>SALON</li>
					<li><a href="<?php echo esc_url(home_url('/salon/daikanyama/')); ?>">代官山店</a></li>
					<li><a href="<?php echo esc_url(home_url('/salon/ginza/')); ?>">銀座店</a></li>
				</ul>
			</aside>
		</div>
		<div class="footer-foot">
			<div class="row">
				<aside>
					<ul>
						<li><a href="<?php echo esc_url(home_url('/')); ?>">TOP</a></li>
						<li><a href="<?php echo esc_url(home_url('/philosophy/')); ?>">PHILOSOPHY</a></li>
						<li><a href="<?php echo esc_url(home_url('/menu/')); ?>">MENU</a></li>
						<li><a href="<?php echo esc_url(home_url('/staff/')); ?>">STAFF</a></li>
						<li><a href="<?php echo esc_url(home_url('/news/')); ?>">NEWS</a></li>
						<li><a href="https://www.instagram.com/patolaqshe/" target="_blank" rel="noopener" class="ins_sty">STYLE</a></li>
						<li><a href="https://www.instagram.com/patolaqshe/" target="_blank" rel="noopener" class="ins_sty">BLOG</a></li>
					</ul>
				</aside>
				<address>
					<p>Copyright &copy; Patolaqshe / ALL RIGHTS RESERVED.</p>
				</address>
			</div>
		</div>
	</div>
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
