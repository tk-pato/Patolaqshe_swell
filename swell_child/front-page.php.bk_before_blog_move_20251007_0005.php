<?php
if (! defined('ABSPATH')) exit;
get_header();
?>

<main id="main_content" class="l-mainContent l-article">
    <div class="l-mainContent__inner">

        <?php
        // 1) ヒーロー：親テーマSWELLのメインビジュアルに任せる（ここでは何もしない）
        ?>

    </div>

    <?php
    // 2) ニュース（PHP）: フルブリードで表示するため内側ラッパーの外に出す
    get_template_part('template-parts/front/section', 'news');
    ?>

    <?php
    // 2.5) INTRO（ブランド紹介セクション）: フルブリード
    get_template_part('template-parts/front/section', 'intro');
    ?>

    <div class="l-mainContent__inner">
        <?php
        // 3) バストのお悩み（バナー＋チェックリスト）
        get_template_part('template-parts/front/section', 'bust-issues');

        // 3.5) 選ばれる理由（PHP）
        get_template_part('template-parts/front/section', 'reasons');
        ?>
    </div>

    <?php
    // 4) NAVIGATION（背景動画/画像＋8ボタン）: フルブリード
    get_template_part('template-parts/front/section', 'page-navigation');
    ?>

    <div class="l-mainContent__inner">

        <?php
        // 4.5) サービス特集（バストアップ大 + 下段3つ）
        get_template_part('template-parts/front/section', 'service-feature');
        ?>

        <?php
        // 5) お客様の声（カスタム投稿タイプから動的取得）
        get_template_part('template-parts/front/section', 'uservoice');
        ?>

    </div>

    <?php
    // 5.5) SALON（2店舗横並びセクション）: フルブリード
    get_template_part('template-parts/front/section', 'salon');
    ?>

    <?php
    // 5.7) BLOG（自動横スクロールブログカード）
    get_template_part('template-parts/front/section', 'blog');
    ?>

    <?php
    // 5.8) INFO HUB（3カードレイアウト：BRIDAL / INFORMATION / FAQ）: フルブリード
    get_template_part('template-parts/front/section', 'infohub');
    ?>

    <div class="l-mainContent__inner">

        <?php
        // 6) お問合せ（ブロック・アンカー: contact）
        ptl_render_block_slot('contact');
        ?>

    </div>
</main>

<?php get_footer(); ?>