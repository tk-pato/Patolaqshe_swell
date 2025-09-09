<?php
/** Child PC global navigation (hard-coded) */
?>
<nav class="c-gnav" aria-label="Global Navigation">
  <ul class="c-gnav__list">
    <li class="c-gnav__item"><a class="c-gnav__link" href="<?= esc_url( home_url('/') ); ?>">HOME</a></li>
    <li class="c-gnav__item"><a class="c-gnav__link" href="<?= esc_url( home_url('/service/') ); ?>">SERVICE</a></li>
    <li class="c-gnav__item"><a class="c-gnav__link" href="<?= esc_url( home_url('/information/') ); ?>">INFORMATION</a></li>
    <li class="c-gnav__item c-gnav__item--has-child">
      <a class="c-gnav__link" href="<?= esc_url( home_url('/salon/') ); ?>">SALON</a>
      <ul class="c-gnav__child">
        <li><a class="c-gnav__childLink" href="<?= esc_url( home_url('/salon/daikanyama/') ); ?>">Daikanyama</a></li>
        <li><a class="c-gnav__childLink" href="<?= esc_url( home_url('/salon/ginza/') ); ?>">Ginza</a></li>
      </ul>
    </li>
    <li class="c-gnav__item"><a class="c-gnav__link" href="<?= esc_url( home_url('/bridal/') ); ?>">BRIDAL</a></li>
    <li class="c-gnav__item"><a class="c-gnav__link" href="<?= esc_url( home_url('/contact/') ); ?>">CONTACT (Reservation)</a></li>
  </ul>
</nav>