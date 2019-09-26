import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private platform: Platform) {}

  showPlatform() {
    console.log('entro');
  }

}
