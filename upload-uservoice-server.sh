#!/bin/bash
# User's Voice セクション サーバーアップロード

DEST="root@160.251.91.64:/home/tk/patolaqshe.jp/public_html/wp-content/themes/swell_child/"
SOURCE_DIR="/Users/tk/Desktop/Patolaqshe_swell/swell_child"

echo "=== User's Voice セクション サーバーアップロード ==="

# 1. functions.php
echo "1. functions.php をアップロード中..."
rsync -avz -e "ssh -o ConnectTimeout=30" "$SOURCE_DIR/functions.php" "$DEST"

# 2. section-uservoice.php
echo "2. section-uservoice.php をアップロード中..."
rsync -avz -e "ssh -o ConnectTimeout=30" "$SOURCE_DIR/template-parts/front/section-uservoice.php" "$DEST/template-parts/front/"

# 3. section-uservoice.css
echo "3. section-uservoice.css をアップロード中..."
rsync -avz -e "ssh -o ConnectTimeout=30" "$SOURCE_DIR/css/section-uservoice.css" "$DEST/css/"

# 4. uservoice-slider.js
echo "4. uservoice-slider.js をアップロード中..."
rsync -avz -e "ssh -o ConnectTimeout=30" "$SOURCE_DIR/js/uservoice-slider.js" "$DEST/js/"

echo ""
echo "🎉 全ファイルのアップロード完了！"
echo ""
echo "実装内容："
echo "- カスタム投稿タイプ 'uservoice' の登録"
echo "- User's Voice セクションの表示"
echo "- レスポンシブ Swiper スライダー"
echo "- スマートフォン最適化 CSS"
echo "- service-nav セクションの削除"
echo ""
echo "確認URL: https://patolaqshe.jp/"
echo "管理画面: https://patolaqshe.jp/wp-admin/"
