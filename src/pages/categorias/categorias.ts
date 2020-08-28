import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriaDTO[];
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private catService: CategoriaService) {
  }

  async ionViewDidLoad() {
    try {
      this.items = await this.catService.findAll();

    } catch(e) {
    }
    
  }

  showProdutos() {
    this.navCtrl.push("ProdutosPage");
  }
}
