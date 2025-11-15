# MENU・COMMITMENT ガラス効果が見えない根本原因 - 確定レポート

**作成日時**: 2025年11月13日 17:35  
**最終commit**: 5f90cd6  
**検証方法**: サーバー上のHTML構造分析

---

## 🔴 根本原因（確定）

### 背景画像レイヤーのHTMLが存在しない

**BUST-ISSUES（動いている）**の HTML構造:
```html
<section id="bust-issues" class="ptlIssues ptlNavHero is-translucent has-bg">
  <!-- ★背景画像レイヤーが存在する -->
  <div class="ptlIssues__bg ptlNavHero__bg" aria-hidden="true">
    <picture class="ptlIssues__image ptlNavHero__image">
      <source media="(max-width: 767px)" srcset=".../nail.jpg">
      <img src=".../spa.jpg" alt="" decoding="async">
    </picture>
    <div class="ptlIssues__overlay ptlNavHero__overlay" style="--overlay: 0.25"></div>
  </div>
  
  <!-- コンテンツ -->
  <div class="ptl-section__inner">
    <div class="ptlIssues__card">...</div>
  </div>
</section>
```

**MENU（動いていない）**の HTML構造:
```html
<section id="menu" class="ptlMenuHero is-translucent has-bg">
  <!-- ❌ 背景画像レイヤーが存在しない -->
  
  <!-- コンテンツのみ -->
  <div class="ptl-section__inner">
    <h2 class="ptl-section__title">MENU</h2>
    <div class="ptlMenu__content">
      <div class="ptlMenu__mainContent">...</div>
    </div>
  </div>
</section>
```

**COMMITMENT（動いていない）**の HTML構造:
```html
<section id="section-commitment" class="ptlCommitHero is-translucent has-bg">
  <!-- ❌ 背景画像レイヤーが存在しない -->
  
  <!-- コンテンツのみ -->
  <div class="ptl-section__inner">
    <h2 class="ptl-section__title">COMMITMENT</h2>
    <div class="ptlCommitHero__grid">
      <div class="ptlCommitHero__btn">...</div>
    </div>
  </div>
</section>
```

---

## 🔬 技術的な説明

### なぜ白く見えるのか

#### ステップ1: CSSは正しく適用されている

**PC専用CSS** (`css/pc/section-menu.css`):
```css
#menu .ptlMenu__main .ptlMenu__mainContent,
#menu .ptlMenu__sub .ptlMenu__subItem {
  background: rgba(255, 255, 255, 0.25) !important;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12) !important;
}
```

**状態**: ✅ サーバーで確認済み、HTMLで読み込まれている

#### ステップ2: 背景画像がない

**レイヤー構造**:
```
┌─────────────────────────────────────┐
│ <section id="menu">                 │
│                                     │
│ （背景画像レイヤーなし）            │ ← ここに何もない
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ <div class="ptlMenu__mainContent">│ │
│ │ background: rgba(255,255,255,0.25)│ │
│ │                                   │ │
│ │ カードコンテンツ                  │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
         ↓
   白いページ背景
```

#### ステップ3: 色の合成

```
背景色: rgb(255, 255, 255) = 白（ページ背景）
カード: rgba(255, 255, 255, 0.25) = 25%不透明の白

合成結果 = (255, 255, 255) × 0.25 + (255, 255, 255) × 0.75
        = 63.75 + 191.25
        = 255
        = 白
```

**結論**: 白い背景の上に25%不透明の白いカードを置くと、視覚的に白に見える

---

## 📊 PHP テンプレートの検証

### MENU テンプレート (`template-parts/front/section-menu.php`)

**行番号 23-30**:
```php
<section id="menu" class="ptlMenuHero is-translucent<?php echo $has_bg ? ' has-bg' : ''; ?>">
    <div class="ptl-section__inner">
        <h2 class="ptl-section__title">MENU</h2>
        <div class="ptl-section__subtitle">...</div>
        <div class="ptl-section__ornament">...</div>

        <!-- MENU Content (Rococo Style) -->
        <div class="ptlMenu__content">
```

