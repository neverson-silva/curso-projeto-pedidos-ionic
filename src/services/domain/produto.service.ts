import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import HttpService from "../http.service";
import { HttpClient } from "@angular/common/http";
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class ProdutoService extends HttpService {
    
    constructor(protected http: HttpClient) {
        super(http);
    }

    async findByCategoria(categoriaId: string, page: number = 0, linesPerPage: number = 24) {

        return await this.get(`produtos?categorias=${categoriaId}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    async findById(categoriaId: string): Promise<ProdutoDTO> {

        return await this.get(`produtos/${categoriaId}`);
    }

    async getSmallImageFromBucket(id: string) {
        let url = this.getUrlProduto(id);
        return this.get(url, {responseType: 'blob'}, false);
    }

    async getmageFromBucket(id: string) {
        let url = this.getUrlProduto(id, false);
        return this.get(url, {responseType: 'blob'}, false);
    }

    getUrlProduto(id: string, small: boolean = true) {
        return `${API_CONFIG.bucketBaseUrl}/prod${id}${small ? '-small' : ''}.jpg`;
    }
}