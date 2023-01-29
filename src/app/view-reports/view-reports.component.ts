import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ReportService } from '../services/report.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.scss']
})
export class ViewReportsComponent implements OnInit {

  ActiveReports: any[] = [];
  selectedReport: any;
  ReportData: any;
  defaultColDef!: ColDef;
  columnDefs: any[] = [];
  rowData: any[] = [];
  isDataLoaded = false;
  constructor(private reportService: ReportService,    
    private location: Location,
    ) { }

  ngOnInit(): void {
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true
    }
    this.reportService.getActiveReports().subscribe(data => {
      this.ActiveReports = data;
    })
  }

  onReportChange() {
    this.reportService.runReport(this.selectedReport.id).subscribe(reportData => {
      this.ReportData = reportData.map((data: any) => data.data);
      this.rowData = this.ReportData;
      this.isDataLoaded = true;

      this.selectedReport.columns.split(',').forEach((col: string) => {
        this.columnDefs.push( {
          'field': col
        })
      })
    })
  }

   back() {
    this.location.back();
  }
}
