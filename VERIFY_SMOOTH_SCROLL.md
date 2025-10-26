# スムーススクロール実装確認手順

## 実装内容
- **ライブラリ**: Lenis v1.0.29（Locomotive Scrollの軽量版）
- **実装日時**: 2025年10月25日 15:35
- **アップロード完了**: ✅

## 確認手順

### 1. ブラウザキャッシュの完全クリア
```
Chrome/Edge: Cmd+Shift+Delete → 「キャッシュされた画像とファイル」を選択 → クリア
Safari: Cmd+Option+E
Firefox: Cmd+Shift+Delete
```

### 2. ハードリロード
```
Cmd+Shift+R (Mac)
Ctrl+Shift+R (Windows)
```

### 3. DevToolsで実装確認

#### ステップA: Lenisが読み込まれているか確認
1. ブラウザでサイトを開く
2. F12 → Console タブ
3. 以下を入力して Enter:
```javascript
typeof Lenis
```
→ `"function"` と表示されればLenis読み込み成功

#### ステップB: スクロール初期化確認
Console に以下のメッセージが表示されるはずです:
```
✅ Patolaqshe スムーススクロール初期化完了（Lenis）
```

#### ステップC: ネットワークタブで確認
1. F12 → Network タブ
2. ページをリロード
3. 以下のファイルが読み込まれているか確認:
   - `lenis.min.js` (CDN)
   - `smooth-scroll.js` (カスタムスクリプト)

### 4. 動作確認

#### スクロールの滑らかさ
- マウスホイールでスクロール → ヌルヌル動けばOK
- トラックパッドでスクロール → 慣性スクロールが効いていればOK

#### アンカーリンク
- メニューから各セクションをクリック
- 滑らかにスクロールすればOK

#### parallax動作確認
- PC版でnavigation/issues/uservoiceセクションにスクロール
- 背景画像が滑らかに動けばOK（破壊されていない）

## トラブルシューティング

### 「Lenis not loaded yet, retrying...」が表示される場合
→ CDNの読み込みが遅い。数秒待ってリロード。

### スクロールが滑らかにならない場合
1. WordPress管理画面 → SWELL設定 → 高速化
2. 「JavaScriptの遅延読み込み」が有効なら無効化
3. キャッシュプラグイン（WP Super Cache等）があればクリア

### parallaxが壊れている場合
→ **実装を即座にロールバック**してください:
```bash
cd /Users/tk/Patolaqshe_swell
git restore swell_child/functions.php swell_child/style.css
rm swell_child/js/smooth-scroll.js
rsync -avz -e ssh --relative swell_child/functions.php swell_child/style.css patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/media/wp-content/themes/
ssh patolaqshe@www3521.sakura.ne.jp "rm /home/patolaqshe/www/media/wp-content/themes/swell_child/js/smooth-scroll.js"
```

## 実装詳細

### functions.php（176-183行目に追加）
```php
// Lenis CDN（スムーススクロール用）
wp_enqueue_script('lenis', 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js', [], '1.0.29', true);

// Patolaqsheスムーススクロール
$smooth_js_path = get_stylesheet_directory() . '/js/smooth-scroll.js';
if (file_exists($smooth_js_path)) {
  wp_enqueue_script('ptl-smooth-scroll', get_stylesheet_directory_uri() . '/js/smooth-scroll.js', ['lenis'], filemtime($smooth_js_path), true);
}
```

### smooth-scroll.js（新規作成）
- Lenis初期化（duration: 1.2秒）
- イージング関数: easeOutExpo
- SPではネイティブスクロール使用（smoothTouch: false）
- アンカーリンク対応（オフセット-100px）

### style.css（削除）
- CSSのみの `scroll-behavior: smooth` を削除
- JavaScriptによる制御に切り替え

## 期待される動作
✅ PC/SP両対応  
✅ parallax破壊なし  
✅ navigation/issues/uservoice正常動作  
✅ アンカーリンク滑らか  
✅ UIの一切の変更なし  

## もし動作しない場合
以下の情報を教えてください：
1. Console に表示されるエラーメッセージ
2. Network タブで `lenis.min.js` が読み込まれているか
3. `typeof Lenis` の結果
4. ブラウザとバージョン（Chrome 120, Safari 17等）
