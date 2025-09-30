#!/bin/bash
set -euo pipefail

# ==== 設定（要編集）====
# 例: sv10936.xserver.jp
FTP_SERVER="CHANGE_ME_SERVER"
# 例: patolaqshe
FTP_USER="CHANGE_ME_USER"
FTP_PASS="CHANGE_ME_PASS"
# Xserver のWordPressが /home/USER/www/media/ にある場合
REMOTE_BASE="/home/patolaqshe/www/media/wp-content/themes/swell_child"

# ==== 対象ファイル ====
FILES=(
  "swell_child/functions.php::${REMOTE_BASE}/functions.php"
  "swell_child/style.css::${REMOTE_BASE}/style.css"
  "swell_child/css/section-salon.css::${REMOTE_BASE}/css/section-salon.css"
  "swell_child/template-parts/front/section-salon.php::${REMOTE_BASE}/template-parts/front/section-salon.php"
)

echo "Start FTP upload (curl)"
for spec in "${FILES[@]}"; do
  LOCAL="${spec%%::*}"
  REMOTE="${spec##*::}"
  if [[ ! -f "$LOCAL" ]]; then
    echo "[SKIP] not found: $LOCAL" >&2
    continue
  fi
  REMOTE_DIR="$(dirname "$REMOTE")/"
  echo "Uploading $LOCAL -> ftp://$FTP_SERVER$REMOTE"
  curl -sS -T "$LOCAL" -u "$FTP_USER:$FTP_PASS" "ftp://$FTP_SERVER$REMOTE_DIR"
  echo "OK: $(basename "$LOCAL")"
done

echo "Done."
