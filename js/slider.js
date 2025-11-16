// Ініціалізація Swiper
const swiper = new Swiper(".swiper-container", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoWidthSwiper: 300,
    width: 300, // Mobile за замовчуванням
    navigation: {
        nextEl: ".carousel-button.next",
        prevEl: ".carousel-button.prev",
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 0,
            width: 600, // Tablet
        },
        1280: {
            slidesPerView: 4,
            spaceBetween: 0,
            width: 1200, // Desktop
        },
    },
    on: {
        init() {
            updateThumb(this);
        },
        slideChange() {
            updateThumb(this);
        },
        sliderMove() {
            stretchThumb(this);
        },
        touchEnd() {
            resetThumbWidth();
        },
    },
});

// Рух короткої рисочки
function updateThumb(swiper) {
    const thumb = document.querySelector(".agreements__pagination--thumb");
    const track = document.querySelector(".agreements__pagination--track");

    const trackWidth = track.offsetWidth;
    const thumbWidth = thumb.offsetWidth;

    const totalSlides = swiper.slides.length - (swiper.loop ? 2 : 0);
    const index = swiper.realIndex;

    const maxMove = trackWidth - thumbWidth;
    const step = maxMove / (totalSlides - 1);

    thumb.style.left = step * index + "px";
}

// Розтягування thumb під час свайпу
function stretchThumb(swiper) {
    const thumb = document.querySelector(".agreements__pagination--thumb");
    const diff = swiper.touches.diff;
    const stretch = Math.min(Math.abs(diff) / 20, 20);
    thumb.style.width = 32 + stretch + "px";
}

// Повернення довжини thumb після свайпу
function resetThumbWidth() {
    const thumb = document.querySelector(".agreements__pagination--thumb");
    thumb.style.width = "32px";
}

// Клік по треку → перемикає слайд
document
    .querySelector(".agreements__pagination--track")
    .addEventListener("click", (e) => {
        const track = e.currentTarget;
        const rect = track.getBoundingClientRect();
        const clickX = e.clientX - rect.left;

        const trackWidth = track.offsetWidth;
        const totalSlides = swiper.slides.length - (swiper.loop ? 2 : 0);

        const percentage = clickX / trackWidth;
        const targetIndex = Math.round(percentage * (totalSlides - 1));

        swiper.slideToLoop(targetIndex);
    });
