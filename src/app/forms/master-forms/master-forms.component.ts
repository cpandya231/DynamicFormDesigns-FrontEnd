import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/common/services/forms.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-master-forms',
  templateUrl: './master-forms.component.html',
  styleUrls: ['./master-forms.component.scss']
})
export class MasterFormsComponent implements OnInit {


  FormTemplates: any = [];


  DATE_FORMAT: string;
  appName: string;
  constructor(private formsService: FormsService,
    private router: Router,
    private location: Location,
    private settingsService: SettingsService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.appName = localStorage.getItem('appName') || '';
    this.settingsService.getAllSettings().subscribe(setting => {
      this.DATE_FORMAT = setting.filter(setting => (setting.type == "GLOBAL") && (setting.key == "DATE_FORMAT"))[0].value;
    })
    this.formsService.GetFormTemplates().subscribe(data => {
      this.FormTemplates = data.filter(form => form.type == 'master' && form.name.includes(this.appName));
    })
  }

  SeeEntries(form: any) {
    this.router.navigate(['./formsInProgressData', form.id, form.name, form.workflow.id, { isMasterForm: true }], { relativeTo: this.route });
  }
  back() {
    this.location.back();
  }
}
