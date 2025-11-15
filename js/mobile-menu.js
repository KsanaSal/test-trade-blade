const mobileMenu = document.querySelector(".mobile-menu");
const menuBtnOpen = document.querySelector(".menu-btn-open");
const menuBtnClose = document.querySelector(".menu-btn-close");

document.addEventListener("click", (e) => {
    if (
        e.target.closest(".menu-btn-open") ||
        e.target.closest(".menu-btn-close")
    ) {
        mobileMenu.classList.toggle("is-open");
        document.body.classList.toggle("is-scroll-disabled");
    }
});

console.log(mobileMenu);
