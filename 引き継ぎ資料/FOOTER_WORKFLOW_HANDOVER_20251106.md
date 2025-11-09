# フッター修正ワークフロー引き継ぎメモ

**作成日**: 2025年11月6日  
**対象プロジェクト**: Patolaqshe_swell（SWELL子テーマ）  
**最終commit**: b5d013d - Adjust SP footer layout to match Asti style (centered gray box)

---

## 📋 概要

フッターの修正は以下の流れで実施：
1. **プロンプト検証** → ローカルファイル修正 → commit/push → サーバーアップロード
2. 修正者に自動承認させて確認待機を排除
3. **サーバーアップロード先の安全性を最優先**（親テーマ紛失防止）

---

## 🚨 【重要】サーバーアップロード先の安全ルール

### ✅ 許可されるアップロード先
```
rsync [...] patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/media/wp-content/themes/swell_child/
```

### ❌ 絶対に触ってはいけないパス
```
❌ /home/patolaqshe/www/media/wp-content/themes/swell_parent_reference/
❌ /home/patolaqshe/www/media/wp-content/themes/swell/
❌ /home/patolaqshe/www/media/wp-content/themes/ (親ディレクトリへのアップロード)
```

### 🔒 アップロード安全チェックリスト
- [ ] `--files-from=/tmp/rsync_files.txt` を必ず使用
- [ ] `/tmp/rsync_files.txt` には `swell_child/` 配下のみ記載
- [ ] アップロード先が `swell_child/` で終了することを確認
- [ ] コマンド実行前に `cat /tmp/rsync_files.txt` で内容確認

---

## 📝 修正ワークフロー（標準フロー）

### 1️⃣ プロンプト検証フェーズ

```markdown
## 実行手順

### a) ファイル内容確認
- 修正対象ファイルを read_file で取得
- プロンプト内の検索文字列との完全一致確認

### b) 検索文字列チェック
必ず確認する項目：
- インデント（tab/space混在なし）
- 改行位置の一致
- コメント・空行の位置
- 閉じタグ・括弧の位置

### c) 結論判定
✅ 実行可能 → 修正を進行
❌ 不一致 → ユーザーへフィードバック（再プロンプト依頼）
```

### 2️⃣ ローカル修正フェーズ

```bash
# 修正1, 修正2, ...を実行
replace_string_in_file で各修正を順次実施

# 注意事項
- 1つの修正につき1回の置換
- 置換前後の文脈を3-5行含める
- 修正完了ごとに todo_list を更新
```

### 3️⃣ Git反映フェーズ（自動実行）

```bash
# ステージング
git add swell_child/[対象ファイル]

# コミット
git commit -m "[修正内容の説明]"

# プッシュ
git push origin main

# 確認不要 - 自動で実行
```

### 4️⃣ ファイルリスト準備フェーズ（自動実行）

```bash
# /tmp/rsync_files.txt に修正ファイルのみリスト化
cat >/tmp/rsync_files.txt <<EOF
swell_child/css/footer.css
swell_child/css/sp/footer-sp.css
EOF

# 内容確認（ユーザーへの報告用）
cat /tmp/rsync_files.txt
```

### 5️⃣ サーバーアップロードフェーズ（最重要）

```bash
# 【必ず実行する安全チェック】
echo "=== アップロード内容確認 ==="
cat /tmp/rsync_files.txt
echo ""
echo "=== アップロード先確認 ==="
echo "先: patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/media/wp-content/themes/swell_child/"
echo ""

# アップロード実行
rsync -avz --files-from=/tmp/rsync_files.txt /Users/tk/Patolaqshe_swell/ \
  patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/media/wp-content/themes/

# ✅ 成功メッセージ確認
# "sent X bytes  received Y bytes" が表示されること
```

### 6️⃣ サーバー検証フェーズ（自動実行）

```bash
# サーバーからダウンロードして検証
rsync -avz patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/media/wp-content/themes/swell_child/[対象ファイル] /tmp/verify_[対象ファイル]

# 修正内容が反映されているか確認
grep "[検索パターン]" /tmp/verify_[対象ファイル]
```

---

## 🔄 実際の修正例（フッター修正の場合）

### 例: footer.css 修正の場合

```bash
### ステップ1: 検証
- footer.cssをread_fileで確認
- プロンプト内の検索文字列と照合
- ✅ 一致 → 進行

### ステップ2: 修正
- replace_string_in_file で修正実施
- 複数の修正がある場合は順次実行

### ステップ3: Git反映
git add swell_child/css/footer.css
git commit -m "Fix footer: [修正内容]"
git push origin main

### ステップ4: ファイルリスト準備
cat >/tmp/rsync_files.txt <<EOF
swell_child/css/footer.css
EOF

### ステップ5: アップロード前チェック
cat /tmp/rsync_files.txt
# 出力: swell_child/css/footer.css
#      （swell_child/ 配下のみ → ✅ 安全）

### ステップ6: アップロード実行
rsync -avz --files-from=/tmp/rsync_files.txt /Users/tk/Patolaqshe_swell/ \
  patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/media/wp-content/themes/

### ステップ7: サーバー検証
rsync -avz patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/media/wp-content/themes/swell_child/css/footer.css /tmp/verify_footer.css
grep -n "検索文字列" /tmp/verify_footer.css
# ✅ 修正内容が反映されていることを確認
```

---

## 📊 修正ファイル管理

### 現在のfooter関連ファイル構成

```
swell_child/
├── footer.php                    # メインフッターHTML
├── css/
│   ├── footer.css               # PC版フッターCSS
│   └── sp/
│       └── footer-sp.css        # SP版フッターCSS
└── img/
    └── intrologo.png            # フッターロゴ画像
```

