import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { StorageService } from '../../services/storage.service';
import { ProdutoService } from '../../services/domain/produto.service';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private cartService: CartService,
              private pds: ProdutoService) {
  }

  async ionViewDidLoad() {
    const cart = this.cartService.cart;
    this.items = cart.items;
    await this.loadImageUrls();
  }

  async loadImageUrls () {
    this.items.forEach(async (item) => {
      try {
        await this.pds.getSmallImageFromBucket(item.produto.id);
        item.produto.imageUrl = this.pds.getUrlProduto(item.produto.id);
      } catch (e) {
        item.produto.imageUrl = 'assets/imgs/prod.jpg';
      }
    });

} 

}
