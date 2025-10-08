#!/bin/zsh
set -euo pipefail

# deploy_spacing_rsync.sh
# 目的:
#  - 本番に「余白まわりの最終変更」を安全に反映（INTROのインラインmargin撤去 + 各セクション60px厳守CSS）
#  - 直前バックアップから即時ロールバック可能にする
#
# 使い方:
#  1) ドライラン（差分だけ表示・非転送）
#     ./deploy_spacing_rsync.sh
#  2) 本番反映
#     ./deploy_spacing_rsync.sh live
#  3) 本番反映＋不要ファイル掃除（任意）
#     ./deploy_spacing_rsync.sh live cleanup
#  4) ロールバック（直前バックアップから対象ファイルのみ復元）
#     ./deploy_spacing_rsync.sh rollback      # ドライラン
#     ./deploy_spacing_rsync.sh rollback live # 実行
#  5) リモート検証
#     ./deploy_spacing_rsync.sh verify
#
# 前提:
#  - 本スクリプトはワークスペース直下で実行
#  - SSH接続可能な環境（公開鍵 or 事前設定済み）
#  - 直前バックアップ: BACKUPS/20251008_spacing_guard/swell_child/

BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
# 直前バックアップ（このスクリプトが生成する日付フォルダに合わせています）
BACKUP_DIR="$BASE_DIR/BACKUPS/20251008_spacing_guard/swell_child"

# 転送対象（相対パス）
FILES=(
  "swell_child/css/section-news.css"
  "swell_child/css/issues-navigation.css"
  "swell_child/css/section-reasons.css"
  "swell_child/css/section-salon.css"
  "swell_child/css/section-intro.css"
  "swell_child/template-parts/front/section-intro.php"
)

# 接続情報（既存の運用に合わせています。必要に応じて変更してください）
SSH_USER_HOST="patolaqshe@www3521.sakura.ne.jp"
REMOTE_THEME_BASE="/home/patolaqshe/www/media/wp-content/themes/"
REMOTE_CHILD_DIR="$REMOTE_THEME_BASE/swell_child"

# SSHオプション（鍵が使える場合はPubkeyを優先に変更可）
SSH_OPTS=(
  -o StrictHostKeyChecking=accept-new
)

MODE="${1:-dry}"
EXTRA="${2:-}"

make_files_from_list() {
  local listfile="$1"
  : > "$listfile"
  for f in "${FILES[@]}"; do
    if [[ -f "$BASE_DIR/$f" ]]; then
      echo "$f" >> "$listfile"
    else
      echo "[WARN] missing local file: $f" >&2
    fi
  done
}

make_files_from_backup() {
  local listfile="$1"
  : > "$listfile"
  for f in "${FILES[@]}"; do
    local rel="${f#swell_child/}"
    if [[ -f "$BACKUP_DIR/$rel" ]]; then
      # --relative 用にバックアップ側のパスをswell_child起点に合わせる
      echo "swell_child/$rel" >> "$listfile"
    else
      echo "[WARN] missing backup file: $rel" >&2
    fi
  done
}

rsync_push() {
  local filesFrom="$1"; shift
  local dryRunFlag=(--dry-run)
  [[ "$MODE" == "live" ]] && dryRunFlag=()
  local excludes=(--exclude ".DS_Store" --exclude "*.bak" --exclude "*.fixed" --exclude "*.target")

  echo "[STEP] rsync push -> $SSH_USER_HOST:$REMOTE_THEME_BASE (mode: ${MODE})"
  rsync -avz --ipv4 --relative --files-from="$filesFrom" "${excludes[@]}" "${dryRunFlag[@]}" \
    -e "ssh ${SSH_OPTS[*]}" "$BASE_DIR/" "$SSH_USER_HOST:$REMOTE_THEME_BASE"
}

rsync_push_from_backup() {
  local filesFrom="$1"; shift
  local dryRunFlag=(--dry-run)
  [[ "$EXTRA" == "live" ]] && dryRunFlag=()
  local excludes=(--exclude ".DS_Store" --exclude "*.bak" --exclude "*.fixed" --exclude "*.target")

  echo "[STEP] ROLLBACK push (from BACKUP) -> $SSH_USER_HOST:$REMOTE_THEME_BASE (mode: ${EXTRA:-dry})"
  rsync -avz --ipv4 --relative --files-from="$filesFrom" "${excludes[@]}" "${dryRunFlag[@]}" \
    -e "ssh ${SSH_OPTS[*]}" "$BASE_DIR/BACKUPS/20251008_spacing_guard/" "$SSH_USER_HOST:$REMOTE_THEME_BASE"
}

verify_remote() {
  echo "[STEP] verify remote files"
  ssh "${SSH_OPTS[@]}" "$SSH_USER_HOST" \
    "set -e; for f in ${FILES[@]}; do p=\"$REMOTE_THEME_BASE/$f\"; if [ -f \"$p\" ]; then stat -c '%n %s %y' \"$p\"; else echo 'MISSING ' \"$p\"; fi; done"
}

case "$MODE" in
  dry|live)
    tmpList="${TMPDIR:-/tmp}/spacing_files.txt"
    make_files_from_list "$tmpList"
    rsync_push "$tmpList"
    if [[ "$MODE" == "live" && "$EXTRA" == "cleanup" ]]; then
      echo "[STEP] cleanup remote junk files"
      ssh "${SSH_OPTS[@]}" "$SSH_USER_HOST" \
        "find '$REMOTE_THEME_BASE' -type f \\! -path '*/.git/*' \
           \( -name '.DS_Store' -o -name '*.bak' -o -name '*.fixed' -o -name '*.target' \) -print -delete"
    fi
    echo "[DONE] deploy (${MODE}) finished. Use './deploy_spacing_rsync.sh verify' to confirm."
    ;;
  rollback)
    tmpList="${TMPDIR:-/tmp}/spacing_files_rollback.txt"
    make_files_from_backup "$tmpList"
    rsync_push_from_backup "$tmpList"
    echo "[DONE] rollback (${EXTRA:-dry}) finished. Use './deploy_spacing_rsync.sh verify' to confirm."
    ;;
  verify)
    verify_remote
    ;;
  *)
    echo "Usage: $0 [dry|live|rollback|verify] [cleanup|live]" >&2
    exit 1
    ;;
 esac
