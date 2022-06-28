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
  constructor(private formsService: FormsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    let params = this.activatedRoute.snapshot.paramMap;
    this.formId = Number(params.get('formId') || '');
    this.formName = String(params.get('formName') || '');
    this.formsService.GetLogEntries(this.formId).subscribe({
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

  FillForm() {
    this.router.navigate(['../../../fillFormData', this.formName], { relativeTo: this.activatedRoute });
  }

  createNewEntry() {
    this.router.navigate(['../../../fillFormData', this.formName], { relativeTo: this.activatedRoute });
  }



}
