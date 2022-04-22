import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

import { IUserItem } from '../users/user-item-model';
import { ServiceUtil } from './utility/ServiceUtil';
@Injectable({ providedIn: 'root' })
export class UsersService {
    constructor(private http: HttpClient, private authService: AuthService) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        })
    };;
    getAllUsers(): any {

        return this.http.get<IUserItem[]>(`${ServiceUtil.API_ENDPOINT}/users/`, this.httpOptions);
    }


    createUser(userItem: IUserItem) {

        return this.http.post<any>(`${ServiceUtil.API_ENDPOINT}/users/register`, userItem, this.httpOptions);



    }
}

