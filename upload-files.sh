#!/bin/bash
set -euo pipefail

# === 環境設定 ===
LOCAL_DIR="/Users/tk/Desktop/Patolaqshe_swell/swell_child"
# ファイルリスト
FILES_TO_UPLOAD=(
  "template-parts/front/section-bust-issues.php"
  "css/bust-issues-fix.css"
  "functions.php"
)

# === サーバーへアップロード ===
echo "以下のファイルをサーバーにアップロードします..."
for file in "${FILES_TO_UPLOAD[@]}"; do
  local_file="$LOCAL_DIR/$file"
  
  if [[ -f "$local_file" ]]; then
    echo "  - $file"
  else
    echo "エラー: $file が見つかりません" >&2
    exit 1
  fi
done

echo ""
echo "実際のアップロードコマンドを実行する準備ができました。"
echo "使用するアップロード方法を選択してください:"
echo "1. FTP (curl)"
echo "2. SCP (scp)"
echo "3. SFTP (sftp)"
echo ""
read -p "選択 (1-3): " choice

case $choice in
  1)
    # FTP情報入力
    read -p "FTPサーバー: " ftp_server
    read -p "FTPユーザー名: " ftp_user
    read -p "FTPパスワード: " -s ftp_pass
    echo ""
    read -p "リモートベースディレクトリ (例: /wp-content/themes/swell_child/): " remote_base
    
    for file in "${FILES_TO_UPLOAD[@]}"; do
      local_file="$LOCAL_DIR/$file"
      remote_path="ftp://$ftp_server$remote_base$file"
      
      # ディレクトリが存在するか確認できないため、念のためディレクトリを作成
      dir_path=$(dirname "$file")
      if [[ "$dir_path" != "." ]]; then
        echo "ディレクトリ確認: $dir_path"
        dirs=()
        current=""
        
        # ディレクトリ階層を分解
        IFS='/' read -ra parts <<< "$dir_path"
        for part in "${parts[@]}"; do
          if [[ -n "$current" ]]; then
            current="$current/$part"
          else
            current="$part"
          fi
          dirs+=("$current")
        done
        
        # 各階層のディレクトリを順に作成
        for dir in "${dirs[@]}"; do
          mkdir_cmd="curl -s --ftp-create-dirs -u \"$ftp_user:$ftp_pass\" \"ftp://$ftp_server$remote_base$dir/\" || true"
          echo "ディレクトリ作成: $remote_base$dir/"
          eval "$mkdir_cmd"
        done
      fi
      
      # ファイルをアップロード
      echo "アップロード: $local_file -> $remote_path"
      curl -T "$local_file" -u "$ftp_user:$ftp_pass" "$remote_path"
      echo "完了: $file"
    done
    ;;
    
  2)
    # SCP情報入力
    read -p "サーバーホスト: " server
    read -p "SSHユーザー名: " ssh_user
    read -p "リモートベースディレクトリ (例: /home/user/public_html/wp-content/themes/swell_child/): " remote_base
    
    for file in "${FILES_TO_UPLOAD[@]}"; do
      local_file="$LOCAL_DIR/$file"
      dir_path=$(dirname "$file")
      
      # ディレクトリ確認と作成
      if [[ "$dir_path" != "." ]]; then
        mkdir_cmd="ssh $ssh_user@$server \"mkdir -p $remote_base$dir_path\""
        echo "ディレクトリ作成: $remote_base$dir_path"
        eval "$mkdir_cmd"
      fi
      
      # ファイルをアップロード
      remote_path="$remote_base$file"
      echo "アップロード: $local_file -> $ssh_user@$server:$remote_path"
      scp "$local_file" "$ssh_user@$server:$remote_path"
      echo "完了: $file"
    done
    ;;
    
  3)
    # SFTP情報入力
    read -p "サーバーホスト: " server
    read -p "SFTPユーザー名: " sftp_user
    read -p "リモートベースディレクトリ (例: /home/user/public_html/wp-content/themes/swell_child/): " remote_base
    
    # SFTPコマンドファイルを作成
    sftp_cmds=$(mktemp)
    echo "# SFTP自動アップロードコマンド" > "$sftp_cmds"
    
    for file in "${FILES_TO_UPLOAD[@]}"; do
      dir_path=$(dirname "$file")
      
      # ディレクトリ確認と作成
      if [[ "$dir_path" != "." ]]; then
        echo "mkdir -p $remote_base$dir_path" >> "$sftp_cmds"
      fi
      
      # ファイルをアップロード
      echo "put $LOCAL_DIR/$file $remote_base$file" >> "$sftp_cmds"
      echo "# 完了: $file" >> "$sftp_cmds"
    done
    
    echo "SFTP接続してファイルをアップロードします..."
    sftp -b "$sftp_cmds" "$sftp_user@$server"
    rm "$sftp_cmds"
    ;;
    
  *)
    echo "無効な選択です。アップロードを中止します。" >&2
    exit 1
    ;;
esac

echo ""
echo "すべてのファイルのアップロードが完了しました！"