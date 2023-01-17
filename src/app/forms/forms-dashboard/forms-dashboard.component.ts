import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  appName: string;
  constructor(private formsService: FormsService,
    private router: Router,
    private settingsService: SettingsService,
    private authService: AuthService,
    private modalService: MdbModalService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.appName = this.route.snapshot.paramMap.get('appName') || '';
    localStorage.setItem('appName', this.appName);
    this.settingsService.getAllSettings().subscribe(setting => {
      this.DATE_FORMAT = setting.filter(setting => (setting.type == "GLOBAL") && (setting.key == "DATE_FORMAT"))[0].value;
    })
    this.formsService.GetFormTemplates().subscribe(data => {
      this.FormTemplates = data.filter(form => form.name.includes(this.appName));

    })
  }

  EditFormTemplate(formName: string, formId: number, workflowId: number) {
    this.router.navigate(['/formManagement', formName, formId, workflowId ]);
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
