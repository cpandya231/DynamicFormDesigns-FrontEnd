import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetFormTemplateResponse } from 'src/app/forms/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  tempFormTemplatesStorage: any = [];
  constructor(private http: HttpClient) { }

  GetFormTemplates() {
    return this.http.get('http://localhost:8080/forms/');
  }

  GetFormTemplate(formName: any): Observable<IGetFormTemplateResponse> {
    return this.http.get<IGetFormTemplateResponse>(`http://localhost:8080/forms/${formName}/`);
  }

  SaveFormTemplate(formTemplate: any, name: string) {
    return this.http.post('http://localhost:8080/forms/save', 
    {
      name: name,
      template: JSON.stringify({formName: name, components: formTemplate.components})
    },{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
    });
  }
}


