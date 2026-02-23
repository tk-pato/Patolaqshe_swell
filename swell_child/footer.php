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
							<a href="<?php echo esc_url(home_url('/service/')); ?>" class="ptl-footer__nav-link">MENU</a>
						</li>
						<li class="ptl-footer__nav-item">
							<a href="<?php echo esc_url(home_url('/voice/')); ?>" class="ptl-footer__nav-link">VOICE</a>
						</li>
					<li class="ptl-footer__nav-item">
						<a href="#faq-modal" class="ptl-footer__nav-link faq-modal-trigger" data-modal-id="faq-modal">FAQ</a>
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
						<a href="#<?php echo esc_attr($modal_id); ?>" class="ptl-footer__nav-link blog-modal-trigger" data-modal-id="<?php echo esc_attr($modal_id); ?>">BLOG</a>
					</li>
					<li class="ptl-footer__nav-item">
						<a href="#privacy-modal" class="ptl-footer__nav-link privacy-modal-trigger">PRIV</a>
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
<script>
// プライバシーポリシーモーダル
(function() {
    
    function initPrivacyModal() {
        
        const trigger = document.querySelector('.privacy-modal-trigger');
        const modal = document.querySelector('.privacy-modal');
        
        if (!trigger || !modal) {
            return;
        }
        
        // モーダルを開く
        trigger.onclick = function(e) {
            e.preventDefault();
            // 1. まず表示（display: block）
            modal.classList.add('js-modalitem_open');
            document.body.classList.add('js-modal_open');
            
            // 2. 次のフレームでアニメーション開始
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    modal.classList.add('js-modal_animating');
                });
            });
            
        };
        
        // 閉じるボタン
        const closeBtns = modal.querySelectorAll('.js-modal_close');
        closeBtns.forEach(function(btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                // アニメーション開始（アニメーションクラス削除）
                modal.classList.remove('js-modal_animating');
                modal.classList.add('js-modal_closing');
                
                // アニメーション完了後にクラスを削除
                setTimeout(function() {
                    modal.classList.remove('js-modalitem_open');
                    modal.classList.remove('js-modal_closing');
                    document.body.classList.remove('js-modal_open');
                }, 700); // CSS transitionと同じ時間
                
            };
        });
        
        // 背景クリック
        const bg = modal.querySelector('.js-modal_bg');
        if (bg) {
            bg.onclick = function(e) {
                if (e.target === bg) {
                    e.preventDefault();
                    // アニメーション開始（アニメーションクラス削除）
                    modal.classList.remove('js-modal_animating');
                    modal.classList.add('js-modal_closing');
                    
                    // アニメーション完了後にクラスを削除
                    setTimeout(function() {
                        modal.classList.remove('js-modalitem_open');
                        modal.classList.remove('js-modal_closing');
                        document.body.classList.remove('js-modal_open');
                    }, 700); // CSS transitionと同じ時間
                    
                }
            };
        }
        
        // ESCキー
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('js-modalitem_open')) {
                // アニメーション開始（アニメーションクラス削除）
                modal.classList.remove('js-modal_animating');
                modal.classList.add('js-modal_closing');
                
                // アニメーション完了後にクラスを削除
                setTimeout(function() {
                    modal.classList.remove('js-modalitem_open');
                    modal.classList.remove('js-modal_closing');
                    document.body.classList.remove('js-modal_open');
                }, 700); // CSS transitionと同じ時間
                
            }
        });
        
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPrivacyModal);
    } else {
        initPrivacyModal();
    }
    
})();
</script>
</body></html>
