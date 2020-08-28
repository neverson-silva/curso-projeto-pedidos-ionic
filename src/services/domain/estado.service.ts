import { EstadoDTO } from './../../models/estado.dto';
import { Injectable } from "@angular/core";
import HttpService from '../http.service';


@Injectable()
export class EstadoService {

    constructor(private http: HttpService) {

    }

    async findAll() : Promise<EstadoDTO[]>{

        return await this.http.get('estados');
    }
}