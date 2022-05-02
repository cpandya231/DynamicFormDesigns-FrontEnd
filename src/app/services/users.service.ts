import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoginModel } from 'src/app/login/login-model';
import { ServiceUtil } from './utility/ServiceUtil';
@Injectable({ providedIn: 'root' })
export class UsersService {
    constructor(private http: HttpClient) { }

    getToken(loginModel: LoginModel) {
        const httpParams = new HttpParams()
            .set('username', loginModel.username)
            .set('password', loginModel.password);
        return this.http.post<any>(`${ServiceUtil.API_ENDPOINT}/login`, httpParams.toString(), ServiceUtil.HTTPOPTIONS);
    }
}


