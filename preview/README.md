# ローカル簡易プレビュー

この `preview/index.html` は、WordPress を立ち上げずに CSS の余白とパララックス padding を目視確認するためのダミーページです。

## 使い方

1. VS Code のターミナルで、プロジェクト直下（この README と同じ階層）からローカルWebサーバーを起動します。

### macOS (Python 内蔵サーバー)

- Python 3 がある場合:

```bash
python3 -m http.server 8080
```

- Python 2 互換（もし必要なら）:

```bash
python -m SimpleHTTPServer 8080
```

2. ブラウザで以下を開きます。

- http://localhost:8080/preview/

3. 960px 以上の画面幅で、各セクションの `padding: 64px 0 !important` が効いていること、すべてのセクションで外側余白が「上0 / 下80px」になっていることを確認します。

## VS Code の Simple Browser を使う場合

- コマンドパレットで「Simple Browser: Show」を開いて、URL に `http://localhost:8080/preview/` を入力します。

## 注意

- これは静的プレビューです。WordPress の PHP やJSロジックは動きません。スタイル適用やレイアウトの当たり具合を確認する用途です。
