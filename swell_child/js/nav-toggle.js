// ハンバーガーメニュー開閉（SPのみ）

document.addEventListener('DOMContentLoaded', function() {
	var hamburger = document.getElementById('ptlNavHamburger');
	var navMenu = document.getElementById('ptlNavMenu');
	var menuText = document.getElementById('ptlNavMenuText');
	if (!hamburger || !navMenu || !menuText) return;

	function handleResize() {
		if (window.innerWidth <= 767) {
			hamburger.style.display = 'flex';
			menuText.style.display = 'inline-block';
			navMenu.classList.remove('is-open');
			hamburger.setAttribute('aria-expanded', false);
		} else {
			hamburger.style.display = 'none';
			menuText.style.display = 'none';
			navMenu.classList.add('is-open');
			hamburger.setAttribute('aria-expanded', false);
		}
	}

	// 初期化時にSPなら必ず表示
	if (window.innerWidth <= 767) {
		hamburger.style.display = 'flex';
		menuText.style.display = 'inline-block';
	} else {
		hamburger.style.display = 'none';
		menuText.style.display = 'none';
	}

	function toggleMenu() {
		var expanded = hamburger.getAttribute('aria-expanded') === 'true';
		hamburger.setAttribute('aria-expanded', !expanded);
		navMenu.classList.toggle('is-open', !expanded);
		hamburger.classList.toggle('is-active', !expanded);
	}
	hamburger.addEventListener('click', toggleMenu);
	menuText.addEventListener('click', toggleMenu);
	window.addEventListener('resize', handleResize);
});
