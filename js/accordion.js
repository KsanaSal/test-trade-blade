document.querySelectorAll(".faq__item--head").forEach((head) => {
    head.addEventListener("click", () => toggleItem(head));
    head.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleItem(head);
        }
    });
});

function toggleItem(head) {
    const item = head.closest(".faq__item");
    const panel = item.querySelector(".faq__panel");
    const isOpen = item.classList.contains("is-open");

    if (isOpen) {
        // close
        panel.style.maxHeight = panel.scrollHeight + "px"; // встановлюємо явну висоту для анімації
        requestAnimationFrame(() => {
            panel.style.maxHeight = "0";
        });
        item.classList.remove("is-open");
        head.setAttribute("aria-expanded", "false");
    } else {
        // open (закриваємо інші, якщо хочеш поведінку accordion)
        document.querySelectorAll(".faq__item.is-open").forEach((openItem) => {
            if (openItem !== item) {
                closeItem(openItem);
            }
        });

        panel.style.maxHeight = panel.scrollHeight + "px";
        item.classList.add("is-open");
        head.setAttribute("aria-expanded", "true");

        // після анімації прибираємо inline maxHeight, щоб висота була авто (плавніше при ресайзі)
        panel.addEventListener("transitionend", function te() {
            if (item.classList.contains("is-open")) {
                panel.style.maxHeight = "none";
            }
            panel.removeEventListener("transitionend", te);
        });
    }
}

function closeItem(item) {
    const head = item.querySelector(".faq__item--head");
    const panel = item.querySelector(".faq__panel");
    panel.style.maxHeight = panel.scrollHeight + "px";
    requestAnimationFrame(() => (panel.style.maxHeight = "0"));
    item.classList.remove("is-open");
    head.setAttribute("aria-expanded", "false");
}
