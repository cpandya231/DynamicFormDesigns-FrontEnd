
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { DepartmentService } from 'src/app/services/departments.service';
import { IDepartmentItem } from '../department-item-model';
@Component({
  selector: 'app-department-dashboard',
  templateUrl: './department-dashboard.component.html',
  styleUrls: ['./department-dashboard.component.scss'],
})
export class DepartmentDashboardComponent implements OnInit {
  isDataLoaded: boolean = false;
  Departments: IDepartmentItem[] = [];
  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
  }

  ngOnInit() {
    let allDepartMents = this.departmentService.getAllDepartment()
    .pipe(map(departmentResponse => {
      return departmentResponse.map((department: { [x: string]: any; }) => {
        department['parentId'] = department['parentId'] || '';
        return department;
      });
    }));
  allDepartMents.subscribe(departmentNodes => {
    this.Departments = departmentNodes;
  });
  }

  handleDepartmentEvent(data: any) {
    let departmentId = data["branch-id"]["nodeValue"];
    let eventType = data["event-type"]["nodeValue"];
    if (eventType == 'add') {
      this.router.navigate(['./create', departmentId], { relativeTo: this.route });
    } else if (eventType == 'edit') {
      this.router.navigate(['./edit', departmentId], { relativeTo: this.route });
    }
  }
}
