const emblaNode = document.querySelector(".embla");
const container = document.getElementsByClassName("container");
const acc = document.getElementsByClassName("accordion");
const panels = document.getElementsByClassName("panel");
const paragraphs = document.querySelectorAll(".panel > p");
const showTeamsBtn = document.querySelector(".teams button");
const teamCards = document.querySelectorAll(".teams .cards .card");

const options = {
  loop: false,
  active: true,
  breakpoints: {
    "(min-width: 1024px)": { active: false },
  },
  align: "start",
  dragFree: true,
};
const emblaApi = EmblaCarousel(emblaNode, options);

// Accordions
for (let i = 0; i < container.length; i++) {
  container[i].addEventListener("click", function () {
    for (let j = 0; j < panels.length; j++) {
      if (j !== i) {
        acc[j].classList.remove("active");
        container[j].classList.remove("active");
        panels[j].style.maxHeight = null;
        paragraphs[j].style.maxHeight = null;
      }
    }

    acc[i].classList.toggle("active");
    container[i].classList.toggle("active");
    let panel = panels[i];
    let paragraph = paragraphs[i];
    if (panel.style.maxHeight) {
      paragraph.style.maxHeight = null;
      panel.style.maxHeight = null;
    } else {
      paragraph.style.maxHeight = panel.scrollHeight + "px";
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

showTeamsBtn.addEventListener("click", (event) => {
  teamCards.forEach((card) => {
    card.style.display = "block";
  });
  event.currentTarget.style.display = "none";
});
