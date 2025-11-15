# MENU・COMMITMENT カード透明化 - 最終検証レポート

**作成日時**: 2025年11月13日 17:20  
**最終commit**: 5f90cd6  
**問題**: カードが白く見える

---

## ✅ 現在のサーバー状況

### CSS配信確認（2025-11-13 17:20時点）

#### MENU セクション

**HTML読み込み**:
```html
<!-- 共通CSS -->
<link rel='stylesheet' 
      id='ptl_section_menu-css' 
      href='.../css/section-menu.css?ver=1763018395' 
      media='all' />

<!-- PC専用CSS（960px以上） -->
<link rel='stylesheet' 
      id='ptl_section_menu-pc-css' 
      href='.../css/pc/section-menu.css?ver=1763018583' 
      media='screen and (min-width: 960px)' />

<!-- SP専用CSS（767px以下） -->
<link rel='stylesheet' 
      id='ptl_section_menu-sp-css' 
      href='.../css/sp/section-menu-sp.css?ver=1761802958' 
      media='screen and (max-width: 767px)' />
```

**バージョンタイムスタンプ**:
- 共通CSS: `1763018395` = 2025-11-13 17:19:55 JST
- PC CSS: `1763018583` = 2025-11-13 17:23:03 JST ← **最新**
- SP CSS: `1761802958` = 2024-10-28（変更なし）

**PC CSS内容（サーバー確認済み）**:
```css
/* メインカードとサブカードに25%半透明白背景を追加 */
#menu .ptlMenu__main .ptlMenu__mainContent,
#menu .ptlMenu__sub .ptlMenu__subItem {
  background: rgba(255, 255, 255, 0.25) !important;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12) !important;
}

/* カード内のすべての子要素を透明化してガラス調を表示 */
#menu .ptlMenu__mainContent *,
#menu .ptlMenu__subItem * {
  background: transparent !important;
}
```

#### COMMITMENT セクション

**HTML読み込み**:
```html
<!-- 共通CSS -->
<link rel='stylesheet' 
      id='ptlCommit-css' 
      href='.../css/section-commitment.css?ver=1763018586' 
      media='all' />

<!-- PC専用CSS（960px以上） -->
<link rel='stylesheet' 
      id='ptlCommit-pc-css' 
      href='.../css/pc/section-commitment.css?ver=1763018586' 
      media='screen and (min-width: 960px)' />

<!-- SP専用CSS（767px以下） -->
<link rel='stylesheet' 
      id='ptlCommit-sp-css' 
      href='.../css/sp/section-commitment-sp.css?ver=1761802958' 
      media='screen and (max-width: 767px)' />
```

**バージョンタイムスタンプ**:
- 共通CSS: `1763018586` = 2025-11-13 17:23:06 JST ← **最新**
- PC CSS: `1763018586` = 2025-11-13 17:23:06 JST ← **最新**
- SP CSS: `1761802958` = 2024-10-28（変更なし）

**PC CSS内容（サーバー確認済み）**:
```css
#section-commitment .ptlCommitHero__btn {
  min-height: 170px;
  padding: clamp(16px, 2vw, 24px) clamp(14px, 1.8vw, 20px);
  background: rgba(255, 255, 255, 0.25) !important;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12) !important;
}

/* カード内のすべての子要素を透明化してガラス調を表示 */
#section-commitment .ptlCommitHero__btn * {
  background: transparent !important;
}
```

---

## 🔍 問題の本質

### CSSは正しく適用されている

**サーバー側確認項目**:
- ✅ PC CSSファイル存在: `/home/patolaqshe/www/media/.../css/pc/section-*.css`
- ✅ HTMLでの読み込み: `<link>` タグにPC CSSが記載されている
- ✅ メディアクエリ: `media='screen and (min-width: 960px)'` 正しい
- ✅ CSS内容: `background: rgba(255, 255, 255, 0.25) !important` 記載されている
- ✅ 子要素透明化: `background: transparent !important` 記載されている
- ✅ バージョン: 最新タイムスタンプ（17:23）

### なぜ白く見えるのか

#### 原因1: 白い背景の上に25%不透明の白

**色の計算**:
```
ページ背景: rgb(255, 255, 255) = 白
カード: rgba(255, 255, 255, 0.25) = 25%不透明の白

合成結果 = (255, 255, 255) × 0.25 + (255, 255, 255) × 0.75
        = 255, 255, 255
        = 白
```

**視覚的結果**: **白く見える**

#### 原因2: セクション背景画像がない

**BUST-ISSUESとの比較**:

```
BUST-ISSUES:
<section id="bust-issues">
  <div class="ptlIssues__bg">
    <picture>
      <img src=".../spa.jpg" alt="">  ← 背景画像がある
    </picture>
  </div>
  <div class="ptlIssues__card">...</div>
</section>

結果: 背景画像が透けて見える → ガラス調に見える
```

```
MENU・COMMITMENT:
<section id="menu">
  <!-- 背景画像なし -->
  <div class="ptl-section__inner">...</div>
</section>

結果: 白背景しか透けない → 白く見える
```

---

## 📊 ブラウザでの確認方法

### DevToolsでの確認手順

**1. ブラウザ幅を確認**

```
DevTools > Elements > 右上の「Toggle device toolbar」
または
DevTools > Console > 実行:
console.log(window.innerWidth + 'px')
```

**960px未満の場合**: PC CSSは適用されません（SPまたはタブレット表示）

**2. 適用されているCSSを確認**

```
DevTools > Elements > .ptlMenu__mainContent を選択 > Styles タブ
```

**確認項目**:
- `background-color: rgba(255, 255, 255, 0.25)` が表示されているか
- 取り消し線になっていないか
- ソースが `section-menu.css:12` （PC CSS）か

