# BLOGとFOOTER間の隙間 - 原因特定レポート

## 1. 問題の症状
- **BLOGセクション**（青い線）と**FOOTER**（グレーの線）の間に**茶色の隙間**がある
- 隙間の推定サイズ: **40px ～ 80px**（視覚的には透明で茶色が透けて見える）

---

## 2. HTML構造

### BLOGセクション（front-page.php）
```php
<?php get_template_part('template-parts/front/section', 'blog'); ?>
```
- **親要素**: `.l-mainContent` (SWELL テーマの標準レイアウト要素)
- **セクション本体**: `<section id="section-blog" class="ptl-section ptlBlog">`（line 20 in section-blog.php）
- **終了タグ**: `</section>`（line 79 in section-blog.php）

### FOOTER（footer.php）
- **冒頭の `</div>`**: `</div>` (line 11 in footer.php、サイドバー用のdivが閉じている)
- **`</main>` タグ**: front-page.php の最後（BLOGセクション直後）
- **フッター本体**: `<footer id="footer" class="l-footer">`（line 22 in footer.php）

### BLOGとFOOTERの間に存在する要素
```
1. </main>                  ← front-page.php から返される
2. </div>                   ← SWELL テーマの l-mainContent__inner 閉じ
3. <!-- before_footer ウィジェット -->  （該当なし）
4. <!-- ぱんくず -->        （設定で非表示）
5. <footer>                 ← footer.php から開始
```

**重要**: BLOGセクション終了 → main 閉じ → l-mainContent__inner 閉じ → FOOTER開始

---

## 3. CSS設定の詳細

### BLOGセクション (#section-blog)

**PC/SP共通 (section-blog.css):**
```css
#section-blog {
  margin-top: 0;
  margin-bottom: 80px;  /* ← ここが重要！ */
}
```
- **Line 12-14** in section-blog.css

**SP専用 (section-blog-sp.css、767px以下):**
```css
#section-blog {
  margin-bottom: 40px;  /* ← 上書きされる！ */
}
```
- **Line 29** in section-blog-sp.css

### .ptlBlog（BLOGコンテナ）

**section-blog.css:**
```css
.ptlBlog {
  position: relative;
  isolation: isolate;
  background: transparent;  /* ← 重要：透明 */
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  /* padding設定削除: 余白はmargin-bottomで管理 */
}
```
- **Line 36-48** in section-blog.css

### 親コンテナ (.hero-section + .l-mainContent__inner)

**section-blog.css：**
```css
.hero-section + .l-mainContent,
.hero-section + .l-mainContent__inner {
  padding-top: 0;
  margin-top: 0;
  background: transparent;  /* ← これが根本原因！ */
}

.hero-section + .l-mainContent__inner {
  background: transparent;  /* ← 重複確認 */
  border: none;
}
```
- **Line 4-28** in section-blog.css

**global-backgrounds-sp.css (SP版):**
```css
/* 親コンテナは背景指定なし */
/* section-blog-sp.css で上書きされているはず... */
.hero-section + .l-mainContent,
.hero-section + .l-mainContent__inner {
  outline: 2px dotted rgba(0, 255, 0, 0.5) !important;  /* デバッグ線のみ */
}
```
- **Line 333-337** in global-backgrounds-sp.css

### FOOTER (#footer, .l-footer)

**footer.css:**
```css
#footer {
  margin: 0;
  padding: 0;
}

.ptl-footer {
  background: #fff;
}

.ptl-footer-inner {
  padding: 40px 20px 20px 20px;
  margin: 0 auto;
}
```

**footer-sp.css (SP版、767px以下):**
```css
.ptl-footer {
  background: #fff;
}

.ptl-footer-inner {
  padding: 30px 20px 24px;  /* ← SP版ではpaddingが異なる */
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
}
```

---

## 4. CSS詳細度と読み込み順序

### functions.php での読み込み順序（重要度順）

1. **global-backgrounds-sp.css** (優先度 5)
   ```
   wp_enqueue_style('ptl-global-backgrounds-sp', ..., [], filemtime, 'screen and (max-width: 767px)')
   ```
   - **最初に読み込まれる** (優先度5 = 早い)
   - `.hero-section + .l-mainContent__inner { outline: ... }` のみ
   - **背景指定なし！**

