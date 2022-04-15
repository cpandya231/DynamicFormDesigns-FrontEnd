import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsService } from '../common/services/forms.service';

@Component({
  selector: 'app-forms-dashboard',
  templateUrl: './forms-dashboard.component.html',
})
export class FormsDashboardComponent implements OnInit {

  FormTemplates: any = [];
  savedForm: any;
  constructor(private formsService: FormsService,
    private router: Router) { }

  ngOnInit(): void {
    this.FormTemplates = this.formsService.GetFormTemplates();
    this.savedForm = this.FormTemplates[0];
  }

  EditFormTemplate(formId: any) {
    this.router.navigate(['/createForm', {id: formId}]);
  }

  PreviewForm(formId: any) {
    
  }

}
