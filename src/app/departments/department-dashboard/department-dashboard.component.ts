
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { DepartmentService } from 'src/app/services/departments.service';
import { IDepartmentItem } from '../department-item-model';
import * as shape from 'd3-shape';
import { Edge, Layout } from '@swimlane/ngx-graph';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-department-dashboard',
  templateUrl: './department-dashboard.component.html',
  styleUrls: ['./department-dashboard.component.scss'],
})
export class DepartmentDashboardComponent implements OnInit {
  isDataLoaded: boolean = false;
  Departments: IDepartmentItem[] = [];
  public nodes: any[] = [];
  public links: Edge[] = [];
  public layoutSettings = {
    orientation: 'BT'
  };
  draggingEnabled: boolean = true;
  panningEnabled: boolean = true;
  zoomEnabled: boolean = true;
  zoomSpeed: number = 0.2;
  minZoomLevel: number = 0.5;
  maxZoomLevel: number = 2.0;
  panOnZoom: boolean = true;
  autoCenter = true;
  autoZoom = true;
  public curve: any = shape.curveStep;
  WorkflowLinks: any;
  WorkflowStates: any;
  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) {
  }

  ngOnInit() {
    this.departmentService.getAllDepartment().subscribe((departments: any) => {
      const nodes: any[]= [];
      const links: any[] = [];
      const chars ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      departments.forEach((dept: any) => {
        let linkId = '';
        for (let i = 0; i < 5; i++) {
          linkId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        nodes.push({
          id: dept.id,
          label: dept.name,
          codeLabel: `code: ${dept.code}`,
          dimension: {
            width: 150,
            height: 70
          }
        });

        if (dept.parentId) {
          links.push({
            id: linkId,
            source: dept.id,
            target: dept.parentId
          })
        }
        
      });
      this.nodes = nodes;
      this.links = links;
    })
  }

  EditDepartment(departmentId: any) {
    this.router.navigate(['./edit', departmentId], { relativeTo: this.route });
  }

  AddDepartment() {
      this.router.navigate(['./create', this.nodes[0].id], { relativeTo: this.route });
  }
}
