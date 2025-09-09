# TOPページ 章立て仕様（ロック）

順序（固定）：
1. #news            … ニュース
2. #brand           … ブランド紹介
3. #nav-pages       … 各ページナビ（タイル）
4. #services        … サービス概要
5. #shops           … 各店ナビ（店舗カード）
6. #info            … インフォメーション（告知・バナー）
7. #blog            … ブログ
8. #sns             … SNSリンク
9. #contact-faq     … お問い合わせ・FAQ
10.#policy-sitemap  … 会社ポリシー／サイトマップ

運用ルール：
- front-page.php の <section> は上記ID・順序に一致させる。
- 追加セクションは #policy-sitemap の後ろにのみ追加可。
- 変更は「1手＝1変更」。常に全文上書き保存。
- 推測補完・要件変更は不可。根拠はこのdocとチャット本文のみ。

完了チェック：
- [ ] front-page.php のIDと順序が一致
- [ ] 余計なセクション無し
