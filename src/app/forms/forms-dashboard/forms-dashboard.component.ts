import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsService } from '../../common/services/forms.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PreviewFormComponent } from '../preview-form/preview-form.component';
import { DateUtil } from 'src/app/services/utility/DateUtil';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-forms-dashboard',
  templateUrl: './forms-dashboard.component.html',
  styleUrls: ['./forms-dashboard.component.scss']
})
export class FormsDashboardComponent implements OnInit {

  FormTemplates: any;
  private modalRef: MdbModalRef<PreviewFormComponent> | null = null;
  DATE_FORMAT: string;
  constructor(private formsService: FormsService,
    private router: Router,
    private settingsService: SettingsService,
    private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.settingsService.getAllSettings().subscribe(setting => {
      this.DATE_FORMAT = setting.filter(setting => (setting.type == "GLOBAL") && (setting.key == "DATE_FORMAT"))[0].value;
    })
    this.formsService.GetFormTemplates().subscribe(data => {
      this.FormTemplates = data;
    })
  }

  EditFormTemplate(formName: string, id: number) {
    this.router.navigate(['/formManagement', { name: formName, workflowId: id }]);
  }

  PreviewForm(formTemplate: any) {
    this.modalRef = this.modalService.open(PreviewFormComponent, {
      modalClass: 'modal-xl',
      ignoreBackdropClick: true,
      data: {
        formTemplate: JSON.parse(formTemplate)
      }
    });
  }
}
