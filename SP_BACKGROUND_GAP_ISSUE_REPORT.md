# SP版 背景抜け問題 - 修正レポート

**作成日時:** 2025年11月9日  
**最新コミット:** `225263c` (fix(CRITICAL): Set global-backgrounds-sp.css load priority to 999)  
**問題状態:** 未解決 - 全セクションで茶色いヒーロー背景が抜けて見える

---

## 1. 現在の問題点

### 症状
- **SPモード (767px以下)** で以下のセクション間に茶色いヒーロー背景が見える
  - PAGE-NAVIGATION (または COMMITMENT) の下
  - USERVOICE の下（かつ、次ボタン右側が中央寄りにズレている）
  - INFOHUB の下
  - BLOG と FOOTER の間

### 根本原因の仮説
1. セクション間の `margin-bottom` が要素の外側にあるため、白背景でカバーされない
2. 各セクションの個別CSS (`section-*-sp.css`) に `margin-bottom` や `padding-bottom` が設定されており、`global-backgrounds-sp.css` の `!important` ルールが効いていない
3. CSS読み込み順序の問題で、`global-backgrounds-sp.css` が個別セクションCSSに負けている

---

## 2. 実施した修正内容（時系列）

### 修正1: section-blog.css の透明背景を上書き (commit: 275122b)
```css
/* section-blog-sp.css */
body .hero-section + .l-mainContent,
body .hero-section + .l-mainContent__inner {
  background: #fff !important;
}
```
**結果:** 効果なし

---

### 修正2: 白背景レイヤーdiv削除、シンプル化 (commit: 053c3da)
- `front-page.php` から `<div class="ptl-white-bg-layer"></div>` を削除
- `.l-mainContent` に直接 `background: #ffffff` を適用
- 3層レイヤー構造から2層構造に変更

**結果:** 効果なし

---

### 修正3: ネガティブマージンでヒーローと重ねる (commit: 3193470)
```css
.l-mainContent {
  margin-top: -50vh !important;
  padding-top: 50vh !important;
}
```
**結果:** ヒーローに白壁が出現、即座にロールバック

---

### 修正4: マージンをパディングに変換 (commit: eaa2d40)
```css
body .l-mainContent section {
  margin-bottom: 0 !important;
  padding-bottom: 80px !important;
}
```
**結果:** 効果なし

---

### 修正5: 個別セクションSP版CSSのマージン削除 (commit: 586bc5e)
- `section-infohub-sp.css`: `padding-bottom: 40px` → `0`
- `section-commitment-sp.css`: `margin-bottom: 40px` → `0`
- `section-uservoice-sp.css`: `margin-bottom: 40px` → `0`
- `section-blog-sp.css`: `margin-bottom: 40px` → `0`
- `global-backgrounds-sp.css`: `.l-footer { margin-top: 0 !important; }`

**結果:** 効果なし

---

### 修正6: CSS読み込み優先度を変更 (commit: 225263c) ← **最新**
```php
// functions.php
add_action('wp_enqueue_scripts', function () {
  // global-backgrounds-sp.css
}, 999); // priority 5 → 999 に変更
```
**結果:** 効果なし

---

## 3. 現在のファイル構成

### SP版CSSファイル (13ファイル)
```
swell_child/css/sp/
├── footer-sp.css
├── global-backgrounds-sp.css          ← 統一管理用（priority 999）
├── issues-navigation-sp.css
├── navigation-sp.css
├── section-blog-sp.css
├── section-commitment-sp.css
├── section-infohub-sp.css
├── section-intro-sp.css
├── section-menu-sp.css
├── section-news-sp.css
├── section-order-sp.css
├── section-salon-sp.css
└── section-uservoice-sp.css
```

### functions.php でのCSS登録状況
**確認できた登録:**
- `ptl-uservoice-sp` (max-width: 767px)
- `ptlIntro-sp` (max-width: 767px)
- `ptlBlog-sp` (max-width: 767px)
- `ptl-global-backgrounds-sp` (max-width: 767px, priority: 999)

**未確認のファイル:**
- `section-infohub-sp.css` ← **登録されていない可能性**
- `section-commitment-sp.css` ← **登録されていない可能性**
- `section-news-sp.css`
- `section-menu-sp.css`
- `section-salon-sp.css`
- `footer-sp.css`
- `navigation-sp.css`
- `issues-navigation-sp.css`
- `section-order-sp.css`

---

## 4. 推定される真の問題 ⚠️ **重大な発見**

### **致命的な問題: メディアクエリの不一致**
```php
// global-backgrounds-sp.css
'screen and (max-width: 767px)'  // ← 767px以下でのみ適用

// しかし、多くの個別セクションCSS
'screen and (max-width: 959px)'  // ← 959px以下で適用
```

**影響:**
- `global-backgrounds-sp.css` は 767px以下でのみ白背景を適用
- 個別セクションCSS（salon, navigation, issues-navigation, footer）は 959px以下で適用
- **768px〜959pxの範囲で、個別CSSのmarginは効くが、global-backgroundsの白背景は効かない**
- これが「修正が効かない」根本原因の可能性が極めて高い