### アップロード対象ファイルの判定

| ファイル | 対象 | 理由 |
|---------|------|------|
| `swell_child/footer.php` | ✅ | HTML修正時のみ |
| `swell_child/css/footer.css` | ✅ | CSS修正時のみ |
| `swell_child/css/sp/footer-sp.css` | ✅ | SP版CSS修正時のみ |
| `swell_child/img/intrologo.png` | ⚠️ | アップロード不要（既存） |
| **swell_parent_reference/** | ❌ | 参照用・触らない |
| **swell/** (親テーマ) | ❌ | 絶対に触らない |

---

## 🛡️ エラーハンドリングと復旧

### ❌ 親テーマを誤ってアップロードしてしまった場合

**直ちに以下を実行：**

```bash
# 1. 誤ったアップロード内容の確認
rsync -avz patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/media/wp-content/themes/swell/ /tmp/swell_backup/

# 2. 親テーマリファレンス（ローカル）から復元
rsync -avz /Users/tk/Patolaqshe_swell/swell_parent_reference/ /tmp/restore_swell/

# 3. サーバーへ復元（親テーマのみ）
rsync -avz /tmp/restore_swell/ patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/media/wp-content/themes/swell/

# 4. 管理者に報告
```

### ⚠️ /tmp/rsync_files.txt に誤りがある場合

**復旧手順：**

```bash
# 1. 誤ったファイルリストの確認
cat /tmp/rsync_files.txt

# 2. ファイルリストを正しく修正
cat >/tmp/rsync_files.txt <<EOF
swell_child/css/footer.css
EOF

# 3. 内容確認
cat /tmp/rsync_files.txt

# 4. 改めてアップロード
rsync -avz --files-from=/tmp/rsync_files.txt /Users/tk/Patolaqshe_swell/ \
  patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/media/wp-content/themes/
```

---

## ✅ チェックリスト（毎回の修正時）

修正者は以下を実施・確認：

- [ ] **プロンプト検証**: 検索文字列と現在のファイル内容が完全一致
- [ ] **修正実施**: replace_string_in_file で各修正を順次実行
- [ ] **Git反映**: commit/push を自動実行（確認待機なし）
- [ ] **ファイルリスト準備**: /tmp/rsync_files.txt に修正ファイルのみ記載
- [ ] **アップロード前確認**: cat /tmp/rsync_files.txt で内容確認 → `swell_child/` 配下のみか確認
- [ ] **アップロード実行**: rsync コマンド実行（目的地が swell_child/ で終了することを再確認）
- [ ] **サーバー検証**: ダウンロードして修正内容が反映されているか確認
- [ ] **ユーザーへ報告**: commit番号 + 修正内容 + 検証結果を報告

---

## 🎯 次のchat時の進行方法

1. **プロンプト受け取り**
   ```
   ユーザー: [修正プロンプト]
   ```

2. **自動検証 & 修正**
   ```
   Copilot: ✅ プロンプト検証完了 → 修正実行 → commit/push → アップロード → 検証
   ```

3. **自動報告**
   ```
   新commit: [commit番号]
   修正ファイル: [ファイル一覧]
   サーバー検証: ✅ 完了
   ```

4. **ユーザー確認**
   ```
   ユーザー: [ブラウザで確認後、次の修正依頼 or 完了]
   ```

---

## 📞 トラブルシューティング

| 問題 | 原因 | 対処法 |
|------|------|--------|
| `replace_string_in_file` が失敗 | 検索文字列が不一致 | プロンプトを再度確認・修正 |
| アップロード後に反映されない | キャッシュ | ブラウザハードリロード（Cmd+Shift+R） |
| rsync接続エラー | SSH設定 | `/tmp/rsync_files.txt` の内容確認 → 再実行 |
| 親テーマが破壊された | 誤ったアップロード | 上記「エラーハンドリング」を実施 |

---

## 📌 重要なコマンドテンプレート

### プロンプト検証テンプレート
```bash
# 検索文字列がファイルに存在するか確認
grep -n "[検索文字列の一部]" /Users/tk/Patolaqshe_swell/swell_child/[対象ファイル]
```

### ファイルリスト準備テンプレート
```bash
cat >/tmp/rsync_files.txt <<EOF
swell_child/css/footer.css
swell_child/css/sp/footer-sp.css
swell_child/footer.php
EOF

# 内容確認
echo "=== ファイルリスト内容 ==="
cat /tmp/rsync_files.txt
```

### アップロードテンプレート
```bash
# 【必ず実行する安全確認】
echo "=== ファイルリスト確認 ==="
cat /tmp/rsync_files.txt
echo ""
echo "=== アップロード実行 ==="
rsync -avz --files-from=/tmp/rsync_files.txt /Users/tk/Patolaqshe_swell/ \
  patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/media/wp-content/themes/
```

### サーバー検証テンプレート
```bash
# ダウンロード
rsync -avz patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/media/wp-content/themes/swell_child/css/footer.css /tmp/verify_footer.css

# 検証
echo "=== サーバー版ファイル内容 ==="
grep -A 5 "[検索文字列]" /tmp/verify_footer.css
```

---

## 🎓 学習ポイント

- **rsync の --files-from オプション**: ファイルリストで指定したファイルのみアップロード
- **echo + cat でのユーザー確認**: 自動承認フロー実現
- **アップロード先のパス指定**: `swell_child/` で終了する＝安全
- **サーバー検証**: ダウンロード → grep で修正内容確認

---

**このメモを参考に、次のchatではプロンプト受け取り → 自動修正 → 報告の流れで進行してください。**

