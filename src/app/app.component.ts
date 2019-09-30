import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularTokenService } from "angular-token";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  signOutSubmint() {
    this.tokenService.signOut().subscribe(
      res => {
        localStorage.removeItem("user");
        this.router.navigateByUrl('/login');
      },
      error => console.log(error)
    );
  }

  userSignedInSession(): boolean {
    return this.tokenService.userSignedIn() == true;
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private tokenService: AngularTokenService,
    private router: Router
  ) {
    console.log(this.userSignedInSession());
    if(this.userSignedInSession()) {
      router.navigateByUrl('/dashboard');
    }else {
      router.navigateByUrl('/login');
    }
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
