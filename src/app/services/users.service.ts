import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

import { IUserItem } from '../users/user-item-model';
import { ServiceUtil } from './utility/ServiceUtil';
import { map, Observable, Subject, switchMap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class UsersService {
    public userAdded: Subject<boolean>;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.userAdded = new Subject<boolean>();
    }


    getAllUsers(): Observable<any> {
        return this.authService.getAccessToken().asObservable().pipe(
            switchMap(token => {
                let httpOptions = this.getHttpOptions(token);
                return this.http.get<IUserItem[]>(`${ServiceUtil.API_ENDPOINT}/users/`, httpOptions);
            }))
    }

    private getHttpOptions(token: any) {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                "Authorization": `Bearer ${token}`
            })
        };
    }

    createUser(userItem: IUserItem) {

        return this.authService.getAccessToken().asObservable().pipe(
            switchMap(token => {
                return this.http.post<any>(`${ServiceUtil.API_ENDPOINT}/users/register`, userItem, this.getHttpOptions(token));
            }))
    }
}

