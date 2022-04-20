import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginModel } from 'src/app/login/login-model';
import { AuthService } from './auth.service';
import jwt_decode from 'jwt-decode';

import * as moment from "moment";
import { ReplaySubject } from 'rxjs';
import { IUserItem } from '../users/user-item-model';
import { ServiceUtil } from './utility/ServiceUtil';
@Injectable({ providedIn: 'root' })
export class UsersService {
    constructor(private http: HttpClient, private authService: AuthService) { }

    getAllUsers(): any {
        console.log(`Inside UsersService`);
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            })
        };;
        console.log(`HttpOptions ${JSON.stringify(httpOptions)}`)
        
        return this.http.get<IUserItem[]>(`${ServiceUtil.API_ENDPOINT}/users/`, httpOptions);
    }


}


