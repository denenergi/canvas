///////////////////// ПОИСК ПЕРЕСЕЧЕНИЯ

class Intersection {
  constructor() {
  };

  VEK(ax, ay, bx, by) {
    return ax * by - bx * ay;
  };

  CrossingCheck(p1, p2) {

    const v1 = this.VEK(p2.x2 - p2.x1, p2.y2 - p2.y1, p1.x1 - p2.x1, p1.y1 - p2.y1);
    const v2 = this.VEK(p2.x2 - p2.x1, p2.y2 - p2.y1, p1.x2 - p2.x1, p1.y2 - p2.y1);
    const v3 = this.VEK(p1.x2 - p1.x1, p1.y2 - p1.y1, p2.x1 - p1.x1, p2.y1 - p1.y1);
    const v4 = this.VEK(p1.x2 - p1.x1, p1.y2 - p1.y1, p2.x2 - p1.x1, p2.y2 - p1.y1);

    if (v1 * v2 < 0 && v3 * v4 < 0) {
      return true;
    } else {
      return false;
    };
  };

  //построение уравнения прямой Ax+By+this.C
  EquationOfTheLine(p) {
    this.A = p.y2 - p.y1;
    this.B = p.x1 - p.x2;
    this.C = -p.x1 * (p.y2 - p.y1) + p.y1 * (p.x2 - p.x1);
  };

  // поиск точки пересечения по Х
  IntersectionX(a1, b1, c1, a2, b2, c2) {
    const d = a1 * b2 - b1 * a2;
    const dx = -c1 * b2 + b1 * c2;
    const pointx = dx / d;
    return pointx;
  };

  //поиск точки пересечения по Y
  IntersectionY(a1, b1, c1, a2, b2, c2) {
    const d = a1 * b2 - b1 * a2;
    const dy = -a1 * c2 + c1 * a2;
    const pointy = dy / d;
    return pointy;
  };

  intersectionPoint(firstLine, secondLine ) {
    ctx.fillStyle = "red";
    if (this.CrossingCheck(firstLine, secondLine)) {
      this.EquationOfTheLine(firstLine);
      const a1 = this.A;
      const b1 = this.B;
      const c1 = this.C;
      this.EquationOfTheLine(secondLine);
      const a2 = this.A;
      const b2 = this.B;
      const c2 = this.C;
      const pointxx = this.IntersectionX(a1, b1, c1, a2, b2, c2);
      const pointyy = this.IntersectionY(a1, b1, c1, a2, b2, c2);
      ctx.fillRect(pointxx - 4, pointyy - 4, 8, 8);
    };
  };
};

const intersection = new Intersection();