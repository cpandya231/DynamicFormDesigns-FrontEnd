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
        return this.http.get<IRoleItem[]>(`${ServiceUtil.API_ENDPOINT}/roles/`, this.getHttpOptions());

    }


    private getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
    }

    creatRole(userItem: IRoleItem) {
        return this.http.post<any>(`${ServiceUtil.API_ENDPOINT}/roles/`, userItem, this.getHttpOptions());
    }
}

