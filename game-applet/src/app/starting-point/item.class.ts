
import { Ball } from './ball.class';
import { StartingPointComponent } from './starting-point.component';

export class Item {
  private x: number;
  private y: number;
  private dx: number;
  private radius!: number;
  private sp?: StartingPointComponent;
  private createNew: boolean = false;

  constructor(x: number) {
    this.x = x;
    let r = Math.random();
    this.y = Math.floor(Math.random() * 400) + this.radius;
    this.radius = 10;
    this.dx = -2;
  }

  isCreateNew(): boolean {
    return this.createNew;
  }

  setCreateNew(createNew: boolean): void {
    this.createNew = createNew;
  }

  getX(): number {
    return this.x;
  }

  setX(x: number): void {
    this.x = x;
  }

  getY(): number {
    return this.y;
  }

  setY(y: number): void {
    this.y = y;
  }

  update(sp: StartingPointComponent, b: Ball): void {
    this.x += this.dx;
    this.setSp(sp);
    this.checkForCollision(b);
    if (this.x < 0 - this.radius) {
      this.createNew = true;
    }
  }

  private checkForCollision(b: Ball): void {
    let ballX = b.getX();
    let ballY = b.getY();
    let ballR = b.getRadius();
    let a = this.x - ballX;
    let bb = this.y - ballY;
    let collide = this.radius + ballR;
    let c = Math.sqrt(a * a + bb * bb);

    if (c < collide) {
      this.performAction(b);
      this.createNew = true;
    }
  }

  performAction(b: Ball): void {}

  paint(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  getSp(): StartingPointComponent {
    return this.sp!;
  }

  setSp(sp: StartingPointComponent): void {
    this.sp = sp;
  }
}