**問題点**: `<section>` の直後に背景画像レイヤーがない

### COMMITMENT テンプレート (`template-parts/front/section-commitment.php`)

**問題点**: `<section>` の直後に背景画像レイヤーがない

### BUST-ISSUES テンプレート（比較対象）

**推定構造**（動いているので背景画像レイヤーがある）:
```php
<section id="bust-issues" class="ptlIssues ptlNavHero is-translucent has-bg">
    <!-- 背景画像レイヤー -->
    <?php if ($has_bg): ?>
    <div class="ptlIssues__bg ptlNavHero__bg" aria-hidden="true">
        <?php if ($video_url): ?>
            <video class="ptlIssues__video" autoplay muted loop playsinline>
                <source src="<?php echo esc_url($video_url); ?>" type="video/mp4">
            </video>
        <?php else: ?>
            <picture class="ptlIssues__image ptlNavHero__image">
                <source media="(max-width: 767px)" srcset="<?php echo esc_url($bg_sp); ?>">
                <img src="<?php echo esc_url($bg_pc); ?>" alt="" decoding="async">
            </picture>
        <?php endif; ?>
        <div class="ptlIssues__overlay ptlNavHero__overlay" style="--overlay: <?php echo esc_attr($overlay); ?>"></div>
    </div>
    <?php endif; ?>
    
    <!-- コンテンツ -->
    <div class="ptl-section__inner">
        ...
    </div>
</section>
```

---

## ✅ 解決策

### オプション1: PHPテンプレートに背景画像レイヤーを追加（根本解決）

#### MENU (`template-parts/front/section-menu.php`)

**修正箇所**: 行23の`<section>`直後

**追加コード**:
```php
<section id="menu" class="ptlMenuHero is-translucent<?php echo $has_bg ? ' has-bg' : ''; ?>">
    <!-- ★追加: 背景画像レイヤー -->
    <?php if ($has_bg): ?>
    <div class="ptlMenu__bg ptlNavHero__bg" aria-hidden="true">
        <?php if ($video_url): ?>
            <video class="ptlMenu__video ptlNavHero__video" autoplay muted loop playsinline>
                <source src="<?php echo esc_url($video_url); ?>" type="video/mp4">
            </video>
        <?php else: ?>
            <picture class="ptlMenu__image ptlNavHero__image">
                <source media="(max-width: 767px)" srcset="<?php echo esc_url($bg_sp); ?>">
                <img src="<?php echo esc_url($bg_pc); ?>" alt="" decoding="async">
            </picture>
        <?php endif; ?>
        <div class="ptlMenu__overlay ptlNavHero__overlay" style="--overlay: <?php echo esc_attr($overlay); ?>"></div>
    </div>
    <?php endif; ?>
    
    <!-- 既存のコンテンツ -->
    <div class="ptl-section__inner">
```

#### COMMITMENT (`template-parts/front/section-commitment.php`)

**修正箇所**: `<section>`直後

**追加コード**:
```php
<section id="section-commitment" class="ptlCommitHero is-translucent<?php echo $has_bg ? ' has-bg' : ''; ?>">
    <!-- ★追加: 背景画像レイヤー -->
    <?php if ($has_bg): ?>
    <div class="ptlCommitHero__bg ptlNavHero__bg" aria-hidden="true">
        <?php if ($video_url): ?>
            <video class="ptlCommitHero__video ptlNavHero__video" autoplay muted loop playsinline>
                <source src="<?php echo esc_url($video_url); ?>" type="video/mp4">
            </video>
        <?php else: ?>
            <picture class="ptlCommitHero__image ptlNavHero__image">
                <source media="(max-width: 767px)" srcset="<?php echo esc_url($bg_sp); ?>">
                <img src="<?php echo esc_url($bg_pc); ?>" alt="" decoding="async">
            </picture>
        <?php endif; ?>
        <div class="ptlCommitHero__overlay ptlNavHero__overlay" style="--overlay: <?php echo esc_attr($overlay); ?>"></div>
    </div>
    <?php endif; ?>
    
    <!-- 既存のコンテンツ -->
    <div class="ptl-section__inner">
```

