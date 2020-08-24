import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { App } from 'ionic-angular';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private readonly storage: StorageService,  private app: App) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
                   .catch((error, caugth) => {
                       let errorObj = error;

                       if (errorObj.error ) {
                           errorObj = errorObj.error;
                       }
                       if (!errorObj.status) {
                           errorObj = JSON.parse(error);
                       }

                       switch(errorObj.status) {
                           case 403:
                               this.handle403();
                            break;
                       }
                       console.log(errorObj);
                       return Observable.throw(errorObj);
                   }) as any; 
    }

    handle403() {
        this.storage.setLocalUser(null);
        this.goToHome();
    }
    
    private goToHome() {
        this.app.getActiveNavs()[0].setRoot("HomePage");
    }
}

export const ErrorInterceptorHandler = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}