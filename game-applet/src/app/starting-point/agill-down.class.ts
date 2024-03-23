
import { Ball } from './ball.class';
import { Item } from './item.class';


export class AgilDown extends Item {
  constructor(x: number) {
    super(x);
  }

  override performAction(b: Ball): void {
    if (b.getAgility() >= 2) {
      b.setAgility(b.getAgility() - 1);
    }
  }

  override paint(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'red';
    super.paint(ctx);
  }
}
