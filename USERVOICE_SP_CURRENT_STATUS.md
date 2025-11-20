# USERVOICE SP修正 現状まとめ

**作成日**: 2025年11月20日  
**現在のcommit**: 4e0e2d8

---

## 現在の状態

### 問題点
- SPでカードが右にズレている（デバッグアウトラインで左側に緑線が見える）
- 最新修正（4e0e2d8）でスライダーの動きが悪くなった

### 実装済み
✅ 共通CSS: 全幅設定（`width: 100vw` + `margin-left: calc(50% - 50vw)`）  
✅ 共通CSS: デバッグアウトライン（紫、マゼンタ、オレンジ、緑）  
✅ PC CSS: `padding: 0 60px`（960px以上）  
✅ SP CSS: 全幅設定 + 各種padding試行  
✅ autoplay: 有効（5秒ごと自動スライド）  

### 未解決
❌ SPでのカード中央配置（まだ右にズレている）  
❌ スライダーの動きが滑らかでない（最新修正で悪化）

---

## 試行した修正内容

### 成功した修正
1. **96cb9f2からの復元**: SP専用CSSに全幅設定 + `padding: 0 50px`
2. **共通CSS**: paddingを削除（PC用CSSに任せる）
3. **autoplay復元**: 自動スライダーを有効化

### 失敗した修正
1. `!important`多用 → スライダーが固まった（transform上書き）
2. `.swiper-wrapper`に`transform: translateX(0)` → 完全停止
3. padding削除（0に変更） → 右にズレた
4. padding非対称（60px/40px） → まだズレている
5. flex + max-width強制 → 動きが悪くなった（最新）

---

## ファイル状態

### 共通CSS（section-uservoice.css）
```css
/* 全幅設定 */
#uservoice .uservoice-slider{
    width:100vw;
    margin-left:calc(50% - 50vw);
    margin-right:0;
    max-width:none;
    position: relative;
    overflow: hidden;
}

/* .swiperにpaddingなし */
#uservoice .uservoice-slider .swiper{min-height:450px; position: relative;}

/* デバッグアウトライン: 紫、マゼンタ、オレンジ、緑 */
```

### PC CSS（pc/section-uservoice.css）
```css
/* 960px以上 */
#uservoice .uservoice-slider .swiper {
  padding: 0 60px;
}
```

### SP CSS（sp/section-uservoice-sp.css） - 最新状態
```css
/* 959px以下 */
#uservoice .uservoice-slider {
  margin-left: calc(50% - 50vw);
  width: 100vw;
}

#uservoice .uservoice-slider .swiper {
  padding: 0; /* 最新: 全て0 */
  max-width: 100%;
}

#uservoice .uservoice-slider .swiper-slide {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  padding: 0 !important;
}

#uservoice .feedback-card {
  margin: 0 auto !important;
  max-width: calc(100vw - 100px) !important; /* 左右50pxずつ余白 */
}
```

---

## 96cb9f2（正常動作時）との差分

### 96cb9f2のSP CSS
```css
#uservoice .uservoice-slider .swiper {
  padding: 0 50px; /* ← 現在は0 */
  max-width: 100%;
}

#uservoice .feedback-card {
  margin: 0 10px; /* ← 現在は0 auto */
}

/* .swiper-slideへの特殊設定なし */
```

### 主な違い
1. **padding**: 96cb9f2は`0 50px`、現在は`0`
2. **margin**: 96cb9f2は`0 10px`、現在は`0 auto`
3. **.swiper-slide**: 96cb9f2は設定なし、現在はflex強制

---

## 次に試すべきこと

### オプション1: 96cb9f2に完全復元
- SP CSSを96cb9f2の状態に戻す
- `padding: 0 50px` + `margin: 0 10px`
- flex強制を削除

### オプション2: padding微調整
- `padding: 0 45px`など、微調整で中央を探る
- marginは`0 auto`維持

### オプション3: JavaScript側で調整
- Swiper初期化オプションで`centeredSlides: true`を確認
- `slidesOffsetBefore`/`slidesOffsetAfter`で微調整

---

## commit履歴（最近10件）

```
4e0e2d8 fix: force center card with flex layout and max-width calc
dcddc29 fix: adjust SP swiper padding asymmetrically (60px left, 40px right)
91222e3 fix: explicit padding and zero margin for SP card centering
0998e78 revert: restore 96cb9f2 exact SP slider settings (no important flags)
5cf3206 fix: force slide centering with flex layout and important flags
5cf81c5 fix: remove swiper padding and slide margins for perfect SP centering
7565b69 fix: remove transform override that blocked swiper animation
c0e8808 fix: force center alignment with important for SP uservoice cards
f8d55ec fix: remove feedback-card horizontal margin for SP perfect centering
c615740 fix: restore SP slider full-width settings from 96cb9f2 (working state)
```

---

## 推奨: 次のアクション

1. **4e0e2d8の修正を取り消す**（動きが悪化したため）
2. **96cb9f2の正確な設定に戻す**
3. **paddingを1pxずつ微調整**して中央を探る
4. **デバッグアウトラインを残したまま**調整

または

- 別の原因を調査（親テーマCSS、JavaScript設定など）
