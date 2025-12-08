<?php
/**
 * Template part: Privacy Policy Modal
 * 
 * @package swell_child
 * @subpackage template-parts
 */

// ========================================
// プライバシーポリシーモーダル
// ========================================
?>
<div id="privacy-modal" class="js-modal_wrap privacy-modal">
  <div class="js-modal_cont privacy-modal__container">
    <!-- モーダルクローズボタン -->
    <button class="js-modal_close privacy-modal__close" aria-label="モーダルを閉じる">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- スクロール可能なコンテンツエリア -->
    <div class="privacy-modal__content">
      <!-- タイトルセクション -->
      <header class="privacy-modal__header">
        <h2 class="privacy-modal__title">プライバシーポリシー</h2>
        <p class="privacy-modal__updated">最終更新：<?php echo date('Y年m月d日'); ?></p>
      </header>

      <!-- プライバシーポリシー本文 -->
      <main class="privacy-modal__body">
        <!-- セクション1: 定義 -->
        <section class="privacy-section" id="privacy-1">
          <h3 class="privacy-section__title">1. 定義</h3>
          <div class="privacy-section__content">
            <p>本プライバシーポリシーにおいて、以下の用語は次のとおり定義します。</p>
            <dl class="privacy-definition-list">
              <dt class="privacy-definition-list__term">個人情報</dt>
              <dd class="privacy-definition-list__definition">姓名、生年月日、住所、電話番号、メールアドレス等、特定の個人を識別できる情報</dd>
              
              <dt class="privacy-definition-list__term">当社</dt>
              <dd class="privacy-definition-list__definition">Patolaqshe（パトラクシェ）およびそれぞれの店舗運営企業</dd>
              
              <dt class="privacy-definition-list__term">利用者</dt>
              <dd class="privacy-definition-list__definition">本Webサイトおよび当社提供サービスを利用する全ての者</dd>
            </dl>
          </div>
        </section>

        <!-- セクション2: 個人情報の収集 -->
        <section class="privacy-section" id="privacy-2">
          <h3 class="privacy-section__title">2. 個人情報の収集</h3>
          <div class="privacy-section__content">
            <p>当社は、以下の方法で個人情報を収集します：</p>
            <ul class="privacy-list">
              <li>お問い合わせフォームへの入力</li>
              <li>ご予約時の登録情報</li>
              <li>メールマガジン購読申し込み</li>
              <li>アクセス解析ツールによる情報収集</li>
              <li>クッキーやIPアドレスの記録</li>
            </ul>
          </div>
        </section>

        <!-- セクション3: 個人情報の利用目的 -->
        <section class="privacy-section" id="privacy-3">
          <h3 class="privacy-section__title">3. 個人情報の利用目的</h3>
          <div class="privacy-section__content">
            <p>収集した個人情報は、以下の目的に限定して使用します：</p>
            <ul class="privacy-list">
              <li>ご予約の管理と確認</li>
              <li>お問い合わせへのご回答</li>
              <li>サービス提供に関する連絡</li>
              <li>メールマガジン配信（ご希望者のみ）</li>
              <li>サービス向上のためのアンケート実施</li>
              <li>マーケティング施策の実行（ご同意いただいた場合）</li>
            </ul>
          </div>
        </section>

        <!-- セクション4: 個人情報の取り扱い -->
        <section class="privacy-section" id="privacy-4">
          <h3 class.privacy-section__title">4. 個人情報の取り扱い</h3>
          <div class="privacy-section__content">
            <p>当社は、個人情報を適切かつ安全に取り扱うため、以下の措置を講じています：</p>
            <ul class="privacy-list">
              <li>SSL（暗号化通信）による情報保護</li>
              <li>アクセス権限の制限</li>
              <li>定期的なセキュリティ監査</li>
              <li>適切なファイアウォール設置</li>
              <li>従業員への個人情報保護教育</li>
            </ul>
          </div>
        </section>

        <!-- セクション5: 個人情報の保管期間 -->
        <section class="privacy-section" id="privacy-5">
          <h3 class="privacy-section__title">5. 個人情報の保管期間</h3>
          <div class="privacy-section__content">
            <p>個人情報の保管期間は、利用目的の遂行に必要な期間とします。以下に保管期間の目安を示します：</p>
            <ul class="privacy-list">
              <li><strong>予約情報：</strong>サービス提供終了から1年間</li>
              <li><strong>お問い合わせ：</strong>対応完了から2年間</li>
              <li><strong>メールマガジン登録者情報：</strong>購読中止から6ヶ月間</li>
            </ul>
          </div>
        </section>

        <!-- セクション6: セキュリティ -->
        <section class="privacy-section" id="privacy-6">
          <h3 class="privacy-section__title">6. セキュリティ対策</h3>
          <div class="privacy-section__content">
            <p>当社は、個人情報の漏洩、紛失、破損等を防ぐため、技術的・物理的・人的対策を実施しています：</p>
            <ul class="privacy-list">
              <li>Webサイトの脆弱性診断を定期実施</li>
              <li>個人情報を扱うシステムへのパスワード管理</li>
              <li>従業員への厳格な秘密保持契約</li>
              <li>万が一の漏洩時の報告体制整備</li>
            </ul>
          </div>
        </section>

        <!-- セクション7: クッキーとアクセス解析 -->
        <section class="privacy-section" id="privacy-7">
          <h3 class="privacy-section__title">7. クッキーとアクセス解析</h3>
          <div class="privacy-section__content">
            <p>本Webサイトでは、利用者の利便性向上とアクセス解析のため、クッキーを使用しています：</p>
            <ul class="privacy-list">
              <li><strong>Google Analytics：</strong>サイト利用統計収集</li>
              <li><strong>セッションクッキー：</strong>ログイン情報の一時保存</li>
              <li><strong>広告配信：</strong>興味関心に基づいた広告表示（ご希望に応じて無効化可能）</li>
            </ul>
            <p>ブラウザの設定でクッキーを無効化できますが、一部機能が使用できなくなる場合があります。</p>
          </div>
        </section>

        <!-- セクション8: 第三者への情報提供 -->
        <section class="privacy-section" id="privacy-8">
          <h3 class="privacy-section__title">8. 第三者への情報提供</h3>
          <div class="privacy-section__content">
            <p>当社は、以下の場合を除き、個人情報を第三者に開示しません：</p>
            <ul class="privacy-list">
              <li>法令に基づく開示請求がある場合</li>
              <li>人命や身体の安全に危険がある場合</li>
              <li>犯罪行為の防止・摘発に必要な場合</li>
              <li>ご本人の明示的な同意がある場合</li>
            </ul>
            <p>ただし、提携先企業（予約システム、メール配信サービス等）への情報提供は、本ポリシーに基づいて実施されます。</p>
          </div>
        </section>

        <!-- セクション9: お客様の権利 -->
        <section class="privacy-section" id="privacy-9">
          <h3 class="privacy-section__title">9. お客様の権利</h3>
          <div class="privacy-section__content">
            <p>ご自身の個人情報について、以下の権利があります：</p>
            <ul class="privacy-list">
              <li><strong>開示請求：</strong>当社が保有する個人情報の開示</li>
              <li><strong>訂正請求：</strong>誤りのある情報の訂正</li>
              <li><strong>削除請求：</strong>個人情報の削除（法定保管期間を除く）</li>
              <li><strong>利用停止請求：</strong>個人情報の利用停止</li>
            </ul>
            <p>上記の請求は、以下の「お問い合わせ」欄の連絡先からお申し込みください。</p>
          </div>
        </section>

        <!-- セクション10: お問い合わせ -->
        <section class="privacy-section" id="privacy-10">
          <h3 class="privacy-section__title">10. お問い合わせ</h3>
          <div class="privacy-section__content">
            <p>本プライバシーポリシーに関するご質問、ご要望、個人情報の開示請求などは、以下の連絡先までお気軽にお問い合わせください：</p>
            
            <div class="privacy-contact">
              <h4 class="privacy-contact__title">Patolaqshe（パトラクシェ）</h4>
              
              <div class="privacy-contact__section">
                <h5 class="privacy-contact__section-title">代官山店</h5>
                <p><strong>住所：</strong>〒150-0034 東京都渋谷区代官山町18-8<br>ホーイ代官山ビル 3F</p>
                <p><strong>電話：</strong><a href="tel:03-xxxx-xxxx">03-xxxx-xxxx</a></p>
                <p><strong>メール：</strong><a href="mailto:contact@patolaqshe.com">contact@patolaqshe.com</a></p>
              </div>

              <div class="privacy-contact__section">
                <h5 class="privacy-contact__section-title">銀座店</h5>
                <p><strong>住所：</strong>〒104-0061 東京都中央区銀座X-XX-X<br>銀座ビル X階</p>
                <p><strong>電話：</strong><a href="tel:03-xxxx-xxxx">03-xxxx-xxxx</a></p>
                <p><strong>メール：</strong><a href="mailto:contact@patolaqshe.com">contact@patolaqshe.com</a></p>
              </div>

              <div class="privacy-contact__section">
                <h5 class="privacy-contact__section-title">マリアージュ</h5>
                <p><strong>住所：</strong>お問い合わせください</p>
                <p><strong>電話：</strong><a href="tel:03-xxxx-xxxx">03-xxxx-xxxx</a></p>
                <p><strong>メール：</strong><a href="mailto:contact@patolaqshe.com">contact@patolaqshe.com</a></p>
              </div>
            </div>

            <p style="margin-top: 20px; font-size: 14px; color: #666;">
              <strong>個人情報保護方針についてのご質問：</strong><br>
              個人情報の取り扱い、プライバシー保護についてご不明な点がございましたら、<br>
              お気軽に上記の連絡先までお問い合わせください。
            </p>
          </div>
        </section>

        <!-- 最後の更新日時 -->
        <footer class="privacy-modal__footer">
          <p style="font-size: 12px; color: #999; margin-top: 40px;">
            本プライバシーポリシーは予告なく改定される場合があります。<br>
            最新版は常にこのページをご確認ください。
          </p>
        </footer>
      </main>
    </div>
  </div>

  <!-- モーダル背景（クリック時にクローズ） -->
  <div class="js-modal_bg js-modal_close"></div>
</div>
