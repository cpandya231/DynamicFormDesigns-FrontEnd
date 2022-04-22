import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

import { IUserItem } from '../users/user-item-model';
import { ServiceUtil } from './utility/ServiceUtil';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class UsersService {
    public userAdded: Subject<boolean>;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.userAdded = new Subject<boolean>();
    }


    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            "Authorization": `Bearer ${this.authService.getAccessToken()}`
        })
    };;
    getAllUsers(): any {

        return this.http.get<IUserItem[]>(`${ServiceUtil.API_ENDPOINT}/users/`, this.httpOptions);
    }


    createUser(userItem: IUserItem) {

        return this.http.post<any>(`${ServiceUtil.API_ENDPOINT}/users/register`, userItem, this.httpOptions);



    }
}

