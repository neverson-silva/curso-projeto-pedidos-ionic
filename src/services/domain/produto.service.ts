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
}