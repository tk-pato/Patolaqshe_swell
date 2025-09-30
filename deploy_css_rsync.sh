#!/usr/bin/env bash
set -euo pipefail

# Patolaqshe: SALON/REASONS のCSSのみを安全に配布するための rsync スクリプト
# - ドライランがデフォルト（変更なしで差分を表示）
# - --files-from と --relative を利用し、必要最小限のファイルのみ転送
# - 不要ファイル(.DS_Store, *.bak, *.fixed, *.target)を除外
# - 転送後に remote 側のサイズ/時刻を確認
# 使い方:
#   ドライラン:  ./deploy_css_rsync.sh
#   本番実行:   ./deploy_css_rsync.sh live
#   後片付け:   ./deploy_css_rsync.sh live cleanup  # 不要ファイルのリモート掃除も実行

BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
FILES_LIST="${TMPDIR:-/tmp}/rsync_files.txt"

# 転送対象（ローカルのワークスペースルートからの相対パス）
cat >"$FILES_LIST" <<'EOF'
swell_child/css/section-salon.css
swell_child/css/section-reasons.css
EOF

# 接続情報
SSH_USER_HOST="patolaqshe@www3521.sakura.ne.jp"
REMOTE_THEME_BASE="/home/patolaqshe/www/media/wp-content/themes/"

# 除外パターン
EXCLUDES=(
  ".DS_Store"
  "*.bak"
  "*.fixed"
  "*.target"
)

# SSH オプション（鍵未設定環境でのパスワード認証を優先）
SSH_OPTS=(
  -o PreferredAuthentications=password
  -o PubkeyAuthentication=no
  -o StrictHostKeyChecking=accept-new
)

# 実行モード
DRY_RUN=1
DO_CLEANUP=0
if [[ "${1:-}" == "live" ]]; then
  DRY_RUN=0
fi
if [[ "${2:-}" == "cleanup" ]]; then
  DO_CLEANUP=1
fi

echo "[info] Workspace: $BASE_DIR"
echo "[info] Files-from: $FILES_LIST"
echo "[info] Remote:     $SSH_USER_HOST:$REMOTE_THEME_BASE"
echo "[info] Mode:       $([[ $DRY_RUN -eq 1 ]] && echo DRY-RUN || echo LIVE)"

# rsync 実行
RSYNC_FLAGS=(-avz --ipv4 --relative --files-from="$FILES_LIST")
for pat in "${EXCLUDES[@]}"; do
  RSYNC_FLAGS+=(--exclude="$pat")
done
if [[ $DRY_RUN -eq 1 ]]; then
  RSYNC_FLAGS+=(--dry-run)
fi

echo "[step] rsync ${RSYNC_FLAGS[*]} "$BASE_DIR" -> $SSH_USER_HOST:$REMOTE_THEME_BASE"
rsync "${RSYNC_FLAGS[@]}" -e "ssh ${SSH_OPTS[*]}" "$BASE_DIR/" "$SSH_USER_HOST:$REMOTE_THEME_BASE"

if [[ $DRY_RUN -eq 1 ]]; then
  echo "[done] ドライラン完了。問題なければ: ./deploy_css_rsync.sh live を実行してください。"
  exit 0
fi

echo "[step] 転送後のリモート確認"
REMOTE_FILE1="${REMOTE_THEME_BASE}swell_child/css/section-salon.css"
REMOTE_FILE2="${REMOTE_THEME_BASE}swell_child/css/section-reasons.css"

# GNU/Linux を想定して stat のフォーマットを使用
ssh "${SSH_OPTS[@]}" "$SSH_USER_HOST" \
  "set -e; for f in '$REMOTE_FILE1' '$REMOTE_FILE2'; do if [ -f \"$f\" ]; then stat -c '%n %s %y' \"$f\"; else echo 'MISSING ' \"$f\"; fi; done"

if [[ $DO_CLEANUP -eq 1 ]]; then
  echo "[step] 不要ファイルの掃除を実行: (.DS_Store, *.bak, *.fixed, *.target)"
  ssh "${SSH_OPTS[@]}" "$SSH_USER_HOST" \
    "find '$REMOTE_THEME_BASE' -type f \( -name '.DS_Store' -o -name '*.bak' -o -name '*.fixed' -o -name '*.target' \) -print -delete"
fi

echo "[done] 転送および検証完了"
