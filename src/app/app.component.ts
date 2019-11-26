import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { TranslateConfigService } from './services/translate-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  selectedLanguage = 'en';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private translateConfigService: TranslateConfigService


  ) {
    this.initializeApp();
    this.platform.backButton.subscribe(async () => {
      if (this.router.isActive('/members/home', true) && this.router.url === '/members/home') {
        navigator['app'].exitApp();
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.authenticationService.authenticationState.subscribe(state => {
      //   if (state) {
      //     this.router.navigate(['members', 'home']);
      //   } else {
      //     this.router.navigate(['chose-login']);
      //   }
      // });

      // this.selectedLanguage = this.translateConfigService.getDefaultLanguage();

    });

  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
}
