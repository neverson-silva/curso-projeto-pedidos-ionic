import { LocalUser } from './../models/localUser';
import { StorageService } from './storage.service';
import { CredenciaisDTO } from './../models/credencias.dto';
import { Injectable } from "@angular/core";
import HttpService from './http.service';
import {JwtHelper } from 'angular2-jwt';
@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: HttpService,
        private storage: StorageService) {}

    async authenticate(credenciais: CredenciaisDTO) {

        return await this.http.post( 'login', credenciais, {
            observe: 'response',
            responseType: 'text',
        });
    }

    successfulLogin(authorizationValue: string) {

        let token = authorizationValue.replace("Bearer ", "");
        let user: LocalUser = {
            token,
            email: this.jwtHelper.decodeToken(token).sub
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}