2. **section-blog.css** (優先度 30、['child_style'] 依存)
   ```
   wp_enqueue_style('ptl-blog', ..., ['child_style'], filemtime)
   ```
   - **2番目に読み込まれる**（優先度30）
   - `.hero-section + .l-mainContent__inner { background: transparent; }` ← **これで上書き**
   - `.ptlBlog { background: transparent; }` ← **BLOGコンテナも透明**

3. **section-blog-sp.css** (優先度 30、['ptl-blog'] 依存、media query: max-width 767px)
   ```
   wp_enqueue_style('ptlBlog-sp', ..., ['ptl-blog'], filemtime, 'screen and (max-width: 767px)')
   ```
   - **3番目に読み込まれる**（優先度30、後発のため勝つはず）
   - ✅ `.hero-section + .l-mainContent__inner { background: #fff !important; }` ← **修正済み**
   - ✅ `.ptlBlog { background: #fff !important; }` ← **修正済み**
   - ✅ `#section-blog { margin-bottom: 40px; }` ← **PC版の80pxをSP版で40pxに調整**

4. **footer.css** (優先度 30、['child_style'] 依存)
5. **footer-sp.css** (優先度 30、['ptl_footer'] 依存、media query: max-width 767px)

---

## 5. 原因の特定

### 🔴 根本原因: `margin-bottom` の値の問題

**SP版での余白の流れ:**

```
┌─────────────────────────────────────────┐
│ BLOGセクション (.ptlBlog)              │
│ - background: #fff !important ✅        │
│ - margin-bottom: 40px (SP版)            │  ← 40px の隙間
└─────────────────────────────────────────┘
                  ↓ 40px ↓
┌─────────────────────────────────────────┐
│ FOOTER (.l-footer, .ptl-footer)         │
│ - background: #fff ✅                   │
│ - padding-top: 40px (footer-inner)      │  ← パディング開始
└─────────────────────────────────────────┘
```

**しかし実際には...**

```
BLOGセクション本体: <section>（白背景 ✅）
  ↓
セクション終了: </section>
  ↓
ここに margin-bottom: 40px の隙間が生成される
  ↓ ← ★ ここが茶色に見える！
  ↓   （親のヒーロー背景が透ける）
  ↓
FOOTER開始: <footer>（白背景）
```

### 🟠 二次的な問題: section-blog-sp.css で親コンテナの背景は上書きされているが...

section-blog-sp.css で設定：
```css
.hero-section + .l-mainContent__inner {
  background: #fff !important;
}
```

しかし、問題は：
- **この背景は `.l-mainContent__inner` コンテナのみ**
- BLOGセクションの `margin-bottom: 40px` は**そのコンテナの外に出ている**
- つまり、コンテナの背景は白でも、margin エリアは背景がないため茶色が透ける

### 🟡 実際の原因 - 完全に特定

```html
<div class="hero-section"> ... </div>  ← 背景: 茶色のグラデーション

<div class="l-mainContent">           ← 背景: transparent (section-blog.css)
  <div class="l-mainContent__inner">   ← 背景: #fff !important (section-blog-sp.css) ✅
    
    <section id="section-blog">        ← 背景: #fff !important (section-blog-sp.css) ✅
      <!-- BLOG content -->
    </section>
    
    <!-- ★ ここに margin-bottom: 40px が適用される ★ -->
    <!-- 親コンテナ (.l-mainContent__inner) の背景も及ばない -->
    <!-- 下層の .l-mainContent (background: transparent) が露出 -->
    <!-- さらに下の hero-section の茶色が透ける -->
    
  </div>  ← .l-mainContent__inner 閉じ
</div>    ← .l-mainContent 閉じ

<footer>...</footer>
```

**つまり:**
- `#section-blog` の `margin-bottom: 40px` で隙間が生成される
- その隙間は `.l-mainContent__inner` の外側にある
- 外側の `.l-mainContent` が `background: transparent`
- その下の `hero-section` の茶色が透ける

---

## 6. 解決策の検討

### ❌ 解決策A: margin-bottom を 0 にする
```css
#section-blog {
  margin-bottom: 0;
}
```
**問題**: BLOGとFOOTERがくっついてしまう（セクション間の標準余白がなくなる）

