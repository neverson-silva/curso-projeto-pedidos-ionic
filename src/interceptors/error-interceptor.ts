import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

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
                       console.log('Erro detectado pelo interceptor: ');
                       console.log(errorObj);
                       return Observable.throw(errorObj);
                   }) as any; 
    }
}

export const ErrorInterceptorHandler = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}