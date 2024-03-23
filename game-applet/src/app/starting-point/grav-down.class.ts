

import { Inject, Injectable } from '@angular/core';
import { Item } from './item.class';
import { Ball } from './ball.class';

@Injectable()
export class GravDown extends Item {
  constructor(@Inject(Number) x: number) {
    super(x);
  }

  override performAction(b: Ball): void {
    if (b.getGravity() > 3) {
      b.setGravity(b.getGravity() - 3);
      if (b.getGravity() < 3) {
        b.setGravity(3);
      }
    }
  }

  override paint(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "green";
    super.paint(ctx);
  }
}
