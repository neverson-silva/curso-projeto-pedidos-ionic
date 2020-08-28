import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_CONFIG } from './../config/api.config';
import { Injectable } from "@angular/core";

@Injectable()
/**
 * Http Wrapper to use Promises instead Observable
 */
export default class HttpService {

    private baseUrl = API_CONFIG.baseUrl;

    constructor(protected http: HttpClient) {

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
        responseType: 'arraybuffer'| 'text' | 'blob';
        withCredentials?: boolean;
    }, useBaseUrl: boolean = true): Promise<any> {
        url = this.getUrl(url, useBaseUrl);
        //@ts-ignore
        return this.http.get(url, options).toPromise();
    }

    async post(url: string, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body' | 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json' | 'text';
        withCredentials?: boolean;
    }, useBaseUrl: boolean = true): Promise<Object> {
        url = this.getUrl(url, useBaseUrl);
        //@ts-ignore
        return this.http.post(url, body, options).toPromise();
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
    }, useBaseUrl: boolean = true): Promise<Object> {
        url = this.getUrl(url, useBaseUrl);
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
    }, useBaseUrl: boolean = true): Promise<Object> {
        url = this.getUrl(url, useBaseUrl);
        return this.http.delete(url, options).toPromise();
    }

    public setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public getBaseUrl(): string {
        return this.baseUrl;
    }

    private getUrl(url: string, useBaseUrl: boolean = true) {
        if (this.baseUrl == '' || !this.baseUrl || !useBaseUrl) {
            return url;
        } else {
            return `${this.baseUrl}/${url}`;
        }
    }
}