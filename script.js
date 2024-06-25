let cursor = document.querySelector("#cursor");
let cursorBlur = document.querySelector("#cursor-blur");
let cursorBlurOverlay = document.getElementById("cursor-blur-overlay");

var timeout;
function circleSkew() {
  var xScale = 1;
  var yScale = 1;
  var xPrev = 0;
  var yPrev = 0;

  window.addEventListener("mousemove", (details) => {
    this.clearTimeout(timeout);
    xScale = gsap.utils.clamp(0.8, 1.2, details.clientX - xPrev);
    yScale = gsap.utils.clamp(0.8, 1.2, details.clientY - yPrev);
    xPrev = details.clientX;
    yPrev = details.clientY;
    circleMouseFollow(xScale, yScale);
    timeout = this.setTimeout(() => {
      cursor.style.transform = `
        translate(${details.clientX}px, ${details.clientY}px) scale(1,1)
        `;
    }, 100);
  });
}

function circleMouseFollow(xScale, yScale) {
  window.addEventListener("mousemove", (details) => {
    cursor.style.transform = `
    translate(${details.clientX}px, ${details.clientY}px) scale(${xScale},${yScale})
    `;
  });
}
document.addEventListener("mousemove", (details) => {
  cursorBlur.style.left = details.x - 150 + "px";
  cursorBlur.style.top = details.y - 150 + "px";

  cursorBlurOverlay.style.left = details.x - 100 + "px";
  cursorBlurOverlay.style.top = details.y - 100 + "px";
});

gsap.to("#nav", {
  backgroundColor: "#000",
  duration: 0.5,
  height: "80px",
  scrollTrigger: {
    trigger: "#nav",
    scroller: "body",
    start: "top -10%",
    end: "top -11%",
    scrub: 1,
  },
});

gsap.to("#main", {
  backgroundColor: "#000",
  scrollTrigger: {
    trigger: "#main",
    scroller: "body",
    start: "top -30%",
    end: "top -80%",
    scrub: 3,
  },
});

circleMouseFollow();
circleSkew();

function initializeTilt(selector, options) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    VanillaTilt.init(element, options);
  });
}

const tiltOptions = {
  max: 15,
  speed: 400,
  reverse: true,
  reset: true,
};

initializeTilt(".cards", tiltOptions);

h4All = document.querySelectorAll("#nav h4");
h4All.forEach((e) => {
  e.addEventListener("mouseenter", () => {
    cursor.style.backgroundColor = "transparent";
    cursor.style.border = "1px solid #fff";
  });
  e.addEventListener("mouseleave", () => {
    cursor.style.backgroundColor = "#95c11e";
    cursor.style.border = "1px solid #95c11e";
  });
});

gsap.from("#about-us img, #about-us-in", {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.4,
  scrollTrigger: {
    trigger: "#about-us",
    scroller: "body",
    markers: true,
    start: "top 60%",
    end: "top 55%",
    scrub: 3,
  },
});
