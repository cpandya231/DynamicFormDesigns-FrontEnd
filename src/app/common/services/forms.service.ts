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

  SaveFormTemplate(formTemplate: any, name: string) {
    formTemplate.name = name;
    this.tempFormTemplatesStorage.push(formTemplate);
  }
}
