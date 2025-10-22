// Анимация появления карточек при прокрутке
window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add("visible");
    }
  });
});
