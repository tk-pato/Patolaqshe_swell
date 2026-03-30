document.addEventListener('DOMContentLoaded', function() {
    // SWELL内蔵Swiper（swell_swiper）がWP依存関係で読み込み済み
    initUserVoiceSlider();
});

function initUserVoiceSlider() {
    // フロントページ（#uservoice内）のスライダーのみ対象
    // 子ページはショートコード内のインラインscriptで初期化する
    const sliderElement = document.querySelector('#uservoice .uservoice-slider');
    if (!sliderElement) {
        return;
    }

    if (!document.querySelector('link[href*="font-awesome"]') && !document.querySelector('link[href*="fontawesome"]')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }

    try {
        const swiper = new Swiper('#uservoice .uservoice-slider', {
            direction: 'horizontal',
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.uservoice-slider .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.uservoice-slider .swiper-button-next',
                prevEl: '.uservoice-slider .swiper-button-prev'
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                        },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                        },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                        }
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            }
        });
    } catch (error) {
        const wrapper = document.querySelector('.uservoice-slider .swiper-wrapper');
        if (wrapper) {
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'row';
            wrapper.style.gap = '30px';
            wrapper.style.justifyContent = 'center';
        }
    }
}
