<?php
/**
 * Footer Template
 * Astiサイト完全トレース版
 */
?>

<footer id="footer">
  <div class="w__inn">
    
    <!-- フッターヘッド -->
    <div class="footer-head">
      <p>バストの悩みに、確かな技術を。 Patolaqshe</p>
      <aside>
        <ul class="clearfix">
          <li>SALON</li>
          <li><a href="<?php echo home_url('/daikanyama/'); ?>">Patolaqshe Daikanyama</a></li>
          <li><a href="<?php echo home_url('/ginza/'); ?>">Patolaqshe Ginza</a></li>
        </ul>
      </aside>
    </div>
    
    <!-- フッターフット -->
    <div class="footer-foot">
      <div class="row">
        <aside>
          <ul>
            <li><a href="<?php echo home_url('/'); ?>">TOP</a></li>
            <li><a href="<?php echo home_url('/philosophy/'); ?>">PHILOSOPHY</a></li>
            <li><a href="<?php echo home_url('/menu/'); ?>">MENU</a></li>
            <li><a href="<?php echo home_url('/staff/'); ?>">STAFF</a></li>
            <li><a href="<?php echo home_url('/news/'); ?>">NEWS</a></li>
            <li><a href="https://www.instagram.com/patolaqshe_daikanyama/" target="_blank" rel="noopener" class="ins_sty">DAIKANYAMA</a></li>
            <li><a href="https://www.instagram.com/patolaqshe_ginza/" target="_blank" rel="noopener" class="ins_sty">GINZA</a></li>
          </ul>
        </aside>
        <address>
          <p>Copyright © Patolaqshe / ALL RIGHTS RESERVED.</p>
        </address>
      </div>
    </div>
    
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
