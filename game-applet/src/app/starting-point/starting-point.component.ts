import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ball, BoundingBox } from './ball.class';
import { Item } from './item.class';
import { Platform } from './platform.class';
import { GravUp } from './grav-up.class';
import { GravDown } from './grav-down.class';
import { AgilUp } from './agil-up.class';
import { AgilDown } from './agill-down.class';
import { ScorePlus } from './score-plus.class';
import { Pictures } from './pictures.class';

@Component({
  selector: 'app-starting-point',
  templateUrl: './starting-point.component.html',
  styleUrls: ['./starting-point.component.less'],
})
export class StartingPointComponent implements OnInit {
  // get height of the page
  @HostListener('window:resize', [])
  onResize() {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    this.loadImages();
  }

  @ViewChild('canvas', { static: true }) canvas:
    | ElementRef<HTMLCanvasElement>
    | undefined;
  private ctx!: CanvasRenderingContext2D;
  private pictures: Pictures = new Pictures();
  private city?: HTMLImageElement;
  public gameOver: boolean = false;
  private mouseIn: boolean = false;
  private score: number = 0;
  private cityX: number = 0;
  private cityDx: number = 2;
  private levelCheck: number = 0;
  private b!: Ball;
  private p: Platform[] = [];
  private item: Item[] = [];
  public height: number = window.innerHeight;
  public width: number = window.innerWidth;

  public getScore(): number {
    return this.score;
  }

  public setScore(score: number): void {
    this.score = score;
  }

  getHeight() {
    return this.height;
  }
  getWidth() {
    return this.width;
  }
  ngOnInit(): void {
    if (!this.canvas) return;
    this.ctx = this.canvas.nativeElement.getContext('2d') as any;
    this.loadImages();
    this.initGame();
    this.startGame();
    this.setupDeviceOrientation();
  }
  cityLoaded: boolean = false;
  // ngAfterViewInit() {
  //   this.city!.onload = () => {
  //     this.cityLoaded = true;
  //     // Now that the image is loaded, you can draw it onto the canvas
  //     this.drawCity();
  //   };
  //   this.city!.src = 'assets/images/1.png';
  // }

  // drawCity() {
  //   if (!this.cityLoaded) {
  //     // Image is not loaded yet, don't draw
  //     return;
  //   }

  //   // Get the canvas context
  //   const ctx = this.canvas!.nativeElement.getContext('2d');

  //   // Clear the canvas
  //   ctx!.clearRect(0, 0, this.canvas!.nativeElement.width, this.canvas!.nativeElement.height);

  //   // Draw the city image
  //   this.ctx.drawImage(this.city!, 0, 0, this.canvas!.nativeElement.width, this.canvas!.nativeElement.height);
  // }

  loadImages() {

  //   this.ctx;
  // var imageObj = document.getElementById('img');
  // imageObj.onload = function(e) {
  // ctx.canvas.width = imageObj.width;
  // ctx.canvas.height = imageObj.height;

  //   ctx.drawImage(imageObj, 0, 0,imageObj.width,imageObj.height);

  // };
  // imageObj.src = 'https://www.google.com/images/srpr/logo4w.png';
    // Load city image
    this.city = new Image();
    this.city.width = this.width;
    this.city.height = this.height;
    this.city.onload = (t) => {
      this.ctx.canvas.width = this.width;
      this.ctx.canvas.height = this.height;
        // this.city.width = this.width;
      // this.city.height = this.height;
      // Image has loaded successfully, proceed with drawing
      this.render();
    };
    this.city.onerror = (error) => {
      // Image loading failed, handle error
      console.error('Error loading image:', error);
    };

    this.city.width = this.width;
    this.city.height = this.height;
    this.city.src = 'assets/images/1.png';
    // Load other images and sounds if needed

  }


  setupDeviceOrientation(): void {
    window.addEventListener('deviceorientation', (event) => {
      this.handleDeviceOrientation(event);
    });
  }

