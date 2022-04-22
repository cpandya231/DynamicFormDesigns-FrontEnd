import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginModel } from 'src/app/login/login-model';
import { ServiceUtil } from './utility/ServiceUtil';
import jwt_decode from 'jwt-decode';

import * as moment from "moment";
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient, private router: Router) { }


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
        localStorage.setItem('refresh_token', authResult.refresh_token);
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
        this.router.navigate(['/']);
    }

    async refreshToken() {
        console.log("Token has expired, refreshing");
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                "Authorization": `Bearer ${localStorage.getItem('refresh_token')}`
            })
        };;
        this.http.get<any>(`${ServiceUtil.API_ENDPOINT}/token/refresh`, httpOptions)
            .subscribe({ next: this.setSession.bind(this), error: this.handleError.bind(this) });
        return this.activeProject;
    }

    getAccessToken(): any {

        if (this.isTokenExpired()) {
            this.refreshToken();

        }
        return localStorage.getItem('access_token');

    }



    isTokenExpired() {
        return moment().isAfter(this.getExpiration());
    }


    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        if (null == expiration) {
            return "";
        }
        return moment.unix(parseInt(expiration)).subtract(1, 'minute');
    }

    invalidateSession() {
        localStorage.clear();
        console.log(JSON.stringify(localStorage));
    }


}


