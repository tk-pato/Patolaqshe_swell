# お客様の声（uservoice）が表示されない問題 - デバッグレポート

## 📅 日付
2025年10月6日

## 🚨 問題の概要
WordPress管理画面の左サイドバーに「お客様の声」メニュー（⭐星アイコン）が表示されない。

## 🔍 現在の実装状況

### 1. カスタム投稿タイプの登録
**ファイル**: `swell_child/functions.php`
**場所**: Line 1723-1779

```php
add_action('init', function () {
  $labels = [
    'name' => 'お客様の声',
    'singular_name' => 'お客様の声',
    'menu_name' => 'お客様の声',
    // ... 省略
  ];
  
  $args = [
    'label' => 'お客様の声',
    'labels' => $labels,
    'public' => true,
    'show_ui' => true,
    'show_in_menu' => true,
    'show_in_admin_bar' => true,
    'menu_position' => 5,
    'menu_icon' => 'dashicons-star-filled',
    'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    'capability_type' => 'post',
    // ... 省略
  ];
  
  register_post_type('uservoice', $args);
}, 0); // 優先度0で実行
```

**✅ コードは正しく実装されている**

### 2. メタボックスの登録
**ファイル**: `swell_child/functions.php`
**場所**: Line 1782-1796

```php
add_action('add_meta_boxes', function () {
  add_meta_box(
    'uservoice_details',
    'お客様の声詳細',
    'ptl_uservoice_meta_box_callback',
    'uservoice',  // ← uservoice カスタム投稿タイプ用
    'normal',
    'high'
  );
});
```

**✅ コードは正しく実装されている**

### 3. メタボックスのコールバック関数
**場所**: Line 1796-1888

以下のフィールドを実装：
- 顧客名（customer_name）
- 見出し（uservoice_title）
- 星評価（rating: 1-5）
- 顧客画像（customer_image）
- 画像アップローダー（JavaScript）

**✅ コードは正しく実装されている**

### 4. 保存処理
**場所**: Line 1890-1913

```php
add_action('save_post', function ($post_id) {
  // Nonce チェック
  // 権限チェック
  // メタデータの保存
  // ✅ 正しく実装されている
});
```

## 🔄 重複する実装の問題

### 問題点: 2つのシステムが混在している

#### システムA: カスタム投稿タイプ `uservoice`（旧システム）
- **目的**: 独立したメニューとして管理
- **場所**: Line 1723-1913
- **メタボックス**: `uservoice_details`（uservoice専用）
- **状態**: コードは存在するが、管理画面に表示されない ❌

#### システムB: 通常の投稿 `post` + 条件付き表示（新システム？）
- **目的**: 通常の投稿内で種別を分ける
- **場所**: Line 1339-1518
- **メタボックス**: 
  - `post_type_selector`（記事種別選択）- Line 1339-1367
  - `uservoice_details_conditional`（条件付きお客様の声フィールド）- Line 1369-1518
- **条件**: `_post_category === 'uservoice'` の場合のみ表示
- **状態**: 実装されているが使用されていない可能性

## 🐛 考えられる原因

### 1. パーマリンク設定の未更新
**症状**: カスタム投稿タイプが登録されてもメニューに表示されない

**対策**: 実装済み（Line 1777-1779）
```php
add_action('after_switch_theme', function() {
  flush_rewrite_rules();
});
```

**問題**: `after_switch_theme` は一度しか発火しない

### 2. 権限（Capability）の問題
**設定状況**:
```php
'capability_type' => 'post',
'capabilities' => [
  'edit_post' => 'edit_posts',
  'edit_posts' => 'edit_posts',
  // ... 省略
],
```

**可能性**: 現在のユーザーに権限がない？

### 3. プラグインやテーマの競合
- 他のプラグインが `init` フックで競合している可能性
- 優先度を `0` に設定したが、それでも競合する可能性

### 4. データベースのキャッシュ
- オブジェクトキャッシュが古い状態を保持している可能性

