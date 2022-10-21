const canvas = document.getElementById("canvas");
const buttonClear = document.getElementById("clear");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;
ctx.strokeStyle = "blue";
ctx.lineWidth = 2;

class Paint {
  #startX = 0;
  #startY = 0;
  #storedLines = [];
  #requestId;
  #isStartDraw = false;

  constructor() {
  };

  getIsStartDraw() {
    return this.#isStartDraw;
  };

  redrawStoredLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.#storedLines.length === 0) {
      return;
    };

    for (let i = 0; i < this.#storedLines.length; i++) {
      ctx.beginPath();
      ctx.moveTo(this.#storedLines[i].x1, this.#storedLines[i].y1);
      ctx.lineTo(this.#storedLines[i].x2, this.#storedLines[i].y2);
      ctx.stroke();
    };
  };

  handleStartDraw(e) {
    const mouseX = parseInt(e.clientX);
    const mouseY = parseInt(e.clientY);

    this.#isStartDraw = true;
    this.#startX = mouseX;
    this.#startY = mouseY;
  };

  handleMouseMove(e) {
    if (!this.#isStartDraw) {
      return;
    };

    this.redrawStoredLines();

    const mouseX = parseInt(e.clientX);
    const mouseY = parseInt(e.clientY);

    ctx.beginPath();
    ctx.moveTo(this.#startX, this.#startY);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();

    const storedLinesNew = {
      x1: this.#startX,
      y1: this.#startY,
      x2: mouseX,
      y2: mouseY
    };

    if (this.#storedLines.length > 0) {
      for (let i = 0; i < this.#storedLines.length; i++) {
        intersection.intersectionPoint(this.#storedLines[i], storedLinesNew);
      };
    };
  };

  handleFinishDraw(e) {
    this.#isStartDraw = false;

    const mouseX = parseInt(e.clientX);
    const mouseY = parseInt(e.clientY);

    const newLine = {
      x1: this.#startX,
      y1: this.#startY,
      x2: mouseX,
      y2: mouseY
    };

    this.#storedLines.push(newLine);

    this.redrawStoredLines();
    if (this.#storedLines.length > 1) {
      for (let i = 0; i < this.#storedLines.length; i++) {
        for (let j = i; j < this.#storedLines.length; j++)
        intersection.intersectionPoint(this.#storedLines[i], this.#storedLines[j]);
      };
    };
  };

  deleteAnimation = () => {
    setTimeout(() => {
      this.#storedLines.length = 0;
      window.cancelAnimationFrame(this.#requestId);
      this.#requestId = undefined;
      this.redrawStoredLines();
    }, 3000);
    this.#requestId = window.requestAnimationFrame(this.deleteAnimation);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < this.#storedLines.length; i++) {

      if (this.#storedLines[i].x1 > this.#storedLines[i].x2) {
        this.#storedLines[i].x1 -= (this.#storedLines[i].x1 - this.#storedLines[i].x2) / (canvas.width / 10);
        this.#storedLines[i].x2 += (this.#storedLines[i].x1 - this.#storedLines[i].x2) / (canvas.width / 10);
      } else {
        this.#storedLines[i].x1 += (this.#storedLines[i].x2 - this.#storedLines[i].x1) / (canvas.width / 10);
        this.#storedLines[i].x2 -= (this.#storedLines[i].x2 - this.#storedLines[i].x1) / (canvas.width / 10);
      };

      if (this.#storedLines[i].y1 > this.#storedLines[i].y2) {
        this.#storedLines[i].y1 -= (this.#storedLines[i].y1 - this.#storedLines[i].y2) / (canvas.height / 10);
        this.#storedLines[i].y2 += (this.#storedLines[i].y1 - this.#storedLines[i].y2) / (canvas.height / 10);
      } else {
        this.#storedLines[i].y1 += (this.#storedLines[i].y2 - this.#storedLines[i].y1) / (canvas.height / 10);
        this.#storedLines[i].y2 -= (this.#storedLines[i].y2 - this.#storedLines[i].y1) / (canvas.height / 10);
      };

      ctx.beginPath();
      ctx.moveTo(this.#storedLines[i].x1, this.#storedLines[i].y1);
      ctx.lineTo(this.#storedLines[i].x2, this.#storedLines[i].y2);
      ctx.stroke();
      if (this.#storedLines.length > 1) {
        for (let j = i; j < this.#storedLines.length; j++)
        intersection.intersectionPoint(this.#storedLines[i], this.#storedLines[j]);
      };
    };
  };
};

const painting = new Paint();

canvas.addEventListener('click', event => {
  painting.getIsStartDraw() ? painting.handleFinishDraw(event) : painting.handleStartDraw(event);
});

canvas.addEventListener('mousemove', event => {
  if (painting.handleStartDraw) {
    painting.handleMouseMove(event)
  }
});

buttonClear.addEventListener('click', () => {
  painting.redrawStoredLines();
  painting.deleteAnimation();
});