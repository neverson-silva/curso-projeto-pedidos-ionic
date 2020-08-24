import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import HttpService from "../http.service";
import { ClienteDTO } from "../../models/cliente.dto";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ClienteService extends HttpService{


    constructor(https: HttpClient) {
        super(https);
    }
    async findByEmail(email: string): Promise<ClienteDTO> {
        //@ts-ignore
        return await this.get(`clientes/email?value=${email}`);
    }

    async getUrlFromBucket(id: string) {
        const url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;      

        return await this.get(url, {responseType: 'blob'}, false);
    }
}