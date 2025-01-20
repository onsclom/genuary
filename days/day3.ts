const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("Failed to get canvas context");
const rect = canvas.getBoundingClientRect();
const dpi = window.devicePixelRatio;
(canvas.width = rect.width * dpi), (canvas.height = rect.height * dpi);
const textHeight = 20;
(ctx.font = `${textHeight}px monospace`), ctx.scale(dpi, dpi);
const padding = 5;
const code = [`console.log('hello world!');`, "slurp(file);", "fizzbuzz(4);"];
const linesOfCode = Array.from({ length: 42 }).map(() => {
  const text = code[Math.floor(Math.random() * code.length)];
  const width = ctx.measureText(text).width + padding * 2;
  const hue = Math.random() * 360;
  return {
    x: Math.random() * (rect.width - width),
    y: Math.random() * (rect.height - textHeight + padding * 2),
    text,
    c: { fg: `hsl(${hue} 95% 50%)`, bg: `hsl(${hue + 180} 95% 50%)` },
    vx: [1, -1][Math.floor(Math.random() * 2)],
    vy: [1, -1][Math.floor(Math.random() * 2)],
    rect: { width, height: textHeight + padding * 2 },
  };
});
(function draw() {
  (ctx.fillStyle = "black"), ctx.fillRect(0, 0, rect.width, rect.height);
  (ctx.textAlign = "left"), (ctx.textBaseline = "top");
  for (const line of linesOfCode) {
    ctx.fillStyle = line.c.bg;
    ctx.fillRect(line.x, line.y, line.rect.width, line.rect.height);
    ctx.fillStyle = line.c.fg;
    ctx.fillText(line.text, line.x + padding, line.y + padding);
    (line.x += line.vx), (line.y += line.vy);
    if (line.x < 0) line.vx = 1;
    if (line.y < 0) line.vy = 1;
    if (line.x + line.rect.width > rect.width) line.vx = -1;
    if (line.y + line.rect.height > rect.height) line.vy = -1;
  }
  requestAnimationFrame(draw);
})();
