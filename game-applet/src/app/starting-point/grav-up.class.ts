
import { Inject, Injectable } from '@angular/core';
import { Item } from './item.class';
import { Ball } from './ball.class';

@Injectable()
export class GravUp extends Item {
  constructor(@Inject(Number) x: number) {
    super(x);
  }

  override performAction(b: Ball): void {
    b.setGravity(b.getGravity() + 3);
  }

  override paint(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "red";
    super.paint(ctx);
  }
}
