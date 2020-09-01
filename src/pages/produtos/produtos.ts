import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
             private pds: ProdutoService,
             private loadingCtl: LoadingController) {
  }

  async ionViewDidLoad() {
    await this.loadData(true);
  }

  async loadData(shouldPresent: boolean) {
    const loader = shouldPresent ? this.presentLoading() : null;

    try {
      const id = this.navParams.get('categoriaId');
      const response = await this.pds.findByCategoria(id);
      this.items = response.content;
      loader?.dismiss();
      await this.loadImageUrls();
    } catch (e) {
      this.items = [];
      loader?.dismiss();
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
  
  showDetail(produtoId: string) {
    this.navCtrl.push('ProdutoDetailPage', {produtoId });
  }

  private presentLoading() {
    const loader = this.loadingCtl.create({
      content: 'Carregando...'
    });
    loader.present();
    return loader;
  }

  async doRefresh(refresher) {

    await this.loadData(false);
    refresher.complete();

  }
}
