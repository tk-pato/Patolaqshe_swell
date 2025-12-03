# ScrollボタンSP位置変更 検索レポート

## 検索実行日時
2025年11月26日

## 検索対象
- リポジトリ：tk-pato/Patolaqshe_swell
- ブランチ：main
- 最新コミット：`6fbb362` (Fix: SPホバー時のテキストカラーを白のまま維持)
- 検索キーワード：`.p-mainVisual__scroll`

---

## 検索結果

### ✅ 該当CSSファイル発見

**ファイルパス:**
```
/Users/tk/Patolaqshe_swell/swell_child/css/sp/hero-scroll-sp.css
```

**該当行番号:**
- Line 9-14（CSSルールセット全体）

**該当コード全文:**
```css
/* ===========================
   Hero Scroll Button - SP Styles
   SPでScrollボタンを上に移動
   適用条件: 959px以下
   =========================== */

@media (max-width: 959px) {
  /* Scrollボタンを画面下から70%の位置、左右中央に配置 */
  .p-mainVisual__scroll {
    bottom: 30vh !important;
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%) !important;
  }
}
```

---

## コード解説

### 適用条件
- **メディアクエリ:** `@media (max-width: 959px)`
  - 画面幅959px以下（SP表示）で適用

### 位置調整内容
1. **`bottom: 30vh !important;`**
   - 画面下から30vh（ビューポート高さの30%）の位置に配置
   - 画面下から70%の高さに表示

2. **`left: 50% !important;`**
   - 左端から50%の位置に配置

3. **`right: auto !important;`**
   - 右位置指定を無効化

4. **`transform: translateX(-50%) !important;`**
   - 左に50%移動して左右中央揃え
   - `left: 50%`と組み合わせて完全な中央配置を実現

### 優先度
- すべてのプロパティに`!important`を使用
  - 親テーマや他のCSSルールを強制的に上書き

---

## その他の関連ファイル

### JavaScript制御ファイル
**ファイルパス:**
```
/Users/tk/Patolaqshe_swell/swell_child/js/hero-scroll-toggle.js
```

**該当箇所（Line 9）:**
```javascript
const scrollBtn = document.querySelector('.p-mainVisual__scroll');
```

このJSファイルはScrollボタンの表示/非表示切り替えを制御していますが、位置調整には関与していません。

---

## 検証結果

### ファイル読み込み状態
`hero-scroll-sp.css`はWordPress子テーマの`functions.php`から以下の方法で読み込まれている想定：

```php
// functions.phpでの読み込み例（推測）
wp_enqueue_style(
    'hero-scroll-sp-style',
    get_stylesheet_directory_uri() . '/css/sp/hero-scroll-sp.css',
    array(),
    null
);
```

**確認方法:**
`swell_child/functions.php`の`wp_enqueue_style`セクションを確認してください。

---

## まとめ

✅ **ScrollボタンのSP位置変更CSSを特定**
- **該当ファイル:** `swell_child/css/sp/hero-scroll-sp.css`
- **該当行:** 9-14行目
- **変更内容:** 画面下から30vh（70%の高さ）、左右中央に配置
- **適用条件:** 画面幅959px以下

📌 **変更が必要な場合:**
このファイルの`bottom: 30vh`の値を変更することで、SP表示時のScrollボタン位置を調整できます。

例:
- より下に配置: `bottom: 20vh`（画面下から20%）
- より上に配置: `bottom: 40vh`（画面下から40%）