### オプション2: CSS側で不透明度を上げる（簡易、視覚効果は期待できない）

**PC CSS修正**:
```css
#menu .ptlMenu__main .ptlMenu__mainContent,
#menu .ptlMenu__sub .ptlMenu__subItem {
  background: rgba(255, 255, 255, 0.90) !important;  /* 90%不透明 */
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12) !important;
}
```

**効果**: より白いカードになる、透明効果は期待できない

### オプション3: セクション全体に背景色を設定（簡易）

**共通CSS追加**:
```css
#menu,
#section-commitment {
  background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
}
```

**効果**: グレーグラデーション背景の上に白カード → 少し目立つ

---

## 🎯 なぜこうなったのか

### 仮説1: テンプレート作成時に背景画像レイヤーを省略した

**可能性**: MENU・COMMITMENTセクションを作成した際、背景画像不要と判断して省略した

### 仮説2: 背景画像変数が空のため条件分岐でスキップされた

**現在のコード** (`section-menu.php` 行20):
```php
$has_bg = !empty($video_url) || !empty($bg_pc) || !empty($bg_sp);
```

**しかし**: `has-bg` クラスは付いている（HTMLで確認済み）→ この仮説は不成立

### 仮説3: 元々背景画像レイヤーのコードが存在しない

**確定**: PHPテンプレートファイルに背景画像レイヤーのコードが**書かれていない**

---

## 📋 実装手順

### ステップ1: MENUテンプレート修正

```bash
# ファイル編集
vim /Users/tk/Patolaqshe_swell/swell_child/template-parts/front/section-menu.php

# 行23の <section> 直後に背景画像レイヤーを追加
```

### ステップ2: COMMITMENTテンプレート修正

```bash
# ファイル編集
vim /Users/tk/Patolaqshe_swell/swell_child/template-parts/front/section-commitment.php

# <section> 直後に背景画像レイヤーを追加
```

### ステップ3: 背景画像の準備

```bash
# 画像ファイルをアップロード
# PC用: swell_child/img/menu-bg-pc.jpg (推奨サイズ: 1920x1080)
# SP用: swell_child/img/menu-bg-sp.jpg (推奨サイズ: 750x1334)
# PC用: swell_child/img/commitment-bg-pc.jpg
# SP用: swell_child/img/commitment-bg-sp.jpg
```

### ステップ4: Git commit + push + サーバーアップロード

```bash
cd /Users/tk/Patolaqshe_swell
git add template-parts/front/section-menu.php template-parts/front/section-commitment.php
git commit -m "Add background image layer to MENU and COMMITMENT sections"
git push origin main

# サーバーアップロード
scp template-parts/front/section-menu.php sakura-prod:/home/patolaqshe/www/media/wp-content/themes/swell_child/template-parts/front/
scp template-parts/front/section-commitment.php sakura-prod:/home/patolaqshe/www/media/wp-content/themes/swell_child/template-parts/front/
```

### ステップ5: WordPressキャッシュクリア

```bash
ssh sakura-prod "cd /home/patolaqshe/www/media && /usr/local/bin/wp cache flush"
```

---

## 🎯 最終結論

### 問題の本質

**HTMLテンプレートに背景画像レイヤーが存在しないため、CSSの透明効果が見えない**

### CSS側の状況

✅ **完璧**: すべてのCSSが正しく設定され、配信されている

### HTML側の状況

❌ **不完全**: 背景画像レイヤーのHTML要素が存在しない

### 視覚的な結果

❌ **白く見える**: 白い背景の上に25%不透明の白いカード = 色の合成結果が白

### 解決策

✅ **PHPテンプレートに背景画像レイヤーのHTMLを追加する**

---

**作成者**: GitHub Copilot  
**最終更新**: 2025年11月13日 17:35  
**根本原因**: PHPテンプレートに背景画像レイヤーのHTMLが存在しない  
**解決策**: テンプレートファイルに背景画像レイヤーを追加
