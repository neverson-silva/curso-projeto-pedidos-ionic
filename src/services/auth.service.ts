import { CredenciaisDTO } from './../models/credencias.dto';
import { Injectable } from "@angular/core";
import HttpService from './http.service';

@Injectable()
export class AuthService {

    constructor(private http: HttpService) {}

    async authenticate(credenciais: CredenciaisDTO) {

        return await this.http.post( 'login', credenciais, {
            observe: 'response',
            responseType: 'text',
        });
    }
}