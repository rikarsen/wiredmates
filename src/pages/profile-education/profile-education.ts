import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import { Card } from '../../models/card';
import { Education } from '../../models/education';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the ProfileEducationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-education',
  templateUrl: 'profile-education.html',
})
export class ProfileEducationPage {
  public editing: boolean;

  public card: Card;
  public dataForm: FormGroup;

  get list (): FormArray {
    return <FormArray>this.dataForm.get('list');
  }

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               private formBuilder: FormBuilder,
               private modalCtrl: ModalController,
               private loadingCtrl: LoadingController,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController,
               private global: GlobalProvider) {
    this.editing = false;
    this.card = this.navParams.data.card;

    this.createDataForm();
    this.getProfileContactData();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad ProfileEducationPage');
  }

  /**
   * Get Profile Contact Data
   */
  getProfileContactData (): void {
    this.global.getProfileContactData({
      action: 'getContactEducations',
      id: this.card.id
    }, (list: Education[]) => {
      list.map((item: Education) => {
        this.list.push(this.addList(item));
      });
    });
  }

  /**
   * Create DataForm
   */
  createDataForm (): void {
    this.dataForm = this.formBuilder.group({
      list: this.formBuilder.array([])
    });
  }

  /**
   * Add Item To List
   * @param {Education} item
   * @returns {FormGroup}
   */
  addList (item: Education): FormGroup {
    return this.formBuilder.group({
      id: [item.id],
      school: [item.school],
      degree: [item.degree],
      gradYear: [GlobalProvider.toDateTime(item.gradYear)]
    });
  }

  /**
   * DataForm Submit
   */
  saveProfileContactData (): void {
    const data: Education[] = [];

    this.list.controls
      .map((group: FormGroup) => {
        data.push(new Education({
          id: group.get('id').value,
          school: group.get('school').value,
          degree: group.get('degree').value,
          gradYear: group.get('gradYear').value
        }));
      });


    this.global.saveProfileContactData({
      action: 'saveContactEducations',
      id: this.card.id,
      data: data
    }, () => {
      this.navCtrl.pop();

      this.editing = false;
    });
  }

  /**
   * Remove Item From Form Control
   * @param {FormControl} id
   * @param {number} index
   */
  removeProfileContactData (id: FormControl, index: number): void {
    this.global.removeProfileContactData({
      action: 'removeContactEducation',
      id: this.card.id,
      delID: id.value
    }, () => {
      this.list.removeAt(index);
    });
  }

  /**
   * Add Item To Form Control
   */
  addItem (): void {
    this.list.push(this.addList(new Education()));
  }
}
