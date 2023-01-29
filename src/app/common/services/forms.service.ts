import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IGetWorkflowStateTransitionsModel } from 'src/app/forms/form-workflow/form-workflow.model';
import { IFormTemplateModel, IGetFormTemplateResponse } from 'src/app/forms/form.model';
import { ServiceUtil } from '../../services/utility/ServiceUtil';
@Injectable({
  providedIn: 'root'
})
export class FormsService {

  formTemplatesStorage: any = {};
  constructor(private http: HttpClient) { }

  GetFormTemplates() {
    return this.http.get<IGetFormTemplateResponse[]>(`${ServiceUtil.API_ENDPOINT}/forms/`).pipe(
      tap((response: IGetFormTemplateResponse[]) => {
        response.forEach((form: IGetFormTemplateResponse) => {
          this.formTemplatesStorage[form.id] = form
        })
      })
    );
  }

  GetFormTemplate(formName: any, formId: number): Observable<IGetFormTemplateResponse> {
    const form = this.formTemplatesStorage[formId];
    if (form) {
      return of(form);
    }
    return this.http.get<IGetFormTemplateResponse>(`${ServiceUtil.API_ENDPOINT}/forms/${formName}/`);
  }

  SaveFormTemplate(formTemplate: any, name: string, isMasterForm: boolean): Observable<any> {
    let body = {
      name,
      type: isMasterForm ? 'master' : '',
      template: JSON.stringify({ formName: name, components: formTemplate.components }),
      workflow: {}
    }
    return this.http.post<IGetFormTemplateResponse>(`${ServiceUtil.API_ENDPOINT}/forms/`, body, this.getHeaders()).pipe(
      tap((response: IGetFormTemplateResponse) => {
        this.formTemplatesStorage[response.id] = response;
      })
    );
  }

  UpdateFormTemplate(formTemplate: any, name: string, id: number): Observable<any> {
    let body = {
      id,
      name,
      template: JSON.stringify({ formName: name, components: formTemplate.components })
    };
    return this.http.put<IGetFormTemplateResponse>(`${ServiceUtil.API_ENDPOINT}/forms/`, body, this.getHeaders()).pipe(
      tap((response: IGetFormTemplateResponse) => this.formTemplatesStorage[response.id] = response)
    );
  }

  GetWorkflowStatesTransitions(workflowId: number): Observable<IGetWorkflowStateTransitionsModel> {
    return this.http.get<IGetWorkflowStateTransitionsModel>(`${ServiceUtil.API_ENDPOINT}/state_transitions/${workflowId}/`, this.getHeaders());
  }

  SaveFormWorkflowState(stateData: any) {
    return this.http.post(`${ServiceUtil.API_ENDPOINT}/states/`, stateData, this.getHeaders());
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

  SaveLogEntry(formId: number, entryObj: any) {
    return this.http.post(`${ServiceUtil.API_ENDPOINT}/entry/${formId}`, entryObj, this.getHeaders());
  }

  UpdateLogEntry(formId: number, entryObj: any) {
    return this.http.put(`${ServiceUtil.API_ENDPOINT}/entry/${formId}`, entryObj, this.getHeaders());
  }


  GetLogEntries(formId: number, filterByUsername: boolean): Observable<any> {
    return this.http.get(`${ServiceUtil.API_ENDPOINT}/entry/${formId}?filterByUsername=${filterByUsername}`, this.getHeaders());
  }
  GetSpecificLogEntry(formId: number, entryId: number): Observable<any> {
    return this.http.get(`${ServiceUtil.API_ENDPOINT}/entry/${formId}/${entryId}`, this.getHeaders());
  }

  SaveLogEntryComment(formId: number, entryId: number, commentObj: any): Observable<any> {
    return this.http.post(`${ServiceUtil.API_ENDPOINT}/entry/metadata/${formId}/${entryId}`, commentObj, this.getHeaders());
  }
  LogEntryMetadata(formId: number, entryId: number): Observable<any> {
    return this.http.get(`${ServiceUtil.API_ENDPOINT}/entry/metadata/${formId}/${entryId}`, this.getHeaders());
  }

  // PatchEntryState(stateValue: string, masterTableName: string, masterTableEntryId: string) {
  //   return this.http.patch(`${ServiceUtil.API_ENDPOINT}/master/entry/${masterTableName}?id=${masterTableEntryId}&stateValue=${stateValue}`, this.getHeaders());
  // }

  updateMasterEntry(apiData: any, formId: number): Observable<any> {
    return this.http.put(`${ServiceUtil.API_ENDPOINT}${apiData.api}`, {
      metadata: JSON.stringify({
        ...apiData.metaData,
        formId
      })
    }, this.getHeaders());
  }

  protected getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
  }
}