import { API_CONFIG } from './../config/api.config';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private readonly storage: StorageService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let user = this.storage.getLocalUser();
        let N = API_CONFIG.baseUrl.length;
        let requestToApi = req.url.substring(0, N) == API_CONFIG.baseUrl;

        if (user && requestToApi) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${user.token}`)
            });
            return next.handle(authReq);
        }
        return next.handle(req); 
    }
}

export const AuthInterceptorHandler = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}