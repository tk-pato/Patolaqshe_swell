# Patolaqshe_swell ワークスペース情報

**最終更新**: 2025年10月16日

---

## 📁 リポジトリ情報

- **リポジトリ名**: Patolaqshe_swell
- **GitHub**: https://github.com/tk-pato/Patolaqshe_swell
- **オーナー**: tk-pato
- **ブランチ**: main

---

## 💻 ローカル作業環境

### ✅ 正しい作業ディレクトリ
```
/Users/tk/Patolaqshe_swell/
```

**重要**: このディレクトリがGitリポジトリの正しい場所です。

### ❌ 旧作業場所（削除済み）
```
/Users/tk/Desktop/Patolaqshe_swell/  ← 削除済み（Gitリポジトリではなかった）
```

---

## 📂 ディレクトリ構造

```
/Users/tk/Patolaqshe_swell/
├── .git/                    # Gitリポジトリ
├── swell_child/             # 子テーマディレクトリ
│   ├── style.css           # メインスタイルシート
│   ├── functions.php       # 関数定義
│   ├── css/                # セクション別CSS
│   ├── js/                 # JavaScript
│   ├── template-parts/     # テンプレートパーツ
│   └── img/                # 画像リソース
├── 必要ファイル/
└── 引き継ぎ資料/
```

---

## 🔄 Git操作フロー

### 変更のプッシュ
```bash
cd /Users/tk/Patolaqshe_swell
git add .
git commit -m "コミットメッセージ"
git push origin main
```

### ステータス確認
```bash
cd /Users/tk/Patolaqshe_swell
git status
```

### リモート確認
```bash
cd /Users/tk/Patolaqshe_swell
git remote -v
# origin  https://github.com/tk-pato/Patolaqshe_swell.git
```

---

## 📝 最新作業履歴

### 2025年10月16日
- **作業内容**: style.cssから全38箇所の`!important`を削除
- **コミット**: `f8531b6` - "Remove all important declarations from style.css (38 instances)"
- **ファイル**: `swell_child/style.css`
- **修正箇所**:
  - パターンA: display制御（2箇所）
  - パターンB: タイトル・サブタイトル統一スタイル（30箇所）
  - パターンC: ヘッダー背景（SP専用・1箇所）
  - パターンD: コンテナ幅制御（5箇所 - コメントアウト内）

---

## ⚠️ 注意事項

1. **必ず `/Users/tk/Patolaqshe_swell/` で作業すること**
2. デスクトップにコピーを作らない
3. ファイル編集後は必ず正しいディレクトリでコミット・プッシュ
4. VS Codeで開くワークスペースも `/Users/tk/Patolaqshe_swell/`

---

## 🔗 関連ファイル

### 主要編集対象
- `swell_child/style.css` - グローバルスタイル
- `swell_child/functions.php` - WordPress関数
- `swell_child/css/*.css` - セクション別スタイル
- `swell_child/js/*.js` - JavaScript機能

### テンプレート
- `swell_child/front-page.php` - フロントページ
- `swell_child/template-parts/front/*.php` - セクションパーツ

---

## 📌 VS Code設定

正しいワークスペースを開く:
```bash
code /Users/tk/Patolaqshe_swell
```

---

**このファイルは作業開始時に必ず確認してください**
