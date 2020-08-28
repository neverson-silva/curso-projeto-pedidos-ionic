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
      const response = await this.pds.findByCategoria(this.navParams.get('categoriaId'));
      this.items = response.content;
    } catch (e) {
      this.items = [];
    }
  }
  
}
