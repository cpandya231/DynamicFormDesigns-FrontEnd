import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginModel } from 'src/app/login/login-model';
import { ServiceUtil } from './utility/ServiceUtil';
import jwt_decode from 'jwt-decode';

import * as moment from "moment";
import { map, Observable, of, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient, private router: Router) { }

    login(loginModel: LoginModel) {
        let loginActiveProject: ReplaySubject<any> = new ReplaySubject(1);
        const httpParams = new HttpParams()
            .set('username', loginModel.username)
            .set('password', loginModel.password);
        this.http.post<any>(`${ServiceUtil.API_ENDPOINT}/login`, httpParams.toString(), ServiceUtil.HTTPOPTIONS)
            .subscribe({ next: this.setSession.bind(this, loginActiveProject), error: this.handleError.bind(this, loginActiveProject) });
        return loginActiveProject;
    }

    setSession(activeProject: any, authResult: any) {
        let decoded_token = this.getDecodedAccessToken(authResult.access_token);
        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem('refresh_token', authResult.refresh_token);
        localStorage.setItem("expires_at", decoded_token.exp);
        localStorage.setItem("username", decoded_token.sub);
        localStorage.setItem("roles", decoded_token.role)
        activeProject.next(authResult.access_token);
    }

    getDecodedAccessToken(token: any): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    handleError(activeProject: any, err: any) {
        activeProject.error('Error');
        this.router.navigate(['/']);
    }

    refreshToken(activeProjectRefreshToken: any) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        this.http.get<any>(`${ServiceUtil.API_ENDPOINT}/token/refresh`, httpOptions)
            .subscribe({ next: this.setSession.bind(this, activeProjectRefreshToken), error: this.handleError.bind(this, activeProjectRefreshToken) });
        return activeProjectRefreshToken;
    }

    getAccessToken(): ReplaySubject<any> {
        let activeProjectRefreshToken: ReplaySubject<any> = new ReplaySubject(1);
        if (this.isTokenExpired()) {
            return this.refreshToken(activeProjectRefreshToken);
        }
        activeProjectRefreshToken.next(localStorage.getItem("access_token"));
        return activeProjectRefreshToken;
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
    }

    isAdmin() {
        let roles = this.getRoles();
        if (undefined != roles && null != roles) {
            return roles.includes("ADMIN");
        }

        return false;
    }

    getRoles() {
        return localStorage.getItem("roles");
    }
}


