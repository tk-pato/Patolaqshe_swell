# MENU・COMMITMENT カード透明化問題 検証レポート

**作成日時**: 2025年11月13日 16:45  
**最終commit**: 223eaa9  
**検証対象**: カードが白く見える原因の特定

---

## 🔍 検証1: サーバー上のCSS内容

### MENU PC CSS (`css/pc/section-menu.css`)

**サーバー確認結果**:
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

**✅ 状態**: 
- `background: rgba(255, 255, 255, 0.25) !important` - 存在
- `backdrop-filter` - 削除済み
- 子要素透明化 - 存在

### COMMITMENT PC CSS (`css/pc/section-commitment.css`)

**サーバー確認結果**:
```css
/* カードサイズの最適化 */
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

**✅ 状態**: 
- `background: rgba(255, 255, 255, 0.25) !important` - 存在
- `backdrop-filter` - 削除済み
- 子要素透明化 - 存在

---

## 🔍 検証2: HTML内のCSS読み込み

### MENU セクション

```html
<link rel='stylesheet' 
      id='ptl_section_menu-pc-css' 
      href='https://patolaqshe.com/media/wp-content/themes/swell_child/css/pc/section-menu.css?ver=1763018067' 
      type='text/css' 
      media='screen and (min-width: 960px)' />
```

**バージョン**: `1763018067` = 2025-11-13 16:41:07 JST（最新）

**メディアクエリ**: `screen and (min-width: 960px)`

**✅ 状態**: 正しく読み込まれている

### COMMITMENT セクション

```html
<link rel='stylesheet' 
      id='ptlCommit-pc-css' 
      href='https://patolaqshe.com/media/wp-content/themes/swell_child/css/pc/section-commitment.css?ver=1763018068' 
      type='text/css' 
      media='screen and (min-width: 960px)' />
```

**バージョン**: `1763018068` = 2025-11-13 16:41:08 JST（最新）

**メディアクエリ**: `screen and (min-width: 960px)`

**✅ 状態**: 正しく読み込まれている

---

## 🔍 検証3: 共通CSS（全デバイス）の内容

### MENU 共通CSS (`css/section-menu.css`)

**主要スタイル**:
```css
#menu .ptlMenu__mainContent {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#menu .ptlMenu__mainText {
  padding: 20px 30px;
}
```

**❌ 問題発見**: 
- `background` プロパティが**定義されていない** ← 良い
- しかし `.ptlMenu__mainText` に `padding: 20px 30px` がある
- テキスト部分が**白い背景を持っている可能性**

### COMMITMENT 共通CSS (`css/section-commitment.css`)

**主要スタイル**:
```css
#section-commitment .ptlCommitHero__btn {
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 8px;
  justify-items: center;
  color: #111;
  border-radius: 10px;
  padding: clamp(16px, 2vw, 24px) clamp(14px, 1.8vw, 20px);
  min-height: 170px;
  font-weight: 400;
  letter-spacing: .02em;
}
```

**❌ 問題発見**: 
- `background` プロパティが**定義されていない** ← 良い
- しかし共通CSSで基本スタイルが定義されている
- PC CSSの `background: rgba(255, 255, 255, 0.25) !important` が上書きしているはず

---

## 🔍 検証4: HTML構造の確認

### MENU カードの実際のHTML

```html
<div class="ptlMenu__mainContent">
  <a href="..." class="ptlMenu__mainLink">
    <div class="ptlMenu__mainImage">
      <img src=".../makup.jpg" alt="...">
    </div>
    <div class="ptlMenu__mainText">
      <h3 class="ptlMenu__mainTitle">テキストテキストテキスト</h3>
      <p class="ptlMenu__mainDesc">テキスト...</p>
    </div>
  </a>
</div>
```

**構造**:
- `.ptlMenu__mainContent` ← **ここにPC CSSで `background: rgba(255, 255, 255, 0.25)` 適用**
- `.ptlMenu__mainLink` ← 子要素（`background: transparent !important` 適用）
- `.ptlMenu__mainImage` ← 孫要素（`background: transparent !important` 適用）
- `.ptlMenu__mainText` ← 孫要素（`background: transparent !important` 適用）

### COMMITMENT カードの実際のHTML

```html
<div class="ptlCommitHero__btn">
  <span class="ptlCommitHero__icon">
    <img src=".../hair.jpg" alt="..." style="width:100%;display:block;aspect-ratio:4/3;object-fit:cover;border-radius:8px;">
  </span>
  <div class="ptlCommitHero__boxTitle">HAIR STYLING</div>
  <div class="ptlCommitHero__boxDesc">Beautiful, healthy hair...</div>
