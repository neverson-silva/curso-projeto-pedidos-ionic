import { ImageUtilService } from './image-util.service';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import HttpService from "../http.service";
import { ClienteDTO } from "../../models/cliente.dto";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ClienteService extends HttpService {


    constructor(https: HttpClient, private imageUtil: ImageUtilService) {
        super(https);
    }
    async findById(id: string): Promise<any> {
        //@ts-ignore
        return await this.get(`clientes/${id}`);
    }

    async findByEmail(email: string): Promise<any> {
        //@ts-ignore
        return await this.get(`clientes/email?value=${email}`);
    }

    async getUrlFromBucket(id: string) {
        const url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;

        return await this.get(url, { responseType: 'blob' }, false);
    }

    async insert(client: ClienteDTO) {

        return await this.post("clientes", client,
            { observe: 'response', responseType: 'text' });
    }

    async uploadPicture(picture) {

        const imageBlob = this.imageUtil.dataUriToBlob(picture);
        let form: FormData = new FormData();
        form.set('file', imageBlob, 'file.png');

        return await this.post("clientes/picture", form,
            { observe: 'response', responseType: 'text' });

    }
}