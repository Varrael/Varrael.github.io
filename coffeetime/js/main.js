// Canvas-анимация — плавающие кофейные зерна
const canvas = document.getElementById("coffeeCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let beans = [];

class Bean {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 2;
    this.speedY = Math.random() * 1 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y > canvas.height) this.y = 0;
  }
  draw() {
    ctx.fillStyle = "rgba(139,69,19,0.8)";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size, this.size / 2, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fill();
  }
}

for (let i = 0; i < 50; i++) {
  beans.push(new Bean(Math.random() * canvas.width, Math.random() * canvas.height));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  beans.forEach(b => {
    b.update();
    b.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// Параллакс от движения мыши
document.addEventListener("mousemove", e => {
  beans.forEach(b => {
    b.x += (e.movementX * 0.02);
    b.y += (e.movementY * 0.02);
  });
});

// Реакция на клавиатуру — смена цвета заголовка
document.addEventListener("keydown", e => {
  const title = document.getElementById("title");
  if (e.key === "c") title.style.color = "#ffcc80";
  else title.style.color = "white";
});
