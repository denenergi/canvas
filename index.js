const canvas = document.getElementById("canvas");
const buttonClear = document.getElementById("clear");
const ctx = canvas.getContext("2d");
const storedLines = [];
let startX = 0;
let startY = 0;
let isStartDraw = false;

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = "blue";
ctx.lineWidth = 2;

canvas.addEventListener('click', event => {
  isStartDraw ? handleFinishDraw(event) : handleStartDraw(event)
});

canvas.addEventListener('mousemove', event => handleMouseMove(event));

buttonClear.addEventListener('click', () => {
  redrawStoredLines();
  deleteAnimation();
});

function handleStartDraw(e) {
  const mouseX = parseInt(e.clientX);
  const mouseY = parseInt(e.clientY);

  isStartDraw = true;
  startX = mouseX;
  startY = mouseY;

}

function handleMouseMove(e) {

  if (!isStartDraw) {
    return;
  }

  redrawStoredLines();

  const mouseX = parseInt(e.clientX);
  const mouseY = parseInt(e.clientY);

  // draw the current line
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(mouseX, mouseY);
  ctx.stroke()

  const storedLinesNew = {
    x1: startX,
    y1: startY,
    x2: mouseX,
    y2: mouseY
  };

  if (storedLines.length > 0) {
    for (let i = 0; i < storedLines.length; i++) {
      intersectionPoint(storedLines[i], storedLinesNew);
    }
  }
}


function handleFinishDraw(e) {

  isStartDraw = false;

  const mouseX = parseInt(e.clientX);
  const mouseY = parseInt(e.clientY);

  storedLines.push({
    x1: startX,
    y1: startY,
    x2: mouseX,
    y2: mouseY
  });

  redrawStoredLines();
  if (storedLines.length > 1) {
    for (let i = 0; i < storedLines.length; i++) {
      for (let j = i; j < storedLines.length; j++)
        intersectionPoint(storedLines[i], storedLines[j]);
    }
  }
}


function redrawStoredLines() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (storedLines.length === 0) {
    return;
  }

  for (let i = 0; i < storedLines.length; i++) {
    ctx.beginPath();
    ctx.moveTo(storedLines[i].x1, storedLines[i].y1);
    ctx.lineTo(storedLines[i].x2, storedLines[i].y2);
    ctx.stroke();
  }
}


let requestId; // для управления AnimationFrame

function deleteAnimation() {
  setTimeout(() => {
    storedLines.length = 0;
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
    redrawStoredLines();
  }, 3000);
    requestId = window.requestAnimationFrame(deleteAnimation);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < storedLines.length; i++) {
    let newX1;
    let newY1;
    let newX2;
    let newY2;

    if (storedLines[i].x1 > storedLines[i].x2) {
      newX1 = storedLines[i].x1 -= (storedLines[i].x1 - storedLines[i].x2) / (canvas.width / 10);
      newX2 = storedLines[i].x2 += (storedLines[i].x1 - storedLines[i].x2) / (canvas.width / 10);
    } else {
      newX1 = storedLines[i].x1 += (storedLines[i].x2 - storedLines[i].x1) / (canvas.width / 10);
      newX2 = storedLines[i].x2 -= (storedLines[i].x2 - storedLines[i].x1) / (canvas.width / 10);
    }

    if (storedLines[i].y1 > storedLines[i].y2) {
      newY1 = storedLines[i].y1 -= (storedLines[i].y1 - storedLines[i].y2) / (canvas.height / 10);
      newY2 = storedLines[i].y2 += (storedLines[i].y1 - storedLines[i].y2) / (canvas.height / 10);
    } else {
      newY1 = storedLines[i].y1 += (storedLines[i].y2 - storedLines[i].y1) / (canvas.height / 10);
      newY2 = storedLines[i].y2 -= (storedLines[i].y2 - storedLines[i].y1) / (canvas.height / 10);
    }

    ctx.beginPath();
    ctx.moveTo(storedLines[i].x1, storedLines[i].y1);
    ctx.lineTo(storedLines[i].x2, storedLines[i].y2);
    ctx.stroke();
    if (storedLines.length > 1) {
      for (let j = i; j < storedLines.length; j++)
        intersectionPoint(storedLines[i], storedLines[j]);
    }
  }
}