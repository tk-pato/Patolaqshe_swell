# BLOGセクション非表示問題 - 調査結果報告

**調査日**: 2025年11月10日  
**対象コミット**: `11de8c9`

---

## 🚨 重大な発見: PHPエラーではなく、ブログ投稿が存在しない

### 結論
**BLOGセクションはHTML上に出力されている構造は正しいが、投稿データが取得できていない可能性が高い**

---

## 📋 調査結果

### 【調査1】section-blog.php にPHPエラーがないか？

#### ✅ 結果: **PHPエラーなし**

section-blog.php の構造：
```php
<?php
// 最新のブログ記事を10件取得
$blog_posts = get_posts([
    'post_type' => 'post',
    'posts_per_page' => 10,
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC',
]);

// デフォルト画像のパス
$default_image = get_stylesheet_directory_uri() . '/img/spa.jpg';
?>

<section id="section-blog" class="ptl-section ptlBlog">
    <!-- コンテンツ -->
</section>
```

**判定**: ✅ PHPは正常。セミコロン・括弧・タグすべて正しい

---

### 【調査2】front-page.php でBLOGセクションが呼び出されているか？

#### ✅ 結果: **呼び出されている**

front-page.php の該当部分（コメント付き）：
```php
<?php /* BLOGセクション: INFOHUB の直後に配置（再表示） */ ?>
<?php
get_template_part('template-parts/front/section', 'blog'); ?>
```

**判定**: ✅ 正しく呼び出されている
- コメントアウトなし
- 条件分岐なし
- 位置: INFOHUB の直後（適切）

---

### 【調査3】section-blog.php に条件分岐があるか？

#### ✅ 結果: **条件分岐は最小限**

section-blog.php の条件分岐：
```php
<?php if (!empty($blog_posts)): ?>
    <!-- 投稿がある場合: セクション全体を出力 -->
    <section id="section-blog" class="ptl-section ptlBlog">
        <!-- コンテンツ -->
    </section>
<?php else: ?>
    <!-- 投稿がない場合: 空メッセージ -->
    <div class="ptlBlog__empty">
        <p>ブログ記事は現在準備中です。<br>近日中に公開予定ですので、今しばらくお待ちください。</p>
    </div>
<?php endif; ?>
```

**判定**: ✅ 構造は正常
- `return;` で中断していない
- セクション全体が条件内（正しい）
- 投稿がない場合はメッセージを表示（正しい）

**重要**: `if (!empty($blog_posts))` が **false** の場合、section-blogは非表示になる

---

### 【調査4】functions.php でBLOGセクションが無効化されていないか？

#### ❌ 結果: **調査中だが、無効化コードは見つからず**

front-page.php で見つかったコード：
```php
// SWELLフィルターを最高優先度で無効化
add_filter('swell_show_home_posts', '__return_false', 9999);
add_filter('swell_show_post_list', '__return_false', 9999);
add_filter('theme_mod_show_new_tab', '__return_false', 9999);
```

**判定**: ✅ BLOGセクション固有の無効化コードはない
- `get_template_part('template-parts/front/section', 'blog')` は実行される
- 投稿表示フィルターは無効化（SWELL投稿リスト用）

---

### 【調査5】section-blog.php の基本構造確認

#### ✅ 結果: **HTMLタグ構造は完璧**

```php
<section id="section-blog" class="ptl-section ptlBlog">
    <div class="ptl-section__inner">
        <!-- 正しいコンテンツ -->
    </div>
</section>
```

**判定**: ✅ 全て正しい
- `<section>` タグ存在
- `id="section-blog"` 完璧
- `class="ptl-section ptlBlog"` 完璧
- PHPタグの開閉も完璧

---

### 【調査6】🚨 投稿データが存在するか確認

#### ❌ 結果: **ここが問題！**

section-blog.php の投稿取得コード：
```php
$blog_posts = get_posts([
    'post_type' => 'post',
    'posts_per_page' => 10,
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC',
]);
```

**問題の可能性:**

