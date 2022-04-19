import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from '../../common/services/forms.service';

@Component({
  selector: 'app-create-form-template',
  templateUrl: './create-form-template.component.html',
  styleUrls: ['./create-form-template.component.scss']
})
export class CreateFormTemplateComponent implements OnInit {

  @ViewChild('formio') formIO: any;
  FormName: string= '';
  private formId: number = 0;
  CurrentForm: any = {
    components: []
  };
  constructor(private formsService: FormsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    let params = this.activatedRoute.snapshot.paramMap;
    this.formId = Number(params.get('id'));
    if (this.formId) {
      let form =  this.formsService.GetFormTemplate(this.formId)
      this.CurrentForm.components = form.components;
      this.FormName = form.Name;
    }
  }

  SaveTemplate(): void {
    this.formsService.SaveFormTemplate(this.formIO.form, this.FormName);
    alert('form created successfully');
    this.router.navigate(['formsDashboard']);
  }

  CancelChanges(): void {
    this.router.navigate(['formsDashboard']);
  }
}
