import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginModel } from 'src/app/login/login-model';
import { ServiceUtil } from './utility/ServiceUtil';
import jwt_decode from 'jwt-decode';

import * as moment from "moment";
import { ReplaySubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) { }

    public activeProject: ReplaySubject<any> = new ReplaySubject(1);

    login(loginModel: LoginModel) {
        const httpParams = new HttpParams()
            .set('username', loginModel.username)
            .set('password', loginModel.password);
        this.http.post<any>(`${ServiceUtil.API_ENDPOINT}/login`, httpParams.toString(), ServiceUtil.HTTPOPTIONS)
            .subscribe({ next: this.setSession.bind(this), error: this.handleError.bind(this) });
        return this.activeProject;
    }

    setSession(authResult: any) {
        let decoded_token = this.getDecodedAccessToken(authResult.access_token);
        console.log(`EXP decoded ${decoded_token.exp}`)


        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem("expires_at", decoded_token.exp);
        this.activeProject.next('Success');
    }


    getDecodedAccessToken(token: any): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    handleError(err: any) {
        this.activeProject.error('Error');
    }

    getAccessToken(): any {

        console.log(`Current ${moment()} Expiration: ${this.getExpiration()}`)
        if (this.isTokenExpired()) {
            return "expired"
        }

        return localStorage.getItem("access_token");

    }

    isTokenExpired() {
        return moment().isAfter(this.getExpiration());
    }


    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        if (null == expiration) {
            return "";
        }
        return moment.unix(parseInt(expiration));
    }

    invalidateSession() {
        localStorage.clear();
        console.log(JSON.stringify(localStorage));
    }
}


