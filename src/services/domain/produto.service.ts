import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import HttpService from "../http.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ProdutoService extends HttpService {
    
    constructor(protected http: HttpClient) {
        super(http);
    }

    async findByCategoria(categoriaId: string) {

        return await this.get(`produtos?categorias=${categoriaId}`);
    }

    async getSmallImageFromBucket(id: string) {
        let url = this.getUrlProduto(id);
        return this.get(url, {responseType: 'blob'}, false);
    }

    getUrlProduto(id: string) {
        console.log(id);
        return `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    }
}