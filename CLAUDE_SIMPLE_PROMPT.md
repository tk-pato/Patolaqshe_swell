# Claude との対話用 - フッター実装プロンプト（シンプル版）

## 前置き

以下の技術背景をご理解の上、実装プロンプトにお応えください。

---

## 📖 背景情報

### システム構成
```
WordPress: /home/patolaqshe/www/media/
- テーマ: SWELL（親テーマ）
- カスタマイズ: swell_child（子テーマ）

重要: 子テーマの footer.php は親テーマを上書きするため、
      functions.php の hook でカスタマイズすべき
```

---

## 🎯 実装リクエスト

**条件: アプローチ C（関数フック方式）を使用**

```php
// swell_child/functions.php に追加
add_action( 'get_footer', function() { ... }, 9 );
```

---

## 📋 フッターに追加する要素

### 1. サイトマップセクション
```
TOP
PHILOSOPHY
MENU
STAFF
NEWS
BLOG
CONTACT
```

### 2. クイックリンク
```
新着情報
おすすめ施術
スタッフ紹介
```

### 3. ソーシャルメディア
```
Instagram (Daikanyama)
Instagram (Ginza)
```

### 4. SEO 対策
- JSON-LD Schema（Organization + LocalBusiness）

---

## 🎨 デザイン

### PC（960px以上）
- 4 カラムレイアウト
- サイトマップ | クイックリンク | 企業情報 | ソーシャル

### SP（959px以下）
- 1 カラム
- アコーディオン形式で展開/折りたたみ

---

## 📝 出力形式

**以下を提供してください:**

1. `functions.php` に追加するコード
2. `template-parts/custom-footer-sitemap.php` ファイル
3. `assets/css/footer-custom.css`（レスポンシブスタイル）
4. 実装手順書

---

## ✅ 実装確認事項

- [ ] 親テーマの footer.php は一切変更なし
- [ ] swell_child/footer.php は作成しない
- [ ] WordPress 標準関数を使用
- [ ] セキュリティ対策済み（サニタイズ）
- [ ] PC/SP 対応
- [ ] JSON-LD が正しい形式

---

**以上です。実装をお願いします。** 🚀

