const emblaCaseStudies = document.querySelector(".case-studies .embla");
const emblaTestimonials = document.querySelector(".testimonials .embla");
const btnMenu = document.querySelector(".btn-menu");
const nav = document.querySelector("nav");
const body = document.querySelector("body");

const prevButtonNode = document.querySelector(".embla__prev");
const nextButtonNode = document.querySelector(".embla__next");
const dotsNode = document.querySelector(".embla__dots");

const container = document.getElementsByClassName("container");
const acc = document.getElementsByClassName("accordion");
const panels = document.getElementsByClassName("panel");
const paragraphs = document.querySelectorAll(".panel > p");
const showTeamsBtn = document.querySelector(".teams button");
const teamCards = document.querySelectorAll(".teams .cards .card");

const caseStudiesOptions = {
  loop: false,
  active: true,
  breakpoints: {
    "(min-width: 1024px)": { active: false },
  },
  align: "start",
  dragFree: true,
};

const testimonialOptions = {
  loop: false,
  active: true,
  align: "start",
  dragFree: true,
};

const emblaApi = EmblaCarousel(emblaCaseStudies, caseStudiesOptions);
const emblaApiTestimonial = EmblaCarousel(
  emblaTestimonials,
  testimonialOptions
);

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

const addTogglePrevNextBtnsActive = (emblaApi, prevBtn, nextBtn) => {
  const togglePrevNextBtnsState = () => {
    if (emblaApi.canScrollPrev()) prevBtn.removeAttribute("disabled");
    else prevBtn.setAttribute("disabled", "disabled");

    if (emblaApi.canScrollNext()) nextBtn.removeAttribute("disabled");
    else nextBtn.setAttribute("disabled", "disabled");
  };

  emblaApi
    .on("select", togglePrevNextBtnsState)
    .on("init", togglePrevNextBtnsState)
    .on("reInit", togglePrevNextBtnsState);

  return () => {
    prevBtn.removeAttribute("disabled");
    nextBtn.removeAttribute("disabled");
  };
};

const addPrevNextBtnsClickHandlers = (emblaApi, prevBtn, nextBtn) => {
  console.log(emblaApi, prevBtn, nextBtn);
  const scrollPrev = () => {
    emblaApi.scrollPrev();
  };
  const scrollNext = () => {
    emblaApi.scrollNext();
  };
  prevBtn.addEventListener("click", scrollPrev, false);
  nextBtn.addEventListener("click", scrollNext, false);

  const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(
    emblaApi,
    prevBtn,
    nextBtn
  );

  return () => {
    removeTogglePrevNextBtnsActive();
    prevBtn.removeEventListener("click", scrollPrev, false);
    nextBtn.removeEventListener("click", scrollNext, false);
  };
};

const addDotBtnsAndClickHandlers = (emblaApi, dotsNode) => {
  let dotNodes = [];

  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map(
        () => `<button class="embla__dot" type="button">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.0099 2.05941L14 0L11.9604 7.0099L14 14L7.0099 11.9604L0 14L2.05941 7.0099L0 0L7.0099 2.05941Z" fill="white"/>
                  </svg>
                </button>`
      )
      .join("");

    const scrollTo = (index) => {
      emblaApi.scrollTo(index);
    };

    dotNodes = Array.from(dotsNode.querySelectorAll(".embla__dot"));
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener("click", () => scrollTo(index), false);
    });
  };

  const toggleDotBtnsActive = () => {
    const previous = emblaApi.previousScrollSnap();
    const selected = emblaApi.selectedScrollSnap();
    dotNodes[previous].classList.remove("embla__dot--selected");
    dotNodes[selected].classList.add("embla__dot--selected");
  };

  emblaApi
    .on("init", addDotBtnsWithClickHandlers)
    .on("reInit", addDotBtnsWithClickHandlers)
    .on("init", toggleDotBtnsActive)
    .on("reInit", toggleDotBtnsActive)
    .on("select", toggleDotBtnsActive);

  return () => {
    dotsNode.innerHTML = "";
  };
};


function toggleRadio(selected) {
  document.querySelectorAll('.radio').forEach(radio => radio.classList.remove('active'));
  selected.classList.add('active');
}

const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
  emblaApiTestimonial,
  prevButtonNode,
  nextButtonNode
);
const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
  emblaApiTestimonial,
  dotsNode
);

emblaApiTestimonial.on("destroy", removePrevNextBtnsClickHandlers);
emblaApiTestimonial.on("destroy", removeDotBtnsAndClickHandlers);

btnMenu.addEventListener("click", () => {
  nav.classList.toggle("active");
  body.classList.toggle("active");
});