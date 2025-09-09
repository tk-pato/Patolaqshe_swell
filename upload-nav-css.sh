#!/bin/bash

# FTPサーバー情報を設定
FTP_SERVER="サーバーのアドレス"  # 例: ftp.example.com
FTP_USER="ユーザー名"
FTP_PASS="パスワード"
REMOTE_DIR="/wp-content/themes/swell_child/css/"

# アップロードするファイル
LOCAL_FILE="/Users/tk/Desktop/Patolaqshe_swell/swell_child/css/nav-adjustments.css"

# curlを使ってFTPアップロード
echo "FTPサーバーにファイルをアップロード中..."
curl -T "$LOCAL_FILE" -u "$FTP_USER:$FTP_PASS" "ftp://$FTP_SERVER$REMOTE_DIR"

echo "アップロード完了"
