import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ServiceUtil } from './utility/ServiceUtil';
import { Observable, Subject } from 'rxjs';
import { IAuditTrailItem } from '../settings/audit-trail/audit-trail-item-model';
@Injectable({ providedIn: 'root' })
export class AuditTrailService {
    public reloadUsers: Subject<boolean>;

    constructor(private http: HttpClient) {
        this.reloadUsers = new Subject<boolean>();
    }



    getAuditTrail(params: any): Observable<any> {
        let httpOptions = this.getHttpOptions();

        return this.http.get<IAuditTrailItem>(`${ServiceUtil.API_ENDPOINT}/audit/`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            params: params

        });
    }

    private getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),

        };
    }

}