</div>
```

**構造**:
- `.ptlCommitHero__btn` ← **ここにPC CSSで `background: rgba(255, 255, 255, 0.25)` 適用**
- `.ptlCommitHero__icon` ← 子要素（`background: transparent !important` 適用）
- `.ptlCommitHero__boxTitle` ← 子要素（`background: transparent !important` 適用）
- `.ptlCommitHero__boxDesc` ← 子要素（`background: transparent !important` 適用）

---

## 🔍 検証5: CSSセレクターの詳細度

### MENU セクション

#### PC専用CSS（960px以上）

```css
#menu .ptlMenu__main .ptlMenu__mainContent {
  background: rgba(255, 255, 255, 0.25) !important;
}
```

**詳細度計算**:
- ID: `#menu` = 100点
- Class: `.ptlMenu__main` = 10点
- Class: `.ptlMenu__mainContent` = 10点
- **合計**: 120点
- **!important**: あり

### COMMITMENT セクション

#### PC専用CSS（960px以上）

```css
#section-commitment .ptlCommitHero__btn {
  background: rgba(255, 255, 255, 0.25) !important;
}
```

**詳細度計算**:
- ID: `#section-commitment` = 100点
- Class: `.ptlCommitHero__btn` = 10点
- **合計**: 110点
- **!important**: あり

---

## 🔍 検証6: メディアクエリの適用条件

### PC CSS適用条件

**条件**: `media="screen and (min-width: 960px)"`

**適用されるブラウザ幅**:
- ✅ 960px - 適用される
- ✅ 1024px - 適用される
- ✅ 1280px - 適用される
- ✅ 1440px - 適用される
- ✅ 1920px - 適用される
- ❌ 959px - **適用されない**
- ❌ 768px - **適用されない**
- ❌ 375px - **適用されない**

### 検証すべき項目

**ユーザーのブラウザ幅を確認する必要がある**:

1. **960px未満の場合**: PC CSSは読み込まれているが**適用されない**
2. **960px以上の場合**: PC CSSが適用されるはず

---

## 🔍 検証7: rgba(255, 255, 255, 0.25) の視覚効果

### 色の理論

**rgba(255, 255, 255, 0.25)** = 純白の25%不透明 = **75%透明**

### 背景が白い場合の計算

```
ページ背景: rgb(255, 255, 255) = 白
カード色: rgba(255, 255, 255, 0.25)

合成結果 = 前景色 × Alpha + 背景色 × (1 - Alpha)
        = (255, 255, 255) × 0.25 + (255, 255, 255) × 0.75
        = (63.75, 63.75, 63.75) + (191.25, 191.25, 191.25)
        = (255, 255, 255)
        = 白
```

**結論**: **白い背景の上に25%不透明の白いカードを置くと、視覚的には白に見える**

### 背景が濃い色の場合の計算

```
ページ背景: rgb(100, 100, 100) = グレー
カード色: rgba(255, 255, 255, 0.25)

合成結果 = (255, 255, 255) × 0.25 + (100, 100, 100) × 0.75
        = (63.75, 63.75, 63.75) + (75, 75, 75)
        = (138.75, 138.75, 138.75)
        = rgb(139, 139, 139) = 明るいグレー
```

**結論**: **濃い背景の上では透明効果が見える**

---

## 🎯 問題の特定

### 問題1: 背景が白いため視覚的に透明に見えない

**原因**: 
- MENUセクションの背景: 白
- COMMITMENTセクションの背景: 白
- カードの色: `rgba(255, 255, 255, 0.25)` = 25%不透明の白
- 合成結果: 白

**証拠**: 色の計算で証明済み

### 問題2: backdrop-filter削除により透明効果が完全に失われた

**原因**: 
- 以前: `backdrop-filter: blur(12px)` があった（機能しないが宣言はあった）
- 現在: `backdrop-filter` 削除済み
- 結果: ぼかし効果なし + 白背景の上に白カード = **完全に白く見える**

### 問題3: セクション背景画像がない

**BUST-ISSUES（比較対象）**:
```html
<section id="bust-issues" class="ptlIssues ptlNavHero is-translucent has-bg">
  <div class="ptlIssues__bg ptlNavHero__bg">
    <picture class="ptlIssues__image ptlNavHero__image">
      <img src=".../spa.jpg" alt="">
    </picture>
  </div>
  <div class="ptlIssues__card">...</div>
</section>
```

**✅ 状態**: `<picture>` で背景画像がある → 透明カードが背景画像を透かす → **視覚的に透明に見える**

**MENU・COMMITMENT**:
```html
<section id="menu" class="ptlMenuHero is-translucent has-bg">
  <!-- 背景画像なし -->
  <div class="ptl-section__inner">...</div>
</section>
```

**❌ 状態**: 背景画像がない → 白背景の上に白カード → **視覚的に白に見える**

---

## ✅ 解決策

### 解決策1: 背景画像を追加（推奨）

**MENU セクションに背景画像を追加**:

`front-page.php` または該当テンプレートファイルを編集:

```html
<section id="menu" class="ptlMenuHero is-translucent has-bg">
  <!-- 追加 -->
  <div class="ptlMenu__bg ptlNavHero__bg" aria-hidden="true">
    <picture class="ptlMenu__image ptlNavHero__image">
      <source media="(max-width: 767px)" srcset="<?php echo get_stylesheet_directory_uri(); ?>/img/menu-bg-sp.jpg">
      <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/menu-bg-pc.jpg" alt="" decoding="async">
    </picture>
    <div class="ptlMenu__overlay ptlNavHero__overlay" style="--overlay: 0.25"></div>
  </div>
  
  <div class="ptl-section__inner">
    <!-- 既存のコンテンツ -->
  </div>
</section>
```

**COMMITMENT セクションに背景画像を追加**:

```html
<section id="section-commitment" class="ptlCommitHero is-translucent has-bg">
  <!-- 追加 -->
  <div class="ptlCommitHero__bg ptlNavHero__bg" aria-hidden="true">
    <picture class="ptlCommitHero__image ptlNavHero__image">
      <source media="(max-width: 767px)" srcset="<?php echo get_stylesheet_directory_uri(); ?>/img/commitment-bg-sp.jpg">
      <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/commitment-bg-pc.jpg" alt="" decoding="async">
    </picture>
    <div class="ptlCommitHero__overlay ptlNavHero__overlay" style="--overlay: 0.25"></div>
  </div>
  
  <div class="ptl-section__inner">
    <!-- 既存のコンテンツ -->
  </div>
</section>
```

**CSS追加** (`css/section-menu.css` と `css/section-commitment.css`):

```css
/* 背景画像のスタイル（BUST-ISSUESと同じ） */
#menu .ptlMenu__bg,
#section-commitment .ptlCommitHero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

#menu .ptlMenu__image img,
#section-commitment .ptlCommitHero__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#menu .ptlMenu__overlay,
#section-commitment .ptlCommitHero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, var(--overlay, 0.25));
  z-index: 1;
}

#menu .ptl-section__inner,
#section-commitment .ptl-section__inner {
  position: relative;
  z-index: 2;
}
```

### 解決策2: 不透明度を上げる（簡易）

**PC CSS を修正**:

```css
/* より白いカード */
#menu .ptlMenu__main .ptlMenu__mainContent,
#menu .ptlMenu__sub .ptlMenu__subItem {
  background: rgba(255, 255, 255, 0.85) !important; /* 85%不透明 */
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12) !important;
}

#section-commitment .ptlCommitHero__btn {
  background: rgba(255, 255, 255, 0.85) !important; /* 85%不透明 */
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12) !important;
}
```

**効果**: より白いカードになるが、**透明効果は期待できない**

### 解決策3: セクション背景色を変える（簡易）

**共通CSS を修正**:

```css
/* セクション背景をグレーに */
#menu {
  background-color: #f5f5f5; /* 薄いグレー */
}

#section-commitment {
  background-color: #f5f5f5; /* 薄いグレー */
}
```

**効果**: グレー背景の上に白カード → **少し視覚的に白カードが目立つ**

---

## 📊 検証結果サマリー

| 検証項目 | 結果 | 状態 |
|---------|------|------|
| サーバーCSS（MENU PC） | `rgba(255, 255, 255, 0.25)` 存在 | ✅ 正しい |
| サーバーCSS（COMMITMENT PC） | `rgba(255, 255, 255, 0.25)` 存在 | ✅ 正しい |
| HTML CSS読み込み | PC CSS読み込まれている（ver=最新） | ✅ 正しい |
| メディアクエリ | `min-width: 960px` | ✅ 正しい（960px以上で適用） |
| 共通CSS | `background` 未定義 | ✅ 正しい（競合なし） |
| HTML構造 | 背景画像なし | ❌ **問題** |
| 色の合成 | 白背景 + 25%白 = 白 | ❌ **視覚的に白に見える** |
| CSS詳細度 | 120点（MENU）, 110点（COMMITMENT） + !important | ✅ 最強 |

---

## 🎯 最終結論

### 技術的には正しいが視覚的に効果がない

**CSS適用状況**: ✅ 完璧
- PC CSSは正しく読み込まれている
- セレクターの詳細度も十分
- !importantで強制適用している
- メディアクエリも正しい

**視覚的効果**: ❌ 白く見える
- 白い背景の上に25%不透明の白いカードを置いている
- 色の合成結果は白になる
- 背景画像がないため透明効果が見えない

### 推奨アクション

**オプション1（推奨）**: セクション背景画像を追加
- BUST-ISSUESと同じHTML構造にする
- `<picture>` タグで背景画像を追加
- 透明カードが背景画像を透かす → **真のガラス調**

**オプション2（簡易）**: 不透明度を85%に上げる
- より白いカードになる
- 透明効果は期待できないが、視認性は向上する

**オプション3（簡易）**: セクション背景色をグレーに
- 白カードが少し目立つ
- 簡単な変更で済む

---

**作成者**: GitHub Copilot  
**最終更新**: 2025年11月13日 16:45  
**結論**: CSSは正しく適用されているが、白背景の上に白カードのため視覚的に白く見える
