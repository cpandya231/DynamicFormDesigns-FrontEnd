import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FormsService } from 'src/app/common/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';
import { PreviewFormComponent } from '../preview-form/preview-form.component';

@Component({
  selector: 'app-user-forms-in-progress',
  templateUrl: './user-forms-in-progress.component.html',
  styleUrls: ['./user-forms-in-progress.component.scss']
})
export class UserFormsInProgressComponent implements OnInit {


  FormTemplates: any = [];


  DATE_FORMAT: string;
  constructor(private formsService: FormsService,
    private router: Router,
    private settingsService: SettingsService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.settingsService.getAllSettings().subscribe(setting => {
      this.DATE_FORMAT = setting.filter(setting => (setting.type == "GLOBAL") && (setting.key == "DATE_FORMAT"))[0].value;
    })
    this.formsService.GetFormTemplates().subscribe(data => {
      this.FormTemplates = data;
    })
  }

  FillForm(formName: string) {
    this.router.navigate(['./form', formName], { relativeTo: this.route });
  }




}
