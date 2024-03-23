
import { Inject, Injectable } from '@angular/core';
import { Item } from './item.class';
import { Ball } from './ball.class';

@Injectable()
export class AgilUp extends Item {

  constructor(@Inject(Number) x: number) {
    super(x);
  }

  override performAction(b: Ball): void {
    if (b.getAgility() < 8) {
      b.setAgility(b.getAgility() + 1);
    }
  }

  override paint(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "green";
    super.paint(ctx);
  }
}
