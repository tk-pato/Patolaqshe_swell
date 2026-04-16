#!/usr/bin/env bash
set -euo pipefail

# auto_deploy.sh
# 目的: ワークフローを一括で実行する補助スクリプト
# - 変更をステージ -> commit -> push
# - 直近コミットの swell_child/ 配下ファイルを /tmp/rsync_files.txt に出力
# - 新規追加ファイルがあれば `必要ファイル/FILES_LIST_20251025.txt` に追記してコミット
# - rsync でサーバーへアップロード -> サーバー上で簡易検証（存在確認）
#
# 安全設計: デフォルトは DRY_RUN=1（実行前に確認）。実際に push/rsync する場合は
# 環境変数を指定して実行してください:
# DRY_RUN=0 ./scripts/auto_deploy.sh "commit message"

MSG=${1:-"auto: deploy changes"}
DRY_RUN=${DRY_RUN:-1}

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "[auto_deploy] ROOT=$ROOT"
echo "[auto_deploy] DRY_RUN=$DRY_RUN"

# Fetch remote refs to avoid accidental history mismatch
git fetch origin

echo "Staging changes under swell_child/"
git add swell_child || true

if git diff --cached --name-only | grep -q .; then
  echo "Committing changes"
  if [ "$DRY_RUN" -eq 1 ]; then
    echo "DRY RUN: git commit -m \"$MSG\""
  else
    git commit -m "$MSG"
    git push origin main
  fi
else
  echo "No changes to commit."
fi

# Determine files in last commit (if any)
if git rev-parse --verify HEAD >/dev/null 2>&1; then
  : # normal case
else
  # no HEAD yet
  echo "No HEAD; initial commit state"
fi

FILES_CHANGED=$(git diff --name-only HEAD^ HEAD 2>/dev/null || true)
RSYNC_FILES=$(echo "$FILES_CHANGED" | grep "^swell_child/" || true)

if [ -z "$RSYNC_FILES" ]; then
  echo "No changed files under swell_child/ found in last commit."
  # Try to pick unstaged/uncommitted changes for rsync as a fallback
  RSYNC_FILES=$(git status --porcelain --untracked-files=all | awk '{print $2}' | grep "^swell_child/" || true)
fi

if [ -z "$RSYNC_FILES" ]; then
  echo "No swell_child files to rsync. Exiting." 
  exit 0
fi

printf "%s\n" $RSYNC_FILES > /tmp/rsync_files.txt
echo "Wrote /tmp/rsync_files.txt:" && cat /tmp/rsync_files.txt

# Handle newly added files: append to 必要ファイル/FILES_LIST_20251025.txt if missing
ADDED=$(git diff --name-status HEAD^ HEAD 2>/dev/null | awk '$1=="A"{print $2}' | grep "^swell_child/" || true)
FILELIST="必要ファイル/FILES_LIST_20251025.txt"
if [ -n "$ADDED" ]; then
  echo "New files added in this commit:"
  echo "$ADDED"
  for f in $ADDED; do
    if [ ! -f "$FILELIST" ]; then
      echo "Creating $FILELIST"
      touch "$FILELIST"
      git add "$FILELIST" || true
    fi
    if ! grep -Fxq "$f" "$FILELIST"; then
      echo "$f" >> "$FILELIST"
      echo "Appended $f to $FILELIST"
      if [ "$DRY_RUN" -eq 0 ]; then
        git add "$FILELIST"
        git commit -m "chore: add $f to $FILELIST" || true
        git push origin main || true
      else
        echo "DRY RUN: would commit updated $FILELIST"
      fi
    else
      echo "$f already present in $FILELIST"
    fi
  done
fi

# RSYNC to remote server
RSYNC_DEST="patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/wp-content/themes/"

if [ "$DRY_RUN" -eq 1 ]; then
  echo "DRY RUN: would run rsync --relative -avz --files-from=/tmp/rsync_files.txt $ROOT/ $RSYNC_DEST"
  echo "Set DRY_RUN=0 to perform actual rsync and verification."
  exit 0
fi

echo "Running rsync to $RSYNC_DEST"
rsync --relative -avz --files-from=/tmp/rsync_files.txt "$ROOT/" "$RSYNC_DEST"

echo "Server-side verification (simple existence checks)"
while read -r f; do
  echo "Verifying $f on server..."
  ssh patolaqshe@www3521.sakura.ne.jp "if [ -f /home/patolaqshe/www/wp-content/themes/$f ]; then echo 'FOUND: $f'; else echo 'MISSING: $f'; fi"
done < /tmp/rsync_files.txt

echo "auto_deploy: done"
