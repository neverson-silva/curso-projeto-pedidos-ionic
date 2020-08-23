import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@IonicPage()
export class HomePage {

  constructor(public navCtrl: NavController, private menu: MenuController) {

  }

  ionViewWillEnter(){
    this.changeSwap(false);
  }
  
  ionViewDidLeave(){
   this.changeSwap(true);
  }

  login() {
    this.navCtrl.setRoot("CategoriasPage");

  }

  private changeSwap(isEnabled: boolean) {
    this.menu.swipeEnable(isEnabled);
  }

}
