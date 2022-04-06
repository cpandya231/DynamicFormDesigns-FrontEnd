import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoginModel } from 'src/app/login/login-model';
@Injectable({ providedIn: 'root' })
export class UsersService {
    constructor(private http: HttpClient) { }
    configUrl = "http://localhost:8080/login"

    options: {
        headers?: HttpHeaders | { [header: string]: string | string[]; };
        observe?: 'body' | 'events' | 'response';
        params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; };
        reportProgress?: boolean;
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        withCredentials?: boolean;
    } | undefined

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        })
    };
    getToken(loginModel: LoginModel) {
        const httpParams = new HttpParams()
            .set('username', loginModel.username)
            .set('password', loginModel.password);
        return this.http.post<any>(this.configUrl, httpParams.toString(), this.httpOptions);
    }
}


