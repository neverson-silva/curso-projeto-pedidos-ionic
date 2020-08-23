import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from './../../models/categoria.dto';
import { Injectable } from "@angular/core";
import HttpService from '../http.service';


@Injectable()
export class CategoriaService {

    constructor(private http: HttpService) {

    }

    async findAll() : Promise<CategoriaDTO[]>{

        return await this.http.get('categorias');
    }
}