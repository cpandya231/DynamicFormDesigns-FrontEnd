import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';


import { ServiceUtil } from './utility/ServiceUtil';
import { map, Observable, Subject, switchMap } from 'rxjs';
import { ISettingItem } from '../settings/system-config/settings-model';
@Injectable({ providedIn: 'root' })
export class SettingsService {
    public reloadUsers: Subject<boolean>;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.reloadUsers = new Subject<boolean>();
    }


    getAllSettings(): Observable<ISettingItem[]> {
        let httpOptions = this.getHttpOptions();
        return this.http.get<ISettingItem[]>(`${ServiceUtil.API_ENDPOINT}/settings/`, httpOptions);
    }



    private getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
    }


    updateSettings(userItem: ISettingItem) {
        return this.http.put<any>(`${ServiceUtil.API_ENDPOINT}/settings/`, userItem, this.getHttpOptions());
    }


}

