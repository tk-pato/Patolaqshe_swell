$(function(){
const $slider = $(".slider-items");
	$slider.on("beforeChange", (event, slick, currentSlide, nextSlide) => {
		$slider.find(".slick-slide").each((index, el) => {
			const $this = $(el),
			slickindex = $this.attr("data-slick-index");
			if (nextSlide == slick.slideCount - 1 && currentSlide == 0) {
				if (slickindex == "-1") {
					$this.addClass("active-next");
				} else {
					$this.removeClass("active-next");
				}
			} else if (nextSlide == 0) {
				if (slickindex == slick.slideCount) {
					$this.addClass("active-next");
				} else {
					$this.removeClass("active-next");
				}
			} else {
				$this.removeClass("active-next");
			}
		});
	});
	$(".ba-items").slick({
		variableWidth: true,
		centerMode: true,
		centerPadding: "",
		autoplay: true,
		autoplaySpeed: 4000,
		speed: 600,
		dots: true,
		arrows: false,
		prevArrow: '<img class="slick-prev" loading="lazy" src="img/arrow01-left.png" alt="">',
		nextArrow: '<img class="slick-next" loading="lazy" src="img/arrow01-right.png" alt="">',
		infinite: true,
		pauseOnFocus: false,
		pauseOnHover: false,
		pauseOnDotsHover: false,

		responsive: [{
			breakpoint: 736,
			settings: {
				arrows: false,
			},
		}]
	});
	
	
// slider
	if ($(window).width() < 736) {
		var windowWidth = jQuery(window).width();
		var sliderW = windowWidth / 1.1;
		$('.slider-items').bxSlider({
		ticker: true,
		minSlides: 2,
		maxSlides: 8,
		slideWidth: 340,
		slideMargin: 0,
		tickerHover: false,
		speed: 50000
	});
	} else {
		$('.slider-items').bxSlider({
		ticker: true,
		minSlides: 2,
		maxSlides: 8,
		slideWidth: 340,
		slideMargin: 0,
		tickerHover: false,
		speed: 50000
	});

	}
});