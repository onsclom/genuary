const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("Failed to get canvas context");
const rect = canvas.getBoundingClientRect();
const dpi = window.devicePixelRatio;
canvas.width = rect.width * dpi;
canvas.height = rect.height * dpi;
ctx.scale(dpi, dpi);

const startSize = 100;
const randFactor = 0.05;

const colors = [
  `hsl(${Math.random() * 360} 95% 70%)`,
  `hsl(${Math.random() * 360} 95% 70%)`,
  `hsl(${Math.random() * 360} 95% 70%)`,
];

const timeFactor = 0.005;

(function draw() {
  {
    const cellSize = startSize;
    for (let x = 0; x < rect.width; x += cellSize) {
      for (let y = 0; y < rect.height; y += cellSize) {
        ctx.save();
        // ctx.translate(0, Math.sin(performance.now() * timeFactor + x + y) * 10);
        ctx.beginPath();
        ctx.arc(x, y, cellSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = colors[0];
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
    }
  }

  const shrinkFactor = 1 / 3;

  {
    ctx.globalAlpha = 0.5;
    const cellSize = startSize * shrinkFactor ** 1;
    for (let x = 0; x < rect.width; x += cellSize) {
      for (let y = 0; y < rect.height; y += cellSize) {
        ctx.save();
        // ctx.translate(0, Math.sin(performance.now() * timeFactor + x + y) * 10);
        ctx.beginPath();
        ctx.arc(x, y, cellSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = colors[1];
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
    }
  }

  {
    ctx.globalAlpha = 0.5;
    const cellSize = startSize * shrinkFactor ** 2;
    for (let x = 0; x < rect.width; x += cellSize) {
      for (let y = 0; y < rect.height; y += cellSize) {
        ctx.save();
        // ctx.translate(0, Math.sin(performance.now() * timeFactor + x + y) * 10);
        ctx.beginPath();
        ctx.arc(x, y, cellSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = colors[2];
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
    }
  }
  // requestAnimationFrame(draw);
})();
