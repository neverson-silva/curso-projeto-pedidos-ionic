import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: StorageService) {
  }

  ionViewDidLoad() {
    const user = this.storage.getLocalUser();
    this.email = user?.email;

    console.log('ionViewDidLoad ProfilePage');
  }

}
