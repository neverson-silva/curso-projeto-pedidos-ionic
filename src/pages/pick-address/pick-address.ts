import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';


@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: StorageService,
    private clienteService: ClienteService) {
  }

  async ionViewDidLoad() {
    try {
      const user = this.storage.getLocalUser();
      if (user && user.email) {
        const response = await this.clienteService.findByEmail(user.email) as ClienteDTO;
        this.items = response['enderecos'];
      } else {
        this.navCtrl.setRoot("HomePage");
      }
    } catch {

    }
  }

}
