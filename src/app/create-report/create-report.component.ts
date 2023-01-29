import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {

  ReportForm: FormGroup;
  constructor(private fb: FormBuilder,
    private reportService: ReportService,
    public dialogRef: MatDialogRef<CreateReportComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
    this.ReportForm = this.fb.group({
      name: '',
      type: '',
      columns: '',
      template: '',
    })
  }

  SaveReport() {
    const data = this.ReportForm.value;
    this.reportService.saveNewReport(data).subscribe(data => {
      console.log(data);
    })
  }

}
