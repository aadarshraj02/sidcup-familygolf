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
