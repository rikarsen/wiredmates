import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public signInForm: FormGroup;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               private formBuilder: FormBuilder,
               private alertCtrl: AlertController,
               private loadingCtrl: LoadingController) {
    this.createSignInForm();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad LoginPage');
  }

  createSignInForm () {
    this.signInForm = this.formBuilder.group({
      email: ['arsenbabajanyan95@gmail.com', [Validators.required]],
      password: ['12345678', [Validators.required]],
    });
  }

  signInFormSubmit (): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    const user = {
      action: 'login',
      username: this.signInForm.get('email').value,
      password: this.signInForm.get('password').value,
    };

    this.auth.signIn(user)
      .subscribe((data: any) => {
        loading.dismiss();

        if (data.e) {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: data.d,
            buttons: ['Ok']
          });
          alert.present();
        } else {
          this.auth.storeUserData(data.token, data.user);

          this.navCtrl.setRoot(TabsPage);
        }
      }, err => console.log(err));
  }
}