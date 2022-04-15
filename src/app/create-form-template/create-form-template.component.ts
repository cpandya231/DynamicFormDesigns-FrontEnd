import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormsService } from '../common/services/forms.service';

@Component({
  selector: 'app-create-form-template',
  templateUrl: './create-form-template.component.html',
  styleUrls: ['./create-form-template.component.css']
})
export class CreateFormTemplateComponent implements OnInit {

  @ViewChild('formio') formIO: any;
  FormName: string= '';
  private formId: number = 0;
  CurrentForm: any = {
    components: []
  };
  constructor(private formsService: FormsService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    let params = this.activatedRoute.snapshot.paramMap;
    this.formId = Number(params.get('id'));
    if (this.formId) {
      let form =  this.formsService.GetFormTemplate(this.formId)
      this.CurrentForm.components = form.components;
      this.FormName = form.Name;
    }
  }

  SaveTemplate() {
    this.formsService.SaveFormTemplate(this.formIO.form, this.FormName);
  }

}