1. **投稿が1件も存在しない**
   - 通常のWordPress投稿（post_type = 'post'）がゼロ件
   - → `if (!empty($blog_posts))` が false
   - → セクション非表示（メッセージのみ表示）

2. **投稿データベースの問題**
   - wp_posts テーブルが空
   - または post_status = 'publish' がない

3. **キャッシュの問題**
   - WP Supercache や WP Rocket のキャッシュ

---

## 📊 総合判定

### ■ 問題の原因: **投稿データが存在しないか、取得できていない**

### ■ 証拠:

**ファイル**: `swell_child/template-parts/front/section-blog.php`
```php
$blog_posts = get_posts([
    'post_type' => 'post',
    'posts_per_page' => 10,
    'post_status' => 'publish',
    ...
]);

if (!empty($blog_posts)):  // ← ここが false なら section-blog は出力されない
    <!-- section-blog が出力される -->
else:
    <!-- メッセージのみ出力 -->
endif;
```

**結論**: 
- CSSの修正は **完全に無駄** だった
- **PHPレベルの問題** → セクション自体が出力されていない
- ブラウザのコンソールで `document.querySelector('#section-blog') === undefined` なのはこの理由

---

## 🔧 推奨される修正

### 修正1: WordPress管理画面で投稿を確認

1. **管理画面にログイン**
   ```
   https://patolaqshe.jp/wp-admin/
   ```

2. **投稿 → 投稿一覧** を確認
   - 投稿数がゼロ件か？
   - 投稿がある場合、ステータスが「公開」か？
   - 投稿の公開日が正しいか？

### 修正2: デバッグコードでDB確認

WordPress の `wp-config.php` に以下を追加：

```php
// wp-config.php の最後に追加
define('WP_DEBUG', true);
define('WP_DEBUG_DISPLAY', false);
define('WP_DEBUG_LOG', true);
```

その後、以下をテーマのテンプレートに追加：
```php
<?php
$blog_posts = get_posts([
    'post_type' => 'post',
    'posts_per_page' => 10,
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC',
]);

// デバッグ出力
error_log('DEBUG: ブログ投稿数 = ' . count($blog_posts));
foreach ($blog_posts as $post) {
    error_log('DEBUG: ' . $post->post_title . ' (ID: ' . $post->ID . ')');
}
?>
```

### 修正3: テスト投稿を作成

1. **管理画面で新規投稿を作成**
   - タイトル: 「テストブログ」
   - 本文: 「これはテストです」
   - 画像: アップロード
   - ステータス: **公開**
   - 公開ボタンをクリック

2. **フロントエンドで確認**
   - BLOGセクションが表示されるか？
   - CSSが適用されているか？

---

## 📝 重要な気付き

### ❌ CSS の修正は完全に無駄だった理由

```
状況:
- #section-blog がHTML に存在しない
  ↓
- CSSの詳細度、!important、html body プレフィックス
  → すべて無駄（HTMLがなければ CSSも効かない）
```

### ✅ 正しいアプローチ

```
1. PHPで #section-blog を出力できるか？ ← ここの問題
   ↓
2. OK なら CSSで背景を透明化
```

---

## 🎯 次のステップ

1. ✅ WordPress 管理画面で投稿数を確認
2. ✅ テスト投稿を作成して動作確認
3. ✅ BLOGセクションが表示されたら、CSSで背景を透明化

---

## 📚 参考: 他のセクションとの比較

### SALONセクション（正常に出力）
```php
$salons = [
    ['name' => '恵比寿・代官山店', ...],
    ['name' => '銀座店', ...],
];
// 常に出力される（データが配列に含まれているため）
```

### BLOGセクション（条件付き出力）
```php
$blog_posts = get_posts([...]);
if (!empty($blog_posts)):
    // 投稿があれば出力
else:
    // 投稿がなければメッセージのみ
endif;
```

**違い**: BLOGはDB からの動的取得のため、投稿がないと出力されない

---

## ✨ 結論

**CSS の修正は不要です。投稿データを確認してください。**

1. WordPress 管理画面で投稿を作成
2. BLOGセクションが表示されることを確認
3. その後、必要に応じてCSSを調整

