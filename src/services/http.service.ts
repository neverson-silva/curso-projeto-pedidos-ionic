import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { API_CONFIG } from './../config/api.config';
import { Injectable } from "@angular/core";

@Injectable()
/**
 * Http Wrapper to use Promises instead Observable
 */
export default class HttpService {

    private baseUrl = API_CONFIG.baseUrl;

    constructor(private http: HttpClient) {

    }

    async get(url: string, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
    }): Promise<any> {
        url = `${this.baseUrl}/${url}`;
        return this.http.get(url, options).toPromise();
    }

    async post(url: string, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Promise<Object> {
        url = `${this.baseUrl}/${url}`;
        return this.http.post(url, options).toPromise();
    }

    async put(url: string, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Promise<Object> {
        url = `${this.baseUrl}/${url}`;
        return this.http.put(url, options).toPromise();
    }

    async delete(url: string, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Promise<Object> {
        url = `${this.baseUrl}/${url}`;
        return this.http.delete(url, options).toPromise();
    }

    public setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
}