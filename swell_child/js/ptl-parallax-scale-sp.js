(function(){
  'use strict';
  var mqSP = window.matchMedia && window.matchMedia('(max-width: 768px)');
  function isSP(){ return mqSP && typeof mqSP.matches === 'boolean' ? mqSP.matches : (window.innerWidth <= 768); }

  function apply(){
    if (!isSP()) return;
    document.querySelectorAll('.ptl-pageNavHero, .ptl-navigation').forEach(function(sec){
      var sc = parseFloat(sec.getAttribute('data-parallax-scale') || '') || 1.32; // 既定1.32
      sec.style.setProperty('--ptl-scale-sp', sc.toString());
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('resize', apply);
  window.addEventListener('orientationchange', apply);
})();