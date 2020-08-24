import { CredenciaisDTO } from './../../models/credencias.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@IonicPage()
export class HomePage {

  credenciais: CredenciaisDTO = {
    email: "",
    senha: ""
  };
  constructor(public navCtrl: NavController, 
      private menu: MenuController,
      private auth: AuthService) {

  }

  ionViewWillEnter(){
    this.changeSwap(false);
  }
  
  ionViewDidLeave(){
   this.changeSwap(true);
  }

  async login() {
    try {
      
      const response = await this.auth.authenticate(this.credenciais);

      // @ts-ignore
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot("CategoriasPage");

    } catch (e) {

    }


  }

  private changeSwap(isEnabled: boolean) {
    this.menu.swipeEnable(isEnabled);
  }

}
