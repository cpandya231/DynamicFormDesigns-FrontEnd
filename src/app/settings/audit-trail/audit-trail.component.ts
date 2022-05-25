import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { AuditTrailService } from 'src/app/services/audit-trail.service';
import { DateUtil } from 'src/app/services/utility/DateUtil';
import { IAuditTrailItem } from './audit-trail-item-model';

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss']
})
export class AuditTrailComponent implements OnInit {
  readonly DATE_FORMAT = DateUtil.DATE_FORMAT;
  auditData$!: any;
  AUDIT_DATA!: IAuditTrailItem[];
  filter = new FormControl('');
  currentPage = 1;
  pageSize = 10;
  count = 80;
  username: any = '';

  constructor(private auditTrailService: AuditTrailService,) { }

  ngOnInit(): void {
    this.setData();
  }

  getRequestParams(): any {
    let params: any = {};
    if (this.username) {
      params[`user`] = this.username;
    }
    if (this.currentPage) {
      params[`pageNumber`] = this.currentPage - 1;
    }
    if (this.pageSize) {
      params[`pageSize`] = this.pageSize;
    }
    return params;
  }

  private setData() {
    this.auditData$ = this.auditTrailService.getAuditTrail(this.getRequestParams());

    this.auditData$.subscribe((response: { [x: string]: any; }) => {
      this.AUDIT_DATA = response["auditTrails"];
      this.count = response["totalPages"] * this.pageSize;

    })
  }


  handlePageChange(event: any) {
    this.currentPage = event;
    this.setData();
  }

  searchUser() {
    this.username = this.filter.value;
    this.setData();
  }

}
