(function(){
  function toggleHead(){
    if(!document.body.classList.contains('has-head-toggle')) return;
    if(window.scrollY <= 10){ document.body.classList.add('is-top'); }
    else { document.body.classList.remove('is-top'); }
  }
  document.addEventListener('DOMContentLoaded', toggleHead);
  window.addEventListener('load', toggleHead);
  window.addEventListener('scroll', toggleHead, {passive:true});
  window.addEventListener('resize', toggleHead);
})();