### 5. `show_in_menu` の問題
```php
'show_in_menu' => true,
```
**期待**: トップレベルメニューとして表示
**実際**: 表示されていない

## 📝 試したこと（すべて失敗）

1. ✅ カスタム投稿タイプの登録コード追加
2. ✅ パーマリンク更新フック追加（`after_switch_theme`）
3. ✅ 優先度を `0` に設定
4. ✅ 詳細な `labels` と `capabilities` を設定
5. ✅ `show_in_nav_menus` を `true` に変更
6. ❌ 依然として管理画面に表示されない

## 🧪 検証が必要な項目

### A. サーバー側の確認
```bash
# カスタム投稿タイプが登録されているか確認
ssh patolaqshe@www3521.sakura.ne.jp "cd /home/patolaqshe/www/media && php -r \"
  define('WP_USE_THEMES', false);
  require('wp-load.php');
  \$types = get_post_types(['_builtin' => false], 'objects');
  print_r(\$types);
\""
```

### B. WordPress管理画面での手動確認
1. **設定 → パーマリンク設定** で「変更を保存」をクリック
2. 管理画面をハードリフレッシュ（Ctrl + Shift + R）
3. 左サイドバーを確認

### C. データベース直接確認
```sql
SELECT option_name, option_value 
FROM wp_options 
WHERE option_name LIKE '%rewrite%' 
OR option_name LIKE '%post_type%';
```

## 💡 推奨される解決策

### 解決策1: 強制的にパーマリンクを更新
```php
// functions.phpの最後に一時的に追加
add_action('admin_init', function() {
  if (get_option('ptl_force_flush') !== 'done') {
    flush_rewrite_rules(false);
    update_option('ptl_force_flush', 'done');
  }
});
```

### 解決策2: カスタム投稿タイプの完全な再登録
```php
// 既存のregister_post_typeを削除し、新しく作り直す
// プラグイン「Custom Post Type UI」を使用して手動登録
```

### 解決策3: システムの統一
**選択肢A**: カスタム投稿タイプ `uservoice` のみ使用（推奨）
- Line 1339-1518 の条件付きメタボックスを削除
- カスタム投稿タイプに集中

**選択肢B**: 通常の投稿 `post` + 条件付き表示のみ使用
- Line 1723-1913 のカスタム投稿タイプを削除
- 記事種別で管理

## 🔧 必要なファイル情報

### 関連ファイル
1. `swell_child/functions.php` (83KB)
2. `swell_child/template-parts/front/section-uservoice.php`
3. `swell_child/css/section-uservoice.css`
4. `swell_child/js/uservoice-slider.js`

### 依存関係
- WordPress 6.x
- SWELL 親テーマ
- Swiper.js (CDN)

## 📌 次のステップ

1. **まず試すべきこと**:
   ```
   WordPress管理画面 → 設定 → パーマリンク設定 → 変更を保存
   ```

2. **それでもダメな場合**:
   - カスタム投稿タイプが実際に登録されているか確認
   - PHPエラーログを確認
   - プラグインをすべて無効化してテスト

3. **最終手段**:
   - functions.phpのカスタム投稿タイプ部分を一旦削除
   - 「Custom Post Type UI」プラグインで手動登録
   - 動作確認後、プラグインをアンインストールしてコードに戻す

## 🆘 Sonnetへの質問

WordPressのカスタム投稿タイプ `uservoice` が管理画面に表示されない問題について：

1. 上記の実装で何が間違っている可能性があるか？
2. `register_post_type()` が正しく動作しているか確認する方法は？
3. `show_in_menu => true` なのにメニューに表示されない原因は？
4. 2つのシステム（カスタム投稿タイプと条件付きメタボックス）が競合している可能性は？
5. 即座に解決できる最も効果的な方法は？

---

**添付情報**:
- functions.php (83KB, 2448行)
- カスタム投稿タイプ登録: Line 1723-1779
- メタボックス登録: Line 1782-1913
