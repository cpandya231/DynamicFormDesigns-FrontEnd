import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

import { IUserItem } from '../users/user-item-model';
import { ServiceUtil } from './utility/ServiceUtil';
import { map, Observable, Subject, switchMap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class UsersService {
    public reloadUsers: Subject<boolean>;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.reloadUsers = new Subject<boolean>();
    }


    getAllUsers(): Observable<any> {
        let httpOptions = this.getHttpOptions();
        return this.http.get<IUserItem[]>(`${ServiceUtil.API_ENDPOINT}/users/`, httpOptions);
    }

    getUserByUsername(username: any): Observable<any> {
        let httpOptions = this.getHttpOptions();
        return this.http.get<IUserItem>(`${ServiceUtil.API_ENDPOINT}/users/${username}`, httpOptions);
    }

    private getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
    }

    createUser(userItem: IUserItem) {
        return this.http.post<any>(`${ServiceUtil.API_ENDPOINT}/users/`, userItem, this.getHttpOptions());
    }

    toggleUser(userItem: any) {
        return this.http.patch<any>(`${ServiceUtil.API_ENDPOINT}/users/`, userItem, this.getHttpOptions());
    }
}

