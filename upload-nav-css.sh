#!/bin/bash
set -euo pipefail

# === FTPサーバー情報を設定（必要に応じて編集）===
FTP_SERVER="サーバーのアドレス"  # 例: ftp.example.com
FTP_USER="ユーザー名"
FTP_PASS="パスワード"

# リモートディレクトリ
REMOTE_CSS_DIR="/wp-content/themes/swell_child/css/"
REMOTE_JS_DIR="/wp-content/themes/swell_child/js/"

# ローカルファイル（navigation 専用）
BASE_DIR="/Users/tk/Desktop/Patolaqshe_swell/swell_child"
LOCAL_CSS_FILE="$BASE_DIR/css/navigation.css"
LOCAL_JS_FILE="$BASE_DIR/js/navigation.js"

echo "FTPサーバーに navigation ファイルをアップロードします..."

# CSS
if [[ -f "$LOCAL_CSS_FILE" ]]; then
	echo "Uploading CSS: $LOCAL_CSS_FILE -> ftp://$FTP_SERVER$REMOTE_CSS_DIR"
	curl -T "$LOCAL_CSS_FILE" -u "$FTP_USER:$FTP_PASS" "ftp://$FTP_SERVER$REMOTE_CSS_DIR"
else
	echo "WARN: CSSが見つかりません: $LOCAL_CSS_FILE" >&2
fi

# JS
if [[ -f "$LOCAL_JS_FILE" ]]; then
	echo "Uploading JS: $LOCAL_JS_FILE -> ftp://$FTP_SERVER$REMOTE_JS_DIR"
	curl -T "$LOCAL_JS_FILE" -u "$FTP_USER:$FTP_PASS" "ftp://$FTP_SERVER$REMOTE_JS_DIR"
else
	echo "WARN: JSが見つかりません: $LOCAL_JS_FILE" >&2
fi

echo "アップロード完了"