  handleDeviceOrientation(event: DeviceOrientationEvent): void {
    // Check if gamma value is available
    if (event.gamma) {
      // Normalize gamma value between -1 and 1
      const normalizedGamma = event.gamma / 90; // 90 is a typical maximum value

      // Move the ball left or right based on the normalized gamma value
      if (normalizedGamma > 0) {
        // Rotate a bit to the right, move the ball right
        this.handleKeyPress({ key: 'ArrowRight'} as any);
      } else {
        // Rotate a bit to the left, move the ball left
        this.handleKeyPress({ key: 'ArrowLeft'} as any);
      }
    }
  }

  initGame() {
    this.pictures.playMusic();
    if (!this.canvas) return;
    // Initialize game components
    this.b = new Ball();
    this.score = 0;

    for (let i = 0; i < 10; i++) {
      this.p.push(new Platform(i * 120, 400));
    }

    for (let i = 0; i < 3; i++) {
      // Initialize items
      // You can replace the randomization with your own logic
      switch (Math.floor(Math.random() * 5)) {
        case 0:
          this.item.push(
            new GravUp(this.canvas.nativeElement.width + 2000 * i)
          );
          break;
        case 1:
          this.item.push(
            new GravDown(this.canvas.nativeElement.width + 2000 * i)
          );
          break;
        case 2:
          this.item.push(
            new AgilUp(this.canvas.nativeElement.width + 2000 * i)
          );
          break;
        case 3:
          this.item.push(
            new AgilDown(this.canvas.nativeElement.width + 2000 * i)
          );
          break;
        case 4:
          this.item.push(
            new ScorePlus(this.canvas.nativeElement.width + 2000 * i, this)
          );
          break;
      }
    }
  }

  startGame() {
    // Start game loop
    setInterval(() => {
      this.update();
      this.render();
    }, 17);
  }

  checkCollision() {
    // Assuming you have methods to get the bounding box of the ball and platforms
    const ballBoundingBox = this.b.getBoundingBox(); // Implement this method in the Ball class
    for (let i = 0; i < this.p.length; i++) {
      const platformBoundingBox = this.p[i].getBoundingBox(); // Implement this method in the Platform class

      // Check for collision between the ball and platform bounding boxes
      if (this.detectCollision(ballBoundingBox, platformBoundingBox)) {
        // Handle collision logic (e.g., bouncing the ball)
        // Implement this logic according to your game's requirements
      }
    }
  }

