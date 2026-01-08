**Overview**
- **要旨**: `news` セクションのモーダル周りと navigation のバナーリンクに関する作業の引き継ぎメモ。短く実務的にまとめています。

**Recent Changes (重要なコミット)**
- **`c11c2eb`**: `swell_child/js/news-modal.js` — 早期 return を削除（クローズボタンが動作しない問題を修正）
- **`398cbd6`**: `swell_child/template-parts/front/section-news.php` — `<?php echo do_shortcode('[news_list_modal]'); ?>` を `</section>` の直前に挿入
- 過去に `functions.php` に `news_list_modal` ショートコードと `pato_enqueue_news_modal_assets`（JS/CSS の enqueue）が追加されています（履歴参照）。

**主要ファイル/場所**
- テーマルート: `/home/patolaqshe/www/media/wp-content/themes/swell_child/`
- モーダル JS: `swell_child/js/news-modal.js`
- ショートコード呼び出し: `swell_child/template-parts/front/section-news.php`（行75付近に挿入済み）
- Enqueue / ショートコード実装: `swell_child/functions.php`
- CSS: `swell_child/css/pc/news-modal-pc.css` / `swell_child/css/sp/news-modal-sp.css`

**デプロイ手順（必ず守る）**
- ローカルで変更 -> commit -> push `origin main`
  - 例: `git add <files>` → `git commit -m "..."` → `git push origin main`
- サーバー反映: rsync を使う（相対パス保持）
  - 例: ```
    rsync --relative -avz swell_child/js/news-modal.js patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/media/wp-content/themes/
    rsync --relative -avz swell_child/template-parts/front/section-news.php patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/media/wp-content/themes/
    ```
- サーバー検証: `grep -n` で挿入・変更箇所を確認
  - 例: `ssh user@host 'grep -n "news_list_modal" /path/to/swell_child/template-parts/front/section-news.php'`
  - 例: `ssh user@host 'grep -n "初期化開始" /path/to/swell_child/js/news-modal.js'`

**検証チェックリスト（優先）**
- ページ表示: ニュースセクションが正しく表示される
- トリガー動作: モーダルを開ける（`data-modal-id` を持つ要素）
- クローズ動作: クローズボタン / 背景クリック / ESC で閉じること
- クロスデバイス: PC と SP（特に CSS の読み込み）
- キャッシュ: WP キャッシュやブラウザキャッシュをクリアして再確認

**未完タスク（次にやること）**
- `modal-triggers.js` の作成（`sitenav-blog-modal.js` と `news-more-trigger.js` のロジックを統合）
- 統合後に古い `sitenav-blog-modal.js` と `news-more-trigger.js` を削除（コミット・push・rsync・検証）
- `functions.php` の enqueues を整理して `pato_enqueue_modal_triggers` を追加し依存配列を設定（例: `array('pato-blog-modal','pato-news-modal')`）
- 新規ファイルが生じた場合は `必要ファイル/FILES_LIST_20251025.txt` に RAW URL を追記して commit/push し、サーバーへ rsync する

**注意点 / リスク**
- 複数回の force-push/rsync があったため、作業前に `git rev-parse HEAD` と `git log -1` を確認して現在の HEAD を把握すること
- WP 側のキャッシュ（プラグインや CDN）が残っていると即時反映されない
- テンプレート内でショートコードを追加したことで、ショートコード関数側の出力に依存する。`functions.php` のショートコード実装を先に確認すること

**連絡メモ（開発者向け）**
- 直近の問題は `news-modal.js` の早期 return により、クローズハンドラ登録が飛んでいた点。今回の修正でクローズ系は登録されるようになっています。
- 次の改修でトリガーの集中管理を行うと保守性が上がります。変更は必ず `commit -> push -> rsync -> verify` の順で行ってください。

---
ファイル作成: `必要ファイル/VS_HANDOFF_NEWS_NAV.md`
作成日時: 2025-12-11
作成者: 自動生成（引き継ぎメモ）
