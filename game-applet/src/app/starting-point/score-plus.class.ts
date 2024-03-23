
import { Inject, Injectable } from '@angular/core';
import { Item } from './item.class';
import { StartingPointComponent } from './starting-point.component';
import { Ball } from './ball.class';

@Injectable()
export class ScorePlus extends Item {
  private appletInfo: StartingPointComponent;

  constructor(@Inject(Number) x: number, appletInfo: StartingPointComponent) {
    super(x);
    this.appletInfo = appletInfo;
  }

  override performAction(b: Ball): void {
    const random = Math.floor(Math.random() * 2000);
    this.appletInfo.setScore(this.appletInfo.getScore() + 500 + random);
  }

  override paint(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "blue";
    super.paint(ctx);
  }
}
