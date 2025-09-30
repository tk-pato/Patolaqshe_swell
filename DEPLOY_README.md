# デプロイ手順（SALON/REASONS CSS 限定）

この手順は、swell_child/css/section-salon.css と section-reasons.css のみをサーバーへ反映するための安全なフローです。差分のみを --files-from で送信し、不要ファイルは除外します。アップロード後は SSH でリモートの更新を確認します。

## 対象ファイル
- swell_child/css/section-salon.css
- swell_child/css/section-reasons.css

## 変更概要（今回反映分）
SALON と REASONS の「余白統一」と「SPフォント最小値の調整」を実施。
- セクション内側の上下余白を整理（トップ0、ボトムは共通パディングへ集約）
- #salon / #section-reasons の .ptl-section__inner に padding: 0 20px 80px !important を付与
- SP 時のタイトル/説明の最小 font-size を 14px に引き上げ（SALON/REASONS）
- SALON: SP ラベル文字サイズを 15px に微調整

既存の SALON 最終5点修正（境界線/シャドウ削除、PC区切り線ロジック修正、スケール無効、SP1カラム固定、SP水平区切り）も含まれます。

## 実行前の前提
- ローカル作業ディレクトリ: Patolaqshe_swell（本ファイルと deploy_css_rsync.sh が存在）
- リモート: patolaqshe@www3521.sakura.ne.jp:/home/patolaqshe/www/media/wp-content/themes/
- 鍵未設定環境を想定し、パスワード認証で接続します。

## 使い方
1) ドライラン（転送せず差分を確認）
- ./deploy_css_rsync.sh

2) 本番転送（差分のみ送信）
- ./deploy_css_rsync.sh live

3) 転送後の検証（自動）
- リモートに対して stat -c "%n %s %y" を実行し、2ファイルの存在とサイズ/更新時刻を表示します。

4) 不要ファイルの掃除（任意）
- ./deploy_css_rsync.sh live cleanup
- .DS_Store, *.bak, *.fixed, *.target をテーマ配下から削除します。

## rsync 詳細
- --relative と --files-from を使用して、指定ファイルだけを相対パスで配置
- 除外: .DS_Store, *.bak, *.fixed, *.target
- --ipv4 を強制

## 既知の接続エラーと回避
- 過去に「パスワード入力後に接続が閉じる（exit 255）」が発生。ssh の PreferredAuthentications=password と PubkeyAuthentication=no を強制して改善。
- 初回接続時のホスト鍵確認は自動承認（StrictHostKeyChecking=accept-new）。

## 手動確認コマンド（任意）
- ログイン: ssh patolaqshe@www3521.sakura.ne.jp
- 確認: ls -l /home/patolaqshe/www/media/wp-content/themes/swell_child/css/{section-salon.css,section-reasons.css}

## 付録: ローカルバックアップ
- swell_child/css/section-salon.css.bak.20250929
- swell_child/css/section-reasons.css.bak.20250929

以上。
