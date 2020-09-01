import { HttpResponse } from '@angular/common/http';
import { PedidoService } from './../../services/domain/pedido.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { ClienteDTO } from './../../models/cliente.dto';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart-item';
import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(public navCtrl: NavController, 
             public navParams: NavParams,
             private cartService: CartService,
             private clienteService: ClienteService, 
             private pedidoService: PedidoService) {
    this.pedido = this.navParams.get('pedido');
  }

  async ionViewDidLoad() {
    this.cartItems = this.cartService.cart.items;
    try {
      this.cliente = await this.clienteService.findById(this.pedido.cliente.id) as ClienteDTO;
      this.endereco = (this.cliente['enderecos'] as EnderecoDTO[]).filter(e => e.id == this.pedido.enderecoEntrega.id).shift();
    } catch(e) {

    }
 
  }

  async checkout() {
    try {
      const response = await this.pedidoService.insert(this.pedido) as HttpResponse<ArrayBuffer>;
      this.cartService.createOrClearCart();
      console.log(response.headers.get('location'));
    } catch(e) {
      if (e.status == 403) {
        this.navCtrl.setRoot("HomePage");
      }
    }
  }

  back() {
    this.navCtrl.setRoot("CartPage");
  }

  total() {
    return this.cartService.total();
  }
}