### ✅ 解決策B: 親コンテナ `.l-mainContent` の背景を白にする（推奨）
```css
/* section-blog-sp.css に追加 */
.hero-section + .l-mainContent {
  background: #fff !important;
}
```
**利点:**
- margin エリアも白背景でカバーされる
- 他のセクションにも良い影響（安全）
- margin-bottom の余白が保持される

### ✅ 解決策C: padding で隙間を作る（代替案）
```css
#section-blog {
  margin-bottom: 0;
  padding-bottom: 40px;  /* marginをpaddingに変更 */
}
```
**利点:**
- padding は要素内側なので背景でカバーされる
- marginに比べてセマンティクスが正確

### ✅ 解決策D: margin-bottom を smaller value にする
```css
#section-blog {
  margin-bottom: 20px;  /* 40px → 20px に削減 */
}
```
**利点:**
- 隙間が小さくなるため茶色が目立たない
**欠点:**
- 根本解決ではない（小さくなるだけ）

---

## 7. 推奨する解決策

### **推奨: 解決策B + C の組み合わせ**

**対象ファイル:** `swell_child/css/sp/section-blog-sp.css`

**追加するコード:**
```css
/* BLOGセクション外側の親コンテナ背景も白に（margin領域をカバー） */
.hero-section + .l-mainContent {
  background: #fff !important;
}
```

**理由:**
1. **margin エリアの茶色透けを完全に解決**
2. **section-blog.css での `margin-bottom: 80px` (PC) / `margin-bottom: 40px` (SP) を保持**
3. **他のセクション（COMMITMENT/USERVOICE等）にも波及効果あり（安全）**
4. **PC版には影響なし**（SP版メディアクエリのみ）
5. **デザイン上の余白を保つことができる**

---

## 8. 現在の section-blog-sp.css の状態

```css
/* 親コンテナ（SWELL）の透明背景を白に上書き */
.hero-section + .l-mainContent,        /* ← ここに既に記述あり */
.hero-section + .l-mainContent__inner {
  background: #fff !important;
}
```

**✅ 実は既に修正されている！**

line 7-8 in section-blog-sp.css で `.hero-section + .l-mainContent` に `background: #fff !important` が設定されている。

**なのになぜ茶色が見えるのか？**

---

## 9. 再調査: なぜ修正されているのに茶色が見えるのか？

### 仮説1: ブラウザキャッシュ
- section-blog-sp.css の修正はされているが、ブラウザがキャッシュしている可能性

### 仮説2: メディアクエリが機能していない
- `@media screen and (max-width: 767px)` が適用されていない可能性

### 仮説3: 詳細度の問題
- section-blog.css の `.hero-section + .l-mainContent { background: transparent; }` が勝っている可能性

### 仮説4: 読み込み順序の問題
- section-blog-sp.css の読み込みが遅れている可能性

---

## 10. 最終確認が必要な項目

ブラウザのデベロッパーツールで以下を確認してください：

1. **SP版（767px以下）で section-blog-sp.css が読み込まれているか**
   - Network タブで確認

2. **`.hero-section + .l-mainContent` に `background: #fff` が適用されているか**
   - Elements タブで `.l-mainContent` を選択し、Computed styles を確認

3. **section-blog.css の透明背景が勝っていないか**
   - Styles パネルで background プロパティの詳細度を確認

4. **実際の margin-bottom の値は何か**
   - `#section-blog` の Computed styles で margin-bottom を確認

---

## 11. 次のステップ

**ブラウザで以下を確認してください:**
1. Cmd+Shift+R を5回スーパーリロード
2. DevTools → Elements → `.l-mainContent` を検索
3. Computed Styles で `background` プロパティを確認
4. もし `background: transparent` になっていたら、cache-bust.php の値を新しく更新
5. 再度スーパーリロード

---

# サマリー

| 項目 | 値 |
|------|-----|
| **問題** | BLOGとFOOTER間に茶色の隙間 |
| **原因** | `#section-blog { margin-bottom: 40px (SP) / 80px (PC) }` と、そのmargin領域が white background でカバーされていない |
| **根本的な原因** | section-blog.css で `.hero-section + .l-mainContent { background: transparent }` が設定されており、margin エリアが透けている |
| **現在の修正状況** | section-blog-sp.css で `.hero-section + .l-mainContent { background: #fff !important; }` が既に設定済み（なのに見える理由は要調査） |
| **推奨される次の確認** | ブラウザキャッシュ、メディアクエリ、詳細度の確認 |

