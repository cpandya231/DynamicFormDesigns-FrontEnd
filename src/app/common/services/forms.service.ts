import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetFormTemplateResponse } from 'src/app/forms/form.model';
import { ServiceUtil } from '../../services/utility/ServiceUtil';
@Injectable({
  providedIn: 'root'
})
export class FormsService {

  tempFormTemplatesStorage: any = [];
  constructor(private http: HttpClient) { }

  GetFormTemplates() {
    return this.http.get(`${ServiceUtil.API_ENDPOINT}/forms/`);
  }

  GetFormTemplate(formName: any): Observable<IGetFormTemplateResponse> {
    return this.http.get<IGetFormTemplateResponse>(`${ServiceUtil.API_ENDPOINT}/forms/${formName}/`);
  }

  SaveFormTemplate(formTemplate: any, name: string) {
    let body = {
      name,
      template: JSON.stringify({ formName: name, components: formTemplate.components })
    }
    return this.http.post(`${ServiceUtil.API_ENDPOINT}/forms/`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  UpdateFormTemplate(formTemplate: any, name: string, id: number) {
    let body = {
      id,
      name,
      template: JSON.stringify({ formName: name, components: formTemplate.components })
    };
    return this.http.put(`${ServiceUtil.API_ENDPOINT}/forms/`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }
}