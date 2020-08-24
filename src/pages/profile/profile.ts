import { API_CONFIG } from './../../config/api.config';
import { ClienteDTO } from './../../models/cliente.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;
  cliente: ClienteDTO;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private storage: StorageService,
              private clienteService: ClienteService) {
  }

  async ionViewDidLoad() {
    try {
      const user = this.storage.getLocalUser();
      this.email = user?.email;
      this.cliente = await this.clienteService.findByEmail(this.email);
      await this.getImageIfExists();
    } catch {

    }
  }
  
  async getImageIfExists () {

    try {
      await this.clienteService.getUrlFromBucket(this.cliente.id);
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    } catch (e) {
      this.cliente.imageUrl = null;
    }
  }

}
