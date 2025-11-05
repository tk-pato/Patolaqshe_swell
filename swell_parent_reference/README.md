# SWELL 親テーマ (Reference Only)

## 目的

このディレクトリは **SWELL親テーマのリファレンス専用コピー** です。
AI (GitHub Copilot) がコーディング指示を行う際に親テーマの構造を参照し、子テーマとの競合を防ぐために配置しています。

## ⚠️ 重要な注意事項

- **絶対に編集しないでください** - このファイルは読み取り専用です
- **本番環境では使用されません** - サーバー上の `/home/patolaqshe/www/media/wp-content/themes/swell/` が実際の親テーマです
- **子テーマが優先されます** - 実装は `swell_child/` で行ってください

## ディレクトリ情報

- **テーマ名**: SWELL (購入済み商用WordPressテーマ)
- **サーバーパス**: `/home/patolaqshe/www/media/wp-content/themes/swell/`
- **ダウンロード日**: 2025-11-05
- **用途**: AI コーディング支援のためのリファレンス

## 主要ファイル

- `footer.php` - 親テーマのフッターテンプレート
- `header.php` - 親テーマのヘッダーテンプレート
- `functions.php` - 親テーマの関数定義
- `style.css` - 親テーマスタイル情報

## WordPressテーマ階層

子テーマ (swell_child) に同名ファイルがある場合、子テーマが優先されます：

```
子テーマ (swell_child/) 
  ↓ 優先
親テーマ (swell/)
```

例：
- `swell_child/footer.php` が存在 → 子テーマのfooter.phpが使用される
- `swell_child/footer.php` が存在しない → 親テーマのfooter.phpが使用される

## 更新履歴

- 2025-11-05: 初回ダウンロード (サーバーから取得)