**3. 計算済みスタイルを確認**

```
DevTools > Elements > .ptlMenu__mainContent を選択 > Computed タブ
```

**確認項目**:
- `background-color: rgba(255, 255, 255, 0.25)` が最終値か

**4. 背景要素を確認**

```
DevTools > Elements > #menu を選択
```

**確認項目**:
- `<div class="ptlMenu__bg">` または `<picture>` タグがあるか
- **ない場合**: 背景画像がないため、白背景の上に透明カードを置いている状態

---

## 🎯 真の解決策

### オプション1: 背景画像を追加（根本解決）

**front-page.php を編集**:

```php
<section id="menu" class="ptlMenuHero is-translucent has-bg">
  <!-- ★追加: 背景画像レイヤー -->
  <div class="ptlMenu__bg ptlNavHero__bg" aria-hidden="true">
    <picture class="ptlMenu__image ptlNavHero__image">
      <source media="(max-width: 767px)" 
              srcset="<?php echo get_stylesheet_directory_uri(); ?>/img/menu-bg-sp.jpg">
      <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/menu-bg-pc.jpg" 
           alt="" 
           decoding="async">
    </picture>
    <div class="ptlMenu__overlay ptlNavHero__overlay" style="--overlay: 0.25"></div>
  </div>
  
  <!-- 既存のコンテンツ -->
  <div class="ptl-section__inner">...</div>
</section>
```

**CSS追加** (`css/section-menu.css`):

```css
#menu .ptlMenu__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

#menu .ptlMenu__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#menu .ptlMenu__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, var(--overlay, 0.25));
  z-index: 1;
}

#menu .ptl-section__inner {
  position: relative;
  z-index: 2;
}
```

**効果**: カードが背景画像を透かす → **真のガラス調**

### オプション2: 不透明度を上げる（視認性向上）

**PC CSS修正**:

```css
#menu .ptlMenu__main .ptlMenu__mainContent,
#menu .ptlMenu__sub .ptlMenu__subItem {
  background: rgba(255, 255, 255, 0.85) !important;  /* 85%不透明 */
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12) !important;
}
```

**効果**: より白いカード、透明効果は期待できない

### オプション3: セクション背景色を変更（簡易）

**共通CSS追加**:

```css
#menu {
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
}
```

**効果**: グレーグラデーション背景の上に白カード → 少し目立つ

---

## ❓ 現在わからないこと

### 1. ブラウザ幅が960px以上か？

**確認方法**:
```javascript
// DevTools > Console で実行
console.log(window.innerWidth);
```

**959px以下の場合**: PC CSSは読み込まれているが**適用されていない**

### 2. DevToolsで実際に適用されているCSSは？

**確認方法**:
```
DevTools > Elements > .ptlMenu__mainContent を右クリック > Inspect
> Styles タブで確認
```

**background-color が**:
- `rgba(255, 255, 255, 0.25)` → CSS適用されている
- `transparent` または白 → CSS適用されていない
- 取り消し線 → 他のCSSで上書きされている

### 3. ブラウザがbackdrop-filterをサポートしているか？

**確認方法**:
```javascript
// DevTools > Console で実行
console.log('backdrop-filter' in document.body.style);
```

**false の場合**: ブラウザがbackdrop-filterをサポートしていない（現在削除済みなので無関係）

### 4. 実際のページ背景色は白か？

**確認方法**:
```
DevTools > Elements > <body> を選択 > Computed タブ
> background-color を確認
```

**白以外（グレーや画像）の場合**: 透明効果が見える可能性がある

---

## 📋 次の検証手順

### ステップ1: ブラウザ幅確認

```javascript
// DevTools > Console
console.log('Width: ' + window.innerWidth + 'px');
console.log('PC CSS applies: ' + (window.innerWidth >= 960));
```

**960未満の場合**: SPまたはタブレット表示、PC CSSは適用されない

### ステップ2: CSS適用確認

```
DevTools > Elements > 
  .ptlMenu__mainContent を選択 > Styles タブ
```

**確認項目**:
1. `background-color: rgba(255, 255, 255, 0.25)` が表示されているか
2. 取り消し線になっていないか
3. ソースが `section-menu.css:12` （PC CSS）か

### ステップ3: 計算済みスタイル確認

```
DevTools > Elements > 
  .ptlMenu__mainContent を選択 > Computed タブ
```

**確認項目**:
- `background-color` の最終値は何か

### ステップ4: セクション背景確認

```
DevTools > Elements > #menu を選択
```

**確認項目**:
- `<div class="ptlMenu__bg">` があるか（ない場合: 背景画像なし）
- `background-color` または `background-image` は何か

---

## 🎯 結論

### サーバー側の状況

✅ **完璧**: すべてのCSSが正しく配信されている

### ブラウザ側の状況

❓ **不明**: 実際の適用状況を確認する必要がある

### 視覚的な問題

⚠️ **予想される原因**: 白い背景の上に25%不透明の白いカードを置いているため、色の合成結果が白になり、透明効果が見えない

### 推奨アクション

**最優先**: DevToolsで以下を確認
1. ブラウザ幅（960px以上か）
2. `.ptlMenu__mainContent` の `background-color`
3. セクション背景画像の有無
4. 実際のページ背景色

**結果によって**:
- 960px未満 → ブラウザを拡大
- CSSが適用されていない → 原因調査
- CSSが適用されているが白く見える → 背景画像追加またはセクション背景色変更

---

**作成者**: GitHub Copilot  
**最終更新**: 2025年11月13日 17:20  
**状況**: サーバー側は完璧、ブラウザ側の確認が必要
