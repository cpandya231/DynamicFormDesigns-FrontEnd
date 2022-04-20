import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  tempFormTemplatesStorage: any = [];
  constructor() { }

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
    this.tempFormTemplatesStorage.push(formTemplate);
  }
}
