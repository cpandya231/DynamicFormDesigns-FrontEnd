import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportService } from '../services/report.service';
import { SettingsService } from '../services/settings.service';
import { CreateReportComponent } from './create-report.component';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.scss']
})
export class ReportDashboardComponent implements OnInit {

  ActiveReports: any[] = [];
  DATE_FORMAT: string;
  constructor(private location: Location,
    private reportService: ReportService,
    private settingsService: SettingsService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.reportService.getActiveReports().subscribe(data => {
      this.ActiveReports = data;
    });
    this.settingsService.getAllSettings().subscribe(setting => {
      this.DATE_FORMAT = setting.filter(setting => (setting.type == "GLOBAL") && (setting.key == "DATE_FORMAT"))[0].value;
    })
  }

  back() {
    this.location.back();
  }

  createNewReport() {
    this.dialog.open(CreateReportComponent, {
      height: '500px',
      width: '500px'
    })
  }
}
