import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private catService: CategoriaService) {
  }

  async ionViewDidLoad() {
    try {
      const categorias: CategoriaDTO[] = await this.catService.findAll();
      categorias.forEach((v) => console.log(v.nome));
      console.log(categorias);

    } catch(e) {
      console.log(e);
    }
    
  }

}
