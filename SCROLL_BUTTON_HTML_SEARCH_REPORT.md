# ScrollボタンHTML構造 検索レポート

## 検索実行日時
2025年11月26日

## 検索対象
- リポジトリ：tk-pato/Patolaqshe_swell
- ブランチ：main
- 最新コミット：`6fbb362`
- 検索ディレクトリ：`swell_parent_reference/swell_parent_reference/`

---

## ✅ 検索結果：該当コードを発見

### 1. HTML出力関数（核心部分）

**ファイルパス:**
```
/Users/tk/Patolaqshe_swell/swell_parent_reference/swell_parent_reference/lib/pluggable_parts.php
```

**該当行番号:** 256-268行目

**ScrollボタンHTML出力コード全文:**
```php
/**
 * MV用スクロールアイコン
 */
if ( ! function_exists( 'swl_parts__scroll_arrow' ) ) :
	function swl_parts__scroll_arrow( $args ) {
		$color = $args['color'] ?? '';
	?>
		<button class="p-mainVisual__scroll c-plainBtn" data-onclick="scrollToContent" style="color:<?=esc_attr( $color )?>">
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 80 80" class="p-mainVisual__scrollArrow">
				<path d="M5.9,14.4l-2.9,5C3,19.5,3,19.6,3,19.8c0,0.1,0.1,0.2,0.2,0.3l36.4,21c0.1,0,0.2,0.1,0.3,0.1c0.1,0,0.2,0,0.3-0.1l36.4-21 c0.1-0.1,0.2-0.2,0.2-0.3c0-0.1,0-0.3-0.1-0.4l-2.9-5c-0.1-0.1-0.2-0.2-0.3-0.2c-0.1,0-0.3,0-0.4,0.1L40,33.5L6.7,14.2 c-0.1,0-0.2-0.1-0.3-0.1c0,0-0.1,0-0.1,0C6.1,14.2,6,14.3,5.9,14.4z"/>
				<path d="M5.9,39.1l-2.9,5c-0.1,0.3-0.1,0.6,0.2,0.7l36.4,21c0.1,0,0.2,0.1,0.3,0.1c0.1,0,0.2,0,0.3-0.1l36.4-21 c0.2-0.1,0.2-0.2,0.2-0.3s0-0.2-0.1-0.4l-2.9-5c-0.1-0.1-0.2-0.2-0.3-0.2l0,0c-0.1,0-0.3,0-0.4,0.1L40,58.1L6.7,38.9 c-0.1,0-0.2-0.1-0.3-0.1c0,0-0.1,0-0.1,0C6.1,38.8,6,38.9,5.9,39.1z"/>
			</svg>
			<span class="p-mainVisual__scrollLabel"><?=esc_html__( 'Scroll', 'swell' )?></span>
		</button>
		<?php
	}
endif;
```

---

### 2. 関数呼び出し箇所（3ファイル）

#### 2-1. シングルスライド型メインビジュアル

**ファイルパス:**
```
/Users/tk/Patolaqshe_swell/swell_parent_reference/swell_parent_reference/parts/top/main_visual-single.php
```

**該当行番号:** 65行目

**呼び出しコード:**
```php
<?php if ( $SETTING['mv_on_scroll'] ) \SWELL_Theme::pluggable_parts( 'scroll_arrow', ['color' => $SETTING['slider1_txtcol'] ] ); ?>
```

**表示条件:**
- `$SETTING['mv_on_scroll']`が`true`の場合に表示
- カスタマイザー設定で制御

---

#### 2-2. スライダー型メインビジュアル

**ファイルパス:**
```
/Users/tk/Patolaqshe_swell/swell_parent_reference/swell_parent_reference/parts/top/main_visual-slider.php
```

**該当行番号:** 135行目

**呼び出しコード:**
```php
if ( $SETTING['mv_on_scroll'] ) \SWELL_Theme::pluggable_parts( 'scroll_arrow', ['color' => $SETTING['slider1_txtcol'] ] );
```

**表示条件:**
- `$SETTING['mv_on_scroll']`が`true`の場合に表示

---

#### 2-3. 動画型メインビジュアル

**ファイルパス:**
```
/Users/tk/Patolaqshe_swell/swell_parent_reference/swell_parent_reference/parts/top/main_visual-movie.php
```

**該当行番号:** 71行目

**呼び出しコード:**
```php
<?php if ( $SETTING['mv_on_scroll'] ) \SWELL_Theme::pluggable_parts( 'scroll_arrow', [ 'color' => $txtcol ] ); ?>
```

**表示条件:**
- `$SETTING['mv_on_scroll']`が`true`の場合に表示

---

## HTML構造の解析

### クラス名
- **`.p-mainVisual__scroll`** - ボタン本体
- **`.c-plainBtn`** - SWELLの汎用プレーンボタンクラス
- **`.p-mainVisual__scrollArrow`** - SVG矢印アイコン
- **`.p-mainVisual__scrollLabel`** - "Scroll"テキストラベル

### data属性
- **`data-onclick="scrollToContent"`** - クリック時の動作指定

### インラインスタイル
- **`style="color:<?=esc_attr( $color )?>"`** - テキスト色を動的設定
  - `$SETTING['slider1_txtcol']`（single/slider型）
  - `$txtcol`（movie型）

### SVGアイコン
- 2つの下向き矢印パス（二重矢印デザイン）
- viewBox: 0 0 80 80

---

## 子テーマでの上書き方法

### Option 1: 関数上書き（推奨）
子テーマの`functions.php`で`swl_parts__scroll_arrow()`を再定義：

```php
function swl_parts__scroll_arrow( $args ) {
    // カスタムHTML実装
}
```

### Option 2: テンプレート上書き
以下のファイルを子テーマにコピーして編集：
- `parts/top/main_visual-single.php`
- `parts/top/main_visual-slider.php`
- `parts/top/main_visual-movie.php`

---

## CSS位置制御との関係

### 現在の子テーマCSS
`swell_child/css/sp/hero-scroll-sp.css`でSP位置を制御：

```css
@media (max-width: 959px) {
  .p-mainVisual__scroll {
    bottom: 30vh !important;
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%) !important;
  }
}
```

このCSSは親テーマのHTML出力に対して適用されています。

---

## まとめ

✅ **ScrollボタンのHTML出力場所を完全特定**
- **核心関数:** `lib/pluggable_parts.php` の `swl_parts__scroll_arrow()`
- **呼び出し箇所:** 3つのメインビジュアル型テンプレート
- **表示条件:** カスタマイザー設定 `$SETTING['mv_on_scroll']`
- **HTML構造:** `<button class="p-mainVisual__scroll">` + SVG矢印 + "Scroll"ラベル
- **data属性:** `data-onclick="scrollToContent"` でスクロール動作制御

📌 **子テーマでの制御:**
- **CSS:** 既に`hero-scroll-sp.css`で位置調整済み
- **HTML/JS:** 必要に応じて`swl_parts__scroll_arrow()`関数を上書き可能
