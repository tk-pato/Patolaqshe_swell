# front-page.php 読み込み確認デバッグ実行レポート

**実行日時**: 2025年11月10日 17:00 UTC  
**状態**: 🚨 **front-page.php が読み込まれていない**

---

## 📋 実行内容

### 1. デバッグコード追加
- ✅ `front-page.php` ファイル冒頭に読み込み確認用デバッグ出力を追加
- ✅ `get_template_part('blog')` 呼び出し前後にデバッグ出力を追加
- ✅ `front-page.php` ファイル末尾に処理完了用デバッグ出力を追加

### 2. サーバーアップロード
- ✅ Git コミット：`74eaa0c`
- ✅ GitHub プッシュ：成功
- ✅ サーバーアップロード：成功
- ✅ ファイルタイムスタンプ：`Nov 10 16:13` (最新)

### 3. ログ確認
```bash
$ ssh sakura-prod "cat /home/patolaqshe/www/media/wp-content/debug.log"
# (空)

$ ssh sakura-prod "echo '' > /home/patolaqshe/www/media/wp-content/debug.log"
# ログをクリア

$ (ページを表示)

$ ssh sakura-prod "cat /home/patolaqshe/www/media/wp-content/debug.log"
# (空)
```

**結論**: ❌ **デバッグ出力がまったく記録されていない**

---

## 🤔 分析

### 観察1: ファイルは正しくアップロードされている
```bash
$ ssh sakura-prod "head -20 /home/patolaqshe/www/media/wp-content/themes/swell_child/front-page.php"
# ✅ デバッグコードが含まれている
```

### 観察2: WordPress の設定は正しい
```bash
$ wp option get show_on_front --path=/media
page

$ wp option get page_on_front --path=/media
142

$ wp option get template --path=/media
swell

$ wp option get stylesheet --path=/media
swell_child
```

### 観察3: テンプレートファイルが存在する
```bash
$ ls -la /themes/swell_child/
-rw-r--r-- front-page.php  (Nov 10 16:13)
-rw-r--r-- page.php
```

### 観察4: page.php に issue がある可能性
```php
<?php
if (! defined('ABSPATH')) exit;

if (is_front_page()) {
    // フロントページは専用テンプレートfront-page.php で処理
    include get_stylesheet_directory() . '/front-page.php';
    return;
}

// 通常の固定ページは親テーマに任せる
include get_template_directory() . '/page.php';
```

**分析**: `page.php` が `is_front_page()` チェックをして、フロントページの場合のみ `front-page.php` を include している。

---

## 🎯 仮説（優先度順）

### 仮説A: WordPress が page.php ではなく親テーマの page.php を使用している
- **可能性**: 高
- **理由**: テンプレート階層で子テーマの `page.php` が先に検索されるが、サーバーのテーマファイルに不整合がある可能性
- **確認方法**: 親テーマの page.php を確認

### 仮説B: is_front_page() が false を返している
- **可能性**: 中～高
- **理由**: WordPress キャッシュの問題、またはページ設定の誤り
- **確認方法**: page.php に is_front_page() の結果をログ出力

### 仮説C: front-page.php 以前に PHP fatal error が発生している
- **可能性**: 低
- **理由**: ファイルのアップロードは成功している
- **確認方法**: PHP error log を確認

### 仮説D: Apache/PHP の設定で front-page.php が実行されていない
- **可能性**: 低
- **理由**: 他のファイルは実行されている
- **確認方法**: サーバー管理者に確認

---

## ✅ 推奨される次のステップ

### Step 1: page.php を直接デバッグ (優先)

`page.php` に以下を追加してから、`front-page.php` が呼ばれているか確認します。

**修正**:
```php
<?php
if (! defined('ABSPATH')) exit;

// ログに記録
error_log('=== page.php LOADED ===');
error_log('is_front_page() = ' . (is_front_page() ? 'true' : 'false'));
error_log('get_queried_object_id() = ' . get_queried_object_id());
error_log('get_option("page_on_front") = ' . get_option('page_on_front'));

if (is_front_page()) {
    error_log('🎯 フロントページと判定: front-page.php を include します');
    include get_stylesheet_directory() . '/front-page.php';
    return;
}

error_log('❌ フロントページではない: 親テーマの page.php を使用');
include get_template_directory() . '/page.php';
?>
```

### Step 2: 親テーマの page.php を確認

```bash
ssh sakura-prod "head -20 /home/patolaqshe/www/media/wp-content/themes/swell/page.php"
```

### Step 3: PHP error log を確認

```bash
ssh sakura-prod "tail -100 /home/patolaqshe/www/media/wp-content/debug.log"
ssh sakura-prod "tail -100 /var/log/php-fpm/www-error.log"
```

### Step 4: WordPress がどのテンプレートファイルを使用しているかを確認

```bash
ssh sakura-prod "wp eval 'echo locate_template(array("front-page.php", "page-142.php", "page.php"));' --path=/media"
```

---

## 📊 現在の状態

| 項目 | 状態 |
|------|------|
| デバッグコード追加 | ✅ 完了 |
| サーバーアップロード | ✅ 完了 |
| ファイル確認 | ✅ 最新版確認 |
| ログ出力 | ❌ 出力されない |
| **原因特定** | 🔄 調査中 |

---

## 🛠️ 最後の手段

最も確実な方法は、**親テーマの `page.php` または `index.php` に直接デバッグ出力を追加する**ことです。これにより、どのテンプレートが実行されているかが判明します。

例：
```php
<?php
@error_log('template-used: ' . basename(__FILE__));
?>
```

---

## 📝 提出内容

1. ✅ デバッグコードはサーバーに正しく配置されている
2. ❌ しかし、ログに出力されていない = front-page.php が実行されていない
3. 🔍 WordPress が使用しているテンプレートファイルを特定が必要
4. 📋 page.php の is_front_page() チェックの結果を確認が必要
5. 🛠️ 親テーマのテンプレート構造を調査が必要

次のステップ：**page.php にログ出力を追加して、is_front_page() の結果と何が実行されているか確認**

