import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/common/services/forms.service';
@Component({
  selector: 'app-user-forms-in-progress-data',
  templateUrl: './user-forms-in-progress-data.component.html',
  styleUrls: ['./user-forms-in-progress-data.component.scss']
})
export class UserFormsInProgressDataComponent implements OnInit {

  logEntries: any[];
  formId: number;
  formName: string;
  isDataLoaded: boolean = false;
  columns: string[];
  selectedChoice: any = 'all';
  constructor(private formsService: FormsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    let params = this.activatedRoute.snapshot.paramMap;
    this.formId = Number(params.get('formId') || '');
    this.formName = String(params.get('formName') || '');
    this.formsService.GetLogEntries(this.formId, false).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.logEntries = data;
          this.columns = Object.keys(this.logEntries[0].data);
          this.isDataLoaded = true;
        } else {
          this.logEntries = [];
          this.isDataLoaded = true;
        }

      },
      error: (err) => console.log(`Error occured for ${this.formId} error:${err}`)
    })
  }

  FillForm(entryId: number) {
    this.router.navigate(['../../../updateLogEntry', this.formName, entryId], { relativeTo: this.activatedRoute });
  }

  createNewEntry() {
    this.router.navigate(['../../../createLogEntry', this.formName], { relativeTo: this.activatedRoute });
  }


  handleChange() {
    let filterbyusername = this.selectedChoice == "username";

    this.formsService.GetLogEntries(this.formId, filterbyusername).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.logEntries = data;
          this.columns = Object.keys(this.logEntries[0].data);
          this.isDataLoaded = true;
        } else {
          this.logEntries = []
        }

      },
      error: (err) => console.log(`Error occured for ${this.formId} error:${err}`)
    })
  }


}
