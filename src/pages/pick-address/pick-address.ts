import { CartService } from './../../services/domain/cart.service';
import { PedidoDTO } from './../../models/pedido.dto';
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

  pedido: PedidoDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: StorageService,
    private clienteService: ClienteService,
    private cartService: CartService) {
  }

  async ionViewDidLoad() {
    try {
      const user = this.storage.getLocalUser();
      if (user && user.email) {
        const response = await this.clienteService.findByEmail(user.email) as ClienteDTO;
        this.items = response['enderecos'];
        this.pedido = {
          cliente: {id: response['id']},
          enderecoEntrega: null,
          pagamento: null,
          itens: this.cartItems
        }
      } else {
        this.navCtrl.setRoot("HomePage");
      }
    } catch {

    }
  }

  nextPage(endereco: EnderecoDTO) {
    this.pedido.enderecoEntrega = {id: endereco.id};
    this.navCtrl.push("PaymentPage", {pedido: this.pedido});
  }

  private get cartItems() {
    const cart = this.cartService.cart;

    return cart.items.map(i => {
      return {quantidade: i.quantidade, produto: {id: i.produto.id}}
    });
  }

}
