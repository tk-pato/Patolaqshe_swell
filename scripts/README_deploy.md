# 自動デプロイスクリプト使用方法

スクリプト: `scripts/auto_deploy.sh`

目的: 変更の `commit -> push`、変更ファイルのサーバーへの `rsync`、サーバー側の簡易検証までを一括で実行します。

安全機構:
- デフォルトは DRY_RUN モードです（何も実行せずに実行予定コマンドを表示）。
- 実行するには環境変数 `DRY_RUN=0` を付けて実行してください。

使い方例:

DRY RUN（確認）:
```
./scripts/auto_deploy.sh "説明メッセージ"
```

本番実行（commit/push/rsync/検証まで）:
```
DRY_RUN=0 ./scripts/auto_deploy.sh "あなたのコミットメッセージ"
```

動作概要:
- `git add swell_child` を行い変更をステージ
- ステージされた変更があれば `git commit -m "$MSG"` と `git push origin main` を実行（DRY_RUN=1 の場合は表示のみ）
- 直近コミットの変更ファイルから `swell_child/` 配下を抽出し `/tmp/rsync_files.txt` を作成
- 新規追加 (`A` ステータス) ファイルがあれば `必要ファイル/FILES_LIST_20251025.txt` に追記してコミット（DRY_RUN=1 の場合は表示のみ）
- `rsync --relative -avz --files-from=/tmp/rsync_files.txt` でサーバーへ転送
- サーバー上にファイルが存在するかの簡易検証を行う（`ssh` を使用）

注意事項:
- 実行前に SSH 鍵や `git` の認証情報が正しく設定されていることを確認してください。
- `必要ファイル/FILES_LIST_20251025.txt` に RAW URL を記載する運用が必要な場合は、追加で手動で RAW URL を追記してください（スクリプトは相対パスを追記します）。
