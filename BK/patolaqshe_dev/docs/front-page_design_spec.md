# 1. ドキュメント情報
- ファイル名: front-page_design_spec.md
- 作成日: 2025-09-02
- 対象: /wp-content/themes/swell_child/front-page.php
- 作成: GPT（設計）／Copilot（実装）／TK（最終決定）

# 2. 目的とKPI
- SWELL子テーマでブロック依存を排し、HTML主体の固定トップページを実装
- SEO/MEO/AIO要件を満たすこと
- 保守性・パフォーマンス・アクセシビリティの最大化
- KPI: 検索順位・LCP/CLS・CV率・店舗来店数

# 3. マインドマップ照合表（Traceability Matrix）
| front-page.phpセクションID | マインドマップ項目 | 備考 |
|--------------------------|---------------------|------|
| hero                     | ヒーロー動画        | h1/リード/CTA（2店舗）|
| usp                      | ブランド紹介ナビ    | USP/信頼要素         |
| service                  | サービスナビ        | 施術の流れ/料金表    |
| beforeafter              | Before/After        | 画像3枚               |
| voice                    | お客様の声ナビ      | 口コミ3件             |
| faq                      | FAQナビ             | Q&A5件                |
| access                   | 各店舗ナビ          | 代官山・銀座分離      |
| latest-blog              | ブログ              | 最新6件               |
| footer-cta               | 予約CTA             | フッター直前          |

# 4. 情報設計（IA）
- メイン: <main>タグ配下に全セクションを配置
- セクションIDでアンカー・内部導線を管理
- 2店舗情報は明確に分離
- 予約・アクセス・FAQ・ブログ等は内部リンクで誘導

# 5. コンテンツ要件
- h1は1ページ1つのみ
- 画像/iframeは loading="lazy"、imgは decoding="async"、ヒーローのみ fetchpriority="high"
- alt属性・aria属性を適切に付与
- 予約・住所等はプレースホルダで管理
- WP出力は必ずエスケープ関数使用

# 6. SEO要件
- h1にブランド名
- 各セクションにh2/h3で階層化
- 最新ブログはWP_Queryで6件表示（タイトル・日付・抜粋・リンク）
- 画像alt・内部リンク・構造化データ対応

# 7. 構造化データ（JSON-LD）
- LocalBusiness/Breadcrumb/FAQを inc/meta.php で管理
- ページ側はマークアップ整合のみ担保
- 2店舗分のNAP情報をJSON-LDで分離

# 8. MEO要件（NAP統一）
- 代官山店: 東京都渋谷区○○○○／TEL: 03-5489-7118
- 銀座店: 東京都中央区○○○○／TEL: 03-xxxx-xxxx
- 営業時間・定休日・地図情報もNAPに含める

# 9. AIO/パフォーマンス要件
- 画像はWebP推奨・遅延読込
- JS非依存・CSSはテーマ側に委譲
- LCP/CLS最適化（ヒーロー画像・CTA）
- 予約・地図等は外部サービス連携可

# 10. アクセシビリティ要件
- alt属性必須
- aria-*属性は必要に応じて付与
- コントラスト・フォント・ラベル明確化
- 予約・地図・FAQはキーボード操作可能

# 11. アナリティクス/計測
- Google Analytics/Tag Manager設置（inc/meta.php管理）
- 予約・CTA・ブログクリック計測

# 12. URL/メタ/リダイレクト規約
- 固定ページURL: /（トップ）
- 予約・店舗・ブログ等は内部リンクで統一
- メタ情報・リダイレクトは inc/meta.php で一元管理

# 13. アセット一覧
| 種類   | パス例                      | 備考           |
|--------|-----------------------------|----------------|
| 画像   | /path/to/hero.webp          | ヒーロー画像   |
| 画像   | /path/to/beforeafter1.webp  | Before/After1  |
| 画像   | /path/to/beforeafter2.webp  | Before/After2  |
| 画像   | /path/to/beforeafter3.webp  | Before/After3  |
| 地図   | /path/to/map-daikanyama     | 代官山店地図   |
| 地図   | /path/to/map-ginza          | 銀座店地図     |

# 14. プレースホルダ一覧（front-page.php と1対1対応）
| プレースホルダ名           | 用途           | 備考           |
|---------------------------|----------------|----------------|
| RESERVE_URL_DAIKANYAMA    | 代官山店予約   | CTAリンク      |
| RESERVE_URL_GINZA         | 銀座店予約     | CTAリンク      |
| RESERVE_URL_GENERIC       | 共通予約       | フッターCTA    |
| 東京都渋谷区○○○○          | 代官山店住所   | NAP            |
| 東京都中央区○○○○          | 銀座店住所     | NAP            |
| 03-5489-7118              | 代官山店TEL    | NAP            |
| 03-xxxx-xxxx              | 銀座店TEL      | NAP            |
| /path/to/hero.webp        | ヒーロー画像   | WebP           |
| /path/to/beforeafter*.webp| Before/After   | WebP           |
| /path/to/map-daikanyama   | 代官山店地図   | iframe         |
| /path/to/map-ginza        | 銀座店地図     | iframe         |

# 15. QAチェックリスト
- h1は1つのみ
- 画像alt/aria属性の有無
- 予約・住所等のプレースホルダ設置
- WP出力のエスケープ関数使用
- セクションID・アンカーの整合
- NAP情報の分離
- FAQ/ブログ/口コミの件数
- LCP/CLS最適化
- アクセシビリティ基準
- 計測タグ設置

# 16. 変更履歴（Changelog）
- 2025-09-02: 初版作成

# 17. 既知の課題/保留事項
- 住所・TEL・地図等の正式情報は後続で確定
- 予約URLはプレースホルダ
- 画像・地図は仮パス
- JSON-LDは inc/meta.php 実装待ち
- ブログ抜粋・FAQ内容は編集可能

---

- [ ] 実装整合
- [ ] SEO整合
- [ ] MEO整合
- [ ] AIO整合
- [ ] 計測整合
- [ ] QA完了
