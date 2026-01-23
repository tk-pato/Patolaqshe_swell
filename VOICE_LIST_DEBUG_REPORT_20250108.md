# お客様の声ショートコード - デバッグ・修正完了レポート

**日時:** 2026年1月8日  
**対象:** voice_list ショートコード  
**最新コミット:** `ab734d6` (fix: Correct custom field keys in voice_list shortcode)

---

## 🔍 デバッグ工程

### 1. 初期問題
- ショートコードが実装されたが、カスタムフィールドが取得できていない
- 実装時は以下のキー名を使用していた：
  - `お客様名`
  - `見出し`
  - `星評価`

### 2. 原因調査
投稿ID 1141 の全メタデータを確認したところ、**実際のキー名が異なっていた**：

| 想定していたキー | 実際のキー | 値 |
|---|---|---|
| `お客様名` | `_customer_name` | テストテストテスト |
| `見出し` | `_uservoice_title` | テストテストテスト |
| `星評価` | `_rating` | 5 |

**その他のメタデータ:**
- `_edit_lock`: 投稿編集ロック情報
- `_edit_last`: 最終編集者ID
- `_ptl_subtitle`: サブタイトル（空）
- `_ptl_hero_image_id`: ヒーロー画像ID
- `_ptl_lead`: リード文（空）
- `_post_category`: uservoice
- `_customer_image`: 顧客画像（未設定）
- `_uservoice_title`: **目的のフィールド**
- `_thumbnail_id`: アイキャッチ画像ID
- `_store_locations`: 店舗位置情報

---

## ✅ 修正内容

[swell_child/functions.php](swell_child/functions.php#L4680-L4682) のカスタムフィールドキーを修正：

### 修正前
```php
$customer_name = get_post_meta(get_the_ID(), 'お客様名', true);
$voice_title = get_post_meta(get_the_ID(), '見出し', true);
$rating = get_post_meta(get_the_ID(), '星評価', true);
```

### 修正後
```php
$customer_name = get_post_meta(get_the_ID(), '_customer_name', true);
$voice_title = get_post_meta(get_the_ID(), '_uservoice_title', true);
$rating = get_post_meta(get_the_ID(), '_rating', true);
```

---

## 📤 デプロイメント

### コミット
```
ab734d6 - fix: Correct custom field keys in voice_list shortcode (_customer_name, _uservoice_title, _rating)
```

### デプロイ手順
1. ✅ GitHub にプッシュ
2. ✅ サーバーにアップロード（rsync）
3. ✅ 動作確認完了

---

## 🎯 動作確認結果

### テスト実行
```
=== ショートコード動作確認 ===

見つかった投稿数: 5

✓ 投稿が見つかりました
```

### 各投稿のデータ取得
| 投稿ID | お客様名 | 見出し | 星評価 |
|---|---|---|---|
| 1141 | テストテストテスト | テストテストテスト | 5 |
| 1139 | テスト・・・ | 本当におすすめです。 | 5 |
| 1137 | テスト3 | テスト3 | 5 |
| 1135 | テスト2 | テスト2 | 5 |
| 1133 | テスト | テスト① | 5 |

### 検証
✅ **すべてのカスタムフィールドが正常に取得できています**

---

## 📊 実装概要

### ショートコード名
```
[voice_list]
```

### 処理フロー
1. **タクソノミー検索**
   - taxonomy: `article_type`
   - field: `name`
   - terms: `お客様の声`

2. **表示する投稿数**: 10件

3. **取得するメタデータ**
   - `_customer_name`: お客様の名前
   - `_uservoice_title`: 見出しテキスト
   - `_rating`: 星の評価数
   - `_thumbnail_id`: アイキャッチ画像

4. **出力HTML構造**
   ```html
   <div class="voice-list-custom">
     <div class="voice-card-item">
       <div class="voice-card-thumb">[アイキャッチ]</div>
       <div class="voice-card-content">
         <h3 class="voice-card-title">[見出し]</h3>
         <div class="voice-card-rating">[星評価]</div>
         <div class="voice-card-name">[お客様名]</div>
         <div class="voice-card-text">[本文]</div>
       </div>
     </div>
     ...
   </div>
   ```

---

## ✨ 完了ステータス

| 項目 | 状態 |
|---|---|
| コード修正 | ✅ 完了 |
| テスト実行 | ✅ 合格 |
| GitHub プッシュ | ✅ 完了 |
| サーバーアップロード | ✅ 完了 |
| 動作確認 | ✅ 正常 |
| 本番利用 | ✅ 可能 |

---

## 🚀 次のステップ

ページ内に `[voice_list]` ショートコードを挿入することで、「お客様の声」投稿が自動的に表示されます。

```
ページ本文に以下を記載:
[voice_list]
```

これにより、article_type が「お客様の声」に設定された投稿が、最大10件までカード形式で表示されます。

---

## 📝 備考

- CSS クラス（voice-list-custom, voice-card-item など）は別途スタイル定義が必要です
- 星の表示は Unicode の ☆ 文字を使用しています（カスタマイズ可能）
- データベースには既に5件のテストデータが存在し、すべてのカスタムフィールドが正常に設定されています
