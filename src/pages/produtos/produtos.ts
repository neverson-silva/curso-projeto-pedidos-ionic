import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../services/domain/produto.service';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController, 
             public navParams: NavParams,
             private pds: ProdutoService) {
  }

  async ionViewDidLoad() {
    try {
      const id = this.navParams.get('categoriaId');
      const response = await this.pds.findByCategoria(id);
      this.items = response.content;
      await this.loadImageUrls();
    } catch (e) {
      this.items = [];
    }
  }

  async loadImageUrls () {
      this.items.forEach(async (item) => {
        try {
          await this.pds.getSmallImageFromBucket(item.id);
          item.imageUrl = this.pds.getUrlProduto(item.id);
        } catch (e) {
          item.imageUrl = 'assets/imgs/prod.jpg';
        }
      });

  } 
  
  showDetail() {
    this.navCtrl.push('ProdutoDetailPage');
  }
}