  detectCollision(rect1: BoundingBox, rect2: BoundingBox): boolean {
    // Implement collision detection logic between two bounding boxes (rect1 and rect2)
    // Return true if there is a collision, false otherwise
    // Example collision detection logic:
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  update() {
    // Handle ball movement
    this.b.update(this); // Assuming there's an update method in the Ball class

    // Handle platform movement (if applicable)
    for (let i = 0; i < this.p.length; i++) {
      this.p[i].update(this, this.b); // Assuming there's an update method in the Platform class
    }

    // Handle collision detection between the ball and platforms
    this.checkCollision();

    if (!this.checkGameOver()) {
      // Update score
      this.updateScore();
    }

    // Check for game over condition
    if (this.checkGameOver()) {
      this.gameOver = true;
      // Additional game over logic (e.g., displaying game over screen)
    }
  }

  checkGameOver(): boolean {
    // Add logic to check if the game is over
    // For example, you might check if the ball has fallen out of bounds or collided with a specific object
    // Return true if the game is over, false otherwise
    // For demonstration purposes, assume the game is over when the ball falls below a certain y-coordinate
    return this.b.y > this.height;
  }

  updateScore() {
    // Add logic to update the score based on game progress
    // For example, you might increase the score by a certain amount each frame
    this.score += 1; // Increment the score by 1 for demonstration purposes
  }

  render() {
    // Render game graphics
    if (this.ctx === undefined || !this.canvas || !this.city) return;
    // Set canvas size to match window size
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;

    // Clear canvas
    this.ctx.fillStyle = 'rgb(15, 77, 147)';
    this.ctx.fillRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    // Draw city images
    this.ctx.drawImage(this.city, 0, 0, this.width, this.height);
    // this.ctx.drawImage(
    //   this.city,
    //   this.cityX + this.canvas.nativeElement.width,
    //   0
    // );

    // Draw platforms
    this.p.forEach((platform) => platform.paint(this.ctx));

    // Draw items
    this.item.forEach((item) => item.paint(this.ctx));

    // Draw ball
    this.b.paint(this.ctx);

    // Draw score
    const scoreText = `Score: ${this.score}`;
    this.ctx.font = '32px Serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(
      scoreText,
      this.canvas.nativeElement.width - 150 + 2,
      50 + 2
    );
    this.ctx.fillStyle = 'rgb(198, 226, 255)';
    this.ctx.fillText(scoreText, this.canvas.nativeElement.width - 150, 50);
    // Draw game over screen if game is over
    if (this.gameOver) {
      this.ctx.fillStyle = 'black';

      const tbuttonX = 2;
      const tbuttonY = window.innerHeight - 30;
      const tbuttonWidth = 170;
      const tbuttonHeight = 25;
      const tcornerRadius = 5;

      this.ctx.fillStyle = 'white';
      this.roundRect(
        this.ctx,
        tbuttonX,
        tbuttonY,
        tbuttonWidth,
        tbuttonHeight,
        tcornerRadius,
        true,
        false
      );
      this.ctx.fillStyle = 'grey';
      this.ctx.font = '14px Arial';
      this.ctx.fillText('Game by Jacob Nathan', tbuttonX + 4, tbuttonY + 15);
      // this.ctx.fillText('By Jacob Nathan', tbuttonX , tbuttonY + 30);
      // this.ctx.fillText('jacob nathan', 218, 290);

      // Continue drawing other strings as needed

      // Draw play again button
      const buttonX = 270;
      const buttonY = 310;
      const buttonWidth = 180;
      const buttonHeight = 40;
      const cornerRadius = 10;

      this.ctx.fillStyle = this.mouseIn ? 'red' : 'orange';
      this.roundRect(
        this.ctx,
        buttonX,
        buttonY,
        buttonWidth,
        buttonHeight,
        cornerRadius,
        true,
        false
      );
      this.ctx.fillStyle = 'black';
      this.ctx.font = '20px Arial';
      this.ctx.fillText('Play again?', buttonX + 20, buttonY + 28);
    }
    this.ctx.stroke();
  }

  roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number | { tl: number; tr: number; br: number; bl: number },
    fill: boolean,
    stroke: boolean
  ) {
    if (typeof stroke === 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'number') {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (const side of ['tl', 'tr', 'br', 'bl'] as const) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius.br,
      y + height
    );
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    // Handle key presses
    switch (event.key) {
      case 'ArrowLeft':
        this.b?.moveLeft();
        break;
      case 'ArrowRight':
        this.b?.moveRight();
        break;
      case 'e':
        this.b?.exit(this.score);
        break;
      default:
        console.log('Unhandled key:', event.key);
        break;
    }
  }

  // @HostListener('window:keydown', ['$event'])
  // handleKeyboardEventkeydown(event: KeyboardEvent) {
  //   console.log(event);
  // }
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Handle mouse movements
    // This method is used to detect if the mouse is over the "Play again?" button
    if (this.gameOver) {
      // Implement logic to check if the mouse is over the button
      this.mouseIn = true; // Set to true if mouse is over the button
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    // Handle mouse clicks
    if (this.mouseIn) {
      // Implement logic to restart the game when the button is clicked
      this.restartGame();
    }
  }

  handleMouseClick(event: MouseEvent) {
    // Get mouse coordinates
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Check if mouse is within the play again button area
    if (
      this.gameOver &&
      mouseX > 270 &&
      mouseX < 450 &&
      mouseY > 310 &&
      mouseY < 350
    ) {
      this.restartGame();
    }
  }

  restartGame() {
    // Restart the game
    this.b = new Ball();
    this.p = [];
    this.score = 0;
    this.levelCheck = 1;
    this.initGame();
    this.gameOver = false;
    this.mouseIn = false;
  }
}
