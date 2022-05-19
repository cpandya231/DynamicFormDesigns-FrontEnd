import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { ServiceUtil } from './utility/ServiceUtil';
import { Observable, Subject } from 'rxjs';
import { IDepartmentItem } from '../departments/department-item-model';
@Injectable({ providedIn: 'root' })
export class DepartmentService {
    public departmentAdded: Subject<boolean>;
    constructor(private http: HttpClient) {
        this.departmentAdded = new Subject<boolean>();
    }


    getAllDepartment(): Observable<any> {
        let httpOptions = this.getHttpOptions();
        return this.http.get<IDepartmentItem[]>(`${ServiceUtil.API_ENDPOINT}/departments/`, httpOptions);
    }

    getDepartmentByName(name: any): Observable<any> {
        let httpOptions = this.getHttpOptions();
        return this.http.get<IDepartmentItem>(`${ServiceUtil.API_ENDPOINT}/departments/${name}/`, httpOptions);
    }



    private getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
    }

    createDepartment(departmentItem: IDepartmentItem) {
        return this.http.post<any>(`${ServiceUtil.API_ENDPOINT}/departments/`, departmentItem, this.getHttpOptions());
    }



    editDepartment(departmentItem: IDepartmentItem) {
        return this.http.put<any>(`${ServiceUtil.API_ENDPOINT}/departments/`, departmentItem, this.getHttpOptions());
    }



}

