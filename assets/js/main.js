const emblaNode = document.querySelector(".embla");
const options = {
  loop: false,
  active: true,
  breakpoints: {
    "(min-width: 1024px)": { active: false },
  },
};
const emblaApi = EmblaCarousel(emblaNode, options);
