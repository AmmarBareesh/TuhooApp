import { Injectable } from '@angular/core';
import { AlertController, LoadingController, MenuController, ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ShareUiService {

  loading: any;

  constructor(private menuCtrl: MenuController, private alertController: AlertController, private loadingCtrl: LoadingController,
              private modalCtrl: ModalController) { }

  enableSideMenu(val: boolean) {
    this.menuCtrl.enable(val);
  }
  async ShowErrorAlert(header, message) {
    const alert = await this.alertController.create({
      header: `${header}`,
      subHeader: `${message}`,
      buttons: ['Ok'],
      cssClass: 'alertCss'
    });
    await alert.present();
  }

  async ShowExitAlert() {
    const alert = await this.alertController.create({
      header: 'هل تريد الخروج من التطبيق ؟',
      buttons: [
        {
          text: 'الغاء',
          role: 'cancel'
        }, {
          text: 'خروج',
          handler: () => {
            // tslint:disable-next-line:no-string-literal
            navigator['app'].exitApp();
          }
        }
      ],
      cssClass: 'alertCss'
    });
    await alert.present();
  }

  async ShowLoader() {
    const loading = await this.loadingCtrl.create({
      message: 'يرجى الإنتظار ...'
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
    });
  }

  async ShowExitModalAlert() {
    const alert = await this.alertController.create({
      header: 'هل تريد الخروج ؟',
      buttons: [
        {
          text: 'الغاء',
          role: 'cancel'
        }, {
          text: 'خروج',
          handler: () => {
            // tslint:disable-next-line:no-string-literal
            this.modalCtrl.dismiss();
          }
        }
      ],
      cssClass: 'alertCss'
    });
    await alert.present();
  }

}