### functions.php でのCSS登録状況（完全版）

**max-width: 767px のファイル:**
✓ `ptl-global-backgrounds-sp` ← **統一管理用**
✓ `ptl-uservoice-sp`
✓ `ptlIntro-sp`
✓ `ptlBlog-sp`

**max-width: 959px のファイル（不一致）:**
✗ `ptl_section_salon-sp` ← **不一致！**
✗ `ptl-issues-sp` ← **不一致！**
✗ `ptl-navigation-sp` ← **不一致！**
✗ `ptl_footer-sp` ← **不一致！**

**未確認（登録自体が見つからない）:**
? `section-infohub-sp.css`
? `section-commitment-sp.css`
? `section-news-sp.css`
? `section-menu-sp.css`
? `section-order-sp.css`

---

## 5. 次に確認すべき事項

### 優先度1: SP版CSS登録の完全確認
```bash
# functions.php で section-infohub-sp.css を検索
grep -n "section-infohub-sp" swell_child/functions.php
grep -n "section-commitment-sp" swell_child/functions.php
grep -n "section-news-sp" swell_child/functions.php
grep -n "section-menu-sp" swell_child/functions.php
grep -n "section-salon-sp" swell_child/functions.php
```

### 優先度2: 実際にブラウザで読み込まれているCSSを確認
開発者ツール → Sources → CSS ファイル一覧で以下を確認:
- `global-backgrounds-sp.css` が読み込まれているか
- `section-infohub-sp.css` が読み込まれているか
- 各ファイルの内容が最新コミットと一致しているか

### 優先度3: 計算済みスタイルを確認
開発者ツール → Elements → セクション要素を選択 → Computed タブで:
- `margin-bottom` の値
- `padding-bottom` の値
- `background` の値
- どのCSSファイルから適用されているか

---

## 6. 推奨される修正アプローチ ✅

### **最優先: メディアクエリを統一する**

#### 方法A: 全てのSP版CSSを 767px に統一（推奨）
```php
// functions.php で以下を修正:
'screen and (max-width: 959px)' → 'screen and (max-width: 767px)'

// 対象ファイル:
- ptl_section_salon-sp
- ptl-issues-sp
- ptl-navigation-sp
- ptl_footer-sp
```

#### 方法B: global-backgrounds-sp.css を 959px に変更
```php
// functions.php line 330-340
'screen and (max-width: 767px)' → 'screen and (max-width: 959px)'
```
```css
/* global-backgrounds-sp.css line 8 */
@media screen and (max-width: 767px) → @media screen and (max-width: 959px)
```

**推奨理由:** SPブレークポイントは通常768px未満なので、方法Aが正しい。

---

## 7. RAWファイルリストとの照合

### 必要ファイル/css/sp/*.css の確認
```
必須: 13ファイル
✓ footer-sp.css
✓ global-backgrounds-sp.css
✓ issues-navigation-sp.css
✓ navigation-sp.css
✓ section-blog-sp.css
✓ section-commitment-sp.css
✓ section-infohub-sp.css
✓ section-intro-sp.css
✓ section-menu-sp.css
✓ section-news-sp.css
✓ section-order-sp.css
✓ section-salon-sp.css
✓ section-uservoice-sp.css
```

**漏れなし確認完了**

---

## 8. 修正プロンプト案（Claude向け）

```
【緊急】メディアクエリ不一致によるSP背景抜け問題

【根本原因が判明】
functions.php で、各SP版CSSのメディアクエリが不統一:
- global-backgrounds-sp.css: max-width: 767px
- salon/navigation/issues/footer-sp: max-width: 959px ← 不一致！

これにより、768px〜959pxの範囲で:
✗ 個別CSSのmargin-bottomは効く
✗ global-backgroundsの白背景は効かない
→ セクション間に茶色いヒーロー背景が抜ける

【修正依頼】
1. functions.php で以下4ファイルのメディアクエリを 959px → 767px に変更:
   - line 25: ptl-issues-sp
   - line 228: ptl_footer-sp
   - line 325: ptl_section_salon-sp
   - line 1047: ptl-navigation-sp

2. 未登録の可能性があるSP版CSSを確認・登録:
   - section-infohub-sp.css
   - section-commitment-sp.css
   - section-news-sp.css
   - section-menu-sp.css
   - section-order-sp.css

3. 全てのSP版CSSを 'screen and (max-width: 767px)' で統一

【期待する結果】
全てのSP版CSSが 767px以下で同時に適用され、
global-backgrounds-sp.css (priority: 999) が最後に読み込まれて
セクション間の白背景が確実にカバーされる。
```

---

## 9. まとめ

**現状:** 10回以上の修正を試みたが、全て効果なし  
**最新コミット:** 225263c  
**根本問題:** CSS読み込み順序または登録漏れの可能性が高い  
**次のステップ:** functions.php の完全監査 + 開発者ツールでの実態確認

---

**レポート作成者:** GitHub Copilot  
**対象プロジェクト:** Patolaqshe_swell  
**リポジトリ:** tk-pato/Patolaqshe_swell
