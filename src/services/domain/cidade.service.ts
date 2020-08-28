import { CidadeDTO } from './../../models/cidade.dto';
import { Injectable } from "@angular/core";
import HttpService from "../http.service";

@Injectable()
export class CidadeService {

    constructor(private http: HttpService) {

    }

    async findAll(estadoId: string) : Promise<CidadeDTO[]>{

        return await this.http.get(`estados/${estadoId}/cidades`);
    }

}