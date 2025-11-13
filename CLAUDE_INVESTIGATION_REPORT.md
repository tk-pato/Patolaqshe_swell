# BLOGセクション背景透明化問題 - 最終調査報告書

**作成日**: 2025年11月10日  
**対象**: ブログセクション背景透明化の失敗原因調査  
**状況**: 投稿は存在するが、BLOGセクションがHTMLに出力されていない

---

## 📋 調査の経過

### 1. 初期報告
- **症状**: SP表示でBLOGセクションの背景が透明にならない
- **原因推測**: CSS設定不足

### 2. CSS修正実施
以下の修正を複数回実行：
- style.css に SPメディアクエリを追加
- section-blog-sp.css に `html body` プレフィックスを追加
- section-blog.css に `!important` フラグを追加
- functions.php のブレークポイントを 768px → 960px に変更
- section-blog.css に `html body #section-blog` ルールを追加

**最終コミット**: `11de8c9`

### 3. 問題: 修正後も動作しない

ユーザーからの報告：
- ブラウザのコンソールで `document.querySelector('#section-blog') === undefined`
- **#section-blog がHTML上に存在しない**

### 4. 新たな発見: PHP レベルの問題

調査結果：
- ✅ PHP構文は完璧
- ✅ front-page.php で正しく呼び出されている
- ✅ HTML構造は完璧
- ✅ 無効化コードなし
- ❌ **投稿は存在するのに、section-blog.php で出力されていない**

---

## 🔍 最新の問題

### 発見

ユーザー報告：
> 「WordPressで投稿は作っていますよ。このテストとかが投稿です。」

**結論**: 投稿は存在するのに、BLOGセクションが HTML に出力されていない

---

## 🚨 新しい仮説

### 仮説1: section-blog.php の条件分岐が真として機能していない

```php
$blog_posts = get_posts([
    'post_type' => 'post',
    'posts_per_page' => 10,
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC',
]);

if (!empty($blog_posts)):
    // ここが出力されるべき
else:
    // 空メッセージのみ表示
endif;
```

**可能性**:
1. `get_posts()` が空配列を返している
2. 投稿の `post_status` が `'publish'` ではない
3. `setup_postdata()` でエラーが発生している
4. キャッシュレイヤーで出力が削除されている

### 仮説2: front-page.php の出力バッファリング

front-page.php の冒頭：
```php
ob_start();

// SWELLフィルターを無効化
add_filter('swell_show_home_posts', '__return_false', 9999);
...
```

投稿リスト関連の表示を強制的に非表示にしているが、BLOGセクション自体も削除されている可能性

### 仮説3: 親テーマ SWELL のフック

親テーマのアクションフック内で section-blog の出力が阻止されている可能性

---

## 📊 対比: 正常に動作しているセクション vs 失敗しているセクション

### ✅ 正常: SALONセクション

```php
// section-salon.php
$salons = [
    ['name' => '恵比寿・代官山店', ...],
    ['name' => '銀座店', ...],
];
// ... 常に出力される
?>
<section id="salon" class="ptlSalonHero ...">
```

**特徴**:
- ハードコード化されたデータ
- 条件分岐なし
- 常に出力される

### ❌ 失敗: BLOGセクション

```php
// section-blog.php
$blog_posts = get_posts([...]); // DB から取得

if (!empty($blog_posts)):
    <section id="section-blog" ...>
else:
    // メッセージのみ
endif;
```

**特徴**:
- DB から動的取得
- 条件分岐あり
- **投稿がないと出力されない**

---

## 🔧 推奨される次のステップ

### ステップ1: デバッグ出力を追加

`section-blog.php` の冒頭に以下を追加：

```php
<?php
/**
 * BLOG セクション（自動横スクロール）
 */

// デバッグ: 投稿取得を確認
$blog_posts = get_posts([
    'post_type' => 'post',
    'posts_per_page' => 10,
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC',
]);

// デバッグ出力（削除予定）
error_log('=== BLOG DEBUG ===');
error_log('投稿数: ' . count($blog_posts));
if (!empty($blog_posts)) {
    foreach ($blog_posts as $post) {
        error_log('投稿: ' . $post->post_title . ' (ID: ' . $post->ID . ', Status: ' . $post->post_status . ')');
    }
} else {
    error_log('投稿なし');
}

// デフォルト画像のパス
$default_image = get_stylesheet_directory_uri() . '/img/spa.jpg';
?>
```

