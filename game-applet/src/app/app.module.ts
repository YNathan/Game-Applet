import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ScreenTrackingService, UserTrackingService}
from '@angular/fire/analytics';
import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";
import {AngularFireModule} from "@angular/fire/compat";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartingPointComponent } from './starting-point/starting-point.component';

const firebaseConfig = {
  apiKey: "AIzaSyBcJtbtbjOrmtGjKTu-Mc3Ad8_p13BNW0o",
  authDomain: "skybound-adventure.firebaseapp.com",
  projectId: "skybound-adventure",
  storageBucket: "skybound-adventure.appspot.com",
  messagingSenderId: "525898813565",
  appId: "1:525898813565:web:7652da2235b84cc5a3a114",
  measurementId: "G-0TVQ2PJHPZ"
};
@NgModule({
  declarations: [
    AppComponent,
    StartingPointComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAnalyticsModule,
  ],
  providers: [ ScreenTrackingService,
    UserTrackingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
