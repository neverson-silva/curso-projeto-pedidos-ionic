import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import HttpService from "../http.service";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ClienteService extends HttpService{


    constructor(private https: HttpClient, private storage: StorageService) {
        super(https);
    }
    async findByEmail(email: string): Promise<ClienteDTO> {

        let token = this.storage.getLocalUser()?.token;
        let authHeader = new HttpHeaders({
            authorization: "Bearer " + token
        });

        //@ts-ignore
        return await this.get(`clientes/email?value=${email}`, {headers: authHeader});
    }

    async getUrlFromBucket(id: string) {
        const url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;      

        return await this.get(url, {responseType: 'blob'}, false);
    }
}