### ステップ2: ログを確認

```bash
# サーバーのエラーログを確認
ssh -i ~/.ssh/sakura_patolaqshe patolaqshe@www3521.sakura.ne.jp \
  "tail -50 /home/patolaqshe/www/media/wp-content/debug.log"
```

### ステップ3: wp-cli で投稿を確認

```bash
ssh -i ~/.ssh/sakura_patolaqshe patolaqshe@www3521.sakura.ne.jp \
  "cd /home/patolaqshe/www/media && wp post list --post_type=post --format=table"
```

出力例：
```
| ID | post_title | post_date | post_status |
|----|-----------|-----------|-----------]
| 1  | テスト記事 | 2025-... | publish   |
| 2  | テスト2   | 2025-... | publish   |
```

### ステップ4: REST API で確認

ブラウザのコンソールで実行：
```javascript
fetch('/wp-json/wp/v2/posts?per_page=10&status=publish')
  .then(r => r.json())
  .then(posts => {
    console.log('投稿数:', posts.length);
    posts.forEach(p => {
      console.log(`- ${p.title.rendered} (ID: ${p.id}, Status: ${p.status})`);
    });
  });
```

---

## ❓ Claudeへの質問

以下の情報を確認・実行してください：

### Q1: エラーログの確認
```bash
ssh -i ~/.ssh/sakura_patolaqshe patolaqshe@www3521.sakura.ne.jp \
  "tail -100 /home/patolaqshe/www/media/wp-content/debug.log | grep -i blog"
```

結果をコピー&ペーストしてください。

### Q2: wp-cli で投稿確認
```bash
ssh -i ~/.ssh/sakura_patolaqshe patolaqshe@www3521.sakura.ne.jp \
  "cd /home/patolaqshe/www/media && wp post list --post_type=post --status=publish --format=table"
```

結果をコピー&ペーストしてください。

### Q3: REST API 確認
ブラウザで https://patolaqshe.jp/wp-json/wp/v2/posts を開いて、投稿が返されるか確認してください。

---

## 📝 今までの修正の整理

### ✅ 実施した修正

| コミット | 修正内容 | 効果 | 評価 |
|---------|---------|------|------|
| `8beee48` | body プレフィックス追加 | なし | ❌ |
| `10ccaaa` | html body プレフィックス追加 | なし | ❌ |
| `b0c3a36` | style.css に #section-blog 追加 | なし | ❌ |
| `11de8c9` | ブレークポイント + section-blog.css 修正 | なし | ❌ |

### 🔴 共通の問題

**すべての修正が無駄だった理由**:
```
#section-blog がHTML に存在しない
    ↓
CSS をいくら修正しても効果なし
    ↓
根本原因は PHP → section-blog.php で出力されていない
```

---

## 🎯 実際に必要な修正

CSS の修正ではなく、**PHP レベルの問題を解決する必要があります**：

1. **section-blog.php で `get_posts()` が正しく投稿を取得できているか確認**
2. **条件分岐 `if (!empty($blog_posts))` が true になっているか確認**
3. **投稿のステータスが `'publish'` になっているか確認**

---

## 📚 参考: HTML 出力の流れ

```
front-page.php
  ↓
get_template_part('template-parts/front/section', 'blog')
  ↓
section-blog.php
  ↓
get_posts([...]) で投稿取得
  ↓
if (!empty($blog_posts)):
    <section id="section-blog"> ← ここが出力されない
else:
    <div class="ptlBlog__empty">
endif;
```

**問題はここのどこかにあります**

---

## ✨ 結論

**CSS の修正は一旦停止してください。**

1. 投稿がデータベースに存在することを確認
2. section-blog.php で `get_posts()` が正しく投稿を取得できているか確認
3. PHPレベルの問題を解決してから、CSSの背景透明化を実施

この順序で進めてください。

