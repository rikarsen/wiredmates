import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor (public navCtrl: NavController,
               public navParams: NavParams) {
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad MainPage');
  }

  onSignup () {
    this.navCtrl.push(RegisterPage);
  }

  onLogin () {
    this.navCtrl.setRoot(LoginPage);
  }
}
