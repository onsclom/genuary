const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const colors = ["red", "yellow", "blue", "black"];

const ratios = [1 / 2, 1 / 3, 2 / 3, 1 / 4, 3 / 4];

const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("Failed to get canvas context");
const rect = canvas.getBoundingClientRect();
const dpi = window.devicePixelRatio;
canvas.width = rect.width * dpi;
canvas.height = rect.height * dpi;
ctx.scale(dpi, dpi);

while (true) {
  const mondrianRects = [
    {
      width: rect.width,
      height: rect.height,
      nextLine: "vertical",
      x: 0,
      y: 0,
    },
  ] as {
    width: number;
    height: number;
    x: number;
    y: number;
    nextLine: "horizontal" | "vertical";
  }[];

  const rectsToDraw = [] as {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  }[];

  const linesToDraw = [] as {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }[];

  while (mondrianRects.length > 0) {
    const cur = mondrianRects.shift()!;

    const color = colors[Math.floor(Math.random() * colors.length)];
    rectsToDraw.push({
      x: cur.x,
      y: cur.y,
      width: cur.width,
      height: cur.height,
      color:
        Math.random() < 0.25 ? `hsl(${Math.random() * 360} 95% 50%)` : "white",
    });

    const area = cur.width * cur.height;
    if (area < 10000) {
      continue;
    }
    if (cur.width < 150) continue;
    if (cur.height < 150) continue;

    if (cur.nextLine === "vertical") {
      const lineXPos =
        cur.width * ratios[Math.floor(Math.random() * ratios.length)] + cur.x;
      const leftWidth = lineXPos - cur.x;
      const leftRect = {
        x: cur.x,
        y: cur.y,
        width: leftWidth,
        height: cur.height,
        nextLine: "horizontal" as const,
      };
      const rightRect = {
        x: lineXPos,
        y: cur.y,
        width: cur.width - leftWidth,
        height: cur.height,
        nextLine: "horizontal" as const,
      };
      mondrianRects.push(leftRect, rightRect);
      linesToDraw.push({
        x1: lineXPos,
        y1: cur.y,
        x2: lineXPos,
        y2: cur.y + cur.height,
      });
    } else {
      const lineYPos =
        cur.height * ratios[Math.floor(Math.random() * ratios.length)] + cur.y;
      const topHeight = lineYPos - cur.y;
      const topRect = {
        x: cur.x,
        y: cur.y,
        width: cur.width,
        height: topHeight,
        nextLine: "vertical" as const,
      };
      const bottomRect = {
        x: cur.x,
        y: lineYPos,
        width: cur.width,
        height: cur.height - topHeight,
        nextLine: "vertical" as const,
      };
      mondrianRects.push(topRect, bottomRect);
      linesToDraw.push({
        x1: cur.x,
        y1: lineYPos,
        x2: cur.x + cur.width,
        y2: lineYPos,
      });
    }
  }

  async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  for (const rect of rectsToDraw) {
    await sleep(25);
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

    ctx.lineWidth = 6;
    ctx.strokeStyle = "black";
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  }

  // for (const line of linesToDraw) {
  //   await sleep(25);
  //   ctx.lineWidth = 6;
  //   ctx.strokeStyle = "black";
  //   ctx.beginPath();
  //   ctx.moveTo(line.x1, line.y1);
  //   ctx.lineTo(line.x2, line.y2);
  //   ctx.stroke();
  // }

  await sleep(1000);
}

export {};
