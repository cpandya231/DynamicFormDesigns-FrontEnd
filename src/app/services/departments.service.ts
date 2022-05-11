import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { ServiceUtil } from './utility/ServiceUtil';
import { Observable, Subject } from 'rxjs';
import { IDepartmentItem } from '../departments/department-item-model';
@Injectable({ providedIn: 'root' })
export class DepartMentService {
    public roleAdded: Subject<boolean>;

    constructor(private http: HttpClient) {
        this.roleAdded = new Subject<boolean>();
    }


    getAllDepartment(): Observable<any> {
        let httpOptions = this.getHttpOptions();
        return this.http.get<IDepartmentItem[]>(`${ServiceUtil.API_ENDPOINT}/departments/`, httpOptions);
    }


    private getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
    }



}

