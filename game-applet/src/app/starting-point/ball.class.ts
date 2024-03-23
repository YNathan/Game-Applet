import { StartingPointComponent } from './starting-point.component'; // Assuming StartingPoint is an Angular component or service that provides the getWidth and getHeight methods
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;

}

export class Ball {
  private gravity: number = 15;
  private energyLoss: number = 1;
  private xFriction: number = 0.9;
  private dt: number = 0.2;
  private x: number = 400;
  public y: number = 25;
  private dx: number = 0;
  private dy: number = 0;
  private gameDy: number = -75;
  private radius: number = 20;
  private agility: number = 3;
  private maxSpeed: number = 20;
  private gameOver: boolean = false;

  // Properties
  getAgility(): number { return this.agility; }
  setAgility(agility: number): void { this.agility = agility; }

  getMaxSpeed(): number { return this.maxSpeed; }
  setMaxSpeed(maxSpeed: number): void { this.maxSpeed = maxSpeed; }

  getGameDy(): number { return this.gameDy; }
  setGameDy(gameDy: number): void { this.gameDy = gameDy; }

  getRadius(): number { return this.radius; }

  getX(): number { return this.x; }
  setX(x: number): void { this.x = x; }

  getY(): number { return this.y; }
  setY(y: number): void { this.y = y; }

  getDx(): number { return this.dx; }
  getDy(): number { return this.dy; }

  setDx(dx: number): void { this.dx = dx; }
  setDy(dy: number): void { this.dy = dy; }

  getGravity(): number { return this.gravity; }
  setGravity(gravity: number): void { this.gravity = gravity; }

  // Constructor
  constructor() {}

  // Methods
  moveRight(): void {
    if (this.dx + this.agility < this.maxSpeed) {
      this.dx += this.agility;
    }
  }

  moveLeft(): void {
    if (this.dx - this.agility > -this.maxSpeed) {
      this.dx -= this.agility;
    }
  }

  exit(status: number): void {
    // Angular doesn't support System.exit()
    // You might want to handle application exit differently in Angular
    // For example, navigate to another page or show a dialog
  }

  // Inside Ball class
getBoundingBox(): BoundingBox {
  // Calculate and return the bounding box of the ball
  // The bounding box is represented by an object with properties x, y, width, and height
  // Adjust the values based on the position and size of your ball
  return {
    x: this.x - this.radius, // Assuming this.x and this.y are the center coordinates of the ball
    y: this.y - this.radius,
    width: this.radius * 2,
    height: this.radius * 2
  };
}

  update(sp: StartingPointComponent): void {
    if (this.x + this.dx > sp.getWidth() - this.radius - 1) {
      this.x = sp.getWidth() - this.radius - 1;
      this.dx = -this.dx;
    } else if (this.x + this.dx < 0 + this.radius) {
      this.x = 0 + this.radius;
      this.dx = -this.dx;
    } else {
      this.x += this.dx;
    }

    if (this.y === sp.getHeight() - this.radius - 1) {
      this.dx *= this.xFriction;
      if (Math.abs(this.dx) < 0.8) {
        this.dx = 0;
      }
    }

    if (this.y - 200 > (sp.getHeight() - this.radius - 1)) {
      sp.gameOver = true;
    } else {
      this.dy += this.gravity * this.dt;
      this.y += this.dy * this.dt + 0.5 * this.gravity * this.dt * this.dt;
    }

  }

  paint(ctx: CanvasRenderingContext2D): void {
    // Output a picture
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }

  getGameOver(): boolean { return this.gameOver; }

  getEnergyLoss(): number { return this.energyLoss; }
  setEnergyLoss(energyLoss: number): void { this.energyLoss = energyLoss; }
}
