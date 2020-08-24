import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { App, AlertController, AlertButton } from 'ionic-angular';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private readonly storage: StorageService,  
                private app: App,
                private readonly alertCtl: AlertController) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
                   .catch((error, caugth) => {
                       let errorObj = error;

                       if (errorObj.error ) {
                           errorObj = errorObj.error;
                       }
                       if (!errorObj.status) {
                            errorObj = JSON.parse(errorObj);
                       }

                       switch(errorObj.status) {
                            case 403:
                               this.handle403();
                            break;
                            case 401:
                                this.handle401();
                            break;
                            default:
                                this.handleDefaultError(errorObj);
                       }
                       console.log(errorObj);
                       return Observable.throw(errorObj);
                   }) as any; 
    }


    handleDefaultError(errorObj: any) {
        this.presentAlert(`Erro: ${errorObj.status}: ${errorObj.error}`, errorObj.message, [{text: 'OK'}]);
    }

    handle403() {
        this.storage.setLocalUser(null);
        this.goToHome();
    }

    handle401() {
        this.presentAlert(`Falha na autenticação`, 'Email e/ou senha incorretos', [{text: 'OK'}]);
    }
    
    private goToHome() {
        this.app.getActiveNavs()[0].setRoot("HomePage");
    }

    private presentAlert(title: string, message: string, buttons: (AlertButton | string)[]) {
        let alert = this.alertCtl.create({
            title: title,
            message: message,
            enableBackdropDismiss: false,
            buttons: buttons
        });
        alert.present();
    }
}

export const ErrorInterceptorHandler = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}