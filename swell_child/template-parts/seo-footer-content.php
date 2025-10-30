<?php
/**
 * SEO最適化フッターコンテンツ
 * ローカルSEO、構造化データ、キーワード最適化対応
 */
?>

<!-- SEO最適化フッター開始 -->
<footer id="seo-footer" class="seo-footer" role="contentinfo" aria-label="サイト情報とナビゲーション">
    <div class="seo-footer__inner">
        
        <!-- 予約バナーセクション（SPのみ表示） -->
        <section class="seo-footer__reservation sp-only" aria-label="予約バナー">
            <div class="seo-footer__banner-grid">
                <!-- 代官山店予約 -->
                <a href="/contact-daikanyama" class="seo-footer__banner-item" aria-label="代官山店の予約ページへ">
                    <svg class="seo-footer__icon" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M9 2L3 9H6L6 22H18V9H21L15 2H9Z" stroke="#666" stroke-width="1.5"/>
                    </svg>
                    <span class="seo-footer__banner-text">代官山店予約</span>
                </a>
                
                <!-- 銀座店予約 -->
                <a href="/contact-ginza" class="seo-footer__banner-item" aria-label="銀座店の予約ページへ">
                    <svg class="seo-footer__icon" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M9 2L3 9H6L6 22H18V9H21L15 2H9Z" stroke="#666" stroke-width="1.5"/>
                    </svg>
                    <span class="seo-footer__banner-text">銀座店予約</span>
                </a>
            </div>
        </section>
        
        <!-- 店舗情報セクション（SEO強化） -->
        <section class="seo-footer__shops-info" aria-label="店舗情報">
            <h2 class="seo-footer__section-title">バストケア専門サロン Patolaqshe 店舗情報</h2>
            
            <div class="seo-footer__shops-grid">
                <!-- 代官山店 -->
                <article class="seo-footer__shop-card" itemscope itemtype="https://schema.org/LocalBusiness">
                    <h3 class="seo-footer__shop-name" itemprop="name">Patolaqshe 代官山店</h3>
                    <div class="seo-footer__shop-details">
                        <p class="seo-footer__address" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
                            <span itemprop="postalCode">〒150-0034</span><br>
                            <span itemprop="addressRegion">東京都</span>
                            <span itemprop="addressLocality">渋谷区代官山町</span>
                        </p>
                        <p class="seo-footer__tel">
                            TEL: <a href="tel:+81-3-XXXX-XXXX" itemprop="telephone">03-XXXX-XXXX</a>
                        </p>
                        <p class="seo-footer__hours">
                            <span class="seo-footer__hours-label">営業時間:</span><br>
                            平日 11:00-20:00<br>
                            土日祝 10:00-19:00
                        </p>
                        <a href="/salon-daikanyama" class="seo-footer__detail-link">詳細を見る</a>
                    </div>
                </article>
                
                <!-- 銀座店 -->
                <article class="seo-footer__shop-card" itemscope itemtype="https://schema.org/LocalBusiness">
                    <h3 class="seo-footer__shop-name" itemprop="name">Patolaqshe 銀座店</h3>
                    <div class="seo-footer__shop-details">
                        <p class="seo-footer__address" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
                            <span itemprop="postalCode">〒104-0061</span><br>
                            <span itemprop="addressRegion">東京都</span>
                            <span itemprop="addressLocality">中央区銀座</span>
                        </p>
                        <p class="seo-footer__tel">
                            TEL: <a href="tel:+81-3-YYYY-YYYY" itemprop="telephone">03-YYYY-YYYY</a>
                        </p>
                        <p class="seo-footer__hours">
                            <span class="seo-footer__hours-label">営業時間:</span><br>
                            平日 11:00-20:00<br>
                            土日祝 10:00-19:00
                        </p>
                        <a href="/salon-ginza" class="seo-footer__detail-link">詳細を見る</a>
                    </div>
                </article>
            </div>
        </section>
        
        <!-- サービスメニュー（キーワード最適化） -->
        <section class="seo-footer__services" aria-label="サービスメニュー">
            <h2 class="seo-footer__section-title">バストケアメニュー</h2>
            <div class="seo-footer__services-grid">
                <div class="seo-footer__service-col">
                    <h3 class="seo-footer__service-title">育乳・バストアップ</h3>
                    <ul class="seo-footer__service-list">
                        <li><a href="/menu/ikuyu">育乳マッサージ</a></li>
                        <li><a href="/menu/bustup">バストアップケア</a></li>
                        <li><a href="/menu/shape">バストシェイプ矯正</a></li>
                    </ul>
                </div>
                <div class="seo-footer__service-col">
                    <h3 class="seo-footer__service-title">美乳・バストケア</h3>
                    <ul class="seo-footer__service-list">
                        <li><a href="/menu/binyuu">美乳トリートメント</a></li>
                        <li><a href="/menu/firmness">ハリ・弾力ケア</a></li>
                        <li><a href="/menu/maintenance">定期メンテナンス</a></li>
                    </ul>
                </div>
            </div>
        </section>
        
        <!-- サイトマップ（SEO内部リンク強化） -->
        <nav class="seo-footer__sitemap" aria-label="サイトマップ">
            <h2 class="seo-footer__section-title">サイトマップ</h2>
            <div class="seo-footer__sitemap-grid">
                <div class="seo-footer__sitemap-col">
                    <h3 class="seo-footer__sitemap-title">サロン情報</h3>
                    <ul class="seo-footer__sitemap-list">
                        <li><a href="/">ホーム</a></li>
                        <li><a href="/about">サロンについて</a></li>
                        <li><a href="/concept">コンセプト</a></li>
                        <li><a href="/staff">スタッフ紹介</a></li>
                    </ul>
                </div>
                <div class="seo-footer__sitemap-col">
                    <h3 class="seo-footer__sitemap-title">メニュー・料金</h3>
                    <ul class="seo-footer__sitemap-list">
                        <li><a href="/menu">全メニュー一覧</a></li>
                        <li><a href="/price">料金表</a></li>
                        <li><a href="/first-time">初回限定プラン</a></li>
                        <li><a href="/campaign">キャンペーン</a></li>
                    </ul>
                </div>
                <div class="seo-footer__sitemap-col">
                    <h3 class="seo-footer__sitemap-title">お役立ち情報</h3>
                    <ul class="seo-footer__sitemap-list">
                        <li><a href="/blog">ブログ</a></li>
                        <li><a href="/voice">お客様の声</a></li>
                        <li><a href="/faq">よくある質問</a></li>
                        <li><a href="/news">お知らせ</a></li>
                    </ul>
                </div>
                <div class="seo-footer__sitemap-col">
                    <h3 class="seo-footer__sitemap-title">ご予約・お問い合わせ</h3>
                    <ul class="seo-footer__sitemap-list">
                        <li><a href="/reserve">ご予約</a></li>
                        <li><a href="/contact">お問い合わせ</a></li>
                        <li><a href="/access">アクセス</a></li>
                        <li><a href="/privacy">プライバシーポリシー</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        
        <!-- SNSリンク -->
        <section class="seo-footer__sns" aria-label="ソーシャルメディア">
            <h2 class="seo-footer__section-title">公式SNS</h2>
            <div class="seo-footer__sns-list">
                <a href="https://www.instagram.com/patolaqshe_daikanyama/" 
                   class="seo-footer__sns-item" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   aria-label="Instagram 代官山店">
                    <svg class="seo-footer__sns-icon" width="20" height="20" viewBox="0 0 24 24" fill="#666" aria-hidden="true">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2C5.61 4 4 5.61 4 7.6v8.8c0 1.99 1.61 3.6 3.6 3.6h8.8c1.99 0 3.6-1.61 3.6-3.6V7.6c0-1.99-1.61-3.6-3.6-3.6H7.6zm9.65 1.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    <span>Instagram 代官山</span>
                </a>
                <a href="https://www.instagram.com/patolaqshe_ginza/" 
                   class="seo-footer__sns-item" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   aria-label="Instagram 銀座店">
                    <svg class="seo-footer__sns-icon" width="20" height="20" viewBox="0 0 24 24" fill="#666" aria-hidden="true">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2C5.61 4 4 5.61 4 7.6v8.8c0 1.99 1.61 3.6 3.6 3.6h8.8c1.99 0 3.6-1.61 3.6-3.6V7.6c0-1.99-1.61-3.6-3.6-3.6H7.6zm9.65 1.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    <span>Instagram 銀座</span>
                </a>
            </div>
        </section>
        
        <!-- コピーライト -->
        <div class="seo-footer__copyright">
            <p>&copy; 2012-2025 Patolaqshe（パトラクシェ）｜ バストケア専門サロン 代官山・銀座. All rights reserved.</p>
        </div>
        
    </div>
</footer>
<!-- SEO最適化フッター終了 -->
