import { Injectable } from '@angular/core';
import { StartingPointComponent } from './starting-point.component';

@Injectable()
export class Pictures {
  static platform: HTMLImageElement;
  static ball: HTMLImageElement;
  static gameover: HTMLImageElement;
  static ofek: HTMLImageElement;
  static iaf: HTMLImageElement;
  static sp: StartingPointComponent;
  static music: HTMLAudioElement;
  static wind: HTMLAudioElement;
  static bounce: HTMLAudioElement;
  static level: number = 1;

  constructor() {
    // URLs for resources
    const urlJohnWellcome = '/Music/John Ottman - Welcome To Aqualantic.au';
    const urlBounce = '/Music/bounce.au';
    const urlWind = '/Music/wind.au';
    const urlImage2 = '/images/platform.png';
    const urlBall = '/images/ball.jpg';
    const urlMe = '/images/Me.jpg';

    // Sounds
    Pictures.music = new Audio(urlJohnWellcome);
    Pictures.bounce = new Audio(urlBounce);
    Pictures.wind = new Audio(urlWind);

    // Images
    Pictures.platform = new Image();
    Pictures.platform.src = urlImage2;

    Pictures.ball = new Image();
    Pictures.ball.src = urlBall;

    Pictures.gameover = new Image();
    Pictures.gameover.src = urlMe;
  }
}
