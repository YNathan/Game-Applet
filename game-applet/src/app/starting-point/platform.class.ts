
import { Ball, BoundingBox } from './ball.class';
import { Pictures } from './pictures.class';


export class Platform {
  dx: number;
  x: number;
  y: number;
  width: number;
  height: number;
  plat: HTMLImageElement;
  frame: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 120;
    this.height = 80;
    this.dx = -1;
    this.plat = new Image();
    this.plat.src = 'assets/images/platform.png'; // Replace with the actual path to your platform image
  }

  update(sp: any, b: Ball): void {
    // Update the frame for animation (if applicable)
    let tester = this.frame + 0.1;
    if (tester < 3)
      this.frame += 0.1;
    else
      this.frame = 0;

    // Move the platform horizontally
    this.x += this.dx;

    // Check for collision with the ball
    this.checkForCollision(b);

    // If the platform goes out of bounds, reset its position with a new random Y coordinate
    if (this.x < 0 - this.width) {
      this.x = sp.getWidth(); // Reset the platform to the right side of the screen
      this.y = sp.getHeight() - 40 - Math.floor(Math.random() * 400); // Generate a new random Y position
    }
  }



  // Inside Platform class
getBoundingBox(): BoundingBox {
  // Calculate and return the bounding box of the platform
  // The bounding box is represented by an object with properties x, y, width, and height
  // Adjust the values based on the position and size of your platform
  return {
    x: this.x,
    y: this.y,
    width: this.width, // Assuming this.width and this.height represent the dimensions of the platform
    height: this.height
  };
}

  getWidth(): number {
    return this.width;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  getX(): number {
    return this.x;
  }

  setX(x: number): void {
    this.x = x;
  }

  private checkForCollision(b: Ball): void {
    let ballX = b.getX();
    let ballY = b.getY();
    let radius = b.getRadius();

    if (ballY + radius > this.y && ballY + radius < this.y + this.height) {
      if (ballX > this.x && ballX < this.x + this.width) {
        let newDY = b.getGameDy();
        b.setY(this.y - radius);
        b.setDy(newDY);
        // You'll need to handle the sound in Angular's way, possibly using a service
        // For now, let's just log that the bounce sound is played
        console.log("Bounce sound played");
      }
    }
  }

  paint(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.plat, this.x, this.y, this.width, this.height);
  }
}
