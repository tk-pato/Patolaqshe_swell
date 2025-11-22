# USERVOICE SP中央揃え修正レポート

**作成日**: 2025年11月22日  
**最終commit**: `ea596cd`  
**作業時間**: 約2時間  
**状態**: ✅ 完了

---

## 📋 問題の概要

### 発生していた問題
- SPでUSERVOICEセクションのカードが**右にズレて**表示される
- 左側に緑のデバッグラインが見える（カードが中央に配置されていない）
- スライドごとにズレ方が異なる

### 原因
1. **PC専用CSSにメディアクエリがなかった**
   - `css/pc/section-uservoice.css`の`.swiper { padding: 0 60px; }`が全デバイスに適用
   - SP専用CSSの`padding: 0 50px`が上書きされていた

2. **共通CSSに`!important`が残っていた**（過去の修正の名残）
   - `padding: 0 60px !important`がSPでも効いていた

3. **`!important`の競合**
   - 共通CSS、PC専用CSS、SP専用CSSで`!important`が混在
   - 詳細度の競合により、意図した設定が効かない

---

## 🔧 実施した修正

### 1. 共通CSSから`!important`を削除
**ファイル**: `swell_child/css/section-uservoice.css`

**修正箇所**:
```css
/* 修正前 */
#uservoice .uservoice-slider .swiper{min-height:450px; position: relative; padding: 0 60px !important;}

/* 修正後 */
#uservoice .uservoice-slider .swiper{min-height:450px; position: relative;}
```

**理由**: PC専用CSSに任せるため、共通CSSからpaddingを削除

---

### 2. PC専用CSSにメディアクエリを追加
**ファイル**: `swell_child/css/pc/section-uservoice.css`

**修正箇所**:
```css
/* 修正前（メディアクエリなし） */
#uservoice .uservoice-slider .swiper {
  padding: 0 60px;
}

/* 修正後（960px以上のみ適用） */
@media (min-width: 960px) {
  #uservoice .uservoice-slider .swiper {
    padding: 0 60px;
  }
}
```

**重要**: これが根本原因の解決。PC CSSが全デバイスに効いていた。

---

### 3. SP専用CSSを96cb9f2（正常動作時）の設定に復元
**ファイル**: `swell_child/css/sp/section-uservoice-sp.css`

**復元した設定**:
```css
#uservoice .uservoice-slider .swiper {
  padding: 0 50px;  /* !importantなし */
  max-width: 100%;
}

body #uservoice .feedback-card {
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 20px;
  margin: 0 10px;  /* カード間の余白 */
  min-height: 300px;
}
```

**ポイント**:
- `!important`を削除（共通CSSと競合しないため不要）
- `margin: 0 10px`でカード間の余白を確保
- `padding: 0 50px`で左右50pxずつ余白を確保

---

### 4. デバッグ用outlineを削除
**ファイル**: `swell_child/css/section-uservoice.css`

**削除した箇所**:
```css
/* 削除1: セクション全体 */
#uservoice {
  outline: 5px solid purple !important;
}

/* 削除2: inner要素 */
#uservoice .ptl-section__inner {
  outline: 3px solid magenta !important;
}

/* 削除3: スライド */
#uservoice .swiper-slide {
  outline: 3px solid orange !important;
}

/* 削除4: カード */
#uservoice .feedback-card {
  outline: 3px solid green !important;
}
```

---

## 📊 CSS構造の最終状態

### 共通CSS（全デバイス共通）
- `.swiper`の`padding`設定なし
- 基本的なレイアウト設定のみ

### PC専用CSS（960px以上）
```css
@media (min-width: 960px) {
  #uservoice .uservoice-slider .swiper {
    padding: 0 60px;
  }
}
```

### SP専用CSS（959px以下）
```css
#uservoice .uservoice-slider .swiper {
  padding: 0 50px;
}

body #uservoice .feedback-card {
  margin: 0 10px;
}
```

---

## 🎯 重要な学び

### 1. メディアクエリの重要性
- **PC専用CSSは必ずメディアクエリで囲む**
- functions.phpで読み込み条件を設定していても、CSS内でも明示する

### 2. `!important`の使い方
- **可能な限り使わない**
- 使う場合は競合しないように一箇所に限定
- 詳細度で解決できる場合は詳細度を上げる（例: `body #uservoice`）

### 3. CSS読み込み順序
```
1. 共通CSS（全デバイス）
2. PC専用CSS（960px以上）
3. SP専用CSS（959px以下）
```
後から読み込まれるCSSが優先されるため、メディアクエリで確実に分離する

### 4. デバッグ方法
- `outline`を使ってレイアウトを可視化
- 色分け（purple, magenta, orange, green）で階層を把握
- 問題解決後は必ず削除

---

## 📝 Git履歴

```
ea596cd - cleanup: remove debug outlines from uservoice section
9f181d6 - fix: wrap PC CSS with media query 960px to prevent SP override
8d863ef - revert: restore 96cb9f2 SP settings (padding 50px, margin 10px)
e085fd6 - fix: remove important conflicts between common and SP CSS
0adcbf5 - fix: SP force center with body selector (override common CSS important)
c6ca4d9 - fix: SP center alignment - remove gap and fix card width calc
99e6a6b - fix: SP swiper center with slide padding (remove swiper padding important)
451b2d4 - fix: apply PC version settings to SP CSS (padding 60px, margin 10px)
7cb887e - fix: force center SP cards with important flag (padding 60px, max-width 85%)
```

---

## ✅ 動作確認

### PC（960px以上）
- ✅ カードが3枚横並び
- ✅ 左右60pxの余白
- ✅ ナビゲーションボタンが正常動作
- ✅ スライダーが滑らかに動作

### SP（959px以下）
- ✅ カードが1枚ずつ表示
- ✅ **左右均等に余白があり、中央に配置**
- ✅ 左右50pxの余白
- ✅ ナビゲーションボタンが正常動作
- ✅ スライダーが滑らかに動作

---

## 🔄 今後の注意事項

### PC専用CSSを追加する場合
```css
/* 必ずメディアクエリで囲む */
@media (min-width: 960px) {
  /* PC専用スタイル */
}
```

### SP専用CSSを追加する場合
```css
/* メディアクエリは不要（functions.phpで制御） */
/* ただし、共通CSSと競合する場合は詳細度を上げる */
body #uservoice .target-element {
  /* スタイル */
}
```

### `!important`を使う場合
1. 本当に必要か再検討
2. 詳細度で解決できないか確認
3. 使う場合は一箇所に限定し、コメントで理由を明記

---

## 📌 参照情報

### 関連commit
- **96cb9f2**: 9月時点の正常動作状態（参照用）
- **ea596cd**: 今回の修正完了状態

### 関連ファイル
- `swell_child/css/section-uservoice.css` (共通CSS)
- `swell_child/css/pc/section-uservoice.css` (PC専用CSS)
- `swell_child/css/sp/section-uservoice-sp.css` (SP専用CSS)
- `swell_child/template-parts/front/section-uservoice.php` (HTML構造)

---

**作成者**: GitHub Copilot (Claude Sonnet 4.5)  
**検証者**: tk-pato  
**最終更新**: 2025年11月22日
