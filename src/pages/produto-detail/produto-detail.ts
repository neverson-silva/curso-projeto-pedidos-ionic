import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../services/domain/produto.service';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private produtoService: ProdutoService,
              private cartService: CartService) {
  }

  async ionViewDidLoad() {
    try {
      const id = this.navParams.get('produtoId');
      this.item = await this.produtoService.findById(id);

      await this.getImageUrlIfExists();
    } catch (e) {

    }
  }

  async getImageUrlIfExists () {
    try {
      await this.produtoService.getmageFromBucket(this.item.id);
      this.item.imageUrl = this.produtoService.getUrlProduto(this.item.id, false);
    } catch(e){}

  }

  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }

}
