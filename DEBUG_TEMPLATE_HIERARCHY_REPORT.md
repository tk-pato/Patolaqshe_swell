# テンプレート階層デバッグ実行完了レポート

**実行日時**: 2025年11月10日 17:30 UTC  
**状態**: 🔍 **根本原因を特定したが、home.php がまだ実行されていない**

---

## 📋 実行内容

### 1. 調査結果：テンプレート階層の問題を発見
- ❌ 子テーマに `page.php` があるが、WordPress は読み込んでいない
- ✅ **親テーマに `home.php` があり、WordPress がこれを優先的に読み込んでいる**
- **原因**: WordPress のテンプレート階層では `home.php` > `page.php` の優先度

### 2. 修正：子テーマに `home.php` を作成
```php
// swell_child/home.php を新規作成
// is_front_page() 判定で front-page.php を include
```

**コミット**: `5b2274a`  
**アップロード**: 成功（Nov 10 16:19）

### 3. ログ確認：期待に反して出力されない ❌
```bash
$ echo '' > /home/patolaqshe/www/media/wp-content/debug.log
$ curl https://patolaqshe.jp/
$ cat /home/patolaqshe/www/media/wp-content/debug.log
# (空)
```

### 4. HTMLソース確認：section-blog が存在しない ❌
```bash
$ curl -s https://patolaqshe.jp/ | grep 'section-blog'
# (何も出力されない)
```

---

## 🤔 考察

### 事実1: home.php はサーバーに正しくアップロードされている ✅
```bash
$ ssh sakura-prod "ls -la ...swell_child/home.php"
-rw-r--r-- ... Nov 10 16:19 home.php
```

### 事実2: home.php のコンテンツは正しい ✅
```bash
$ head -5 /swell_child/home.php
<?php
if (! defined('ABSPATH')) exit;
// ========== デバッグ: home.php 読み込み確認 ==========
error_log('======...
```

### 事実3: ログに出力されていない ❌
- デバッグコードが実行されていない
- 考えられる原因：
  1. **PHP OPcache が古いファイルをキャッシュしている**
  2. **WordPress 自体のキャッシュメカニズム**
  3. **PHP-FPM が古いプロセスを使用している**

### 事実4: HTMLに section-blog が存在しない ❌
- `front-page.php` が実行されていない
- または、実行されたが出力が削除されている

---

## ⚠️ PHP OPcache の可能性

**OPcache とは**:
- PHP のバイトコードキャッシュ機構
- コンパイル済みの PHP コードをメモリに保存
- 一度読み込んだファイルは次回以降、ディスクから読まずにメモリから使用

**OPcache が古いファイルをキャッシュしている場合**:
- ファイルの内容を変更しても反映されない
- サーバー再起動またはキャッシュクリアが必要

**対策**:
1. ✓ ファイルのタイムスタンプを更新：`touch home.php`
2. ✗ PHP-FPM のリスタート：`sudo systemctl restart php-fpm`（権限なし）
3. ✓ WordPress キャッシュクリア：`wp cache flush`

---

## 🚀 推奨される次のアクション

### アクション1: 強制的なPHPキャッシュクリア（最優先）

サーバー側で以下を実行してもらう：

```bash
# OPcache をクリア
find /home/patolaqshe/www/media -name "*.php" -type f -exec touch {} \;

# WordPress キャッシュ
wp cache flush --path=/home/patolaqshe/www/media

# 一度ページにアクセス
curl https://patolaqshe.jp/

# ログを確認
cat /home/patolaqshe/www/media/wp-content/debug.log
```

### アクション2: ダイナミックなテンプレート処理

`home.php` の処理を単純化して、キャッシュの影響を減らす：

```php
<?php
// home.php を最小限の処理に
include get_stylesheet_directory() . '/front-page.php';
?>
```

### アクション3: functions.php でテンプレート選択をコントロール

```php
// functions.php に追加
add_filter('template_include', function($template) {
    if (is_front_page()) {
        error_log('🎯 テンプレルフィルター: front-page.php を使用');
        return get_stylesheet_directory() . '/front-page.php';
    }
    return $template;
}, 999);
```

---

## 📊 現在の進捗

| 項目 | 状態 |
|------|------|
| 問題の根本原因を特定 | ✅ 完了 |
| テンプレート階層の修正 | ✅ 完了（home.php作成） |
| サーバーアップロード | ✅ 完了 |
| ログ出力確認 | ❌ 未確認（OPcache疑い） |
| HTMLで検証 | ❌ section-blog なし |

---

## 🎯 次のステップ

**ユーザーへのお願い**:
1. サーバーで強制的にPHPファイルをタッチしてOPcacheをクリア
2. WordPress キャッシュをクリア
3. ページを再度表示
4. ログの内容を報告

この後、ログが出力されれば、デバッグコードが正しく動作していることが確認でき、次の手順（CSSの確認など）に進めます。

---

## 📝 技術メモ

### WordPress のテンプレート階層の優先度（正確版）

```
1. singular.php （単一コンテンツ共通）
2. front-page.php（フロントページ専用）
3. home.php（ホーム/ブログトップ）
4. page-{id}.php（ページID固有）
5. page-{slug}.php（ページスラッグ固有）
6. page.php（固定ページ共通）
7. index.php（最終フォールバック）
```

**重要**: `home.php` は `page.php` より優先度が高い！

子テーマに `home.php` を作成することで、テンプレート階層を正しく制御できます。

