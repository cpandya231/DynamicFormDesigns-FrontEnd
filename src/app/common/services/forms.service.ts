import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  tempFormTemplatesStorage: any = [];
  constructor(private http: HttpClient) { }

  GetFormTemplates() {
    return this.tempFormTemplatesStorage;
  }

  GetFormTemplate(formId: any) {
    return this.tempFormTemplatesStorage.find((form: { Id: any; }) => form.Id === formId);
  }

  SaveFormTemplate(formTemplate: any, name: string) {
    formTemplate.Name = name;
    formTemplate.Id = Math.ceil(Math.random()*10);
    formTemplate.CreatedBy = 'Akash';
    formTemplate.CreatedOn = new Date().toLocaleDateString();
    this.http.post('http://localhost:8080/forms/save', 
    {
      name: 'demo_form',
      template: JSON.stringify({formName: 'demo_form', components: formTemplate.components})
    }, this.getHttpOptions(localStorage.getItem("access_token"))).subscribe(() => {});
     
    this.tempFormTemplatesStorage.push(formTemplate);
  }

  private getHttpOptions(token: any) {
    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOlsiUk9MRV9BRE1JTiJdLCJhdXRob3JpdHkiOlsiQ1JFQVRFLVBFUk1JU1NJT04iLCJDUkVBVEUtVVNFUiIsIkNSRUFURS1ST0xFIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9sb2dpbiIsImV4cCI6MTY1MTMxMTAzMH0.WI07f9KP_r-QNLBXamm3-89DTf2BoTTz9o4X221yatc`
        })
    };
  }
}


