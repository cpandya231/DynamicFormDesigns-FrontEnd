import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetWorkflowStateTransitionsModel } from 'src/app/forms/form-workflow/form-workflow.model';
import { IGetFormTemplateResponse } from 'src/app/forms/form.model';
import { ServiceUtil } from '../../services/utility/ServiceUtil';
@Injectable({
  providedIn: 'root'
})
export class FormsService {

  tempFormTemplatesStorage: any = [];
  FormWorkflowStates: any[] = [];
  constructor(private http: HttpClient) { }

  GetFormTemplates() {
    return this.http.get(`${ServiceUtil.API_ENDPOINT}/forms/`);
  }

  GetFormTemplate(formName: any): Observable<IGetFormTemplateResponse> {
    return this.http.get<IGetFormTemplateResponse>(`${ServiceUtil.API_ENDPOINT}/forms/${formName}/`);
  }

  SaveFormTemplate(formTemplate: any, name: string): Observable<any> {
    let body = {
      name,
      template: JSON.stringify({ formName: name, components: formTemplate.components }),
      workflow: {}
    }
    return this.http.post(`${ServiceUtil.API_ENDPOINT}/forms/`, body, this.getHeaders());
  }

  UpdateFormTemplate(formTemplate: any, name: string, id: number): Observable<any> {
    let body = {
      id,
      name,
      template: JSON.stringify({ formName: name, components: formTemplate.components })
    };
    return this.http.put(`${ServiceUtil.API_ENDPOINT}/forms/`, body, this.getHeaders());
  }

  GetWorkflowStatesTransitions(workflowId: number): Observable<IGetWorkflowStateTransitionsModel> {
    return this.http.get<IGetWorkflowStateTransitionsModel>(`${ServiceUtil.API_ENDPOINT}/state_transitions/${workflowId}/`, this.getHeaders());
  }

  SaveFormWorkflowState(stateData: any) {
    return this.http.post(`${ServiceUtil.API_ENDPOINT}/states/`, stateData,  this.getHeaders()); 
  }

  UpdateFormWorkflowState(stateData: any) {
    return this.http.put(`${ServiceUtil.API_ENDPOINT}/states/`, stateData, this.getHeaders());
  }

  SaveStatesTransitions(transitionsData: any) {
    return this.http.post(`${ServiceUtil.API_ENDPOINT}/transitions/`, transitionsData, this.getHeaders());
  }

  UpdateStatesTransitions(transitionsData: any) {
    return this.http.put(`${ServiceUtil.API_ENDPOINT}/transitions/`, transitionsData, this.getHeaders());
  }

  protected getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
  }
}