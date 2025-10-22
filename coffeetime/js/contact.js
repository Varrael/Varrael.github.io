// Подсветка полей при вводе и эффект кнопки
const inputs = document.querySelectorAll("input, textarea");
const button = document.querySelector("button");

inputs.forEach(input => {
  input.addEventListener("focus", () => {
    input.style.backgroundColor = "#ffe0b2";
  });
  input.addEventListener("blur", () => {
    input.style.backgroundColor = "white";
  });
});

// Эффект клавиши Enter
document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    button.style.transform = "scale(0.95)";
    setTimeout(() => button.style.transform = "scale(1)", 150);
  }
});

const canvas = document.getElementById("steamCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector(".contact").offsetHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      radius: Math.random() * 8 + 2,
      speed: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1
    };
  }

  for (let i = 0; i < 40; i++) particles.push(createParticle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
      ctx.fill();

      p.y -= p.speed;
      p.opacity -= 0.001;

      if (p.y < -10 || p.opacity <= 0) {
        Object.assign(p, createParticle());
        p.y = canvas.height + 10;
      }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// === РЕАКЦИЯ НА НАЖАТИЯ КЛАВИШ ===
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  window.addEventListener("keydown", () => {
    contactForm.classList.add("pulse");
    setTimeout(() => contactForm.classList.remove("pulse"), 400);
  });
}