import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsService } from '../../common/services/forms.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PreviewFormComponent } from '../preview-form/preview-form.component';
import { DateUtil } from 'src/app/services/utility/DateUtil';
import { SettingsService } from 'src/app/services/settings.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forms-dashboard',
  templateUrl: './forms-dashboard.component.html',
  styleUrls: ['./forms-dashboard.component.scss']
})
export class FormsDashboardComponent implements OnInit {

  FormTemplates: any;
  isAdmin: boolean = false;
  private modalRef: MdbModalRef<PreviewFormComponent> | null = null;
  DATE_FORMAT: string;
  constructor(private formsService: FormsService,
    private router: Router,
    private settingsService: SettingsService,
    private authService: AuthService,
    private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
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

  FillForm(formName: string) {
    this.router.navigate(['/form', formName]);
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
