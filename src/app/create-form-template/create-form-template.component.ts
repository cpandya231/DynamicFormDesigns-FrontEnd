import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsService } from '../common/services/forms.service';

@Component({
  selector: 'app-create-form-template',
  templateUrl: './create-form-template.component.html',
  styleUrls: ['./create-form-template.component.css']
})
export class CreateFormTemplateComponent {

  @ViewChild('formio') formIO: any;
  FormName: string= '';
  public form: Object = {
    components: []
  };
  constructor(private formsService: FormsService) {
    
  }

  SaveTemplate() {
    this.formsService.SaveFormTemplate(this.formIO.form, this.FormName);
  }

}
