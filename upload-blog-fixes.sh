#!/bin/bash
set -euo pipefail

# ==== ブログセクション修正アップロード ====
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
echo "🚀 ブログセクション修正をアップロード開始 - ${TIMESTAMP}"

# ローカルパス
LOCAL_BASE="/Users/tk/Desktop/Patolaqshe_swell/swell_child"

# サーバーパス（SSH用）
SERVER="tk@160.251.1.169"
REMOTE_BASE="/home/tk/patolaqshe.com/public_html/wp-content/themes/swell_child"

# アップロード対象ファイル
FILES=(
  "home.php"
  "css/section-blog.css"
)

echo "📁 修正ファイル一覧:"
for file in "${FILES[@]}"; do
  echo "  - ${file}"
  if [[ ! -f "${LOCAL_BASE}/${file}" ]]; then
    echo "❌ ファイルが見つかりません: ${LOCAL_BASE}/${file}"
    exit 1
  fi
done

# rsync でアップロード
echo ""
echo "🔄 アップロード実行中..."
for file in "${FILES[@]}"; do
  echo "📤 ${file}"
  
  # ディレクトリ作成
  DIR=$(dirname "${REMOTE_BASE}/${file}")
  ssh "${SERVER}" "mkdir -p '${DIR}'"
  
  # ファイルアップロード
  rsync -avz "${LOCAL_BASE}/${file}" "${SERVER}:${REMOTE_BASE}/${file}"
  
  if [[ $? -eq 0 ]]; then
    echo "✅ ${file} - 完了"
  else
    echo "❌ ${file} - エラー"
    exit 1
  fi
done

echo ""
echo "🎉 全ファイルのアップロード完了!"
echo "⏰ 完了時刻: $(date +"%Y-%m-%d %H:%M:%S")"

# サーバー上のファイルタイムスタンプ確認
echo ""
echo "📋 サーバー側ファイル確認:"
for file in "${FILES[@]}"; do
  ssh "${SERVER}" "ls -la '${REMOTE_BASE}/${file}'" 2>/dev/null || echo "⚠️  ${file} - 確認できませんでした"
done

echo ""
echo "🔗 サイト確認: https://patolaqshe.com/"
echo "📝 修正内容:"
echo "  1. home.php - フロントページとブログページの分離"
echo "  2. section-blog.css - スライダー全幅表示修正"