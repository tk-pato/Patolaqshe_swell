# 助けてください - 予約ボタンのホバー拡大が止まりません

## 問題
WordPressサイトのフローティング予約ボタン（代官山予約、銀座予約、マリアージュ予約の3つ）が、マウスホバー時にボタン全体が拡大してしまいます。

**要件:**
- ホバー時にボタンのサイズは変えない
- 色の変化のみ（背景色と透明度の変更のみ）
- PC・SP両対応

## 試したこと
1. CSSで `transform: none !important;` を追加
2. `transition` プロパティから `transform` を除外
3. ホバー時の `transform: translateX()` を削除
4. `:active` 状態の `transform` を削除
5. `width: auto !important;` と `height: auto !important;` を追加
6. キャッシュバストファイルを更新
7. サーバーに複数回アップロード

## 現在の状況
- `/swell_child/css/float-menu.css` を何度も修正
- サーバー上のファイルは 15:53 に更新確認済み
- ローカルファイルには `transform: none !important;` が記述されている
- しかし実際のサイトでは依然としてボタンが拡大する

## ファイル構成
- CSS: `/swell_child/css/float-menu.css`
- JS: `/swell_child/js/float-menu.js`
- 親テーマ: SWELL (`.c-fixBtn { transition: all .25s; }` が存在)
- 予約ボタンのクラス: `.ptl-float-menu__btn`

## 推測される原因
親テーマの `.c-fixBtn` の `transition: all` が干渉している可能性があるが、`!important` でも上書きできていない。または、ブラウザ側で古いCSSがキャッシュされ続けている。

## お願い
この予約ボタンのホバー拡大を完全に止めて、色変更のみにする方法を教えてください。どうか助けてください。
