import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ServiceUtil } from './utility/ServiceUtil';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {

    httpOptions: any;
    constructor(private http: HttpClient) {
        this.httpOptions =  {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
    }


    getActiveReports(): Observable<any> {
        return this.http.get<any>(`${ServiceUtil.API_ENDPOINT}/report/active`, this.httpOptions);
    }

    saveNewReport(body: any): Observable<any> {
        return this.http.post<any>(`${ServiceUtil.API_ENDPOINT}/report/`, body, this.httpOptions);     
    }

    updateExistingReport(body: any): Observable<any> {
        return this.http.put<any>(`${ServiceUtil.API_ENDPOINT}/report/`, body, this.httpOptions);     
    }

    runReport(id: number): Observable<any> {
        return this.http.get<any>(`${ServiceUtil.API_ENDPOINT}/report/run/${id}`, this.httpOptions);
    }
}