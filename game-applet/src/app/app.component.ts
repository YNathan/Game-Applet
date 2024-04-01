import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'game-applet';

  constructor(analytics: AngularFireAnalytics) {
    analytics.logEvent('app_open', {"component": "AppComponent"});
  }
}
