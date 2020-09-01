import { PedidoDTO } from './../../models/pedido.dto';
import { HttpClient } from '@angular/common/http';
import HttpService from "../http.service";
import { Injectable } from "@angular/core";

@Injectable()
export class PedidoService extends HttpService {


    constructor(protected http: HttpClient) {
        super(http);
    }

    async insert(pedido: PedidoDTO) {
        return await this.post('pedidos', pedido, {observe: 'response', responseType: 'text'});
    }
}