#!/bin/bash
# upload-functions-php.sh - 2025-09-12
# SPカード縮小機能のアップロードスクリプト

SOURCE="/Users/tk/Desktop/Patolaqshe_swell/swell_child/functions.php"
DEST="root@160.251.91.64:/home/tk/patolaqshe.jp/public_html/wp-content/themes/swell_child/"
BACKUP="/Users/tk/Desktop/Patolaqshe_swell/BACKUPS/functions.php.$(date "+%Y%m%d%H%M")"

# バックアップ作成
echo "バックアップ作成中..."
cp "$SOURCE" "$BACKUP"
echo "バックアップ完了: $BACKUP"

# rsyncでアップロード試行
echo "rsyncでアップロード試行中..."
rsync -avz -e "ssh -o ConnectTimeout=30" "$SOURCE" "$DEST"

# 結果確認
if [ $? -eq 0 ]; then
  echo "アップロード成功！"
  echo "- 実装機能："
  echo "  ③ SPカード縮小（.ptl-nav-collapsible 配下のみ）"
  echo "  - カードギャップ縮小 (--ptl-gap: 14px)"
  echo "  - アイコンサイズ縮小 (26px x 26px)"
  echo "  - テキストサイズ最適化 (13px, line-height 1.3)"
  echo "  - max-height再計測JS実装"
else
  echo "アップロード失敗 - 手動でFTPソフトからアップロードしてください"
  echo "対象ファイル: $SOURCE"
  echo "宛先パス: /wp-content/themes/swell_child/functions.php"
fi

# 現在時刻を記録
echo "実行日時: $(date)"
