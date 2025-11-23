# Rococoメニューセクション構造分析

## HTMLストラクチャ

```html
<section class="topmenu">
  <h2 class="center">MENU</h2>
  
  <!-- 上段：メインカード（大きい1枚） -->
  <article>
    <a href="#" class="row menubox reverse">
      <figure>
        <img src="menu.jpg" alt="Rococo式バストアップ施術" />
      </figure>
      <div class="txt">
        <h3>Rococo式<br />バストアップ施術</h3>
        <p>一度でバストアップが実感できる驚きの豊胸メソッド！特別価格の初回限定キャンペーン。</p>
        <div class="arr">
          <span>View all</span>
        </div>
      </div>
    </a>
  </article>
  
  <!-- 下段：3つのサブカード（小さいカード） -->
  <ul class="row">
    <li>
      <a href="#">
        <figure>
          <img src="sizeup.jpg" alt="サイズアップ" />
        </figure>
        <div>サイズアップ</div>
      </a>
    </li>
    <li>
      <a href="#">
        <figure>
          <img src="down.jpg" alt="下垂ケア" />
        </figure>
        <div>下垂ケア</div>
      </a>
    </li>
    <li>
      <a href="#">
        <figure>
          <img src="distance.jpg" alt="離れバストケア" />
        </figure>
        <div>離れバストケア</div>
      </a>
    </li>
  </ul>
  
  <div class="btn center">
    <a href="#">More</a>
  </div>
</section>
```

## CSS構造（PC版）

### 全体レイアウト
- **セクション背景**: 
  - padding-top: 280px
  - 背景画像あり（menu_bg.jpg）
  - 三角形マスク（上部）

### メインカード（上段・大きいカード）
```css
.menubox {
  display: flex; /* フレックスボックス */
  margin-bottom: 25px;
  background: #FFF;
}

.menubox.reverse {
  flex-direction: row-reverse; /* 画像を左に配置 */
}

/* 画像エリア：60% */
.menubox figure {
  width: 60%;
  position: relative; /* 画像の絶対配置用 */
}

.menubox figure img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: .3s ease-out;
}

/* ホバー時：画像拡大 */
.menubox:hover figure img {
  transform: scale(1.1);
}

/* テキストエリア：40% */
.menubox .txt {
  flex: 1; /* 残り40%を占める */
  padding: 50px;
}

.menubox .txt h3 {
  font-weight: 500;
  color: #AC905E; /* 金色 */
}
```

**重要ポイント:**
- `flex-direction: row-reverse` で画像を左、テキストを右に配置
- 画像60% : テキスト40%の比率
- 画像は`position: absolute`で親要素いっぱいに表示
- ホバーで画像が1.1倍に拡大

### サブカード（下段・3つのカード）
```css
.topmenu ul.row {
  display: flex; /* 横並び */
}

.topmenu li {
  flex: 1; /* 均等に3等分 */
}

.topmenu li a {
  position: relative;
  display: block;
  padding: 20px 12px; /* 上下20px、左右12px */
  background: #FFF;
}

/* 画像：通常配置 */
.topmenu li a figure img {
  transition: .3s ease-out;
}

/* タイトル：画像の下に通常配置 */
.topmenu li a div {
  position: absolute;
  bottom: 12px;
  left: 12px;
  display: inline-block;
  padding: 5px 35px 5px 10px;
  background: #FFF url("img/common/arr.svg") right 15px center no-repeat;
  font-size: 2rem; /* 20px */
  font-weight: 600;
}

/* ホバー時：画像拡大 */
.topmenu li a:hover figure img {
  transform: scale(1.1);
}
```

**重要ポイント:**
- カード全体に`padding: 20px 12px`（上下20px、左右12px）
- タイトルは画像の下に`position: absolute`で配置
- タイトル背景は白（#FFF）
- 矢印アイコン（>）は背景画像で実装
- ホバーで画像が1.1倍に拡大

## フォントサイズ

### メインカード
- **タイトル**: 2.4rem（24px相当）前後
- **ディスクリプション**: 1.6rem（16px）程度

### サブカード
- **タイトル**: 2rem（20px）
- **font-weight**: 600（セミボールド）

## レイアウト比率まとめ

### 上段（メインカード）
- **構造**: Flexbox（row-reverse）
- **画像**: 60%
- **テキスト**: 40%（flex: 1で残りを占める）
- **画像配置**: position: absolute（親要素100%）
- **ホバー効果**: transform: scale(1.1)

### 下段（サブカード×3）
- **構造**: Flexbox（row）
- **カード幅**: flex: 1（均等3等分）
- **カードpadding**: 20px 12px
- **タイトル配置**: position: absolute（bottom: 12px, left: 12px）
- **タイトル背景**: #FFF（白）
- **タイトルサイズ**: 2rem（20px）
- **矢印**: 背景画像（arr.svg）

## Patolaqsheとの違い

### 現在のPatolaqshe
- 左大1カード + 右小3カード（横並び）

### Rococo
- **上段**: 1カード全幅（画像60%:テキスト40%）
- **下段**: 3カード横並び（均等）

この構造により、メインカードが目立ち、視線誘導がスムーズになります。
