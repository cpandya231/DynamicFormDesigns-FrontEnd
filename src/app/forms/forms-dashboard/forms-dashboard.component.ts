import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsService } from '../../common/services/forms.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PreviewFormComponent } from '../preview-form/preview-form.component';

@Component({
  selector: 'app-forms-dashboard',
  templateUrl: './forms-dashboard.component.html',
  styleUrls: ['./forms-dashboard.component.scss']
})
export class FormsDashboardComponent implements OnInit {

  FormTemplates: any = [];
  private modalRef: MdbModalRef<PreviewFormComponent> | null = null;
  constructor(private formsService: FormsService,
    private router: Router,
    private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.FormTemplates = this.formsService.GetFormTemplates();
  }

  EditFormTemplate(formId: any) {
    this.router.navigate(['/createForm', {id: formId}]);
  }

  PreviewForm(formId: any) {
    this.modalRef = this.modalService.open(PreviewFormComponent, {
      data: {
        formId: formId
      }
    });
  }

}
