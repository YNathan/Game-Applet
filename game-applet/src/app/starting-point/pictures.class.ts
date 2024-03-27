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
  music: HTMLAudioElement;
  wind: HTMLAudioElement;
  bounce: HTMLAudioElement;
  static level: number = 1;
  // music: Audio = new Audio;
  constructor() {
    // URLs for resources
    const urlJohnWellcome = '/assets/Music/john-ottman--welcome-to-aqualantic.au';
    const urlBounce = '/assets/Music/bounce.au';
    const urlWind = '/assets/Music/wind.au';
    const urlImage2 = '/assets/images/platform.png';
    const urlBall = '/assets/images/ball.jpg';
    const urlMe = '/assets/images/Me.jpg';

    // Sounds
    this.music = new Audio(urlJohnWellcome);
    this.bounce = new Audio(urlBounce);
    this.wind = new Audio(urlWind);

    // Images
    Pictures.platform = new Image();
    Pictures.platform.src = urlImage2;

    Pictures.ball = new Image();
    Pictures.ball.src = urlBall;

    Pictures.gameover = new Image();
    Pictures.gameover.src = urlMe;
  }

  playBounce() {
    this.bounce.loop = false; // Set loop to false so it plays once
    this.bounce.play();
    // Pause or stop music when it ends
    this.bounce.addEventListener('ended', () => {
      this.bounce.pause(); // Pause the music
      this.bounce.currentTime = 0; // Reset the playback position to the beginning
    });
  }

  playWind() {
    this.wind.loop = false; // Set loop to false so it plays once
    this.wind.play();
    // Pause or stop music when it ends
    this.wind.addEventListener('ended', () => {
      this.wind.pause(); // Pause the music
      this.wind.currentTime = 0; // Reset the playback position to the beginning
    });
  }

  // Method to play the music
  playMusic() {
    this.music.play();
  }

  // Method to pause the music
  pauseMusic() {
    this.music.pause();
  }

  // Method to stop the music
  stopMusic() {
    this.music.pause();
    this.music.currentTime = 0;
  }
}
