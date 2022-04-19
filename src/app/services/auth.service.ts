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

        const expiresAt = moment().add(decoded_token.exp, 'second');

        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
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
}


