///////////////////// ПОИСК ПЕРЕСЕЧЕНИЯ
//векторное произведение
function VEK(ax, ay, bx, by) {
  return ax * by - bx * ay;
}

//проверка пересечения
function CrossingCheck(p1, p2) {
  let v1;
  let v2;
  let v3;
  let v4;

  v1 = VEK(p2.x2 - p2.x1, p2.y2 - p2.y1, p1.x1 - p2.x1, p1.y1 - p2.y1);
  v2 = VEK(p2.x2 - p2.x1, p2.y2 - p2.y1, p1.x2 - p2.x1, p1.y2 - p2.y1);
  v3 = VEK(p1.x2 - p1.x1, p1.y2 - p1.y1, p2.x1 - p1.x1, p2.y1 - p1.y1);
  v4 = VEK(p1.x2 - p1.x1, p1.y2 - p1.y1, p2.x2 - p1.x1, p2.y2 - p1.y1);

  if (v1 * v2 < 0 && v3 * v4 < 0) {
    return true;
  } else {
    return false;
  }
}

//построение уравнения прямой Ax+By+C
function EquationOfTheLine(p) {
  A = p.y2 - p.y1;
  B = p.x1 - p.x2;
  C = -p.x1 * (p.y2 - p.y1) + p.y1 * (p.x2 - p.x1);

}

// поиск точки пересечения по Х
function IntersectionX(a1, b1, c1, a2, b2, c2) {
  let d;
  let dx;
  let pointx;
  d = a1 * b2 - b1 * a2;
  dx = -c1 * b2 + b1 * c2;
  pointx = dx / d;
  return pointx;
}

//поиск точки пересечения по Y
function IntersectionY(a1, b1, c1, a2, b2, c2) {
  let d;
  let dy;
  let pointy;

  d = a1 * b2 - b1 * a2;
  dy = -a1 * c2 + c1 * a2;
  pointy = dy / d;
  return pointy;
}

function intersectionPoint(firstLine, secondLine) {
  ctx.fillStyle = "red";
  if (CrossingCheck(firstLine, secondLine)) {
    let a1;
    let b1
    let c1
    let a2
    let b2;
    let c2;
    EquationOfTheLine(firstLine);
    a1 = A; b1 = B; c1 = C;
    EquationOfTheLine(secondLine);
    a2 = A; b2 = B; c2 = C;
    pointxx = IntersectionX(a1, b1, c1, a2, b2, c2);
    pointyy = IntersectionY(a1, b1, c1, a2, b2, c2);
    ctx.fillRect(pointxx - 4, pointyy - 4, 8, 8);
  }
}