document.addEventListener('DOMContentLoaded', function() {
    if (typeof Swiper === 'undefined') {
        const swiperCSS = document.createElement('link');
        swiperCSS.rel = 'stylesheet';
        swiperCSS.href = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css';
        document.head.appendChild(swiperCSS);

        const swiperJS = document.createElement('script');
        swiperJS.src = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js';
        swiperJS.onload = function() {
            initUserVoiceSlider();
        };
        document.head.appendChild(swiperJS);
    } else {
        initUserVoiceSlider();
    }
});

function initUserVoiceSlider() {
    const sliderElement = document.querySelector('.uservoice-slider');
    if (!sliderElement) {
        console.warn('USER VOICE: .uservoice-slider not found');
        return;
    }

    if (!document.querySelector('link[href*="font-awesome"]') && !document.querySelector('link[href*="fontawesome"]')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }

    try {
        const swiper = new Swiper('.uservoice-slider', {
            direction: 'horizontal',
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            centeredSlides: true,
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
                    centeredSlides: true,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                    centeredSlides: true,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    centeredSlides: true,
                }
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            on: {
                init: function() {
                    console.log('USER VOICE Swiper initialized successfully');
                    console.log('Slides count:', this.slides.length);
                    console.log('Current settings:', {
                        slidesPerView: this.params.slidesPerView,
                        centeredSlides: this.params.centeredSlides,
                        spaceBetween: this.params.spaceBetween
                    });
                },
                slideChange: function() {
                    console.log('Slide changed to:', this.activeIndex);
                }
            }
        });
    } catch (error) {
        console.error('Swiper initialization failed:', error);
        const wrapper = document.querySelector('.uservoice-slider .swiper-wrapper');
        if (wrapper) {
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'row';
            wrapper.style.gap = '30px';
            wrapper.style.justifyContent = 'center';
            console.log('Fallback layout applied');
        }
    }
}
