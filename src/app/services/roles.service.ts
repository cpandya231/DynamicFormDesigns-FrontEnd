import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';


import { ServiceUtil } from './utility/ServiceUtil';
import { map, Observable, Subject, switchMap } from 'rxjs';
import { IRoleItem } from '../roles/role-item-model';
@Injectable({ providedIn: 'root' })
export class RoleService {
    public roleAdded: Subject<boolean>;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.roleAdded = new Subject<boolean>();
    }


    getAllRoles(): Observable<any> {

        return this.authService.getAccessToken().asObservable().pipe(
            switchMap(token => {
                let httpOptions = this.getHttpOptions(token);
                return this.http.get<IRoleItem[]>(`${ServiceUtil.API_ENDPOINT}/roles/`, httpOptions);
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

    creatRole(userItem: IRoleItem) {

        return this.authService.getAccessToken().asObservable().pipe(
            switchMap(token => {
                return this.http.post<any>(`${ServiceUtil.API_ENDPOINT}/roles/save`, userItem, this.getHttpOptions(token));
            }))




    }
}

