<?php
/*
Template Name: Landing (Hero Full)
*/
if (! defined('ABSPATH')) exit;
get_header();
?>

<main id="main_content" class="l-mainContent l-article">
  <!-- 可変: 後で画像URLに差し替え。今はダミーで崩れない -->
  <section id="mv_custom" class="p-mainVisual -height-full -type-image" aria-label="Main Visual">
    <div class="p-mainVisual__inner" style="position:relative;">
      <img class="p-mainVisual__img" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'><rect width='100%25' height='100%25' fill='%23222'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23bbb' font-size='42'>HERO IMAGE</text></svg>" alt="" style="width:100%;height:60vh;object-fit:cover;display:block;" />
      <div class="p-mainVisual__textLayer" style="text-align:center;color:#fff;">
        <h2 class="p-mainVisual__slideTitle"><?php the_title(); ?></h2>
      </div>
    </div>
  </section>

  <div class="l-mainContent__inner">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <article class="postContent">
          <?php the_content(); ?>
        </article>
    <?php endwhile;
    endif; ?>
  </div>
</main>

<!-- このテンプレのときだけ: トップでヘッダー非表示→スクロールで表示（PC） -->
<style>
  @media (min-width: 1024px) {

    body.page-template-page-landing.is-top .l-header,
    body.page-template-page-landing.is-top .p-headerBar {
      display: none;
    }
  }
</style>
<script>
  (function() {
    function toggleHead() {
      if (window.scrollY <= 10) {
        document.body.classList.add('is-top');
      } else {
        document.body.classList.remove('is-top');
      }
    }
    document.addEventListener('DOMContentLoaded', toggleHead);
    window.addEventListener('load', toggleHead);
    window.addEventListener('scroll', toggleHead, {
      passive: true
    });
    window.addEventListener('resize', toggleHead);
  })();
</script>

<?php get_footer(); ?>