import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'src/app/common/services/forms.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Location } from '@angular/common'

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
    private location: Location,
    private settingsService: SettingsService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.settingsService.getAllSettings().subscribe(setting => {
      this.DATE_FORMAT = setting.filter(setting => (setting.type == "GLOBAL") && (setting.key == "DATE_FORMAT"))[0].value;
    })
    this.formsService.GetFormTemplates().subscribe(data => {
      this.FormTemplates = data.filter(form => !form.type);


    })
  }

  SeeEntries(form: any) {
    this.router.navigate(['./formsInProgressData', form.id, form.name, form.workflow.id], { relativeTo: this.route });
  }
  back() {
    this.location.back();
  }
}
