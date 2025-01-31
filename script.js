document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.querySelector(".hero .overlay");
  const triggerHeight = window.innerHeight * 0.3;

  window.addEventListener("scroll", function () {
    if (window.scrollY > triggerHeight) {
      overlay.classList.add("fixed");
    } else {
      overlay.classList.remove("fixed");
    }
  });
});

const SVGNS = 'http://www.w3.org/2000/svg';
const EASE = 0.7;
const pointer = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

function updatePointer(event) {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  createTrail('gold', 1);
}


function createStarSparkle(x, y) {
  const star = document.createElementNS(SVGNS, 'polygon');
  
 
  star.setAttribute('points', '10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7');
  star.style.fill = 'gold';
  star.style.opacity = Math.random() * 0.8 + 0.2;

 
  gsap.set(star, {
    x: x,
    y: y,
    scale: Math.random() * 0.5 + 0.5,  
    rotation: Math.random() * 360      
  });

 
  gsap.to(star, {
    opacity: 0, 
    scale: Math.random() * 1.5 + 0.5, 
    duration: Math.random() * 0.8 + 0.3, 
    onComplete: () => star.remove() 
  });

  return star;
}

function createTrail(color = 'gold', length = 1) {
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.style.position = 'fixed';
  svg.style.zIndex = '10000';
  svg.style.top = 0;
  svg.style.left = 0;
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.pointerEvents = 'none';

  for (let i = 0; i < length; i++) {
    const star = createStarSparkle(pointer.x, pointer.y);
    svg.appendChild(star);
  }

  document.body.appendChild(svg);
}

window.addEventListener('mousemove', updatePointer);
