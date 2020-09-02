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

  items: ProdutoDTO[] = [];
  page: number = 0;

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
      const response = await this.pds.findByCategoria(id, this.page, 10);
      const start = this.items.length;
      this.items = [ ...this.items, ...response.content];
      const end = this.items.length - 1;

      loader?.dismiss();
      await this.loadImageUrls(start, end);
      console.log(this.items);

    } catch (e) {
      this.items = [];
      loader?.dismiss();
    }
  }

  async loadImageUrls (start: number, end: number) {

    for (let i = start; i <= end; i++) {
      try {
        await this.pds.getSmallImageFromBucket(this.items[i].id);
        this.items[i].imageUrl = this.pds.getUrlProduto(this.items[i].id);
      } catch(e){
        this.items[i].imageUrl = 'assets/imgs/prod.jpg';
      }
    }

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

    this.page = 0;
    this.items = [];
    await this.loadData(false);
    refresher.complete();

  }

  async doInfinite(infiniteScroll) {

    this.page += 1;
    await this.loadData(true);
    infiniteScroll.complete();

  }
}
