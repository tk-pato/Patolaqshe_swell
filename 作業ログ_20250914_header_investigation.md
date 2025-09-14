# 作業ログ：SWELL子テーマ修正・継続作業用 (2025-09-14)

## 現在の作業状況
- **日時**: 2025年9月14日  
- **プロジェクト**: Patolaqshe SWELL子テーマのヘッダー安定化・SV修正  
- **ブランチ**: `work/commitment-retry-20250911`  
- **次回継続**: SVゾーン修正作業  

## ファイル構成（短縮呼び名）
```
swell_child/
├── style.css              # メイン（スタイル）
├── functions.php          # 関数
├── css/
│   ├── ptl-layout.css     # レイアウト
│   ├── navigation.css     # ナビ
│   ├── reasons-styles.css # リーズン
│   └── section-menu.css   # セクションメニュー
└── js/
    ├── head-toggle.js     # ヘッドトグル
    └── section-parallax.js # セクションパララックス
```

## 完了済み作業
### 1. 親テーマ委譲（ヘッダー/ナビ関連の上書き撤去）
- **対象**: `style.css` のヘッダー関連CSS削除
- **維持**: `.l-fixHeader` のレイヤー化（compositing）
- **削除**: SP背景色上書き、`#gnav .sub-menu` 系の子テーマ上書き

### 2. `functions.php` のインライン注入制御
- **実装**: `PTL_ENABLE_FRONT_NAV_OVERRIDES = false` でfront-page限定注入を停止
- **効果**: 親テーマにナビ挙動を全面委譲（既定false）

### 3. スムーススクロール・アンカーオフセット
- **場所**: `style.css`
- **内容**: `:root` 変数、`html{scroll-behavior; scroll-padding-top}`
- **対応**: `body.admin-bar` での管理バー分可変化

## 現在のファイル状態
### `style.css`（メインスタイル）
- ✅ ヘッダー系上書きを削除済み
- ✅ スムーススクロール・オフセット実装済み  
- ✅ `.l-fixHeader` 安定化維持
- ⚠️ **100vw問題未対応**: `.ptl-pageNavHero`、`#news`、`.ptl-bustIssues` の `width:100vw` + `calc(50%-50vw)` 残存

### `functions.php`（関数ファイル）
- ✅ 親委譲フラグ `PTL_ENABLE_FRONT_NAV_OVERRIDES = false` 設定済み
- ✅ ヘッダー可視化ガード有効
- ✅ 既存のCustomizer・ショートコード機能維持

### CSS関連
- `css/ptl-layout.css`（レイアウト）: commitmentセクション用、ナビと幅統一
- `css/navigation.css`（ナビ）: フロントページ限定、現在停止中（フラグにより）
- `css/reasons-styles.css`（リーズン）: reasons系セクション用
- `css/section-menu.css`（セクションメニュー）: メニューセクション用

## 残存する課題・次回対応予定
### 1. SVゾーン修正（次回作業）
- **対象**: 未特定（継続作業で明確化予定）
- **アプローチ**: レイアウト系CSS修正が中心と推測
- **参考**: **SVの作業ログを参照すること**（詳細な修正内容・手順が記載されている可能性）

### 2. 100vw問題（必要に応じて）
- **症状**: フルブリード要素の横幅がスクロールバー分超過
- **対象セレクタ**: 
  - `.ptl-pageNavHero { width: 100vw; margin-left: calc(50% - 50vw); ... }`
  - `#news { width: 100vw; margin-left: calc(50% - 50vw); ... }`  
  - `.ptl-bustIssues { width: 100vw; margin-left: calc(50% - 50vw); ... }`
- **対症療法**: `html, body { overflow-x: hidden; }` で隠蔽中

## 作業履歴・ツール
### 使用コマンド
```bash
# 構文チェック
php -l swell_child/functions.php

# rsync（本番反映）
rsync -avz --progress swell_child/ user@server:/path/to/wp-content/themes/swell_child/

# SSH接続
ssh user@www3521.sakura.ne.jp
```

### デプロイ予定
- **サーバー**: www3521.sakura.ne.jp (Sakura)
- **パス**: `/home/patolaqshe/www/media/wp-content/themes/swell_child`
- **対象**: `functions.php`, `style.css` の2ファイルのみ
- **要バックアップ**: タイムスタンプ付きでサーバー側バックアップ作成